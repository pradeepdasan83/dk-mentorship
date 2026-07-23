import { NextRequest, NextResponse } from 'next/server';
import { saveServiceApplication } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.serviceTitle || !body.priceAmount) {
      return NextResponse.json(
        { error: 'Name, Email, Service Title, and Price are required.' },
        { status: 400 }
      );
    }

    const result = await saveServiceApplication({
      name: body.name,
      email: body.email,
      phone: body.phone,
      currentRole: body.currentRole,
      linkedinUrl: body.linkedinUrl,
      serviceTitle: body.serviceTitle,
      priceAmount: Number(body.priceAmount),
      notes: body.notes,
      paymentToken: body.paymentToken,
      transactionId: body.transactionId,
    });

    return NextResponse.json({
      success: true,
      message: 'Service application & GPay payment processed successfully!',
      application: result.application,
      transactionId: result.transactionId,
      dbSource: result.source,
    });
  } catch (error: any) {
    console.error('Error processing service application:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process service application.' },
      { status: 500 }
    );
  }
}
