import crypto from 'crypto';

const TRIPAY_API_KEY = process.env.TRIPAY_API_KEY || 'DEV_TRIPAY_API_KEY_MOCK';
const TRIPAY_PRIVATE_KEY = process.env.TRIPAY_PRIVATE_KEY || 'DEV_TRIPAY_PRIVATE_KEY_MOCK';
const TRIPAY_MERCHANT_CODE = process.env.TRIPAY_MERCHANT_CODE || 'T12345';
const IS_PRODUCTION = process.env.NODE_ENV === 'production' && process.env.TRIPAY_MODE === 'production';

export const TRIPAY_BASE_URL = IS_PRODUCTION
  ? 'https://tripay.co.id/api'
  : 'https://tripay.co.id/api-sandbox';

export interface CreateTripayPayload {
  method: string;
  merchant_ref: string;
  amount: number;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  order_items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  return_url?: string;
}

export function generateTripaySignature(merchantRef: string, amount: number): string {
  return crypto
    .createHmac('sha256', TRIPAY_PRIVATE_KEY)
    .update(`${TRIPAY_MERCHANT_CODE}${merchantRef}${amount}`)
    .digest('hex');
}

export function verifyTripayCallbackSignature(rawBody: string, callbackSignature: string): boolean {
  const calculatedSignature = crypto
    .createHmac('sha256', TRIPAY_PRIVATE_KEY)
    .update(rawBody)
    .digest('hex');

  return calculatedSignature === callbackSignature;
}

export async function requestTripayPayment(payload: CreateTripayPayload) {
  const signature = generateTripaySignature(payload.merchant_ref, payload.amount);

  const requestBody = {
    method: payload.method,
    merchant_ref: payload.merchant_ref,
    amount: payload.amount,
    customer_name: payload.customer_name,
    customer_email: payload.customer_email,
    customer_phone: payload.customer_phone || '081234567890',
    order_items: payload.order_items,
    callback_url: process.env.TRIPAY_CALLBACK_URL || 'https://duniadigitalia.com/api/tripay/callback',
    return_url: payload.return_url || `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/${payload.merchant_ref}`,
    expired_time: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
    signature,
  };

  // If using sandbox without real Tripay keys, fallback to instant mock response
  if (!process.env.TRIPAY_API_KEY) {
    return {
      success: true,
      data: {
        reference: `DEV-DEV-${payload.merchant_ref}`,
        merchant_ref: payload.merchant_ref,
        payment_method: payload.method,
        payment_name: payload.method,
        amount: payload.amount,
        pay_code: payload.method === 'QRIS' ? '' : '88000' + Math.floor(10000000 + Math.random() * 90000000),
        qr_url: payload.method === 'QRIS' ? 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=DUNIA-DIGITALIA-PAY' : '',
        checkout_url: `http://localhost:3000/checkout/${payload.merchant_ref}`,
        expired_time: Math.floor(Date.now() / 1000) + 86400,
        status: 'UNPAID',
      },
    };
  }

  const response = await fetch(`${TRIPAY_BASE_URL}/transaction/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TRIPAY_API_KEY}`,
    },
    body: JSON.stringify(requestBody),
  });

  const data = await response.json();
  return data;
}
