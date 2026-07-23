'use client';

import React, { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Executive Mentorship Inquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to send message.');
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2500);
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/20 p-6 md:p-8 animate-modal my-8">
        <div className="flex items-center justify-between border-b border-outline-variant/15 pb-4 mb-6">
          <div>
            <span className="font-mono text-[11px] font-bold text-secondary uppercase tracking-widest bg-secondary-container/50 px-2.5 py-1 rounded">
              Direct Communication
            </span>
            <h3 className="font-display font-extrabold text-2xl text-primary mt-1">
              Contact Diileep Kumar S.
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>
            <h4 className="font-display font-bold text-xl text-primary">Message Sent Successfully!</h4>
            <p className="font-body text-sm text-on-surface-variant max-w-xs mx-auto">
              Thank you for reaching out. Diileep or our executive desk will respond within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-error-container text-on-error-container text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-base">error</span>
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Vikram Verma"
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
                placeholder="vikram@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                Subject *
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                Message / Inquiry *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Describe your query or custom mentoring requirement..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-secondary text-on-primary font-bold py-3.5 px-6 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <span className="material-symbols-outlined text-lg">send</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
