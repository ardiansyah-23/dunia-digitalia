'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Tag, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import { getCollection } from '@/lib/supabase/database';

const INITIAL_COUPONS = [
  { code: 'PROMO2026', discount: 'Diskon Rp 20.000', min: 'Tanpa Minimal Pembelian', exp: 'Berlaku s/d 31 Des 2026' },
  { code: 'DIGITAL50', discount: 'Diskon 50%', min: 'Khusus Pembelian Source Code', exp: 'Terbatas untuk 100 Pembeli Pertama' },
];

export default function PromoPage() {
  const [coupons, setCoupons] = useState<any[]>(INITIAL_COUPONS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCollection<any>('coupons')
      .then((data) => {
        if (data && data.length > 0) {
          const mapped = data.filter(c => c.active !== false).map((c) => ({
            code: c.code,
            discount: c.type === 'percentage' ? `Diskon ${c.value}%` : `Diskon Rp ${Number(c.value).toLocaleString('id-ID')}`,
            min: 'Tanpa Minimal Pembelian',
            exp: c.usageLimit ? `Batas pemakaian: ${c.usedCount || 0}/${c.usageLimit}` : 'Berlaku s/d 31 Des 2026',
          }));
          setCoupons(mapped);
        }
      })
      .catch((err) => console.error('Error loading coupons:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-gray-800">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <PageTransition>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            <div className="text-center max-w-xl mx-auto">
              <span className="badge-primary mb-2">Special Offers</span>
              <h1 className="text-3xl font-extrabold text-gray-900 mt-2">
                Kode Promo & Diskon Spesial
              </h1>
              <p className="text-gray-500 text-sm mt-2">
                Gunakan kode kupon di bawah ini saat checkout untuk mendapatkan potongan harga langsung.
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                {coupons.map((p, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-blue-600" />
                        <span className="font-black text-lg text-blue-600 tracking-wider">{p.code}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm">{p.discount}</h3>
                      <p className="text-xs text-gray-500">{p.min} • {p.exp}</p>
                    </div>

                    <Link href="/produk" className="btn-primary text-xs px-5 py-2.5 shrink-0">
                      Gunakan Kupon Ini
                    </Link>
                  </div>
                ))}
              </div>
            )}

          </div>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
