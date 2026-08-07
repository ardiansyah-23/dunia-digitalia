'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Calendar, Clock, ArrowRight, Loader2, MessageSquare, BookOpen } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import { getCollection } from '@/lib/supabase/database';

const INITIAL_ARTICLES = [
  {
    id: '1',
    title: 'Cara Optimasi SEO Template Blogger Agar Lolos Google AdSense & Fast Indexing',
    slug: 'cara-optimasi-seo-template-blogger',
    excerpt: 'Panduan langkah demi langkah mengoptimasi meta tag, JSON-LD schema, dan struktur HTML pada template Blogger untuk meningkatkan kecepatan dan skor SEO.',
    category: 'Blogger',
    author: 'Admin Utama',
    date: '2 Agust 2026',
    readTime: '5 min baca',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: '2',
    title: 'Panduan Integrasi Payment Gateway Tripay di Next.js 15 (App Router)',
    slug: 'panduan-integrasi-tripay-nextjs-15',
    excerpt: 'Cara mudah mengintegrasikan sistem pembayaran otomatis Tripay (QRIS & Virtual Account) menggunakan Server Actions dan Webhook HMAC-SHA256.',
    category: 'Next.js',
    author: 'Admin Utama',
    date: '1 Agust 2026',
    readTime: '7 min baca',
    image: 'https://images.unsplash.com/photo-1556742049-0a675659e382?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
  {
    id: '3',
    title: 'Otomasi Toko Online Menggunakan Webhook & Firebase Firestore',
    slug: 'otomasi-toko-online-webhook-firestore',
    excerpt: 'Pelajari cara membuka akses unduhan file digital secara otomatis setelah transaksi pembayaran berhasil dikonfirmasi oleh sistem.',
    category: 'Tutorial',
    author: 'Admin Utama',
    date: '28 Jul 2026',
    readTime: '6 min baca',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
  {
    id: '4',
    title: 'Koleksi 500+ Prompt ChatGPT & Midjourney Terbaik Untuk Produktivitas Bisnis',
    slug: 'koleksi-prompt-chatgpt-midjourney',
    excerpt: 'Tingkatkan efisiensi kerja copywriting, pembuatan konten media sosial, dan desain grafis dengan prompt AI profesional.',
    category: 'AI Tools',
    author: 'Admin Utama',
    date: '25 Jul 2026',
    readTime: '4 min baca',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    featured: false,
  },
];

export default function BlogPage() {
  const [articles, setArticles] = useState<any[]>(INITIAL_ARTICLES);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getCollection<any>('articles')
      .then((data) => {
        if (data && data.length > 0) {
          const mapped = data.map((a) => ({
            id: a.id,
            title: a.title,
            slug: a.slug,
            excerpt: a.excerpt || a.content?.replace(/<[^>]*>/g, '').slice(0, 150) || '',
            category: a.category,
            author: a.author || 'Admin Utama',
            date: a.created_at
              ? new Date(a.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
              : '2 Agust 2026',
            readTime: '5 min baca',
            image: a.cover_image || a.coverImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
            featured: a.featured || false,
            published: a.published !== false,
          }));
          setArticles(mapped.filter((a) => a.published));
        }
      })
      .catch((err) => console.error('Error loading articles:', err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = articles.filter(
    (a) =>
      (a.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (a.excerpt || '').toLowerCase().includes(search.toLowerCase())
  );

  const featured = filtered.find((a) => a.featured) || filtered[0];
  const regularArticles = featured ? filtered.filter((a) => a.id !== featured.id) : filtered;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <main className="flex-grow pt-28 pb-24">
        <PageTransition>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="badge-primary">Media & Publication</span>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Wawasan & Tutorial Teknologi
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Panduan praktis, optimasi SEO, pengembangan web Next.js, template Blogger, dan otomasi bisnis digital.
              </p>
              
              {/* Search Box */}
              <div className="relative max-w-md mx-auto pt-2">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari artikel teknologi atau tutorial..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-slate-200/80 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 shadow-xs"
                />
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3 bg-white border border-slate-200 rounded-3xl">
                <MessageSquare className="w-12 h-12 opacity-30" />
                <p className="text-sm font-semibold text-slate-600">Belum ada artikel yang cocok dengan pencarian Anda</p>
              </div>
            ) : (
              <>
                {/* Featured Article Card */}
                {featured && (
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs grid lg:grid-cols-12 gap-8 items-center group">
                    <div className="lg:col-span-7 h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-100 relative">
                      <img
                        src={featured.image}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 badge-primary bg-white/95 backdrop-blur-md shadow-xs">
                        {featured.category}
                      </span>
                    </div>

                    <div className="lg:col-span-5 space-y-4">
                      <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-blue-600" /> {featured.date}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-blue-600" /> {featured.readTime}</span>
                      </div>

                      <Link href={`/blog/${featured.slug}`} className="block">
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                          {featured.title}
                        </h2>
                      </Link>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {featured.excerpt}
                      </p>

                      <div className="pt-2">
                        <Link href={`/blog/${featured.slug}`} className="btn-primary text-xs px-6 py-3 rounded-xl inline-flex items-center gap-2 shadow-xs">
                          <span>Baca Artikel Lengkap</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* Regular Grid */}
                {regularArticles.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {regularArticles.map((article) => (
                      <div key={article.id} className="card-product overflow-hidden flex flex-col justify-between group">
                        <div>
                          <div className="h-48 relative bg-slate-100 overflow-hidden">
                            <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-lg text-[10px] font-bold bg-white/90 text-slate-900 backdrop-blur-md shadow-xs">
                              {article.category}
                            </span>
                          </div>

                          <div className="p-6 space-y-3">
                            <div className="flex items-center gap-3 text-[11px] text-slate-400 font-semibold">
                              <span>{article.date}</span>
                              <span>•</span>
                              <span>{article.readTime}</span>
                            </div>

                            <Link href={`/blog/${article.slug}`} className="block">
                              <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                                {article.title}
                              </h3>
                            </Link>

                            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                              {article.excerpt}
                            </p>
                          </div>
                        </div>

                        <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                          <span className="text-xs text-slate-500 font-semibold">{article.author}</span>
                          <Link href={`/blog/${article.slug}`} className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
                            <span>Baca Artikel</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

          </div>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
