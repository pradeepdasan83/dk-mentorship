'use client';

import React, { useEffect, useState } from 'react';

interface CTASectionProps {
  onOpenDiscoveryModal: () => void;
  onScrollToServices: () => void;
}

export default function CTASection({ onOpenDiscoveryModal, onScrollToServices }: CTASectionProps) {
  const [data, setData] = useState({
    ctaTitle: 'Ready to Elevate Your Career Trajectory?',
    ctaSub: 'Join 500+ high-achieving professionals who have redefined their authority. Stop waiting for opportunities—start creating them today.',
  });

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.content) {
          setData((prev) => ({ ...prev, ...resData.content }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-16 md:py-stack-lg mentor-bg text-center text-on-primary relative overflow-hidden">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
        <div className="py-12 md:py-stack-lg glass-card rounded-[2.5rem] md:rounded-[3rem] border border-white/20 px-6 relative z-10 shadow-2xl">
          <span className="font-mono text-xs font-bold text-tertiary-fixed tracking-widest uppercase bg-white/10 px-4 py-1.5 rounded-full inline-block mb-4">
            Take The Next Step
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-on-primary mb-4 max-w-3xl mx-auto leading-tight">
            {data.ctaTitle}
          </h2>
          <p className="font-body text-base md:text-lg text-on-primary-container max-w-2xl mx-auto mb-8 opacity-90 leading-relaxed">
            {data.ctaSub}
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={onOpenDiscoveryModal}
              className="w-full sm:w-auto bg-tertiary-fixed text-on-tertiary-fixed px-10 py-4 rounded-full font-display font-bold text-base md:text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center justify-center gap-2"
            >
              <span>Schedule Discovery Call</span>
              <span className="material-symbols-outlined text-xl">calendar_month</span>
            </button>
            <button
              onClick={onScrollToServices}
              className="w-full sm:w-auto border-2 border-white/30 text-white px-10 py-4 rounded-full font-display font-bold text-base md:text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Programs & GPay</span>
              <span className="material-symbols-outlined text-xl">payments</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
