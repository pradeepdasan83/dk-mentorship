'use client';

import React from 'react';
import Image from 'next/image';

interface HeroProps {
  onOpenDiscoveryModal: () => void;
  onScrollToServices: () => void;
}

export default function Hero({ onOpenDiscoveryModal, onScrollToServices }: HeroProps) {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center mentor-bg overflow-hidden pt-20">
      {/* Dynamic Glowing Ambient Blobs */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-secondary-fixed rounded-full blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-tertiary-fixed-dim rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative max-w-container-max mx-auto px-4 md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-stack-lg items-center py-12 lg:py-stack-lg">
        {/* Left Column Content */}
        <div className="lg:col-span-7 space-y-6 md:space-y-stack-md z-10">
          <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-secondary-container/90 backdrop-blur-md text-on-secondary-container font-mono text-xs font-bold tracking-widest uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            AUTHORITATIVE • DYNAMIC • PREMIUM
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-on-primary leading-[1.15] tracking-tight">
            Transform Your <span className="text-tertiary-fixed underline decoration-tertiary-fixed/30 underline-offset-8">Professional Identity</span> With Strategic Mentorship.
          </h1>

          <p className="font-body text-base md:text-lg text-on-primary-container max-w-xl leading-relaxed">
            Empowering high-level professionals to command authority and achieve energetic prestige in their careers through curated LinkedIn strategies, executive positioning, and 1:1 wisdom sessions.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onOpenDiscoveryModal}
              className="bg-tertiary-fixed text-on-tertiary-fixed px-8 py-4 rounded-full font-display font-bold text-base md:text-lg hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-2 group"
            >
              <span>Start Your Journey</span>
              <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>

            <button
              onClick={onScrollToServices}
              className="glass-card text-on-primary px-8 py-4 rounded-full font-display font-bold text-base md:text-lg flex items-center gap-2 hover:bg-white/10 transition-all border border-white/20"
            >
              <span>View Programs</span>
              <span className="material-symbols-outlined text-xl">expand_more</span>
            </button>
          </div>

          <div className="flex items-center gap-6 pt-4 text-xs font-mono text-on-primary-container/80 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-emerald-400 text-sm">verified</span>
              <span>100% Confidential 1:1</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-tertiary-fixed text-sm">stars</span>
              <span>Top-Tier Career Results</span>
            </div>
          </div>
        </div>

        {/* Right Column Mentor Portrait */}
        <div id="about" className="lg:col-span-5 flex justify-center z-10 mt-8 lg:mt-0">
          <div className="relative w-full max-w-md aspect-[4/5] glass-card rounded-[2rem] p-3 md:p-4 shadow-2xl rotate-2 hover:rotate-0 transition-all duration-700 overflow-hidden group border border-white/20">
            <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida/AP1WRLv39MngB3vq533uO2okUmuM0bGY9vC77Z2YYFJbEH2eM2AsSiEgvH00u9MScf-z3A_7W4HMnF1gZx-GtddmEgEcMY3apFqd5HKCIFr0gzkX63r0tH9IY2BuAZwFgw9roqqb9CXIHMTJd3iGdQwhrvjSGDARHGGtsPyeh8znHqRawq-WvRk3YoV5pcjjln_69cFQd1WEIJBIvNTpjXMTDG8pTn0qb4cDCI1W3fMpvb1wLPIeKC-15Tohq0g"
                alt="Diileep Kumar Sathyadasan - Strategic Career Mentor"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            <div className="absolute bottom-6 left-6 right-6 glass-card p-5 rounded-2xl border-l-4 border-tertiary-fixed shadow-xl backdrop-blur-xl">
              <p className="text-on-primary font-display font-bold text-lg md:text-xl">Diileep Kumar Sathyadasan</p>
              <p className="text-tertiary-fixed font-body text-xs md:text-sm font-medium">Strategic Executive Career Mentor</p>
              <div className="flex items-center gap-2 mt-2 text-[11px] font-mono text-white/80">
                <span className="px-2 py-0.5 rounded bg-white/10">15+ Yrs Exp</span>
                <span className="px-2 py-0.5 rounded bg-white/10">500+ Mentees</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
