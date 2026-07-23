'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminGuard from '@/components/AdminGuard';

function CMSContent() {
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

    service1Title: 'LinkedIn Profile Building',
    service1Price: 4999,
    service1Unit: '/profile',
    service1Desc: 'Complete overhaul of your digital executive presence. SEO optimization, headline crafting, and high-impact About section that converts recruiters.',
    service1Badge: 'POPULAR CHOICE',

    service2Title: '1:1 Executive Mentorship',
    service2Price: 2499,
    service2Unit: '/60 mins',
    service2Desc: 'Direct 1-on-1 strategic access for executive career pivoting, salary negotiation strategies, and leadership transition.',
    service2Badge: 'HIGH IMPACT',

    service3Title: 'ATS Resume Design',
    service3Price: 2999,
    service3Unit: '/resume',
    service3Desc: 'ATS-optimized executive resumes engineered to pass mechanical filters and compel hiring directors.',

    service4Title: 'Corporate Mock Interviews',
    service4Price: 1999,
    service4Unit: '/mock session',
    service4Desc: 'Prepare for high-stakes C-suite and Senior Leadership roles with realistic pressure, roleplay, and actionable feedback.',

    approachTitle: 'The DKS Advantage',
    approachSub: 'A bespoke mentoring system developed over 15+ years of guiding senior professionals to unprecedented career breakthroughs.',
    approachImgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAjNmGdKN1BApB5BFlDQ7MRmc_c8K_NOq4eyFbVVxaD08iYsv6agypIMfdiTCnMrdxfFfb2-Uqm8LlUfSdwit254SzTGyXe_hDzEV5i9fj_SkjsYiRAbkUx5fxJKv-0wqfhS8EWy-n_jhBQY9KXT9yTx7d4Bfz3iyN5hadYGOH_wkQGMiJ3FbeB0N93TwBXTB9HLdRHJBJJjwFfHE703wAkCpbuYt8sNGPIF9IF4SdIuN3cgiZFp4t',
    adv1Title: 'Authority First',
    adv1Desc: "We don't just build profiles; we build executive authorities. Your digital presence will command respect before you even enter the room.",
    adv2Title: 'Growth Rhythm',
    adv2Desc: 'Implementing an 8px baseline rhythm to your career growth—mathematically harmonious and strategically sound for maximum ROI.',
    adv3Title: 'Tonal Layering',
    adv3Desc: 'Layering soft skills with technical prowess to create a sophisticated, multifaceted professional personality.',

    ctaTitle: 'Ready to Elevate Your Career Trajectory?',
    ctaSub: 'Join 500+ high-achieving professionals who have redefined their authority. Stop waiting for opportunities—start creating them today.',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState<'hero' | 'stats' | 'services' | 'advantage' | 'cta'>('hero');

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

      setStatusMessage({ type: 'success', text: 'All site content & service pricing updated live in Supabase PostgreSQL!' });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Error updating content' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/15 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded font-bold uppercase">
                Complete Site CMS Manager
              </span>
            </div>
            <h1 className="font-display font-extrabold text-2xl md:text-3xl text-primary mt-1">
              Website Copy, Images & Pricing Manager
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

        {/* Section Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-outline-variant/20 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('hero')}
            className={`px-5 py-2.5 rounded-full font-display font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'hero' ? 'bg-primary text-white shadow' : 'bg-surface-container-lowest text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-base">title</span>
            <span>Hero & Mentor Profile</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('services')}
            className={`px-5 py-2.5 rounded-full font-display font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'services' ? 'bg-primary text-white shadow' : 'bg-surface-container-lowest text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-base">payments</span>
            <span>Services & Pricing (GPay)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('stats')}
            className={`px-5 py-2.5 rounded-full font-display font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'stats' ? 'bg-primary text-white shadow' : 'bg-surface-container-lowest text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-base">analytics</span>
            <span>Stats & Metrics</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('advantage')}
            className={`px-5 py-2.5 rounded-full font-display font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'advantage' ? 'bg-primary text-white shadow' : 'bg-surface-container-lowest text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-base">workspace_premium</span>
            <span>Advantage Framework</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cta')}
            className={`px-5 py-2.5 rounded-full font-display font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'cta' ? 'bg-primary text-white shadow' : 'bg-surface-container-lowest text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-base">campaign</span>
            <span>CTA Banner</span>
          </button>
        </div>

        {loading ? (
          <div className="py-16 text-center text-on-surface-variant font-mono">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p>Loading CMS content...</p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            {/* TAB 1: HERO & MENTOR PROFILE */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/15 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 border-b border-outline-variant/10 pb-3">
                    <span className="material-symbols-outlined text-secondary text-2xl">account_circle</span>
                    <h3 className="font-display font-bold text-xl text-primary">Mentor Profile & Photo</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">Mentor Name</label>
                      <input
                        type="text"
                        required
                        value={formData.mentorName}
                        onChange={(e) => setFormData({ ...formData, mentorName: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">Mentor Designation / Role</label>
                      <input
                        type="text"
                        required
                        value={formData.mentorRole}
                        onChange={(e) => setFormData({ ...formData, mentorRole: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">Mentor Photo Image URL</label>
                    <input
                      type="url"
                      required
                      value={formData.mentorImageUrl}
                      onChange={(e) => setFormData({ ...formData, mentorImageUrl: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-xs font-mono"
                    />
                  </div>

                  {formData.mentorImageUrl && (
                    <div className="flex items-center gap-4 pt-2">
                      <div className="w-20 h-24 rounded-xl overflow-hidden border border-outline-variant/30 shrink-0">
                        <img src={formData.mentorImageUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-xs text-on-surface-variant">
                        <p className="font-bold text-primary">Live Photo Preview</p>
                        <p>This photo renders on the home page hero section.</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/15 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 border-b border-outline-variant/10 pb-3">
                    <span className="material-symbols-outlined text-secondary text-2xl">title</span>
                    <h3 className="font-display font-bold text-xl text-primary">Hero Banner Copy</h3>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">Tagline / Authority Pill</label>
                    <input
                      type="text"
                      required
                      value={formData.heroTag}
                      onChange={(e) => setFormData({ ...formData, heroTag: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">Main Hero Headline</label>
                    <textarea
                      rows={2}
                      required
                      value={formData.heroTitle}
                      onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-sm font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">Hero Subtitle / Description</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.heroSubtext}
                      onChange={(e) => setFormData({ ...formData, heroSubtext: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-sm font-medium"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SERVICES & PRICING */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                {/* Service 1 */}
                <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/15 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-outline-variant/10 pb-3">
                    <h3 className="font-display font-bold text-xl text-primary">Service 1: LinkedIn Profile Building</h3>
                    <span className="font-mono text-xs bg-secondary-container px-2.5 py-1 rounded font-bold">Col 8 Bento</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">Service Title</label>
                      <input
                        type="text"
                        required
                        value={formData.service1Title}
                        onChange={(e) => setFormData({ ...formData, service1Title: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Price (₹ INR)</label>
                      <input
                        type="number"
                        required
                        value={formData.service1Price}
                        onChange={(e) => setFormData({ ...formData, service1Price: Number(e.target.value) })}
                        className="w-full px-4 py-2.5 rounded-xl border border-emerald-400 bg-surface text-sm font-bold text-emerald-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">Pricing Unit</label>
                      <input
                        type="text"
                        value={formData.service1Unit}
                        onChange={(e) => setFormData({ ...formData, service1Unit: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">Badge Tag</label>
                      <input
                        type="text"
                        value={formData.service1Badge}
                        onChange={(e) => setFormData({ ...formData, service1Badge: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={formData.service1Desc}
                      onChange={(e) => setFormData({ ...formData, service1Desc: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Service 2 */}
                <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/15 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-outline-variant/10 pb-3">
                    <h3 className="font-display font-bold text-xl text-primary">Service 2: 1:1 Mentorship</h3>
                    <span className="font-mono text-xs bg-secondary-container px-2.5 py-1 rounded font-bold">Col 4 Bento</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">Service Title</label>
                      <input
                        type="text"
                        required
                        value={formData.service2Title}
                        onChange={(e) => setFormData({ ...formData, service2Title: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Price (₹ INR)</label>
                      <input
                        type="number"
                        required
                        value={formData.service2Price}
                        onChange={(e) => setFormData({ ...formData, service2Price: Number(e.target.value) })}
                        className="w-full px-4 py-2.5 rounded-xl border border-emerald-400 bg-surface text-sm font-bold text-emerald-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">Pricing Unit</label>
                      <input
                        type="text"
                        value={formData.service2Unit}
                        onChange={(e) => setFormData({ ...formData, service2Unit: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">Badge Tag</label>
                      <input
                        type="text"
                        value={formData.service2Badge}
                        onChange={(e) => setFormData({ ...formData, service2Badge: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={formData.service2Desc}
                      onChange={(e) => setFormData({ ...formData, service2Desc: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Service 3 */}
                <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/15 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-outline-variant/10 pb-3">
                    <h3 className="font-display font-bold text-xl text-primary">Service 3: ATS Resume Design</h3>
                    <span className="font-mono text-xs bg-secondary-container px-2.5 py-1 rounded font-bold">Col 4 Bento</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">Service Title</label>
                      <input
                        type="text"
                        required
                        value={formData.service3Title}
                        onChange={(e) => setFormData({ ...formData, service3Title: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Price (₹ INR)</label>
                      <input
                        type="number"
                        required
                        value={formData.service3Price}
                        onChange={(e) => setFormData({ ...formData, service3Price: Number(e.target.value) })}
                        className="w-full px-4 py-2.5 rounded-xl border border-emerald-400 bg-surface text-sm font-bold text-emerald-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={formData.service3Desc}
                      onChange={(e) => setFormData({ ...formData, service3Desc: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Service 4 */}
                <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/15 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-outline-variant/10 pb-3">
                    <h3 className="font-display font-bold text-xl text-primary">Service 4: Corporate Mock Interviews</h3>
                    <span className="font-mono text-xs bg-secondary-container px-2.5 py-1 rounded font-bold">Col 8 Bento</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">Service Title</label>
                      <input
                        type="text"
                        required
                        value={formData.service4Title}
                        onChange={(e) => setFormData({ ...formData, service4Title: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Price (₹ INR)</label>
                      <input
                        type="number"
                        required
                        value={formData.service4Price}
                        onChange={(e) => setFormData({ ...formData, service4Price: Number(e.target.value) })}
                        className="w-full px-4 py-2.5 rounded-xl border border-emerald-400 bg-surface text-sm font-bold text-emerald-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={formData.service4Desc}
                      onChange={(e) => setFormData({ ...formData, service4Desc: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-sm font-medium"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: STATS */}
            {activeTab === 'stats' && (
              <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/15 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-outline-variant/10 pb-3">
                  <span className="material-symbols-outlined text-secondary text-2xl">analytics</span>
                  <h3 className="font-display font-bold text-xl text-primary">Key Achievement Metrics</h3>
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
            )}

            {/* TAB 4: ADVANTAGE FRAMEWORK */}
            {activeTab === 'advantage' && (
              <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/15 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-outline-variant/10 pb-3">
                  <span className="material-symbols-outlined text-secondary text-2xl">workspace_premium</span>
                  <h3 className="font-display font-bold text-xl text-primary">DKS Advantage & Methodology</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">Section Title</label>
                    <input
                      type="text"
                      value={formData.approachTitle}
                      onChange={(e) => setFormData({ ...formData, approachTitle: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">Workspace Image URL</label>
                    <input
                      type="url"
                      value={formData.approachImgUrl}
                      onChange={(e) => setFormData({ ...formData, approachImgUrl: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">Subtitle / Framework Intro</label>
                  <textarea
                    rows={2}
                    value={formData.approachSub}
                    onChange={(e) => setFormData({ ...formData, approachSub: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-sm font-medium"
                  />
                </div>

                <div className="space-y-4 pt-2 border-t border-outline-variant/10">
                  <p className="font-bold text-sm text-primary">Pillars of Advantage</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-surface rounded-2xl border">
                    <div>
                      <label className="block text-xs font-bold uppercase mb-1">Pillar 1 Title</label>
                      <input
                        type="text"
                        value={formData.adv1Title}
                        onChange={(e) => setFormData({ ...formData, adv1Title: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border text-sm font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase mb-1">Pillar 1 Description</label>
                      <textarea
                        rows={2}
                        value={formData.adv1Desc}
                        onChange={(e) => setFormData({ ...formData, adv1Desc: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-surface rounded-2xl border">
                    <div>
                      <label className="block text-xs font-bold uppercase mb-1">Pillar 2 Title</label>
                      <input
                        type="text"
                        value={formData.adv2Title}
                        onChange={(e) => setFormData({ ...formData, adv2Title: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border text-sm font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase mb-1">Pillar 2 Description</label>
                      <textarea
                        rows={2}
                        value={formData.adv2Desc}
                        onChange={(e) => setFormData({ ...formData, adv2Desc: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-surface rounded-2xl border">
                    <div>
                      <label className="block text-xs font-bold uppercase mb-1">Pillar 3 Title</label>
                      <input
                        type="text"
                        value={formData.adv3Title}
                        onChange={(e) => setFormData({ ...formData, adv3Title: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border text-sm font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase mb-1">Pillar 3 Description</label>
                      <textarea
                        rows={2}
                        value={formData.adv3Desc}
                        onChange={(e) => setFormData({ ...formData, adv3Desc: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: CTA BANNER */}
            {activeTab === 'cta' && (
              <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl border border-outline-variant/15 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-outline-variant/10 pb-3">
                  <span className="material-symbols-outlined text-secondary text-2xl">campaign</span>
                  <h3 className="font-display font-bold text-xl text-primary">Call to Action Banner</h3>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">CTA Headline</label>
                  <input
                    type="text"
                    value={formData.ctaTitle}
                    onChange={(e) => setFormData({ ...formData, ctaTitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1">CTA Description</label>
                  <textarea
                    rows={3}
                    value={formData.ctaSub}
                    onChange={(e) => setFormData({ ...formData, ctaSub: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-sm font-medium"
                  />
                </div>
              </div>
            )}

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

export default function CMSAdminPage() {
  return (
    <AdminGuard>
      <CMSContent />
    </AdminGuard>
  );
}
