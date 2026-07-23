'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/auth-check')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          router.push('/admin/login');
        }
      })
      .catch(() => {
        setAuthenticated(false);
        router.push('/admin/login');
      });
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-surface-container-low flex flex-col items-center justify-center p-4">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="font-mono text-sm text-on-surface-variant">Verifying Admin Authentication...</p>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-surface-container-low">
      {/* Top Admin Security Bar */}
      <div className="bg-primary text-on-primary px-4 md:px-8 py-2.5 flex justify-between items-center text-xs font-mono border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-bold">ADMIN SECURE SESSION</span>
          <span className="hidden sm:inline text-white/60">| Diileep Kumar Sathyadasan</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/admin/cms" className="hover:text-tertiary-fixed transition-colors">
            CMS Editor
          </Link>
          <Link href="/admin/bookings" className="hover:text-tertiary-fixed transition-colors">
            DB Logs
          </Link>
          <button
            onClick={handleLogout}
            className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-md transition-all font-bold flex items-center gap-1"
          >
            <span>Logout</span>
            <span className="material-symbols-outlined text-xs">logout</span>
          </button>
        </div>
      </div>

      {children}
    </div>
  );
}
