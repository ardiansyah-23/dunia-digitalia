import Link from 'next/link';
import { FileText, ShieldAlert, CheckCircle2, Code2, AlertTriangle, Scale } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import { COMPANY_INFO } from '@/lib/constants/nav';

export const metadata = {
  title: 'Syarat & Ketentuan | Dunia Digitalia',
  description: 'Syarat dan Ketentuan lisensi serta penggunaan layanan platform Dunia Digitalia.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-gray-800">
      <Navbar />

      <main className="flex-grow pt-6 pb-16">
        <PageTransition>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Header */}
            <div className="text-center space-y-3">

              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Syarat & Ketentuan
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
                Harap membaca syarat dan ketentuan berikut sebelum melakukan pembelian produk digital atau memesan jasa di Dunia Digitalia.
              </p>
            </div>

            {/* Content Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
              
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  1. Ketentuan Umum
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Dengan mengakses platform <strong className="text-slate-900">Dunia Digitalia</strong> dan bertransaksi membeli produk digital (Template Blogger, Source Code, Ebook, AI Prompt) atau layanan jasa pembuatan website, Anda menyetujui seluruh Syarat & Ketentuan yang berlaku di bawah ini.
                </p>
              </section>

              <section className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  2. Hak Cipta & Lisensi Penggunaan
                </h2>
                <p className="text-slate-600">
                  Seluruh produk digital di platform ini dilindungi oleh hak cipta. Pembelian produk memberikan Anda <strong className="text-slate-900">Lisensi Penggunaan Non-Eksklusif</strong> dengan ketentuan:
                </p>
                
                <div className="space-y-3 pt-2">
                  <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 space-y-2 text-emerald-950">
                    <span className="font-bold text-xs sm:text-sm text-emerald-900 block">
                      Hal yang Diizinkan:
                    </span>
                    <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-emerald-900">
                      <li>Menggunakan berkas untuk proyek situs pribadi atau proyek klien.</li>
                      <li>Mengubah desain, warna, dan struktur kode sesuai kebutuhan proyek.</li>
                      <li>Memasang source code pada server hosting pribadi atau VPS milik Anda.</li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-rose-50/80 border border-rose-200/80 space-y-2 text-rose-950">
                    <span className="font-bold text-xs sm:text-sm text-rose-900 block">
                      Larangan Penggunaan:
                    </span>
                    <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-rose-900">
                      <li>Mendistribusikan ulang, menjual kembali, atau membagikan berkas produk secara gratis di publik.</li>
                      <li>Menghapus kredit pembuat jika diwajibkan oleh jenis paket lisensi produk terkait.</li>
                      <li>Menggunakan produk untuk aktivitas ilegal, judi online, penipuan, atau konten yang melanggar hukum.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  3. Pembayaran & Pengiriman Produk
                </h2>
                <p className="text-slate-600">
                  Semua transaksi diproses otomatis melalui <strong className="text-slate-900">Tripay Payment Gateway</strong> (QRIS, Virtual Account, Minimarket). Setelah pembayaran dikonfirmasi:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
                  <li>Berkas produk dan lisensi langsung tersedia untuk diunduh melalui akun pelanggan Anda.</li>
                  <li>Tautan unduh dan bukti transaksi otomatis dikirimkan ke alamat email terdaftar Anda.</li>
                </ul>
              </section>

              <section className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  4. Ketentuan Jasa Pembuatan Website
                </h2>
                <p className="text-slate-600">
                  Untuk pemesanan paket <strong className="text-slate-900">Jasa Web Development</strong>:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
                  <li>Waktu pengerjaan dihitung sejak Anda melengkapi materi awal (logo, konten teks, dan referensi).</li>
                  <li>Revisi gratis berlaku sesuai kuota paket jasa yang dipilih.</li>
                  <li>Dunia Digitalia memberikan garansi perawatan bebas bug selama 30 hingga 90 hari setelah website rilis.</li>
                </ul>
              </section>

              <section className="space-y-3 pt-6 border-t border-slate-100">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  5. Perubahan Ketentuan
                </h2>
                <p className="text-slate-600">
                  Dunia Digitalia dapat memperbarui Syarat & Ketentuan ini sewaktu-waktu. Penggunaan berkelanjutan atas situs ini setelah perubahan menandakan persetujuan Anda terhadap aturan terbaru.
                </p>
              </section>

            </div>

          </div>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
