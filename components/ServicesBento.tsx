'use client';

import React from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  price: number;
  unit: string;
  description: string;
  icon: string;
  badge?: string;
}

interface ServicesBentoProps {
  onSelectService: (service: ServiceItem) => void;
}

export default function ServicesBento({ onSelectService }: ServicesBentoProps) {
  const services: ServiceItem[] = [
    {
      id: 'linkedin-profile',
      title: 'LinkedIn Profile Building',
      price: 4999,
      unit: '/profile',
      description: 'Complete overhaul of your digital executive presence. SEO optimization, headline crafting, and high-impact "About" section that converts recruiters and executives.',
      icon: 'link',
      badge: 'POPULAR CHOICE',
    },
    {
      id: 'mentorship-1on1',
      title: '1:1 Executive Mentorship',
      price: 2499,
      unit: '/60 mins',
      description: 'Direct 1-on-1 strategic access for executive career pivoting, salary negotiation strategies, and leadership transition.',
      icon: 'psychology',
      badge: 'HIGH IMPACT',
    },
    {
      id: 'resume-design',
      title: 'ATS Resume Design',
      price: 2999,
      unit: '/resume',
      description: 'ATS-optimized executive resumes engineered to pass mechanical filters and compel hiring directors.',
      icon: 'description',
    },
    {
      id: 'mock-interviews',
      title: 'Corporate Mock Interviews',
      price: 1999,
      unit: '/mock session',
      description: 'Prepare for high-stakes C-suite and Senior Leadership roles with realistic pressure, roleplay, and actionable feedback.',
      icon: 'groups',
    },
  ];

  return (
    <section id="services" className="bg-surface-container-low py-16 md:py-stack-lg border-y border-outline-variant/10">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold text-secondary tracking-widest uppercase bg-secondary-container/50 px-3 py-1 rounded-full">
              Tailored Career Acceleration
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-primary mt-3">
              Strategic <span className="text-secondary">Solutions</span> & Pricing
            </h2>
            <p className="font-body text-base md:text-lg text-on-surface-variant mt-3">
              High-impact programs designed for professionals ready to transition from ordinary to authoritative. Includes direct GPay payment checkout.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-gutter">
          {/* Service 1: LinkedIn Profile Building (Col 8) */}
          <div className="md:col-span-8 group relative bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-outline-variant/20 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col justify-between">
            <div className="absolute -right-20 -top-20 w-72 h-72 bg-secondary-container/30 rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="material-symbols-outlined text-secondary text-5xl bg-secondary-container/40 p-4 rounded-2xl">
                  {services[0].icon}
                </span>
                {services[0].badge && (
                  <span className="font-mono text-xs font-bold bg-secondary text-white px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                    {services[0].badge}
                  </span>
                )}
              </div>

              <h3 className="font-display font-bold text-2xl md:text-3xl text-primary mb-3">
                {services[0].title}
              </h3>
              <p className="font-body text-base text-on-surface-variant max-w-xl leading-relaxed mb-8">
                {services[0].description}
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-outline-variant/15">
              <div className="text-secondary font-display font-extrabold text-3xl md:text-4xl">
                ₹{services[0].price.toLocaleString('en-IN')}
                <span className="text-sm font-normal text-on-surface-variant ml-1">{services[0].unit}</span>
              </div>
              <button
                onClick={() => onSelectService(services[0])}
                className="bg-primary hover:bg-secondary text-on-primary px-8 py-3.5 rounded-full font-bold text-base transition-all shadow-md flex items-center justify-center gap-2 group-hover:scale-105"
              >
                <span>Apply with GPay</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Service 2: 1:1 Mentorship (Col 4) */}
          <div className="md:col-span-4 group bg-secondary-container p-8 md:p-10 rounded-[2.5rem] flex flex-col justify-between hover:-translate-y-2 transition-all duration-500 shadow-md">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="material-symbols-outlined text-on-secondary-container text-5xl bg-white/40 p-4 rounded-2xl">
                  {services[1].icon}
                </span>
                <span className="font-mono text-[11px] font-bold bg-on-secondary-container text-white px-3 py-1 rounded-full uppercase">
                  {services[1].badge}
                </span>
              </div>
              <h3 className="font-display font-bold text-2xl text-on-secondary-container mb-3">
                {services[1].title}
              </h3>
              <p className="font-body text-sm text-on-secondary-container/85 leading-relaxed">
                {services[1].description}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-on-secondary-container/20">
              <div className="text-on-secondary-container font-display font-bold text-3xl mb-4">
                ₹{services[1].price.toLocaleString('en-IN')}
                <span className="text-xs font-normal opacity-80 ml-1">{services[1].unit}</span>
              </div>
              <button
                onClick={() => onSelectService(services[1])}
                className="w-full border-2 border-on-secondary-container text-on-secondary-container py-3.5 rounded-full font-bold hover:bg-on-secondary-container hover:text-white transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>Book 1:1 Session</span>
                <span className="material-symbols-outlined text-lg">schedule</span>
              </button>
            </div>
          </div>

          {/* Service 3: Resume Design (Col 4) */}
          <div className="md:col-span-4 group bg-surface-container-highest p-8 md:p-10 rounded-[2.5rem] flex flex-col justify-between border border-outline-variant/30 hover:border-secondary transition-all duration-300">
            <div>
              <span className="material-symbols-outlined text-primary text-5xl bg-white/70 p-4 rounded-2xl mb-6">
                {services[2].icon}
              </span>
              <h3 className="font-display font-bold text-xl md:text-2xl text-primary mb-2">
                {services[2].title}
              </h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                {services[2].description}
              </p>
            </div>

            <div className="mt-8 pt-4">
              <div className="text-primary font-display font-bold text-2xl mb-4">
                ₹{services[2].price.toLocaleString('en-IN')}
                <span className="text-xs font-normal text-on-surface-variant ml-1">{services[2].unit}</span>
              </div>
              <button
                onClick={() => onSelectService(services[2])}
                className="w-full bg-surface-container-lowest text-secondary border border-secondary/30 font-bold py-3 rounded-full hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <span>Get Started</span>
                <span className="material-symbols-outlined text-base">east</span>
              </button>
            </div>
          </div>

          {/* Service 4: Mock Interviews (Col 8) */}
          <div className="md:col-span-8 group relative bg-tertiary-container p-8 md:p-10 rounded-[2.5rem] overflow-hidden shadow-xl border border-tertiary-fixed-dim/20">
            <div className="absolute inset-0 bg-gradient-to-br from-tertiary-container via-tertiary-container to-on-tertiary-fixed-variant/40"></div>
            <div className="relative z-10 h-full flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="flex-1">
                <span className="material-symbols-outlined text-tertiary-fixed text-4xl mb-4 bg-white/10 p-3 rounded-xl">
                  {services[3].icon}
                </span>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-tertiary-fixed mb-3">
                  {services[3].title}
                </h3>
                <p className="font-body text-sm md:text-base text-on-tertiary-fixed/80 max-w-md leading-relaxed mb-4">
                  {services[3].description}
                </p>
                <div className="text-tertiary-fixed font-display font-extrabold text-3xl">
                  ₹{services[3].price.toLocaleString('en-IN')}
                  <span className="text-xs font-normal opacity-70 ml-1">{services[3].unit}</span>
                </div>
              </div>
              <div className="w-full md:w-auto">
                <button
                  onClick={() => onSelectService(services[3])}
                  className="w-full md:w-auto bg-tertiary-fixed text-on-tertiary-fixed px-8 py-4 rounded-full font-bold text-base shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Schedule Practice</span>
                  <span className="material-symbols-outlined text-lg">event_available</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
