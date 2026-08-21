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
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

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

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/20 p-6 md:p-8 animate-modal my-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6">
              <span className="font-mono text-xs font-bold text-secondary uppercase tracking-widest bg-secondary-container/60 px-3 py-1 rounded-full">
                Get In Touch
              </span>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl text-primary mt-2">
                Contact Diileep Kumar (DK)
              </h3>
              <p className="font-body text-sm text-on-surface-variant mt-1">
                Have a question about executive career mentorship? Reach out directly.
              </p>
            </div>

            {/* Direct Contact Info Box */}
            <div className="mb-6 p-4 rounded-2xl bg-secondary-container/40 border border-secondary/20 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-on-secondary-container">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">call</span>
                  <span>Direct Phone:</span>
                </span>
                <a href="tel:+917907206239" className="text-secondary hover:underline font-extrabold">
                  +91 7907206239
                </a>
              </div>

              <div className="flex items-center justify-between text-xs font-mono font-bold text-on-secondary-container pt-1 border-t border-secondary/10">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base">link</span>
                  <span>LinkedIn:</span>
                </span>
                <a
                  href="https://www.linkedin.com/in/dileepsathyan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:underline font-extrabold flex items-center gap-0.5"
                >
                  <span>dileepsathyan</span>
                  <span className="material-symbols-outlined text-[10px]">open_in_new</span>
                </a>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3.5 rounded-xl bg-error-container text-on-error-container text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-base">error</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                  Email Address
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
                  Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Executive Mentorship Program Inquiry"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                  Message
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share a brief note about your current career stage and goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 text-sm font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-secondary text-on-primary font-bold py-3.5 px-6 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message to DK</span>
                    <span className="material-symbols-outlined text-base">send</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-3xl">mark_email_read</span>
            </div>
            <h3 className="font-display font-extrabold text-2xl text-primary">Message Sent Successfully!</h3>
            <p className="font-body text-sm text-on-surface-variant max-w-sm mx-auto">
              Thank you for reaching out, <span className="font-bold text-primary">{formData.name}</span>. Diileep Kumar (DK) will review your note and respond shortly.
            </p>
            <button
              onClick={onClose}
              className="bg-primary text-white font-bold px-8 py-3 rounded-full hover:bg-secondary transition-colors text-sm"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
