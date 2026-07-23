import { NextResponse } from 'next/server';
import { getAllSubmissions } from '@/lib/db';

export async function GET() {
  try {
    const data = await getAllSubmissions();
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch database submissions.' },
      { status: 500 }
    );
  }
}
