'use client';

import React, { useEffect, useState } from 'react';

export default function Stats() {
  const [statsData, setStatsData] = useState({
    stat1Value: '500+',
    stat1Label: 'MENTEES GUIDED',
    stat2Value: '₹15Cr+',
    stat2Label: 'SALARY HIKES SECURED',
    stat3Value: '100+',
    stat3Label: 'LINKEDIN OPTIMIZATIONS',
    stat4Value: '15+',
    stat4Label: 'YEARS EXPERIENCE',
  });

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.content) {
          setStatsData((prev) => ({ ...prev, ...data.content }));
        }
      })
      .catch(() => {});
  }, []);

  const stats = [
    { value: statsData.stat1Value, label: statsData.stat1Label, highlight: 'text-primary' },
    { value: statsData.stat2Value, label: statsData.stat2Label, highlight: 'text-secondary font-extrabold' },
    { value: statsData.stat3Value, label: statsData.stat3Label, highlight: 'text-primary' },
    { value: statsData.stat4Value, label: statsData.stat4Label, highlight: 'text-secondary font-extrabold' },
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
