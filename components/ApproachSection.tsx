'use client';

import React from 'react';

export default function ApproachSection() {
  const features = [
    {
      title: 'Authority First',
      description: "We don't just build profiles; we build executive authorities. Your digital presence will command respect before you even enter the room.",
      icon: 'workspace_premium',
      iconBg: 'bg-secondary text-white',
    },
    {
      title: 'Growth Rhythm',
      description: 'Implementing an 8px baseline rhythm to your career growth—mathematically harmonious and strategically sound for maximum ROI.',
      icon: 'trending_up',
      iconBg: 'bg-primary text-white',
    },
    {
      title: 'Tonal Layering',
      description: 'Layering soft skills with technical prowess to create a sophisticated, multifaceted professional personality.',
      icon: 'groups',
      iconBg: 'bg-tertiary-fixed-dim text-on-tertiary-fixed',
    },
  ];

  return (
    <section id="advantage" className="py-16 md:py-stack-lg bg-surface relative overflow-hidden">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-stack-lg items-center">
        {/* Left Visual Container */}
        <div className="relative">
          <div className="absolute -left-6 -top-6 w-full h-full border-2 border-secondary/20 rounded-[3rem] hidden md:block"></div>
          <div className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-outline-variant/20">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAjNmGdKN1BApB5BFlDQ7MRmc_c8K_NOq4eyFbVVxaD08iYsv6agypIMfdiTCnMrdxfFfb2-Uqm8LlUfSdwit254SzTGyXe_hDzEV5i9fj_SkjsYiRAbkUx5fxJKv-0wqfhS8EWy-n_jhBQY9KXT9yTx7d4Bfz3iyN5hadYGOH_wkQGMiJ3FbeB0N93TwBXTB9HLdRHJBJJjwFfHE703wAkCpbuYt8sNGPIF9IF4SdIuN3cgiZFp4t"
              alt="Professional Mentorship Workspace"
              className="w-full h-auto aspect-[4/3] md:aspect-square object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex items-end p-8">
              <div className="text-white">
                <p className="font-mono text-xs text-tertiary-fixed uppercase tracking-wider font-bold">Executive Methodology</p>
                <p className="font-display font-bold text-xl md:text-2xl mt-1">Curated Wisdom & Strategic Leadership</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="space-y-8">
          <div>
            <span className="font-mono text-xs font-bold text-secondary uppercase tracking-widest bg-secondary-container/60 px-3 py-1 rounded-full">
              Strategic Framework
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-primary mt-3 leading-tight">
              The DKS <span className="text-secondary">Advantage</span>
            </h2>
            <p className="font-body text-base md:text-lg text-on-surface-variant mt-3">
              A bespoke mentoring system developed over 15+ years of guiding senior professionals, tech leads, and executives to unprecedented career breakthroughs.
            </p>
          </div>

          <div className="space-y-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex gap-4 p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/10 hover:border-secondary/30 hover:shadow-md transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center shrink-0 shadow-sm`}>
                  <span className="material-symbols-outlined text-2xl">{feature.icon}</span>
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-primary mb-1">{feature.title}</h4>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
