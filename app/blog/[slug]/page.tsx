import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Share2, CheckCircle2, User, BookOpen } from 'lucide-react';
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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let article = null;
  try {
    const data = await getCollection<any>('articles');
    article = data.find((a) => a.slug === slug);
  } catch (err) {}

  if (!article) {
    article = ARTICLES_DATA.find((a) => a.slug === slug) || ARTICLES_DATA[0];
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dunia-digitalia.vercel.app';
  const pageUrl = `${siteUrl}/blog/${slug}`;
  const imgUrl = article.coverImage || article.cover_image || article.image || `${siteUrl}/og-image.png`;

  return {
    title: article.title,
    description: article.excerpt || article.description || `Baca artikel ${article.title} di Dunia Digitalia Blog.`,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: article.title,
      description: article.excerpt || article.description,
      url: pageUrl,
      type: 'article',
      publishedTime: article.created_at,
      authors: [article.author || 'Admin Utama'],
      images: [{ url: imgUrl, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || article.description,
      images: [imgUrl],
    },
  };
}

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dunia-digitalia.vercel.app';
  const imgUrl = article.coverImage || article.cover_image || article.image || `${siteUrl}/og-image.png`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt || article.description,
    image: [imgUrl],
    datePublished: article.created_at || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: article.author || 'Admin Utama',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Dunia Digitalia',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${slug}`,
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Navbar />

      <main className="flex-grow pt-10 pb-20">
        <PageTransition>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
            {/* Back to Blog */}
            <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Kembali ke Indeks Blog & Tutorial
            </Link>

            {/* Article Container */}
            <article className="bg-white p-6 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs space-y-8">
              
              {/* Article Header Info */}
              <div className="space-y-4">
                <span className="badge-primary">{article.category || 'Teknologi'}</span>
                
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                  {article.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-b border-slate-100 pb-4 font-medium">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <User className="w-4 h-4 text-blue-600" />
                    <span>{article.author || 'Admin Utama'}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{dateFormatted}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{article.readTime || '5 min baca'}</span>
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              {(article.coverImage || article.cover_image || article.image) && (
                <div className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xs">
                  <img
                    src={article.coverImage || article.cover_image || article.image}
                    alt={article.title}
                    className="w-full h-auto max-h-[460px] object-cover"
                  />
                </div>
              )}

              {/* Article Body Content — Maximum ~70ch reading width */}
              <div className="max-w-[70ch] mx-auto text-sm sm:text-base text-slate-700 leading-relaxed space-y-6 pt-2 font-normal">
                {article.content ? (
                  <div className="space-y-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }} />
                ) : (
                  <p className="text-slate-600 leading-relaxed">{article.excerpt}</p>
                )}
              </div>

              {/* Author & Footer Share Bar */}
              <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                    {(article.author || 'Admin').slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs">{article.author || 'Admin Utama'}</h4>
                    <span className="text-[11px] text-slate-400 font-medium">Tim Redaksi Dunia Digitalia</span>
                  </div>
                </div>

                <Link
                  href="/blog"
                  className="btn-secondary text-xs px-4 py-2.5 rounded-xl font-bold flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>Jelajahi Artikel Lainnya</span>
                </Link>
              </div>

            </article>

          </div>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
