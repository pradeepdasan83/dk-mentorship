import { NextRequest, NextResponse } from 'next/server';
import { saveContactMessage } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'All fields (Name, Email, Subject, Message) are required.' },
        { status: 400 }
      );
    }

    const result = await saveContactMessage({
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received.',
      contact: result.contact,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to submit contact message.' },
      { status: 500 }
    );
  }
}
