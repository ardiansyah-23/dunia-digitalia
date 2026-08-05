import Link from 'next/link';
import { Search, Calendar, Clock, User, ArrowRight, Sparkles, Tag } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';

export const metadata = {
  title: 'Blog & Tutorial Teknologi | Dunia Digitalia',
  description: 'Artikel, panduan, dan tutorial seputar Blogger, Next.js, SEO, AI, dan bisnis digital.',
};

const ARTICLES_DATA = [
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
  const featured = ARTICLES_DATA.find(a => a.featured) || ARTICLES_DATA[0];
  const regularArticles = ARTICLES_DATA.filter(a => a.id !== featured.id);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-gray-800">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <PageTransition>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Page Header */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="badge-primary">Blog & Education Hub</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Artikel & Tutorial Teknologi
              </h1>
              <p className="text-gray-500 text-sm">
                Wawasan mendalam seputar template Blogger, Next.js, SEO, AI, dan otomasi bisnis digital.
              </p>
            </div>

            {/* Featured Article Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 h-64 sm:h-80 rounded-2xl overflow-hidden bg-gray-100 relative">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-4 left-4 badge-primary bg-white/90 backdrop-blur-sm shadow-xs">
                  {featured.category}
                </span>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-3 text-xs text-gray-400 font-semibold">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {featured.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featured.readTime}</span>
                </div>

                <Link href={`/blog/${featured.slug}`} className="block group">
                  <h2 className="text-2xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {featured.title}
                  </h2>
                </Link>

                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                  {featured.excerpt}
                </p>

                <div className="pt-2">
                  <Link href={`/blog/${featured.slug}`} className="btn-primary text-xs px-5 py-2.5 inline-flex items-center gap-2">
                    Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Regular Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {regularArticles.map((article) => (
                <div key={article.id} className="card-product overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="h-44 relative bg-gray-100 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold bg-white/90 text-gray-800 backdrop-blur-sm shadow-xs">
                        {article.category}
                      </span>
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-3 text-[11px] text-gray-400 font-medium">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>

                      <Link href={`/blog/${article.slug}`} className="block">
                        <h3 className="font-bold text-gray-900 text-base leading-snug hover:text-blue-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                      </Link>

                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-gray-100 flex items-center justify-between mt-4">
                    <span className="text-xs text-gray-400 font-semibold">{article.author}</span>
                    <Link href={`/blog/${article.slug}`} className="text-xs font-bold text-blue-600 hover:underline">
                      Baca →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
