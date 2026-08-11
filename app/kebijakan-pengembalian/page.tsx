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
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
              
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  1. Sifat Produk Digital
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Semua produk di <strong className="text-slate-900">Dunia Digitalia</strong> berupa berkas digital (Template Blogger, Source Code, Ebook, AI Prompt) yang langsung tersedia setelah pembayaran dikonfirmasi. Karena sifat berkas digital yang tidak dapat dikembalikan secara fisik, <strong className="text-slate-900">setiap transaksi yang telah berhasil bersifat final</strong>.
                </p>
              </section>

              <section className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  2. Garansi 100% Pengembalian Dana
                </h2>
                <p className="text-slate-600">
                  Kami memberikan garansi pengembalian dana penuh jika terjadi salah satu kondisi berikut:
                </p>
                
                <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 space-y-2.5 text-emerald-950">
                  <span className="font-bold text-xs sm:text-sm text-emerald-900 block">
                    Kriteria Klaim Refund:
                  </span>
                  <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-emerald-900">
                    <li>Berkas produk rusak atau tidak dapat diunduh, dan tim teknis kami tidak dapat mengirimkan berkas pengganti dalam waktu 3x24 jam.</li>
                    <li>Source code mengalami fatal error dari sistem awal yang terbukti tidak dapat diperbaiki oleh tim pengembang kami.</li>
                    <li>Terjadi transaksi ganda untuk pesanan yang sama akibat kendala jaringan payment gateway.</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  3. Pengecualian Garansi (Tidak Berlaku)
                </h2>
                <p className="text-slate-600">
                  Pengembalian dana tidak berlaku dalam kondisi berikut:
                </p>
                
                <div className="p-5 rounded-2xl bg-rose-50/80 border border-rose-200/80 space-y-2.5 text-rose-950">
                  <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-rose-900">
                    <li>Pembeli salah memilih varian produk atau berubah pikiran setelah mengunduh berkas.</li>
                    <li>Perangkat atau hosting pembeli tidak memenuhi spesifikasi minimum yang tercantum pada deskripsi produk.</li>
                    <li>Kendala timbul akibat modifikasi kode yang dilakukan sendiri oleh pembeli.</li>
                    <li>Kurangnya pengetahuan teknis dasar dalam mengoperasikan CMS atau bahasa pemrograman terkait.</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  4. Prosedur Klaim Garansi
                </h2>
                <p className="text-slate-600">
                  Untuk mengajukan klaim garansi, ikuti alur berikut:
                </p>
                <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
                  <li>Siapkan <strong className="text-slate-900">Nomor Pesanan</strong> dan email yang digunakan saat bertransaksi.</li>
                  <li>Lampirkan tangkapan layar atau rekaman video kendala yang Anda temui.</li>
                  <li>Kirimkan laporan melalui email support atau WhatsApp resmi kami. Tim kami memproses laporan dalam 1x24 jam kerja.</li>
                </ol>
              </section>

              <section className="pt-4">
                <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Kendala pada Pesanan Anda?</h3>
                    <p className="text-xs text-slate-600">Tim dukungan pelanggan kami siap membantu Anda.</p>
                  </div>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-xs px-4 py-2.5 flex items-center gap-1.5 shrink-0"
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
