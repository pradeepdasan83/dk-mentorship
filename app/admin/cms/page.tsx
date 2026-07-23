'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CMSAdminPage() {
  const [formData, setFormData] = useState({
    heroTag: 'AUTHORITATIVE • DYNAMIC • PREMIUM',
    heroTitle: 'Transform Your Professional Identity With Strategic Mentorship.',
    heroSubtext: 'Empowering high-level professionals to command authority and achieve energetic prestige in their careers through curated LinkedIn strategies and 1:1 wisdom sessions.',
    mentorName: 'Diileep Kumar Sathyadasan',
    mentorRole: 'Strategic Executive Career Mentor',
    mentorImageUrl: 'https://lh3.googleusercontent.com/aida/AP1WRLv39MngB3vq533uO2okUmuM0bGY9vC77Z2YYFJbEH2eM2AsSiEgvH00u9MScf-z3A_7W4HMnF1gZx-GtddmEgEcMY3apFqd5HKCIFr0gzkX63r0tH9IY2BuAZwFgw9roqqb9CXIHMTJd3iGdQwhrvjSGDARHGGtsPyeh8znHqRawq-WvRk3YoV5pcjjln_69cFQd1WEIJBIvNTpjXMTDG8pTn0qb4cDCI1W3fMpvb1wLPIeKC-15Tohq0g',
    stat1Value: '500+',
    stat1Label: 'MENTEES GUIDED',
    stat2Value: '₹15Cr+',
    stat2Label: 'SALARY HIKES SECURED',
    stat3Value: '100+',
    stat3Label: 'LINKEDIN OPTIMIZATIONS',
    stat4Value: '15+',
    stat4Label: 'YEARS EXPERIENCE',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      if (data.success && data.content) {
        setFormData((prev) => ({ ...prev, ...data.content }));
      }
    } catch (err: any) {
      console.error('Failed to fetch CMS content:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage({ type: '', text: '' });

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save content');
      }

      setStatusMessage({ type: 'success', text: 'Website content & image URLs updated live in PostgreSQL!' });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Error updating content' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-low text-on-surface p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/15 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded font-bold uppercase">
                Content Management System (CMS)
              </span>
            </div>
            <h1 className="font-display font-extrabold text-2xl md:text-3xl text-primary mt-1">
              Website Content & Image Manager
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/bookings"
              className="bg-surface-container-high hover:bg-surface-variant text-on-surface px-4 py-2 rounded-full font-bold text-xs font-mono transition-all"
            >
              DB Submissions
            </Link>
            <Link
              href="/"
              className="bg-primary hover:bg-secondary text-white px-5 py-2 rounded-full font-bold text-xs transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">visibility</span>
              <span>View Site</span>
            </Link>
          </div>
        </div>

        {statusMessage.text && (
          <div
            className={`p-4 rounded-2xl text-sm font-medium flex items-center gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-error-container text-on-error-container border border-red-300'
            }`}
          >
            <span className="material-symbols-outlined text-lg">
              {statusMessage.type === 'success' ? 'check_circle' : 'error'}
            </span>
            <span>{statusMessage.text}</span>
          </div>
        )}

        {loading ? (
          <div className="py-16 text-center text-on-surface-variant font-mono">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p>Loading CMS content...</p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            {/* 1. Mentor Profile & Image Section */}
            <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/15 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-outline-variant/10 pb-3">
                <span className="material-symbols-outlined text-secondary text-2xl">account_circle</span>
                <h3 className="font-display font-bold text-xl text-primary">Mentor Profile & Photo</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                    Mentor Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.mentorName}
                    onChange={(e) => setFormData({ ...formData, mentorName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-secondary text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                    Mentor Designation / Role
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.mentorRole}
                    onChange={(e) => setFormData({ ...formData, mentorRole: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-secondary text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                  Mentor Photo Image URL
                </label>
                <input
                  type="url"
                  required
                  value={formData.mentorImageUrl}
                  onChange={(e) => setFormData({ ...formData, mentorImageUrl: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-secondary text-sm font-mono text-xs"
                />
              </div>

              {/* Image Live Preview */}
              {formData.mentorImageUrl && (
                <div className="flex items-center gap-4 pt-2">
                  <div className="w-20 h-24 rounded-xl overflow-hidden border border-outline-variant/30 shrink-0">
                    <img src={formData.mentorImageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-xs text-on-surface-variant">
                    <p className="font-bold text-primary">Live Photo Preview</p>
                    <p>This image will display on the home page hero section.</p>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Hero Section Copy */}
            <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/15 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-outline-variant/10 pb-3">
                <span className="material-symbols-outlined text-secondary text-2xl">title</span>
                <h3 className="font-display font-bold text-xl text-primary">Hero Banner Content</h3>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                  Tagline / Authority Pill
                </label>
                <input
                  type="text"
                  required
                  value={formData.heroTag}
                  onChange={(e) => setFormData({ ...formData, heroTag: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-secondary text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                  Main Hero Headline
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.heroTitle}
                  onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-secondary text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">
                  Hero Subtitle / Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.heroSubtext}
                  onChange={(e) => setFormData({ ...formData, heroSubtext: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface focus:outline-none focus:border-secondary text-sm font-medium"
                />
              </div>
            </div>

            {/* 3. Key Achievement Stats */}
            <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/15 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-outline-variant/10 pb-3">
                <span className="material-symbols-outlined text-secondary text-2xl">analytics</span>
                <h3 className="font-display font-bold text-xl text-primary">Key Performance Metrics</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-surface rounded-xl border">
                  <label className="block text-[11px] font-bold text-on-surface uppercase mb-1">Stat 1</label>
                  <input
                    type="text"
                    value={formData.stat1Value}
                    onChange={(e) => setFormData({ ...formData, stat1Value: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border text-sm font-bold mb-2"
                  />
                  <input
                    type="text"
                    value={formData.stat1Label}
                    onChange={(e) => setFormData({ ...formData, stat1Label: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border text-xs font-mono"
                  />
                </div>

                <div className="p-3 bg-surface rounded-xl border">
                  <label className="block text-[11px] font-bold text-on-surface uppercase mb-1">Stat 2</label>
                  <input
                    type="text"
                    value={formData.stat2Value}
                    onChange={(e) => setFormData({ ...formData, stat2Value: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border text-sm font-bold mb-2"
                  />
                  <input
                    type="text"
                    value={formData.stat2Label}
                    onChange={(e) => setFormData({ ...formData, stat2Label: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border text-xs font-mono"
                  />
                </div>

                <div className="p-3 bg-surface rounded-xl border">
                  <label className="block text-[11px] font-bold text-on-surface uppercase mb-1">Stat 3</label>
                  <input
                    type="text"
                    value={formData.stat3Value}
                    onChange={(e) => setFormData({ ...formData, stat3Value: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border text-sm font-bold mb-2"
                  />
                  <input
                    type="text"
                    value={formData.stat3Label}
                    onChange={(e) => setFormData({ ...formData, stat3Label: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border text-xs font-mono"
                  />
                </div>

                <div className="p-3 bg-surface rounded-xl border">
                  <label className="block text-[11px] font-bold text-on-surface uppercase mb-1">Stat 4</label>
                  <input
                    type="text"
                    value={formData.stat4Value}
                    onChange={(e) => setFormData({ ...formData, stat4Value: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border text-sm font-bold mb-2"
                  />
                  <input
                    type="text"
                    value={formData.stat4Label}
                    onChange={(e) => setFormData({ ...formData, stat4Label: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-primary hover:bg-secondary text-white font-bold py-4 px-8 rounded-full shadow-xl transition-all flex items-center justify-center gap-2 text-base disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving to Database...</span>
                  </>
                ) : (
                  <>
                    <span>Save & Publish Live Changes</span>
                    <span className="material-symbols-outlined text-xl">save</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
