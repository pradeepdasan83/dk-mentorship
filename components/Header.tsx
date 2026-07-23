'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface HeaderProps {
  onOpenDiscoveryModal: () => void;
  onOpenContactModal: () => void;
}

export default function Header({ onOpenDiscoveryModal, onOpenContactModal }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 dark:bg-surface-container/90 backdrop-blur-md shadow-sm border-b border-outline-variant/10 transition-all">
      <nav className="flex justify-between items-center max-w-container-max mx-auto px-4 md:px-margin-desktop h-20">
        <Link href="/" className="group flex items-center gap-2">
          <span className="font-display font-extrabold text-xl md:text-2xl tracking-tight text-primary dark:text-primary-fixed group-hover:text-secondary transition-colors">
            DS Mentorship
          </span>
          <span className="bg-secondary-container text-on-secondary-container text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Executive
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#home" className="text-secondary font-semibold border-b-2 border-secondary pb-0.5 text-sm transition-colors">
            Home
          </Link>
          <Link href="#about" className="text-on-surface-variant hover:text-secondary font-medium text-sm transition-colors">
            About
          </Link>
          <Link href="#services" className="text-on-surface-variant hover:text-secondary font-medium text-sm transition-colors">
            Services
          </Link>
          <Link href="#advantage" className="text-on-surface-variant hover:text-secondary font-medium text-sm transition-colors">
            Advantage
          </Link>
          <button 
            onClick={onOpenContactModal}
            className="text-on-surface-variant hover:text-secondary font-medium text-sm transition-colors"
          >
            Contact
          </button>
          <Link href="/admin/cms" className="text-xs font-mono bg-secondary-container text-on-secondary-container px-3 py-1.5 rounded-full hover:opacity-90 font-bold transition-all flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">edit_note</span>
            <span>CMS Editor</span>
          </Link>
          <Link href="/admin/bookings" className="text-xs font-mono bg-surface-container-high px-3 py-1.5 rounded-full text-on-surface-variant hover:text-primary transition-all">
            DB Logs
          </Link>
        </div>

        {/* Action Button */}
        <div className="hidden md:block">
          <button
            onClick={onOpenDiscoveryModal}
            className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-bold text-sm hover:scale-95 active:opacity-80 transition-all shadow-md flex items-center gap-2"
          >
            <span>Book Discovery Call</span>
            <span className="material-symbols-outlined text-base">calendar_month</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenDiscoveryModal}
            className="bg-primary text-on-primary px-3.5 py-1.5 rounded-full font-bold text-xs shadow-sm"
          >
            Book Call
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-on-surface hover:text-secondary transition-colors"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-container-lowest border-b border-outline-variant/20 px-6 py-6 space-y-4 shadow-xl animate-modal">
          <Link
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-primary"
          >
            Home
          </Link>
          <Link
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-on-surface-variant"
          >
            About
          </Link>
          <Link
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-on-surface-variant"
          >
            Services
          </Link>
          <Link
            href="#advantage"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-on-surface-variant"
          >
            Advantage
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContactModal();
            }}
            className="block text-left w-full text-base font-medium text-on-surface-variant"
          >
            Contact
          </button>
          <Link
            href="/admin/cms"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-mono text-secondary pt-2 border-t border-outline-variant/10 font-bold"
          >
            ✏️ CMS Content Editor
          </Link>
          <Link
            href="/admin/bookings"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-mono text-on-surface-variant"
          >
            📊 DB Submissions Dashboard
          </Link>
        </div>
      )}
    </header>
  );
}
