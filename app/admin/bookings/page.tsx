'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminSubmissionsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'bookings' | 'applications' | 'payments' | 'contacts'>('bookings');

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/submissions');
      const json = await res.json();

      if (json.success) {
        setData(json.data);
      } else {
        throw new Error(json.error || 'Failed to fetch data');
      }
    } catch (err: any) {
      setError(err.message || 'Could not load submissions.');
    } fontally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <div className="min-h-screen bg-surface-container-low text-on-surface p-4 md:p-8">
      <div className="max-w-container-max mx-auto space-y-6">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/15 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded font-bold uppercase">
                PostgreSQL DB Admin
              </span>
              <span className="text-xs text-on-surface-variant font-mono">
                Source: {data?.source === 'postgresql' ? 'Active PostgreSQL Database' : 'In-Memory Store'}
              </span>
            </div>
            <h1 className="font-display font-extrabold text-2xl md:text-3xl text-primary mt-1">
              Submissions & GPay Transactions
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchSubmissions}
              className="bg-surface-container-high hover:bg-surface-variant text-on-surface px-4 py-2 rounded-full font-bold text-xs font-mono transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">refresh</span>
              <span>Refresh</span>
            </button>
            <Link
              href="/"
              className="bg-primary hover:bg-secondary text-white px-5 py-2 rounded-full font-bold text-xs transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              <span>Back to Website</span>
            </Link>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2 border-b border-outline-variant/20 pb-3">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-5 py-2.5 rounded-full font-display font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'bookings'
                ? 'bg-primary text-white shadow'
                : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-base">calendar_month</span>
            <span>Discovery Bookings ({data?.bookings?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('applications')}
            className={`px-5 py-2.5 rounded-full font-display font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'applications'
                ? 'bg-primary text-white shadow'
                : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-base">work</span>
            <span>Paid Service Apps ({data?.applications?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`px-5 py-2.5 rounded-full font-display font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'payments'
                ? 'bg-primary text-white shadow'
                : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-base">payments</span>
            <span>GPay Payment Logs ({data?.payments?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-5 py-2.5 rounded-full font-display font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'contacts'
                ? 'bg-primary text-white shadow'
                : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-base">mail</span>
            <span>Contact Inquiries ({data?.contacts?.length || 0})</span>
          </button>
        </div>

        {/* Content Body */}
        {loading ? (
          <div className="py-16 text-center text-on-surface-variant font-mono">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p>Loading database records...</p>
          </div>
        ) : error ? (
          <div className="p-6 bg-error-container text-on-error-container rounded-2xl">
            <p className="font-bold">{error}</p>
          </div>
        ) : (
          <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/15 p-6 shadow-sm overflow-x-auto">
            {/* Bookings Table */}
            {activeTab === 'bookings' && (
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-outline-variant/20 font-mono text-xs text-on-surface-variant uppercase">
                    <th className="pb-3 px-3">Mentee Name</th>
                    <th className="pb-3 px-3">Email & Phone</th>
                    <th className="pb-3 px-3">Service</th>
                    <th className="pb-3 px-3">Preferred Slot</th>
                    <th className="pb-3 px-3">Goals</th>
                    <th className="pb-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {data?.bookings?.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-on-surface-variant italic">
                        No discovery call bookings found yet. Submit one from the home page!
                      </td>
                    </tr>
                  ) : (
                    data?.bookings?.map((b: any) => (
                      <tr key={b.id} className="hover:bg-surface-container-low transition-colors">
                        <td className="py-3.5 px-3 font-bold text-primary">{b.mentee?.name || b.name}</td>
                        <td className="py-3.5 px-3">
                          <p className="font-mono text-xs">{b.mentee?.email || b.email}</p>
                          <p className="text-xs text-on-surface-variant">{b.mentee?.phone || b.phone || '-'}</p>
                        </td>
                        <td className="py-3.5 px-3 font-medium">{b.serviceName}</td>
                        <td className="py-3.5 px-3 font-mono text-xs">
                          {b.preferredDate} @ {b.preferredTime}
                        </td>
                        <td className="py-3.5 px-3 text-xs max-w-xs truncate">{b.goals || '-'}</td>
                        <td className="py-3.5 px-3">
                          <span className="bg-emerald-100 text-emerald-800 text-[11px] font-mono font-bold px-2.5 py-1 rounded-full uppercase">
                            {b.status || 'CONFIRMED'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {/* Service Applications Table */}
            {activeTab === 'applications' && (
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-outline-variant/20 font-mono text-xs text-on-surface-variant uppercase">
                    <th className="pb-3 px-3">Mentee Name</th>
                    <th className="pb-3 px-3">Service Applied</th>
                    <th className="pb-3 px-3">Amount</th>
                    <th className="pb-3 px-3">GPay Transaction ID</th>
                    <th className="pb-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {data?.applications?.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-on-surface-variant italic">
                        No service applications found yet. Select a service on the home page and pay via GPay!
                      </td>
                    </tr>
                  ) : (
                    data?.applications?.map((app: any) => (
                      <tr key={app.id} className="hover:bg-surface-container-low transition-colors">
                        <td className="py-3.5 px-3 font-bold text-primary">
                          {app.mentee?.name}
                          <p className="font-mono text-xs font-normal text-on-surface-variant">{app.mentee?.email}</p>
                        </td>
                        <td className="py-3.5 px-3 font-medium text-secondary">{app.serviceTitle}</td>
                        <td className="py-3.5 px-3 font-mono font-bold text-emerald-600">
                          ₹{Number(app.priceAmount).toLocaleString('en-IN')}
                        </td>
                        <td className="py-3.5 px-3 font-mono text-xs text-on-surface">
                          {app.payment?.transactionId || 'GPAY_VERIFIED'}
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="bg-emerald-100 text-emerald-800 text-[11px] font-mono font-bold px-2.5 py-1 rounded-full uppercase">
                            {app.status || 'PAID'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {/* Payments Log */}
            {activeTab === 'payments' && (
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-outline-variant/20 font-mono text-xs text-on-surface-variant uppercase">
                    <th className="pb-3 px-3">Transaction Ref</th>
                    <th className="pb-3 px-3">Mentee</th>
                    <th className="pb-3 px-3">Gateway</th>
                    <th className="pb-3 px-3">Amount</th>
                    <th className="pb-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {data?.payments?.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-on-surface-variant italic">
                        No Google Pay logs recorded yet.
                      </td>
                    </tr>
                  ) : (
                    data?.payments?.map((p: any) => (
                      <tr key={p.id} className="hover:bg-surface-container-low transition-colors">
                        <td className="py-3.5 px-3 font-mono text-xs font-bold text-primary">{p.transactionId}</td>
                        <td className="py-3.5 px-3">
                          <p className="font-bold text-xs">{p.mentee?.name || 'Mentee'}</p>
                          <p className="font-mono text-xs text-on-surface-variant">{p.mentee?.email}</p>
                        </td>
                        <td className="py-3.5 px-3 font-mono text-xs text-secondary">
                          {p.paymentMethod} (Google Pay)
                        </td>
                        <td className="py-3.5 px-3 font-mono font-bold text-emerald-600">
                          ₹{Number(p.amount).toLocaleString('en-IN')} {p.currency}
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="bg-emerald-100 text-emerald-800 text-[11px] font-mono font-bold px-2.5 py-1 rounded-full uppercase">
                            {p.status || 'SUCCESS'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {/* Contact Inquiries */}
            {activeTab === 'contacts' && (
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-outline-variant/20 font-mono text-xs text-on-surface-variant uppercase">
                    <th className="pb-3 px-3">Name & Email</th>
                    <th className="pb-3 px-3">Subject</th>
                    <th className="pb-3 px-3">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {data?.contacts?.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-on-surface-variant italic">
                        No contact messages received yet.
                      </td>
                    </tr>
                  ) : (
                    data?.contacts?.map((c: any) => (
                      <tr key={c.id} className="hover:bg-surface-container-low transition-colors">
                        <td className="py-3.5 px-3 font-bold text-primary">
                          {c.name}
                          <p className="font-mono text-xs font-normal text-on-surface-variant">{c.email}</p>
                        </td>
                        <td className="py-3.5 px-3 font-medium text-secondary">{c.subject}</td>
                        <td className="py-3.5 px-3 text-xs max-w-md">{c.message}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
