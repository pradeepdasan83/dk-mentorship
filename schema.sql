-- DKS Mentorship Database DDL Schema for Supabase PostgreSQL

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
CREATE TYPE "BookingType" AS ENUM ('DISCOVERY_CALL', 'MENTORSHIP_1ON1', 'MOCK_INTERVIEW');
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED');
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED');

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
