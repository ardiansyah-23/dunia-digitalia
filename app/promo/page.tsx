'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Tag, CheckCircle2, ArrowRight, Loader2, Copy, Check, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
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
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

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

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Kode Kupon ${code} Berhasil Disalin!`);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <main className="flex-grow pt-28 pb-24">
        <PageTransition>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Header */}
            <div className="text-center max-w-xl mx-auto space-y-3">
              <span className="badge-primary">Penawaran Spesial</span>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Kode Promo & Kupon Diskon
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Salin kode kupon promo di bawah ini dan masukkan saat proses checkout untuk mendapatkan potongan harga langsung.
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                {coupons.map((p, i) => (
                  <div
                    key={i}
                    className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-blue-300 transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 font-mono font-black text-lg tracking-wider">
                          {p.code}
                        </div>
                        <button
                          onClick={() => handleCopy(p.code)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                          title="Salin Kode Kupon"
                        >
                          {copiedCode === p.code ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>

                      <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">{p.discount}</h3>
                      <p className="text-xs text-slate-500 font-medium">{p.min} • {p.exp}</p>
                    </div>

                    <Link
                      href="/produk"
                      className="btn-primary text-xs px-6 py-3.5 rounded-xl shrink-0 font-bold flex items-center justify-center gap-2"
                    >
                      <span>Gunakan Kode Ini</span>
                      <ArrowRight className="w-4 h-4" />
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
