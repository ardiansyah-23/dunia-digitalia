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

      <main className="flex-grow pt-28 pb-20">
        <PageTransition>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Header */}
            <div className="text-center space-y-3">
              <span className="badge-primary">Lisensi & Ketentuan</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Syarat & Ketentuan
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
                Harap membaca syarat dan ketentuan berikut sebelum melakukan pembelian produk digital atau memesan jasa di Dunia Digitalia.
              </p>
            </div>

            {/* Content Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-8 text-xs sm:text-sm text-gray-600 leading-relaxed">
              
              <section className="space-y-3">
                <div className="flex items-center gap-2 text-base font-bold text-gray-900">
                  <Scale className="w-5 h-5 text-blue-600 shrink-0" />
                  <h2>1. Ketentuan Umum</h2>
                </div>
                <p>
                  Dengan mengakses website <strong>Dunia Digitalia</strong> dan melakukan transaksi pembelian produk (Template Blogger, Source Code, Ebook, AI Prompt) atau layanan jasa pembuatan website, Anda secara otomatis menyetujui seluruh Syarat & Ketentuan yang berlaku di bawah ini.
                </p>
              </section>

              <section className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-base font-bold text-gray-900">
                  <Code2 className="w-5 h-5 text-blue-600 shrink-0" />
                  <h2>2. Hak Cipta & Lisensi Penggunaan</h2>
                </div>
                <p>Seluruh produk digital yang dijual di Dunia Digitalia dilindungi oleh hak cipta. Pembelian produk memberikan Anda <strong>Lisensi Penggunaan Non-Eksklusif</strong> dengan ketentuan:</p>
                
                <div className="space-y-3 pt-2">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1 text-emerald-950">
                    <div className="flex items-center gap-2 font-bold text-xs text-emerald-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>HAL YANG DIPERBOLEHKAN (Diizinkan):</span>
                    </div>
                    <ul className="list-disc pl-6 space-y-1 text-xs text-emerald-900">
                      <li>Menggunakan template/source code untuk proyek domain pribadi atau klien.</li>
                      <li>Mengubah, memodifikasi desain, dan menyesuaikan warna atau fitur kode sesuai kebutuhan.</li>
                      <li>Memasang source code di server hosting pribadi atau VPS milik Anda.</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1 text-rose-950">
                    <div className="flex items-center gap-2 font-bold text-xs text-rose-900">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>LARANGAN KERAS (Dilarang):</span>
                    </div>
                    <ul className="list-disc pl-6 space-y-1 text-xs text-rose-900">
                      <li>Mendistribusikan ulang, menjual kembali (re-sell), atau membagikan file produk secara gratis di forum/sosial media.</li>
                      <li>Menghapus footer kredit pembuat lisensi jika dilarang oleh varian paket lisensi produk terkait.</li>
                      <li>Menggunakan produk untuk aktivitas ilegal, judi online, penipuan, atau konten melanggar hukum RI.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-base font-bold text-gray-900">
                  <FileText className="w-5 h-5 text-blue-600 shrink-0" />
                  <h2>3. Pembayaran & Pengiriman Instan</h2>
                </div>
                <p>
                  Semua transaksi diproses secara real-time via <strong>Tripay Payment Gateway</strong> (QRIS, BCA, BNI, BRI, Mandiri, Permata, Indomaret, Alfamart). Setelah sistem menerima konfirmasi lulus pembayaran:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-gray-600">
                  <li>File produk dan instruksi lisensi akan <strong>langsung tersedia untuk diunduh</strong> di Portal Pelanggan akun Anda.</li>
                  <li>Link download dan bukti transaksi (Invoice PDF) juga otomatis dikirimkan ke alamat email terdaftar Anda.</li>
                </ul>
              </section>

              <section className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-base font-bold text-gray-900">
                  <ShieldAlert className="w-5 h-5 text-blue-600 shrink-0" />
                  <h2>4. Ketentuan Jasa Pembuatan Website</h2>
                </div>
                <p>Khusus untuk pemesanan paket <strong>Jasa Web Development</strong>:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600">
                  <li>Estimasi pengerjaan dihitung sejak materi (logo, konten teks, gambar) lengkap dikirimkan oleh klien.</li>
                  <li>Klien berhak mendapatkan revisi gratis sesuai dengan kuota paket jasa yang dipilih.</li>
                  <li>Dunia Digitalia memberikan garansi perawatan bebas bug/error teknis selama 30-90 hari setelah website rilis.</li>
                </ul>
              </section>

              <section className="space-y-3 pt-6 border-t border-gray-100">
                <h2 className="text-base font-bold text-gray-900">5. Perubahan Ketentuan</h2>
                <p>
                  Dunia Digitalia berhak memperbarui Syarat & Ketentuan ini sewaktu-waktu tanpa pemberitahuan sebelumnya. Penggunaan berkelanjutan atas situs ini setelah perubahan menandakan persetujuan Anda terhadap syarat yang baru.
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
