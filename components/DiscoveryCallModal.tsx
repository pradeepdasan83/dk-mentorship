'use client';

import React, { useState } from 'react';

interface DiscoveryCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (bookingDetails: any) => void;
}

export default function DiscoveryCallModal({ isOpen, onClose, onSuccess }: DiscoveryCallModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    currentRole: '',
    preferredDate: '',
    preferredTime: '10:00 AM',
    goals: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          type: 'DISCOVERY_CALL',
          serviceName: '1:1 Strategic Discovery Call',
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit discovery call booking.');
      }

      onSuccess(data.booking);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/20 p-6 md:p-8 animate-modal my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-outline-variant/15 pb-4 mb-6">
          <div>
            <span className="font-mono text-[11px] font-bold text-secondary uppercase tracking-widest bg-secondary-container/50 px-2.5 py-1 rounded">
              Complimentary Executive Consultation
            </span>
            <h3 className="font-display font-extrabold text-2xl text-primary mt-1">
              Book Discovery Call
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3.5 rounded-xl bg-error-container text-on-error-container text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                Phone / WhatsApp
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                Current Role / Designation
              </label>
              <input
                type="text"
                placeholder="e.g. Senior Product Manager"
                value={formData.currentRole}
                onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                Preferred Date *
              </label>
              <input
                type="date"
                required
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                Preferred Slot *
              </label>
              <select
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm font-medium"
              >
                <option value="10:00 AM">10:00 AM - 10:30 AM</option>
                <option value="02:00 PM">02:00 PM - 02:30 PM</option>
                <option value="06:00 PM">06:00 PM - 06:30 PM</option>
                <option value="08:00 PM">08:00 PM - 08:30 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
              Primary Career Objective / Goals
            </label>
            <textarea
              rows={3}
              placeholder="Tell us what you'd like to achieve (e.g., transition to VP Role, profile audit, compensation boost)..."
              value={formData.goals}
              onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm font-medium"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-secondary text-on-primary font-bold py-3.5 px-6 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Reserving Slot...</span>
                </>
              ) : (
                <>
                  <span>Confirm Discovery Session</span>
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
