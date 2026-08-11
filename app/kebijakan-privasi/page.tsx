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
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-8 text-xs sm:text-sm text-gray-600 leading-relaxed">
              
              <section className="space-y-3">
                <div className="flex items-center gap-2 text-base font-bold text-gray-900">
                  <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                  <h2>1. Pendahuluan</h2>
                </div>
                <p>
                  Kebijakan Privasi ini menjelaskan bagaimana <strong>Dunia Digitalia</strong> ("kami") mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi Anda saat mengakses website kami di <Link href="/" className="text-blue-600 underline font-medium">dunia-digitalia.vercel.app</Link> dan membeli produk digital atau layanan jasa pembuatan web yang kami sediakan.
                </p>
              </section>

              <section className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-base font-bold text-gray-900">
                  <Eye className="w-5 h-5 text-blue-600 shrink-0" />
                  <h2>2. Informasi yang Kami Kumpulkan</h2>
                </div>
                <p>Kami mengumpulkan beberapa jenis informasi dari Anda untuk keperluan pengiriman pesanan dan layanan purna jual:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600">
                  <li><strong>Informasi Akun & Kontak:</strong> Nama lengkap, alamat email, nomor telepon/WhatsApp yang Anda masukkan saat membuat akun atau melakukan pembelian.</li>
                  <li><strong>Data Transaksi:</strong> Nomor pesanan, rincian produk yang dibeli, dan metode pembayaran yang diproses secara aman melalui Tripay Payment Gateway. (Kami <em>tidak menyimpan</em> nomor kartu atau PIN perbankan Anda).</li>
                  <li><strong>Data Teknis:</strong> Alamat IP, jenis peramban (browser), dan log akses yang digunakan untuk keperluan keamanan sistem dan analitik internal.</li>
                </ul>
              </section>

              <section className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-base font-bold text-gray-900">
                  <Lock className="w-5 h-5 text-blue-600 shrink-0" />
                  <h2>3. Penggunaan Informasi Anda</h2>
                </div>
                <p>Informasi yang dikumpulkan digunakan secara eksklusif untuk tujuan berikut:</p>
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-100 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-gray-900 font-bold text-xs">Pengiriman Produk Automatis</strong>
                      <span className="text-[11px] text-gray-500">Mengirimkan file lisensi & link unduh ke email dan portal pelanggan.</span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-100 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-gray-900 font-bold text-xs">Dukungan Teknis & Support</strong>
                      <span className="text-[11px] text-gray-500">Membantu proses instalasi template atau garansi perbaikan kode.</span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-100 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-gray-900 font-bold text-xs">Konfirmasi Pembayaran Tripay</strong>
                      <span className="text-[11px] text-gray-500">Memverifikasi callback status pembayaran secara real-time.</span>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-100 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-gray-900 font-bold text-xs">Pembaruan & Promo</strong>
                      <span className="text-[11px] text-gray-500">Mengirimkan info rilis versi baru atau kupon diskon eksklusif.</span>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-base font-bold text-gray-900">
                  <FileText className="w-5 h-5 text-blue-600 shrink-0" />
                  <h2>4. Perlindungan & Keamanan Data</h2>
                </div>
                <p>
                  Kami berkomitmen menjaga kerahasiaan data pribadi Anda. Kami menggunakan enkripsi HTTPS/SSL di seluruh platform dan database Supabase dengan standar keamanan tinggi. Informasi pribadi Anda <strong>tidak akan pernah dijual, disewakan, atau dibagikan kepada pihak ketiga manapun</strong> untuk keperluan pemasaran tanpa izin tertulis dari Anda.
                </p>
              </section>

              <section className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-base font-bold text-gray-900">
                  <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                  <h2>5. Hubungi Kami</h2>
                </div>
                <p>Jika Anda memiliki pertanyaan terkait Kebijakan Privasi ini atau ingin mengajukan penghapusan data akun, silakan hubungi tim kami:</p>
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-xs text-blue-950 space-y-1 font-medium">
                  <p>• <strong>Email:</strong> {COMPANY_INFO.email}</p>
                  <p>• <strong>WhatsApp:</strong> {COMPANY_INFO.phone}</p>
                  <p>• <strong>Alamat:</strong> {COMPANY_INFO.address}</p>
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
