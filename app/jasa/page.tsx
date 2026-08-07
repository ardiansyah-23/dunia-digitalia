'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import { getCollection } from '@/lib/supabase/database';

const INITIAL_SERVICES = [
  { title: 'Company Profile', startingPrice: 1500000, description: 'Profil bisnis profesional dengan desain kustom, responsif, dan siap SEO.', features: ['Gratis Domain .com 1 Thn', 'Optimasi Kecepatan 95+', 'Form Kontak WA', 'Garansi Maintenance'] },
  { title: 'Toko Online E-Commerce', startingPrice: 2500000, description: 'Website penjualan dengan sistem pembayaran Tripay otomatis & cek ongkir.', features: ['Payment Gateway QRIS/VA', 'Katalog Unlimited', 'Dashboard Penjualan', 'Integrasi Laporan'] },
  { title: 'Portal Berita / Media', startingPrice: 3000000, description: 'Website berita bertrafik tinggi dengan manajemen redaksi dan slot iklan.', features: ['Google AdSense Ready', 'Kecepatan Ultra', 'Schema News JSON-LD', 'Kategori Berita'] },
];

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>(INITIAL_SERVICES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCollection<any>('services')
      .then((data) => {
        if (data && data.length > 0) {
          setServices(data.filter((s) => s.active !== false));
        }
      })
      .catch((err) => console.error('Error loading services:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-gray-800">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <PageTransition>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            
            <div className="text-center max-w-2xl mx-auto">
              <span className="badge-primary mb-2">Agency Services</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
                Jasa Pembuatan Website Profesional
              </h1>
              <p className="text-gray-500 text-sm mt-2">
                Solusi pengembangan web kustom dari awal hingga siap pakai untuk bisnis Anda.
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((s, i) => (
                  <div key={i} className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between hover:border-blue-500 transition-all">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{s.title}</h3>
                      <p className="text-xs text-gray-500 mb-4">{s.description || s.desc}</p>
                      <div className="text-2xl font-black text-blue-600 mb-6">
                        Mulai Rp {(s.startingPrice || 1500000).toLocaleString('id-ID')}
                      </div>
                      <ul className="space-y-3 mb-8 text-xs text-gray-700 font-semibold">
                        {(s.features || []).map((f: string) => (
                          <li key={f} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link href="/contact" className="btn-primary w-full text-center text-xs">
                      Konsultasikan Proyek <ArrowRight className="w-4 h-4" />
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
