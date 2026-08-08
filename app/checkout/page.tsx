'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShoppingBag, ShieldCheck, CreditCard, Tag, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import { PRODUCTS_DATA } from '@/lib/constants/products';
import { PaymentMethodCode } from '@/types';
import { getCollection } from '@/lib/supabase/database';
import { useAuth } from '@/lib/hooks/useAuth';

const PAYMENT_METHODS: Array<{ code: PaymentMethodCode; name: string; category: string; iconText: string }> = [
  { code: 'QRIS', name: 'QRIS (BCA, OVO, ShopeePay, GoPay, Dana)', category: 'Instant QR', iconText: 'QR' },
  { code: 'BCAVA', name: 'BCA Virtual Account', category: 'Virtual Account', iconText: 'BCA' },
  { code: 'BNIVA', name: 'BNI Virtual Account', category: 'Virtual Account', iconText: 'BNI' },
  { code: 'BRIVA', name: 'BRI Virtual Account', category: 'Virtual Account', iconText: 'BRI' },
  { code: 'MANDIRIVA', name: 'Mandiri Virtual Account', category: 'Virtual Account', iconText: 'MANDIRI' },
  { code: 'PERMATAVA', name: 'Permata Virtual Account', category: 'Virtual Account', iconText: 'PERMATA' },
  { code: 'ALFAMART', name: 'Alfamart / Alfamidi', category: 'Gerai Retail', iconText: 'ALFA' },
  { code: 'INDOMARET', name: 'Indomaret / Ceriamart', category: 'Gerai Retail', iconText: 'INDO' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS_DATA[0]);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodCode>('QRIS');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error('Silakan masuk (login) terlebih dahulu untuk membeli produk digital!');
      const params = new URLSearchParams(window.location.search);
      const prodId = params.get('product');
      if (prodId) {
        // Cari slug produk dari data lokal untuk redirect ke halaman detail
        const localProd = PRODUCTS_DATA.find(p => p.id === prodId);
        if (localProd?.slug) {
          router.push(`/produk/${localProd.slug}`);
          return;
        }
        // Fallback: cari di Supabase
        getCollection<any>('products').then(data => {
          const dbProd = data.find(p => p.id === prodId);
          if (dbProd?.slug) {
            router.push(`/produk/${dbProd.slug}`);
          } else {
            router.push('/produk');
          }
        }).catch(() => {
          router.push('/produk');
        });
      } else {
        router.push('/produk');
      }
      return;
    }

    if (user) {
      setCustomerName(user.displayName || '');
      setCustomerEmail(user.email || '');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const prodId = params.get('product');
    if (prodId) {
      getCollection<any>('products').then(data => {
        const found = data.find(p => p.id === prodId);
        if (found) {
          setSelectedProduct(found);
        } else {
          const localFound = PRODUCTS_DATA.find(p => p.id === prodId);
          if (localFound) setSelectedProduct(localFound);
        }
      }).catch(() => {
        const localFound = PRODUCTS_DATA.find(p => p.id === prodId);
        if (localFound) setSelectedProduct(localFound);
      });
    }
  }, []);

  const applyCoupon = async () => {
    if (!couponCode) return;
    const toastId = toast.loading('Memverifikasi kupon...');
    try {
      const coupons = await getCollection<any>('coupons');
      const found = coupons.find((c) => c.code.toUpperCase() === couponCode.toUpperCase() && c.active);
      toast.dismiss(toastId);
      if (found) {
        let discountVal = 0;
        if (found.type === 'fixed') {
          discountVal = Number(found.value);
        } else if (found.type === 'percentage') {
          discountVal = Math.round((selectedProduct.price * Number(found.value)) / 100);
        }
        setDiscount(discountVal);
        toast.success(`Kupon ${found.code} berhasil dipasang! Diskon Rp ${discountVal.toLocaleString('id-ID')}`);
      } else {
        toast.error('Kode kupon tidak valid atau sudah tidak aktif.');
      }
    } catch (err) {
      toast.dismiss(toastId);
      toast.error('Gagal memverifikasi kupon.');
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail) {
      toast.error('Mohon isi nama dan email Anda!');
      return;
    }

    setLoading(true);
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
    const totalAmount = selectedProduct.price - discount;

    try {
      // Send request to server Tripay payment endpoint
      const res = await fetch('/api/tripay/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: paymentMethod,
          merchant_ref: orderNumber,
          amount: totalAmount,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone || '081234567890',
          order_items: [{ name: selectedProduct.title, price: totalAmount, quantity: 1 }],
        }),
      });

      const data = await res.json();

      if (data.success || data.data) {
        toast.success('Pesanan berhasil dibuat! Mengalihkan ke pembayaran...');
        router.push(`/checkout/${orderNumber}?method=${paymentMethod}&name=${encodeURIComponent(customerName)}&email=${encodeURIComponent(customerEmail)}&price=${totalAmount}`);
      } else {
        toast.error(data.message || 'Gagal membuat transaksi Tripay');
      }
    } catch (err) {
      console.error(err);
      toast.error('Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-gray-800">
      <Navbar />

      <main className="flex-grow pt-6 pb-16">
        <PageTransition>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="mb-8">
              <span className="badge-primary mb-2">Order & Payment</span>
              <h1 className="text-3xl font-extrabold text-gray-900 mt-1">
                Checkout Pembayaran
              </h1>
            </div>

            <form onSubmit={handleCheckout} className="grid lg:grid-cols-12 gap-8">
              
              {/* Left Column — Billing & Payment Methods (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Customer Information */}
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
                  <h2 className="text-lg font-bold text-gray-900">Data Pembeli</h2>
                  
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nama Lengkap *</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      readOnly
                      placeholder="Budi Santoso"
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-100 border border-gray-200 text-xs text-gray-500 cursor-not-allowed focus:outline-none"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email (File dikirim ke sini) *</label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        required
                        readOnly
                        placeholder="budi@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-gray-100 border border-gray-200 text-xs text-gray-500 cursor-not-allowed focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Nomor WhatsApp</label>
                      <input
                        type="text"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="081234567890"
                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Tripay Payment Methods Selection */}
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900">Pilih Metode Pembayaran</h2>
                    <span className="text-xs text-blue-600 font-bold">Otomatis via Tripay</span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {PAYMENT_METHODS.map((method) => (
                      <div
                        key={method.code}
                        onClick={() => setPaymentMethod(method.code)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                          paymentMethod === method.code
                            ? 'border-blue-600 bg-blue-50/50 shadow-sm ring-2 ring-blue-500/20'
                            : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center font-extrabold text-xs text-blue-600 shrink-0 shadow-xs">
                          {method.iconText}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-900">{method.name}</h4>
                          <span className="text-[10px] text-gray-500">{method.category}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column — Order Summary (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-6 sticky top-28">
                  <h2 className="text-lg font-bold text-gray-900 pb-3 border-b border-gray-100">Ringkasan Pesanan</h2>

                  {/* Product Card Overview */}
                  <div className="flex gap-4 p-3 rounded-2xl bg-gray-50 border border-gray-200">
                    <img
                      src={selectedProduct.thumbnail}
                      alt={selectedProduct.title}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-xs line-clamp-1">{selectedProduct.title}</h4>
                      <span className="text-[10px] text-gray-500 block mb-1">Versi {selectedProduct.version}</span>
                      <span className="text-xs font-extrabold text-blue-600">Rp {selectedProduct.price.toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  {/* Coupon Code Input */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-700">Kode Kupon Promo</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Contoh: PROMO2026"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-grow px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs uppercase"
                      />
                      <button
                        type="button"
                        onClick={applyCoupon}
                        className="btn-secondary text-xs px-4 py-2"
                      >
                        Gunakan
                      </button>
                    </div>
                  </div>

                  {/* Price Calculation */}
                  <div className="space-y-2 pt-4 border-t border-gray-100 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Harga Produk</span>
                      <span className="font-semibold text-gray-900">Rp {selectedProduct.price.toLocaleString('id-ID')}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Diskon Kupon</span>
                        <span>- Rp {discount.toLocaleString('id-ID')}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t border-gray-100 text-base font-extrabold text-gray-900">
                      <span>Total Bayar</span>
                      <span className="text-blue-600">Rp {(selectedProduct.price - discount).toLocaleString('id-ID')}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Memproses Transaksi Tripay...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        <span>Bayar Sekarang</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-gray-400 text-center">
                    Dengan melanjutkan, Anda menyetujui Syarat & Ketentuan Lisensi Produk Digital.
                  </p>
                </div>
              </div>

            </form>

          </div>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
