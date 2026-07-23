'use client';

import React from 'react';

export default function Stats() {
  const stats = [
    { value: '500+', label: 'MENTEES GUIDED', highlight: 'text-primary' },
    { value: '₹15Cr+', label: 'SALARY HIKES SECURED', highlight: 'text-secondary font-extrabold' },
    { value: '100+', label: 'LINKEDIN OPTIMIZATIONS', highlight: 'text-primary' },
    { value: '15+', label: 'YEARS EXPERIENCE', highlight: 'text-secondary font-extrabold' },
  ];

  return (
    <section className="bg-surface py-8 md:py-stack-md relative z-20 -mt-10">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-gutter p-6 md:p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/15 shadow-xl hover:shadow-2xl transition-all duration-300">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center p-3 rounded-2xl hover:bg-surface-container-low transition-colors">
              <p className={`font-display font-black text-3xl md:text-4xl lg:text-5xl ${stat.highlight} tracking-tight`}>
                {stat.value}
              </p>
              <p className="font-mono text-[11px] md:text-xs font-semibold tracking-wider text-on-surface-variant mt-2 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
