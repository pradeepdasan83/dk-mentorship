import { NextRequest, NextResponse } from 'next/server';
import { saveBooking } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.preferredDate || !body.preferredTime) {
      return NextResponse.json(
        { error: 'Name, Email, Date, and Time are required fields.' },
        { status: 400 }
      );
    }

    const result = await saveBooking({
      name: body.name,
      email: body.email,
      phone: body.phone,
      currentRole: body.currentRole,
      type: body.type || 'DISCOVERY_CALL',
      serviceName: body.serviceName || '1:1 Discovery Call',
      preferredDate: body.preferredDate,
      preferredTime: body.preferredTime,
      goals: body.goals,
    });

    return NextResponse.json({
      success: true,
      message: 'Booking successfully scheduled!',
      booking: result.booking,
      dbSource: result.source,
    });
  } catch (error: any) {
    console.error('Error processing booking:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process booking.' },
      { status: 500 }
    );
  }
}
