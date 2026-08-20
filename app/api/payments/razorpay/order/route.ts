import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, serviceTitle, userEmail, userName } = body;

    if (!amount || !serviceTitle) {
      return NextResponse.json(
        { error: 'Amount and Service Title are required.' },
        { status: 400 }
      );
    }

    const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_TS2XSLY8qBSwzr';
    const key_secret = process.env.RAZORPAY_KEY_SECRET || 'JCvnS5vXnk7vgZ1FXESib2g1';

    const instance = new Razorpay({
      key_id,
      key_secret,
    });

    const amountInPaise = Math.round(Number(amount) * 100);
    const receipt = `rcpt_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    const order = await instance.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt,
      notes: {
        serviceTitle,
        userEmail: userEmail || '',
        userName: userName || '',
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: key_id,
    });
  } catch (error: any) {
    console.error('Razorpay order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create Razorpay order.', details: error?.message || error },
      { status: 500 }
    );
  }
}
