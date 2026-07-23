import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DKS Mentorship | Diileep Kumar Sathyadasan',
  description: 'Empowering high-level professionals to command executive authority and achieve strategic career growth through curated LinkedIn strategies and 1:1 mentorship.',
  keywords: ['Executive Mentorship', 'Career Growth', 'LinkedIn Profile Optimization', 'Diileep Kumar Sathyadasan', 'Executive Coaching', 'Google Pay Payments'],
  authors: [{ name: 'Diileep Kumar Sathyadasan' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-surface text-on-surface font-body overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
