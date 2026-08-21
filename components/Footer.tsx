'use client';

import React from 'react';

interface FooterProps {
  onOpenContactModal: () => void;
}

export default function Footer({ onOpenContactModal }: FooterProps) {
  return (
    <footer className="bg-primary-container dark:bg-surface-container-lowest w-full py-12 md:py-stack-lg border-t border-outline-variant/10 text-on-primary-container">
      <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <span className="font-display font-black text-2xl text-white tracking-tight">
            DK Mentorship
          </span>
          <p className="font-body text-sm text-on-primary-container/80">
            © {new Date().getFullYear()} Diileep Kumar Sathyadasan. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
          <a
            href="https://www.linkedin.com/in/dileepsathyan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white hover:underline decoration-secondary transition-all flex items-center gap-1.5 font-bold text-tertiary-fixed"
          >
            <span className="material-symbols-outlined text-base">link</span>
            <span>LinkedIn Profile</span>
            <span className="material-symbols-outlined text-xs">open_in_new</span>
          </a>

          <a
            href="tel:+917907206239"
            className="hover:text-white hover:underline decoration-secondary transition-all flex items-center gap-1.5 font-bold text-white bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20"
          >
            <span className="material-symbols-outlined text-base">call</span>
            <span>Contact DK: +91 7907206239</span>
          </a>

          <button
            onClick={onOpenContactModal}
            className="hover:text-white hover:underline decoration-secondary transition-all"
          >
            Send Inquiry
          </button>
        </div>
      </div>
    </footer>
  );
}
