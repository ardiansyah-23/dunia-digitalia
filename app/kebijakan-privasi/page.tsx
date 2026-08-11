import Link from 'next/link';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, Mail } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import { COMPANY_INFO } from '@/lib/constants/nav';

export const metadata = {
  title: 'Kebijakan Privasi | Dunia Digitalia',
  description: 'Kebijakan Privasi dan perlindungan data pribadi pengguna di platform Dunia Digitalia.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-gray-800">
      <Navbar />

      <main className="flex-grow pt-6 pb-16">
        <PageTransition>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Header */}
            <div className="text-center space-y-3">

              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Kebijakan Privasi
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
                Terakhir diperbarui: 7 Agustus 2026. Privasi dan keamanan data Anda adalah prioritas utama kami di Dunia Digitalia.
              </p>
            </div>

            {/* Content Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
              
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  1. Pendahuluan
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Kebijakan Privasi ini menjelaskan bagaimana <strong className="text-slate-900">Dunia Digitalia</strong> mengumpulkan, menyimpan, dan melindungi informasi pribadi Anda saat mengakses platform kami dan membeli produk digital atau layanan jasa pembuatan website.
                </p>
              </section>

              <section className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  2. Informasi yang Kami Kumpulkan
                </h2>
                <p className="text-slate-600">
                  Kami mengumpulkan informasi terbatas dari Anda untuk keperluan pengiriman pesanan dan dukungan pelanggan:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
                  <li><strong className="text-slate-900">Data Akun & Kontak:</strong> Nama lengkap, alamat email, dan nomor WhatsApp saat membuat akun atau bertransaksi.</li>
                  <li><strong className="text-slate-900">Data Transaksi:</strong> Rincian pesanan dan metode pembayaran yang diproses secara aman melalui Tripay Payment Gateway. (Kami tidak menyimpan kartu kredit atau PIN perbankan Anda).</li>
                  <li><strong className="text-slate-900">Data Teknis:</strong> Alamat IP dan jenis peramban (browser) untuk analisis performa dan keamanan platform.</li>
                </ul>
              </section>

              <section className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  3. Penggunaan Informasi
                </h2>
                <p className="text-slate-600">
                  Informasi yang dikumpulkan digunakan untuk tujuan berikut:
                </p>
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-bold text-xs sm:text-sm">Pengiriman Produk Otomatis</strong>
                      <span className="text-xs text-slate-500">Mengirimkan berkas lisensi dan tautan unduh ke email serta akun Anda.</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-bold text-xs sm:text-sm">Dukungan Teknis</strong>
                      <span className="text-xs text-slate-500">Membantu proses instalasi template atau garansi perbaikan kode.</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-bold text-xs sm:text-sm">Verifikasi Pembayaran</strong>
                      <span className="text-xs text-slate-500">Memverifikasi konfirmasi status pembayaran real-time dari Tripay.</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-bold text-xs sm:text-sm">Pembaruan & Promo</strong>
                      <span className="text-xs text-slate-500">Mengirimkan informasi rilis versi baru atau kupon diskon eksklusif.</span>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  4. Keamanan Data
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Kami menjaga kerahasiaan data pribadi Anda dengan enkripsi SSL/HTTPS pada seluruh platform dan infrastruktur Supabase. Informasi pribadi Anda tidak akan pernah dijual atau dibagikan kepada pihak ketiga.
                </p>
              </section>

              <section className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  5. Hubungi Kami
                </h2>
                <p className="text-slate-600">
                  Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini, silakan hubungi kami:
                </p>
                <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200/80 text-xs sm:text-sm text-slate-700 space-y-1.5 font-medium">
                  <p><strong className="text-slate-900">Email:</strong> {COMPANY_INFO.email}</p>
                  <p><strong className="text-slate-900">WhatsApp:</strong> {COMPANY_INFO.phone}</p>
                  <p><strong className="text-slate-900">Alamat:</strong> {COMPANY_INFO.address}</p>
                </div>
              </section>

            </div>

          </div>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
