import { NextResponse } from 'next/server';
import { requestTripayPayment } from '@/lib/tripay/config';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { method, merchant_ref, amount, customer_name, customer_email, customer_phone, order_items } = body;

    if (!method || !merchant_ref || !amount || !customer_email) {
      return NextResponse.json(
        { success: false, message: 'Data transaksi tidak lengkap' },
        { status: 400 }
      );
    }

    const tripayRes = await requestTripayPayment({
      method,
      merchant_ref,
      amount,
      customer_name: customer_name || 'Pelanggan Dunia Digitalia',
      customer_email,
      customer_phone,
      order_items: order_items || [{ name: 'Produk Digital', price: amount, quantity: 1 }],
    });

    return NextResponse.json(tripayRes);
  } catch (error: any) {
    console.error('Tripay Create Payment API Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Gagal memproses pembayaran ke Tripay' },
      { status: 500 }
    );
  }
}
