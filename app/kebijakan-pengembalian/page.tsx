import Link from 'next/link';
import { RotateCcw, ShieldCheck, CheckCircle2, XCircle, HelpCircle, MessageSquare } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import { COMPANY_INFO } from '@/lib/constants/nav';

export const metadata = {
  title: 'Kebijakan Pengembalian & Garansi | Dunia Digitalia',
  description: 'Kebijakan Garansi dan Pengembalian Dana (Refund) produk digital & jasa Dunia Digitalia.',
};

export default function RefundPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-gray-800">
      <Navbar />

      <main className="flex-grow pt-6 pb-16">
        <PageTransition>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Header */}
            <div className="text-center space-y-3">

              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Kebijakan Pengembalian (Refund)
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
                Komitmen kami terhadap kepuasan pelanggan dan garansi produk digital terverifikasi.
              </p>
            </div>

            {/* Content Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-8 text-xs sm:text-sm text-gray-600 leading-relaxed">
              
              <section className="space-y-3">
                <div className="flex items-center gap-2 text-base font-bold text-gray-900">
                  <RotateCcw className="w-5 h-5 text-blue-600 shrink-0" />
                  <h2>1. Sifat Produk Digital</h2>
                </div>
                <p>
                  Seluruh barang yang dijual di <strong>Dunia Digitalia</strong> berupa <em>Digital Goods / Intangible Items</em> (Template Blogger, Source Code, Ebook, AI Prompt) yang dapat diunduh dan diakses secara instan setelah pembayaran berhasil. Karena bentuknya yang tidak berwujud, pada prinsipnya <strong>semua transaksi yang telah berhasil bersifat final.</strong>
                </p>
              </section>

              <section className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-base font-bold text-gray-900">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h2>2. Garansi 100% Pengembalian Dana (Syarat Berlaku)</h2>
                </div>
                <p>Kami memberikan garansi pengembalian dana 100% jika terjadi kondisi berikut:</p>
                
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 text-emerald-950">
                  <div className="flex items-center gap-2 font-bold text-xs text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Kriteria Pengajuan Refund yang Diterima:</span>
                  </div>
                  <ul className="list-disc pl-6 space-y-1.5 text-xs text-emerald-900">
                    <li>File produk yang diunduh rusak/korup total dan tim support kami tidak dapat memberikan file pengganti yang berfungsi dalam waktu <strong>3x24 jam</strong>.</li>
                    <li>Terdapat fatal error pada source code yang terbukti berasal dari kesalahan sistem awal dan tidak dapat diperbaiki oleh tim pengembang kami.</li>
                    <li>Terjadi transaksi ganda (terbayar 2 kali untuk nomor pesanan yang sama akibat gangguan jaringan gateway).</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-base font-bold text-gray-900">
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <h2>3. Pengecualian Refund (Tidak Berlaku)</h2>
                </div>
                <p>Permohonan pengembalian dana <strong>TIDAK DAPAT diproses</strong> dalam kondisi berikut:</p>
                
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2 text-rose-950">
                  <ul className="list-disc pl-6 space-y-1.5 text-xs text-rose-900">
                    <li>Salah membeli varian produk atau berubah pikiran setelah file diunduh.</li>
                    <li>Komputer atau server hosting milik pembeli tidak memenuhi spesifikasi minimum yang sudah tercantum di deskripsi produk (misal: versi PHP / Node.js tidak sesuai).</li>
                    <li>Kendala akibat modifikasi pihak ketiga yang dilakukan sendiri oleh pembeli di luar kode asli.</li>
                    <li>Kurangnya kemampuan teknis dasar pembeli dalam mengoperasikan CMS / bahasa pemrograman terkait.</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-base font-bold text-gray-900">
                  <HelpCircle className="w-5 h-5 text-blue-600 shrink-0" />
                  <h2>4. Prosedur Klaim Garansi / Support</h2>
                </div>
                <p>Jika Anda mengalami kendala teknis atau memenuhi kriteria refund di atas, silakan ikuti langkah mudah ini:</p>
                <ol className="list-decimal pl-5 space-y-2 text-xs text-gray-600">
                  <li>Persiapkan <strong>Nomor Invoice / ID Pesanan</strong> dan email yang digunakan saat bertransaksi.</li>
                  <li>Ambil tangkapan layar (screenshot/video) pesan error yang Anda temui.</li>
                  <li>Kirimkan laporan Anda via email support atau WhatsApp Customer Service kami di bawah ini. Tim kami akan merespons dalam waktu 1x24 jam kerja.</li>
                </ol>
              </section>

              <section className="pt-4">
                <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-blue-900 text-xs">Butuh Bantuan Kendala Pesanan?</h3>
                    <p className="text-[11px] text-blue-700">Tim bantuan Dunia Digitalia siap melayani Anda setiap hari kerja.</p>
                  </div>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5 shrink-0"
                  >
                    <MessageSquare className="w-4 h-4" /> Hubungi Customer Support
                  </a>
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
