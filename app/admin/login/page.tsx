'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid admin credentials');
      }

      router.push('/admin/cms');
    } catch (err: any) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mentor-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow ambient background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-secondary-fixed rounded-full blur-[100px]"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-tertiary-fixed rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md glass-card rounded-3xl p-8 md:p-10 shadow-2xl border border-white/20 text-on-primary">
        <div className="text-center mb-8">
          <span className="font-mono text-xs font-bold text-tertiary-fixed uppercase tracking-widest bg-white/10 px-3.5 py-1 rounded-full inline-block mb-3">
            Executive Portal
          </span>
          <h1 className="font-display font-extrabold text-3xl text-white">DKS Admin Login</h1>
          <p className="font-body text-xs text-on-primary-container mt-2">
            Secure authentication for Diileep Kumar Sathyadasan
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-error-container/90 text-on-error-container text-xs font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-base">lock_reset</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-tertiary-fixed uppercase tracking-wider mb-2">
              Admin Access Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-tertiary-fixed focus:ring-2 focus:ring-tertiary-fixed/30 text-sm font-mono"
              />
              <span className="material-symbols-outlined absolute right-4 top-3.5 text-white/50">key</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-tertiary-fixed text-on-tertiary-fixed font-display font-bold py-3.5 px-6 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-base disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-on-tertiary-fixed border-t-transparent rounded-full animate-spin"></div>
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Unlock Admin Portal</span>
                <span className="material-symbols-outlined text-xl">lock_open</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-xs text-on-primary-container/70 space-y-2">
          <p className="font-mono">Default Password: <code className="bg-white/10 px-2 py-0.5 rounded text-tertiary-fixed">DKSAdmin2026!</code></p>
          <div className="pt-2">
            <Link href="/" className="text-white hover:underline flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-xs">arrow_back</span>
              <span>Back to Main Website</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
