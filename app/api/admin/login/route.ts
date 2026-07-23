import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    const adminPassword = process.env.ADMIN_PASSWORD || 'DKSAdmin2026!';

    if (password !== adminPassword) {
      return NextResponse.json(
        { error: 'Invalid admin credentials.' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: 'Admin authenticated successfully.',
    });

    // Set secure HTTP-only cookie valid for 7 days
    response.cookies.set({
      name: 'dks_admin_session',
      value: 'authenticated_admin_token',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Login authentication failed.', details: error?.message },
      { status: 500 }
    );
  }
}
