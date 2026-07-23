import { NextRequest, NextResponse } from 'next/server';
import { getAllSubmissions } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const data = await getAllSubmissions();
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch database submissions.', details: error?.message || 'DB Error' },
      { status: 500 }
    );
  }
}
