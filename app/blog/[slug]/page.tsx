import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Share2, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-gray-800">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <PageTransition>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
            <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-blue-600">
              <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog Blog
            </Link>

            <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-sm space-y-6">
              
              <div className="space-y-3 border-b border-gray-100 pb-6">
                <span className="badge-primary">Blogger & SEO</span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-snug">
                  Cara Optimasi SEO Template Blogger Agar Lolos Google AdSense & Fast Indexing
                </h1>
                <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 font-medium">
                  <span>Oleh <strong className="text-gray-900">Admin Utama</strong></span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> 2 Agustus 2026</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 5 min baca</span>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden bg-gray-100 h-80">
                <img
                  src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80"
                  alt="Blog Cover"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose prose-slate max-w-none text-gray-700 leading-relaxed text-sm space-y-4">
                <p>
                  Mengoptimasi template Blogger untuk mesin pencari (SEO) dan Google AdSense memerlukan perhatian khusus pada kecepatan muat halaman, validasi data terstruktur (JSON-LD), serta kemudahan navigasi bagi pengunjung.
                </p>

                <h2 className="text-xl font-bold text-gray-900 pt-4">1. Gunakan Schema Structured Data JSON-LD</h2>
                <p>
                  Penggunaan schema <code>BlogPosting</code> dan <code>NewsArticle</code> memungkinkan Google memahami konteks konten Anda secara lebih presisi. Hal ini membantu artikel Anda muncul di Google News dan Cuplikan Pilihan (Featured Snippets).
                </p>

                <h2 className="text-xl font-bold text-gray-900 pt-4">2. Kompresi Gambar & Lazy Loading</h2>
                <p>
                  Pastikan semua aset gambar menggunakan format modern seperti WebP atau JPEG terkompresi dengan atribut <code>loading="lazy"</code> untuk mengurangi Core Web Vitals LCP & CLS.
                </p>

                <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 space-y-2 mt-6">
                  <h4 className="font-bold text-sm">💡 Rekomendasi Template Blogger SEO Ready</h4>
                  <p className="text-xs">
                    Coba template <strong>NewsFast Blogger</strong> dari Dunia Digitalia yang sudah lulus uji PageSpeed 98+ dan dioptimasi penuh untuk Google AdSense.
                  </p>
                  <Link href="/produk/newsfast-template-blogger-portal-berita" className="btn-primary text-xs px-4 py-2 inline-block mt-2">
                    Lihat Template NewsFast →
                  </Link>
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
