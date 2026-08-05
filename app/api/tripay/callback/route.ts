import { NextResponse } from 'next/server';
import { verifyTripayCallbackSignature } from '@/lib/tripay/config';
import { updateDocById, getCollection } from '@/lib/supabase/database';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const callbackSignature = req.headers.get('x-callback-signature') || '';

    // Verify HMAC-SHA256 signature
    const isValid = verifyTripayCallbackSignature(rawBody, callbackSignature);
    if (!isValid && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ success: false, message: 'Invalid Signature' }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const { merchant_ref, status } = payload;

    let newStatus = 'Pending';
    if (status === 'PAID') newStatus = 'Paid';
    else if (status === 'EXPIRED') newStatus = 'Expired';
    else if (status === 'FAILED') newStatus = 'Failed';
    else if (status === 'REFUND') newStatus = 'Refunded';

    // Find order in Firestore
    const orders = await getCollection<any>('orders');
    const matchingOrder = orders.find((o) => o.orderNumber === merchant_ref || o.id === merchant_ref);

    if (matchingOrder) {
      await updateDocById('orders', matchingOrder.id, {
        status: newStatus,
        paidAt: status === 'PAID' ? new Date() : null,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Tripay Callback Error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
