'use client';

import React from 'react';

interface BookingSuccessModalProps {
  isOpen: boolean;
  details: any;
  onClose: () => void;
}

export default function BookingSuccessModal({ isOpen, details, onClose }: BookingSuccessModalProps) {
  if (!isOpen || !details) return null;

  const isPayment = Boolean(details.transactionId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/20 p-6 md:p-8 animate-modal text-center my-8">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
          <span className="material-symbols-outlined text-4xl">verified</span>
        </div>

        <span className="font-mono text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
          {isPayment ? 'Google Pay Authorized • Confirmed' : 'Discovery Call Scheduled'}
        </span>

        <h3 className="font-display font-extrabold text-2xl text-primary mt-2">
          {isPayment ? 'Payment Successful!' : 'Session Reserved!'}
        </h3>

        <p className="font-body text-sm text-on-surface-variant mt-2 leading-relaxed">
          {isPayment
            ? `Thank you ${details.menteeName || ''}! Your Google Pay payment for ${details.serviceTitle || 'mentorship service'} has been verified and registered in PostgreSQL.`
            : `We look forward to connecting with you, ${details.mentee?.name || details.name || ''}! Your discovery call details have been saved.`}
        </p>

        {/* Receipt Box */}
        <div className="my-6 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/15 text-left text-xs font-mono space-y-2">
          {isPayment ? (
            <>
              <div className="flex justify-between border-b border-outline-variant/10 pb-1.5">
                <span className="text-on-surface-variant">Transaction ID:</span>
                <span className="font-bold text-primary">{details.transactionId}</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/10 pb-1.5">
                <span className="text-on-surface-variant">Payment Gateway:</span>
                <span className="font-bold text-secondary">Google Pay (GPay) API</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/10 pb-1.5">
                <span className="text-on-surface-variant">Amount Paid:</span>
                <span className="font-bold text-emerald-600 text-sm">
                  ₹{Number(details.amount || 0).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Mentee Email:</span>
                <span className="font-medium text-primary">{details.menteeEmail}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between border-b border-outline-variant/10 pb-1.5">
                <span className="text-on-surface-variant">Service:</span>
                <span className="font-bold text-primary">{details.serviceName || '1:1 Discovery Call'}</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/10 pb-1.5">
                <span className="text-on-surface-variant">Preferred Date:</span>
                <span className="font-bold text-secondary">{details.preferredDate}</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/10 pb-1.5">
                <span className="text-on-surface-variant">Time Slot:</span>
                <span className="font-bold text-secondary">{details.preferredTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Status:</span>
                <span className="font-bold text-emerald-600">CONFIRMED (DB)</span>
              </div>
            </>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full bg-primary hover:bg-secondary text-on-primary font-bold py-3.5 px-6 rounded-full shadow-md transition-all flex items-center justify-center gap-2"
        >
          <span>Done & Return to Homepage</span>
          <span className="material-symbols-outlined text-lg">home</span>
        </button>
      </div>
    </div>
  );
}
