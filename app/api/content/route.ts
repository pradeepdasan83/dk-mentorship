import { NextRequest, NextResponse } from 'next/server';
import { getSiteContent, updateSiteContent } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const result = await getSiteContent();
    return NextResponse.json({
      success: true,
      content: result.content,
      dbSource: result.source,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to retrieve site content.', details: error?.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await updateSiteContent(body);
    return NextResponse.json({
      success: true,
      message: 'Site content & images updated successfully!',
      content: result.content,
      dbSource: result.source,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to update site content.', details: error?.message },
      { status: 500 }
    );
  }
}
