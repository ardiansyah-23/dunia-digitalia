'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Loader2, Sparkles, Check, Phone, MessageSquare, ShieldCheck, Zap } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import { getCollection } from '@/lib/supabase/database';

const INITIAL_SERVICES = [
  {
    title: 'Company Profile Website',
    startingPrice: 1500000,
    description: 'Profil bisnis profesional dengan desain kustom eksklusif, responsif di semua perangkat, dan dioptimasi penuh untuk Google SEO.',
    features: ['Gratis Domain .com 1 Tahun', 'Optimasi Kecepatan 95+', 'Form Kontak WhatsApp Direct', 'Garansi Maintenance 30 Hari'],
  },
  {
    title: 'Toko Online E-Commerce',
    startingPrice: 2500000,
    description: 'Website toko online lengkap dengan sistem pembayaran otomatis Tripay (QRIS/Virtual Account) serta kalkulasi ongkir otomatis.',
    features: ['Payment Gateway QRIS / VA', 'Katalog Produk Unlimited', 'Cek Ongkir Otomatis All Ekspedisi', 'Dashboard Laporan Penjualan Admin'],
  },
  {
    title: 'Portal Berita / Media Digital',
    startingPrice: 3000000,
    description: 'Website berita bertrafik tinggi dengan manajemen redaksi multi-penulis, slot iklan Google AdSense, dan struktur Schema News JSON-LD.',
    features: ['Google AdSense Ready', 'Kecepatan Server Ultra Fast', 'Schema News JSON-LD SEO', 'Kategori Berita Multi-level'],
  },
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
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <main className="flex-grow pt-28 pb-24">
        <PageTransition>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="badge-primary">Web Development Agency</span>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Jasa Pembuatan Website Profesional
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Solusi pengembangan web kustom dari konsep awal hingga siap pakai untuk mengembangkan ekosistem bisnis digital Anda.
              </p>
            </div>

            {/* Service Cards */}
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((s, i) => (
                  <div
                    key={i}
                    className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-blue-500 hover:shadow-xl transition-all flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900 mb-2">{s.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-6">{s.description || s.desc}</p>
                      
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 mb-6">
                        <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">Investasi Mulai Dari</span>
                        <div className="text-2xl font-black text-blue-600 mt-0.5">
                          Mulai Rp {(s.startingPrice || 1500000).toLocaleString('id-ID')}
                        </div>
                      </div>

                      <ul className="space-y-3 mb-8 text-xs text-slate-700 font-semibold">
                        {(s.features || []).map((f: string) => (
                          <li key={f} className="flex items-center gap-2.5">
                            <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3" />
                            </div>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link href="/contact" className="btn-primary w-full text-center text-xs py-3.5 rounded-xl font-bold flex items-center justify-center gap-2">
                      <span>Konsultasikan Proyek</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* Process Timeline */}
            <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-10">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="badge-primary">Tahapan Kerja</span>
                <h2 className="text-2xl font-extrabold text-slate-900">4 Langkah Mudah Membuat Website</h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">1</span>
                  <h4 className="font-extrabold text-slate-900 text-sm">Konsultasi Kebutuhan</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Diskusi fitur, konsep tampilan, dan struktur menu website.</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">2</span>
                  <h4 className="font-extrabold text-slate-900 text-sm">Proses Slicing & Coding</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Pengembangan kode front-end & back-end dengan performa tinggi.</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">3</span>
                  <h4 className="font-extrabold text-slate-900 text-sm">Uji Coba & Review</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Pengetesan responsivitas di semua perangkat & verifikasi keamanan.</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                  <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">4</span>
                  <h4 className="font-extrabold text-slate-900 text-sm">Serah Terima & Live</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Peluncuran website ke domain resmi Anda beserta dokumentasi.</p>
                </div>
              </div>
            </div>

          </div>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
