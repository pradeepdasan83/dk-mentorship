-- DKS Mentorship Database DDL Schema for Supabase PostgreSQL

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
CREATE TYPE "BookingType" AS ENUM ('DISCOVERY_CALL', 'MENTORSHIP_1ON1', 'MOCK_INTERVIEW');
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED');
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED');

-- 0. SiteContent CMS Table
CREATE TABLE IF NOT EXISTS "SiteContent" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'main_site_content',
    "heroTag" TEXT NOT NULL DEFAULT 'AUTHORITATIVE • DYNAMIC • PREMIUM',
    "heroTitle" TEXT NOT NULL DEFAULT 'Transform Your Professional Identity With Strategic Mentorship.',
    "heroSubtext" TEXT NOT NULL DEFAULT 'Empowering high-level professionals to command authority and achieve energetic prestige in their careers through curated LinkedIn strategies and 1:1 wisdom sessions.',
    "mentorName" TEXT NOT NULL DEFAULT 'Diileep Kumar Sathyadasan',
    "mentorRole" TEXT NOT NULL DEFAULT 'Strategic Executive Career Mentor',
    "mentorImageUrl" TEXT NOT NULL DEFAULT 'https://lh3.googleusercontent.com/aida/AP1WRLv39MngB3vq533uO2okUmuM0bGY9vC77Z2YYFJbEH2eM2AsSiEgvH00u9MScf-z3A_7W4HMnF1gZx-GtddmEgEcMY3apFqd5HKCIFr0gzkX63r0tH9IY2BuAZwFgw9roqqb9CXIHMTJd3iGdQwhrvjSGDARHGGtsPyeh8znHqRawq-WvRk3YoV5pcjjln_69cFQd1WEIJBIvNTpjXMTDG8pTn0qb4cDCI1W3fMpvb1wLPIeKC-15Tohq0g',
    "stat1Value" TEXT NOT NULL DEFAULT '500+',
    "stat1Label" TEXT NOT NULL DEFAULT 'MENTEES GUIDED',
    "stat2Value" TEXT NOT NULL DEFAULT '₹15Cr+',
    "stat2Label" TEXT NOT NULL DEFAULT 'SALARY HIKES SECURED',
    "stat3Value" TEXT NOT NULL DEFAULT '100+',
    "stat3Label" TEXT NOT NULL DEFAULT 'LINKEDIN OPTIMIZATIONS',
    "stat4Value" TEXT NOT NULL DEFAULT '15+',
    "stat4Label" TEXT NOT NULL DEFAULT 'YEARS EXPERIENCE',
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 1. Mentee Table
CREATE TABLE IF NOT EXISTS "Mentee" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "phone" TEXT,
    "linkedinUrl" TEXT,
    "currentRole" TEXT,
    "company" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Booking Table
CREATE TABLE IF NOT EXISTS "Booking" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "menteeId" TEXT NOT NULL REFERENCES "Mentee"("id") ON DELETE CASCADE,
    "type" "BookingType" NOT NULL DEFAULT 'DISCOVERY_CALL',
    "serviceName" TEXT NOT NULL,
    "preferredDate" TEXT NOT NULL,
    "preferredTime" TEXT NOT NULL,
    "goals" TEXT,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Payment Table
CREATE TABLE IF NOT EXISTS "Payment" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "menteeId" TEXT NOT NULL REFERENCES "Mentee"("id") ON DELETE CASCADE,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "paymentMethod" TEXT NOT NULL DEFAULT 'GPAY',
    "paymentToken" TEXT,
    "transactionId" TEXT NOT NULL UNIQUE,
    "status" "PaymentStatus" NOT NULL DEFAULT 'SUCCESS',
    "bookingId" TEXT UNIQUE REFERENCES "Booking"("id") ON DELETE SET NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. ServiceApplication Table
CREATE TABLE IF NOT EXISTS "ServiceApplication" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "menteeId" TEXT NOT NULL REFERENCES "Mentee"("id") ON DELETE CASCADE,
    "serviceTitle" TEXT NOT NULL,
    "priceAmount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'SUBMITTED',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentId" TEXT UNIQUE REFERENCES "Payment"("id") ON DELETE SET NULL
);

-- 5. ContactMessage Table
CREATE TABLE IF NOT EXISTS "ContactMessage" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    "menteeId" TEXT REFERENCES "Mentee"("id") ON DELETE SET NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
