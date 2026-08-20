'use client';

import React, { useState, useEffect } from 'react';

interface GPayButtonProps {
  amount: number;
  serviceTitle: string;
  userEmail: string;
  userName: string;
  userPhone?: string;
  userRole?: string;
  userLinkedin?: string;
  notes?: string;
  onPaymentSuccess: (transactionDetails: {
    transactionId: string;
    paymentToken: string;
    amount: number;
    serviceTitle: string;
    menteeName: string;
    menteeEmail: string;
  }) => void;
  onPaymentError?: (error: string) => void;
}

declare global {
  interface Window {
    Razorpay?: any;
    google?: any;
  }
}

export default function GPayButton({
  amount,
  serviceTitle,
  userEmail,
  userName,
  userPhone,
  userRole,
  userLinkedin,
  notes,
  onPaymentSuccess,
  onPaymentError,
}: GPayButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Dynamically load Razorpay SDK
    if (typeof window !== 'undefined' && !window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // 1. Create Order via Razorpay Backend API
      const orderRes = await fetch('/api/payments/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          serviceTitle,
          userEmail,
          userName,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || 'Failed to initialize payment gateway.');
      }

      // 2. Launch Razorpay Checkout with Google Pay, UPI & Card Payment Options
      if (window.Razorpay) {
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'DS Mentorship',
          description: `Payment for ${serviceTitle}`,
          image: 'https://lh3.googleusercontent.com/aida/AP1WRLv39MngB3vq533uO2okUmuM0bGY9vC77Z2YYFJbEH2eM2AsSiEgvH00u9MScf-z3A_7W4HMnF1gZx-GtddmEgEcMY3apFqd5HKCIFr0gzkX63r0tH9IY2BuAZwFgw9roqqb9CXIHMTJd3iGdQwhrvjSGDARHGGtsPyeh8znHqRawq-WvRk3YoV5pcjjln_69cFQd1WEIJBIvNTpjXMTDG8pTn0qb4cDCI1W3fMpvb1wLPIeKC-15Tohq0g',
          order_id: orderData.orderId,
          prefill: {
            name: userName,
            email: userEmail,
            contact: userPhone || '',
          },
          config: {
            display: {
              blocks: {
                banks: {
                  name: 'Pay via Google Pay / UPI / Card',
                  instruments: [
                    { method: 'upi', flows: ['intent', 'qr'] },
                    { method: 'card' },
                    { method: 'netbanking' },
                  ],
                },
              },
              sequence: ['block.banks'],
              preferences: {
                show_default_blocks: true,
              },
            },
          },
          theme: {
            color: '#0d1c32',
          },
          handler: async function (response: any) {
            try {
              // 3. Verify Payment Signature & Save in Supabase PostgreSQL
              const verifyRes = await fetch('/api/payments/razorpay/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  serviceTitle,
                  priceAmount: amount,
                  menteeName: userName,
                  menteeEmail: userEmail,
                  phone: userPhone,
                  currentRole: userRole,
                  linkedinUrl: userLinkedin,
                  notes,
                }),
              });

              const verifyData = await verifyRes.json();

              if (verifyData.success) {
                onPaymentSuccess({
                  transactionId: verifyData.transactionId,
                  paymentToken: response.razorpay_payment_id,
                  amount,
                  serviceTitle,
                  menteeName: userName,
                  menteeEmail: userEmail,
                });
              } else {
                throw new Error(verifyData.error || 'Payment signature verification failed.');
              }
            } catch (err: any) {
              if (onPaymentError) onPaymentError(err.message);
            } finally {
              setIsProcessing(false);
            }
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        throw new Error('Razorpay SDK not loaded. Please refresh and try again.');
      }
    } catch (err: any) {
      console.error('Payment checkout error:', err);
      if (onPaymentError) onPaymentError(err.message || 'Payment initiation error.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full space-y-2">
      <button
        type="button"
        onClick={handlePayment}
        disabled={isProcessing}
        className="w-full flex items-center justify-center gap-3 bg-black hover:bg-zinc-900 text-white font-medium py-4 px-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 border border-zinc-700 active:scale-[0.99] disabled:opacity-50"
      >
        {isProcessing ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Opening Payment Gateway...</span>
          </div>
        ) : (
          <>
            <svg className="h-6 w-auto" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M640 400C640 373.333 635.333 350.667 629.333 330.667H400V469.333H537.333C530.667 501.333 510.667 528 480 546.667V613.333H569.333C622.667 564 640 490.667 640 400Z" fill="#4285F4"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M400 640C466.667 640 522.667 618 569.333 574.667L480 508C458.667 522.667 432 532 400 532C336 532 281.333 490 262 433.333H169.333V502.667C214.667 590.667 301.333 640 400 640Z" fill="#34A853"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M262 366.667C256.667 350.667 254 333.333 254 316C254 298.667 256.667 281.333 262 265.333V196H169.333C150.667 232.667 140 273.333 140 316C140 358.667 150.667 399.333 169.333 436L262 366.667Z" fill="#FBBC05"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M400 100C437.333 100 470.667 113.333 497.333 137.333L572 62.6667C522.667 16 466.667 -7.62939e-06 400 -7.62939e-06C301.333 -7.62939e-06 214.667 49.3333 169.333 137.333L262 206.667C281.333 150 336 100 400 100Z" fill="#EA4335"/>
            </svg>
            <span className="text-base font-bold tracking-wide">Pay ₹{amount.toLocaleString('en-IN')} with Google Pay / UPI</span>
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-400">
        <span className="material-symbols-outlined text-sm text-emerald-400">verified_user</span>
        <span>Secured by Razorpay • GPay, PhonePe, Paytm, Cards</span>
      </div>
    </div>
  );
}
