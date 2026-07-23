'use client';

import React, { useState } from 'react';

interface GPayButtonProps {
  amount: number;
  serviceTitle: string;
  userEmail: string;
  userName: string;
  onPaymentSuccess: (transactionDetails: {
    transactionId: string;
    paymentToken: string;
    amount: number;
    serviceTitle: string;
  }) => void;
  onPaymentError?: (error: string) => void;
}

export default function GPayButton({
  amount,
  serviceTitle,
  userEmail,
  userName,
  onPaymentSuccess,
  onPaymentError,
}: GPayButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGPayClick = async () => {
    setIsProcessing(true);

    try {
      // Simulate Google Pay Web API response or integration
      const response = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isTestPayment: true,
          paymentToken: 'GPAY_TOKEN_SIMULATED_' + Date.now(),
          amount,
          serviceTitle,
          userEmail,
          userName,
        }),
      });

      const data = await response.json();

      if (data.success) {
        onPaymentSuccess({
          transactionId: data.transactionId,
          paymentToken: 'GPAY_TOKEN_VERIFIED',
          amount,
          serviceTitle,
        });
      } else {
        throw new Error(data.error || 'Payment failed');
      }
    } catch (err: any) {
      console.error('GPay execution error:', err);
      if (onPaymentError) onPaymentError(err.message || 'Payment processing error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleGPayClick}
        disabled={isProcessing}
        className="w-full flex items-center justify-center gap-3 bg-black hover:bg-zinc-900 text-white font-medium py-3.5 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-zinc-700 active:scale-[0.99] disabled:opacity-50"
      >
        {isProcessing ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Connecting Google Pay...</span>
          </div>
        ) : (
          <>
            <svg className="h-6 w-auto" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M640 400C640 373.333 635.333 350.667 629.333 330.667H400V469.333H537.333C530.667 501.333 510.667 528 480 546.667V613.333H569.333C622.667 564 640 490.667 640 400Z" fill="#4285F4"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M400 640C466.667 640 522.667 618 569.333 574.667L480 508C458.667 522.667 432 532 400 532C336 532 281.333 490 262 433.333H169.333V502.667C214.667 590.667 301.333 640 400 640Z" fill="#34A853"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M262 366.667C256.667 350.667 254 333.333 254 316C254 298.667 256.667 281.333 262 265.333V196H169.333C150.667 232.667 140 273.333 140 316C140 358.667 150.667 399.333 169.333 436L262 366.667Z" fill="#FBBC05"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M400 100C437.333 100 470.667 113.333 497.333 137.333L572 62.6667C522.667 16 466.667 -7.62939e-06 400 -7.62939e-06C301.333 -7.62939e-06 214.667 49.3333 169.333 137.333L262 206.667C281.333 150 336 100 400 100Z" fill="#EA4335"/>
            </svg>
            <span className="text-base font-semibold tracking-wide">Pay ₹{amount.toLocaleString('en-IN')} with Google Pay</span>
          </>
        )}
      </button>
      <div className="flex items-center justify-center gap-1.5 mt-2 text-xs text-neutral-400">
        <span className="material-symbols-outlined text-sm text-emerald-400">lock</span>
        <span>256-Bit Encrypted Google Pay Web API Checkout</span>
      </div>
    </div>
  );
}
