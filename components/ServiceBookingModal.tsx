'use client';

import React, { useState } from 'react';
import { ServiceItem } from './ServicesBento';
import GPayButton from './GPayButton';

interface ServiceBookingModalProps {
  isOpen: boolean;
  service: ServiceItem | null;
  onClose: () => void;
  onSuccess: (confirmationDetails: any) => void;
}

export default function ServiceBookingModal({
  isOpen,
  service,
  onClose,
  onSuccess,
}: ServiceBookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentRole: '',
    linkedinUrl: '',
    notes: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  if (!isOpen || !service) return null;

  const handleInputChange = (field: string, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    setIsFormValid(Boolean(updated.name.trim() && updated.email.trim() && updated.email.includes('@')));
  };

  const handleGPayPaymentSuccess = async (paymentDetails: {
    transactionId: string;
    paymentToken: string;
    amount: number;
  }) => {
    try {
      setErrorMessage('');

      const response = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          currentRole: formData.currentRole,
          linkedinUrl: formData.linkedinUrl,
          serviceTitle: service.title,
          priceAmount: service.price,
          notes: formData.notes,
          paymentToken: paymentDetails.paymentToken,
          transactionId: paymentDetails.transactionId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to record service application.');
      }

      onSuccess({
        application: data.application,
        transactionId: data.transactionId,
        serviceTitle: service.title,
        amount: service.price,
        menteeName: formData.name,
        menteeEmail: formData.email,
      });

      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Error processing service registration.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/20 p-6 md:p-8 animate-modal my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-outline-variant/15 pb-4 mb-6">
          <div>
            <span className="font-mono text-[11px] font-bold text-secondary uppercase tracking-widest bg-secondary-container/60 px-2.5 py-1 rounded">
              Secure Checkout • Google Pay
            </span>
            <h3 className="font-display font-extrabold text-2xl text-primary mt-1">
              {service.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Pricing Summary Box */}
        <div className="mb-6 p-4 rounded-2xl bg-secondary-container/30 border border-secondary/20 flex items-center justify-between">
          <div>
            <p className="font-body text-xs text-on-secondary-container font-semibold uppercase">Selected Service</p>
            <p className="font-display font-bold text-lg text-primary">{service.title}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-xs text-on-surface-variant">Investment</p>
            <p className="font-display font-black text-2xl text-secondary">
              ₹{service.price.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3.5 rounded-xl bg-error-container text-on-error-container text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Mentee Contact Details */}
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ananya Roy"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="ananya@company.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                Current Role / Target Role
              </label>
              <input
                type="text"
                placeholder="e.g. Lead Engineer / VP Engineering"
                value={formData.currentRole}
                onChange={(e) => handleInputChange('currentRole', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              placeholder="https://linkedin.com/in/yourprofile"
              value={formData.linkedinUrl}
              onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm font-medium"
            />
          </div>
        </div>

        {/* GPay Button Container */}
        <div className="pt-2 border-t border-outline-variant/15">
          {!isFormValid ? (
            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs text-center font-medium">
              Please enter your Name and a valid Email Address to enable Google Pay checkout.
            </div>
          ) : (
            <GPayButton
              amount={service.price}
              serviceTitle={service.title}
              userEmail={formData.email}
              userName={formData.name}
              onPaymentSuccess={handleGPayPaymentSuccess}
              onPaymentError={(err) => setErrorMessage(err)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
