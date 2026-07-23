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
            DS Mentorship
          </span>
          <p className="font-body text-sm text-on-primary-container/80">
            © {new Date().getFullYear()} Diileep Kumar Sathyadasan. All rights reserved.
          </p>
          <p className="font-mono text-xs text-on-primary-container/60 mt-1">
            Built with Next.js, Supabase PostgreSQL & Google Pay Integration
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white hover:underline decoration-secondary transition-all flex items-center gap-1"
          >
            <span>LinkedIn</span>
            <span className="material-symbols-outlined text-xs">open_in_new</span>
          </a>
          <button
            onClick={onOpenContactModal}
            className="hover:text-white hover:underline decoration-secondary transition-all"
          >
            Contact Mentor
          </button>
        </div>
      </div>
    </footer>
  );
}
