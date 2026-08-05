import { NextResponse } from 'next/server';
import { seedInitialSupabaseData } from '@/lib/supabase/seed';

export async function POST() {
  try {
    const res = await seedInitialSupabaseData();
    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const res = await seedInitialSupabaseData();
    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
