import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { saveServiceApplication } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      serviceTitle,
      priceAmount,
      menteeName,
      menteeEmail,
      phone,
      currentRole,
      linkedinUrl,
      notes,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing required Razorpay payment verification parameters.' },
        { status: 400 }
      );
    }

    const key_secret = process.env.RAZORPAY_KEY_SECRET || 'sf0epO8cfH4KvKY11uIYXLz5';

    // Verify HMAC-SHA256 signature
    const generatedSignature = crypto
      .createHmac('sha256', key_secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const isValid = generatedSignature === razorpay_signature;

    if (!isValid) {
      return NextResponse.json(
        { error: 'Razorpay LIVE payment signature verification failed.' },
        { status: 400 }
      );
    }

    // Save payment & application in PostgreSQL database
    const dbResult = await saveServiceApplication({
      name: menteeName,
      email: menteeEmail,
      phone: phone || '',
      currentRole: currentRole || '',
      linkedinUrl: linkedinUrl || '',
      serviceTitle,
      priceAmount: Number(priceAmount),
      notes: notes || '',
      paymentToken: `RZP_PAYMENT_${razorpay_payment_id}`,
      transactionId: `RZP_${razorpay_payment_id}`,
    });

    return NextResponse.json({
      success: true,
      verified: true,
      transactionId: `RZP_${razorpay_payment_id}`,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      application: dbResult.application,
      dbSource: dbResult.source,
    });
  } catch (error: any) {
    console.error('Razorpay LIVE verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify Razorpay live payment.', details: error?.message || error },
      { status: 500 }
    );
  }
}
