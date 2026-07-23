-- DKS Mentorship Database DDL Schema for Supabase PostgreSQL

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
CREATE TYPE "BookingType" AS ENUM ('DISCOVERY_CALL', 'MENTORSHIP_1ON1', 'MOCK_INTERVIEW');
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED');
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED');

-- 0. SiteContent CMS Table (Comprehensive Full Site Management)
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

    "service1Title" TEXT NOT NULL DEFAULT 'LinkedIn Profile Building',
    "service1Price" DOUBLE PRECISION NOT NULL DEFAULT 4999,
    "service1Unit" TEXT NOT NULL DEFAULT '/profile',
    "service1Desc" TEXT NOT NULL DEFAULT 'Complete overhaul of your digital executive presence. SEO optimization, headline crafting, and high-impact About section that converts recruiters.',
    "service1Badge" TEXT NOT NULL DEFAULT 'POPULAR CHOICE',

    "service2Title" TEXT NOT NULL DEFAULT '1:1 Executive Mentorship',
    "service2Price" DOUBLE PRECISION NOT NULL DEFAULT 2499,
    "service2Unit" TEXT NOT NULL DEFAULT '/60 mins',
    "service2Desc" TEXT NOT NULL DEFAULT 'Direct 1-on-1 strategic access for executive career pivoting, salary negotiation strategies, and leadership transition.',
    "service2Badge" TEXT NOT NULL DEFAULT 'HIGH IMPACT',

    "service3Title" TEXT NOT NULL DEFAULT 'ATS Resume Design',
    "service3Price" DOUBLE PRECISION NOT NULL DEFAULT 2999,
    "service3Unit" TEXT NOT NULL DEFAULT '/resume',
    "service3Desc" TEXT NOT NULL DEFAULT 'ATS-optimized executive resumes engineered to pass mechanical filters and compel hiring directors.',

    "service4Title" TEXT NOT NULL DEFAULT 'Corporate Mock Interviews',
    "service4Price" DOUBLE PRECISION NOT NULL DEFAULT 1999,
    "service4Unit" TEXT NOT NULL DEFAULT '/mock session',
    "service4Desc" TEXT NOT NULL DEFAULT 'Prepare for high-stakes C-suite and Senior Leadership roles with realistic pressure, roleplay, and actionable feedback.',

    "approachTitle" TEXT NOT NULL DEFAULT 'The DKS Advantage',
    "approachSub" TEXT NOT NULL DEFAULT 'A bespoke mentoring system developed over 15+ years of guiding senior professionals to unprecedented career breakthroughs.',
    "approachImgUrl" TEXT NOT NULL DEFAULT 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAjNmGdKN1BApB5BFlDQ7MRmc_c8K_NOq4eyFbVVxaD08iYsv6agypIMfdiTCnMrdxfFfb2-Uqm8LlUfSdwit254SzTGyXe_hDzEV5i9fj_SkjsYiRAbkUx5fxJKv-0wqfhS8EWy-n_jhBQY9KXT9yTx7d4Bfz3iyN5hadYGOH_wkQGMiJ3FbeB0N93TwBXTB9HLdRHJBJJjwFfHE703wAkCpbuYt8sNGPIF9IF4SdIuN3cgiZFp4t',
    "adv1Title" TEXT NOT NULL DEFAULT 'Authority First',
    "adv1Desc" TEXT NOT NULL DEFAULT 'We don''t just build profiles; we build executive authorities. Your digital presence will command respect before you even enter the room.',
    "adv2Title" TEXT NOT NULL DEFAULT 'Growth Rhythm',
    "adv2Desc" TEXT NOT NULL DEFAULT 'Implementing an 8px baseline rhythm to your career growth—mathematically harmonious and strategically sound for maximum ROI.',
    "adv3Title" TEXT NOT NULL DEFAULT 'Tonal Layering',
    "adv3Desc" TEXT NOT NULL DEFAULT 'Layering soft skills with technical prowess to create a sophisticated, multifaceted professional personality.',

    "ctaTitle" TEXT NOT NULL DEFAULT 'Ready to Elevate Your Career Trajectory?',
    "ctaSub" TEXT NOT NULL DEFAULT 'Join 500+ high-achieving professionals who have redefined their authority. Stop waiting for opportunities—start creating them today.',

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
