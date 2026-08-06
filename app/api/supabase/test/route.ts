import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/config';

export const dynamic = 'force-dynamic';

export async function GET() {
  const diagnostics: Record<string, any> = {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not Set',
    supabaseKeySet: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    connectionTest: 'Pending',
    tableProductsExist: 'Pending',
    errorDetails: null,
  };

  try {
    // 1. Test basic connection / fetch
    const { data, error } = await supabase.from('products').select('id').limit(1);
    
    if (error) {
      diagnostics.connectionTest = 'Failed';
      diagnostics.errorDetails = error;
      if (error.code === '42P01') {
        diagnostics.tableProductsExist = 'False (Tabel "products" belum dibuat di SQL Editor Supabase)';
      } else {
        diagnostics.tableProductsExist = 'Unknown Error';
      }
    } else {
      diagnostics.connectionTest = 'Success';
      diagnostics.tableProductsExist = 'True';
    }
  } catch (err: any) {
    diagnostics.connectionTest = 'Error Exception';
    diagnostics.errorDetails = err.message || err;
  }

  return NextResponse.json(diagnostics);
}
