import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Share2, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import { getCollection } from '@/lib/supabase/database';

const ARTICLES_DATA = [
  {
    id: '1',
    title: 'Cara Optimasi SEO Template Blogger Agar Lolos Google AdSense & Fast Indexing',
    slug: 'cara-optimasi-seo-template-blogger',
    excerpt: 'Panduan langkah demi langkah mengoptimasi meta tag, JSON-LD schema, dan struktur HTML pada template Blogger...',
    category: 'Blogger',
    author: 'Admin Utama',
    date: '2 Agustus 2026',
    readTime: '5 min baca',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
    content: `Mengoptimasi template Blogger untuk mesin pencari (SEO) dan Google AdSense memerlukan perhatian khusus pada kecepatan muat halaman, validasi data terstruktur (JSON-LD), serta kemudahan navigasi bagi pengunjung.

## 1. Gunakan Schema Structured Data JSON-LD
Penggunaan schema BlogPosting dan NewsArticle memungkinkan Google memahami konteks konten Anda secara lebih presisi. Hal ini membantu artikel Anda muncul di Google News dan Cuplikan Pilihan (Featured Snippets).

## 2. Kompresi Gambar & Lazy Loading
Pastikan semua aset gambar menggunakan format modern seperti WebP atau JPEG terkompresi dengan atribut loading="lazy" untuk mengurangi Core Web Vitals LCP & CLS.`
  }
];

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let article = null;
  try {
    const data = await getCollection<any>('articles');
    article = data.find((a) => a.slug === slug);
  } catch (err) {
    console.error("Error loading article from database:", err);
  }

  if (!article) {
    article = ARTICLES_DATA.find((a) => a.slug === slug) || ARTICLES_DATA[0];
  }

  const dateFormatted = article.created_at
    ? new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : article.date || '2 Agustus 2026';

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
                <span className="badge-primary">{article.category}</span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-snug">
                  {article.title}
                </h1>
                <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 font-medium">
                  <span>Oleh <strong className="text-gray-900">{article.author || 'Admin Utama'}</strong></span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {dateFormatted}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTime || '5 min baca'}</span>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden bg-gray-100 h-80">
                <img
                  src={article.image || article.cover_image || article.coverImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80'}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose prose-slate max-w-none text-gray-700 leading-relaxed text-sm space-y-4">
                {article.content ? (
                  <div dangerouslySetInnerHTML={{ __html: article.content }} className="space-y-4" />
                ) : (
                  <p>{article.excerpt}</p>
                )}
              </div>

            </div>

          </div>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
