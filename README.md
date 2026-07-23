# DKS Mentorship | Diileep Kumar Sathyadasan

Full-stack Next.js web application for **DKS Mentorship** featuring an executive jewel-toned UI, **PostgreSQL Database** integration (via Supabase), **Google Pay (GPay) Web API** payment processing, **Admin Authentication**, and a **CMS Content & Image Editor**.

---

## 🌟 Key Features

- **Executive Next.js Landing Page**: Jewel-toned mentor background (`#0d1c32` to `#1f4d54`), glassmorphism cards, glowing ambient effects, and Google Material Symbols.
- **Google Pay (GPay) Integration**: Direct online payment checkout using Google Pay API in INR.
- **Interactive Mentee Booking Forms**:
  - **1:1 Discovery Call Booking Modal** (`/api/bookings`)
  - **Service Application & GPay Payment Modal** (`/api/services`)
  - **Direct Contact Form Modal** (`/api/contact`)
- **Admin Password Authentication (`/admin/login`)**:
  - Protected with HTTP-Only secure cookies (`dks_admin_session`).
  - Default password: `DKSAdmin2026!`
- **CMS Content & Image Editor (`/admin/cms`)**:
  - Live editing for Hero Headlines, Taglines, Subtitles, Stats, and Mentor Profile Photo URL with live preview.
  - Persists directly to Supabase PostgreSQL database (`SiteContent` table).
- **PostgreSQL Database Dashboard (`/admin/bookings`)**:
  - View all Discovery Call Bookings, Paid Service Applications, GPay Payment Logs, and Contact Messages.

---

## 🚀 Live Production Environment Setup

### Environment Variables (.env / Vercel)
```env
DATABASE_URL="postgresql://postgres:Lion%400987654@db.kmnseoowephkiixawlqs.supabase.co:5432/postgres"
NEXT_PUBLIC_GPAY_ENVIRONMENT="PRODUCTION"
NEXT_PUBLIC_GPAY_MERCHANT_ID="12345678901234567890"
NEXT_PUBLIC_GPAY_MERCHANT_NAME="DKS Mentorship"
ADMIN_PASSWORD="DKSAdmin2026!"
```

---

## 💻 Local Development

```bash
# 1. Clone repository
git clone https://github.com/pradeepdasan83/dk-mentorship.git
cd dk-mentorship

# 2. Install dependencies
npm install

# 3. Generate Prisma client & sync database
npm run db:push

# 4. Start local development server
npm run dev
```

Visit `http://localhost:3000` to view the website, and `http://localhost:3000/admin/login` for the Admin Portal.
