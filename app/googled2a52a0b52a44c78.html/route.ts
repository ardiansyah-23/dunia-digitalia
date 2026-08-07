import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse('google-site-verification: googled2a52a0b52a44c78.html', {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
