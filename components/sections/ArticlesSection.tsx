'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Clock, Tag } from 'lucide-react';
import FadeUp from '@/components/animations/FadeUp';
import { Article } from '@/types';
import { formatDate } from '@/lib/utils/formatDate';

const STATIC_ARTICLES: Article[] = [
  {
    id: '1', title: 'Membangun Aplikasi AI dengan Next.js dan OpenAI API',
    slug: 'membangun-aplikasi-ai-nextjs-openai',
    excerpt: 'Panduan lengkap cara mengintegrasikan OpenAI GPT ke dalam aplikasi Next.js modern dengan streaming responses.',
    content: '', coverImage: '', category: 'Artificial Intelligence',
    tags: ['AI', 'Next.js', 'OpenAI'], author: { name: 'Dunia Digitalia', avatar: '' },
    readTime: 8, published: true, featured: true, views: 1250,
    createdAt: '2026-01-15', updatedAt: '2026-01-15',
  },
  {
    id: '2', title: 'Tailwind CSS v4: Semua yang Perlu Anda Ketahui',
    slug: 'tailwind-css-v4-panduan-lengkap',
    excerpt: 'Eksplorasi mendalam fitur-fitur baru Tailwind CSS v4 yang mengubah cara kita menulis CSS modern.',
    content: '', coverImage: '', category: 'Web Development',
    tags: ['CSS', 'Tailwind', 'Frontend'], author: { name: 'Dunia Digitalia', avatar: '' },
    readTime: 6, published: true, featured: false, views: 890,
    createdAt: '2026-01-10', updatedAt: '2026-01-10',
  },
  {
    id: '3', title: 'Otomasi Bisnis dengan Python dan RPA',
    slug: 'otomasi-bisnis-python-rpa',
    excerpt: 'Cara mengotomasi proses bisnis repetitif menggunakan Python, Selenium, dan tools RPA modern.',
    content: '', coverImage: '', category: 'Automation',
    tags: ['Python', 'RPA', 'Automation'], author: { name: 'Dunia Digitalia', avatar: '' },
    readTime: 10, published: true, featured: true, views: 720,
    createdAt: '2026-01-05', updatedAt: '2026-01-05',
  },
  {
    id: '4', title: 'Firebase Firestore: Desain Database yang Scalable',
    slug: 'firebase-firestore-database-scalable',
    excerpt: 'Strategi pemodelan data Firestore untuk aplikasi yang dapat berkembang seiring pertumbuhan bisnis Anda.',
    content: '', coverImage: '', category: 'Cloud',
    tags: ['Firebase', 'Database', 'Cloud'], author: { name: 'Dunia Digitalia', avatar: '' },
    readTime: 7, published: true, featured: false, views: 650,
    createdAt: '2025-12-28', updatedAt: '2025-12-28',
  },
  {
    id: '5', title: 'React Native 2026: Membangun App Mobile Modern',
    slug: 'react-native-2026-mobile-modern',
    excerpt: 'Panduan praktis menggunakan React Native terbaru dengan New Architecture untuk performa optimal.',
    content: '', coverImage: '', category: 'Mobile',
    tags: ['React Native', 'Mobile', 'JavaScript'], author: { name: 'Dunia Digitalia', avatar: '' },
    readTime: 9, published: true, featured: false, views: 580,
    createdAt: '2025-12-20', updatedAt: '2025-12-20',
  },
  {
    id: '6', title: 'Framer Motion: Animasi UI yang Memukau',
    slug: 'framer-motion-animasi-ui',
    excerpt: 'Teknik animasi Framer Motion tingkat lanjut untuk membuat antarmuka yang hidup dan engaging.',
    content: '', coverImage: '', category: 'Design',
    tags: ['Framer Motion', 'Animation', 'React'], author: { name: 'Dunia Digitalia', avatar: '' },
    readTime: 5, published: true, featured: false, views: 490,
    createdAt: '2025-12-15', updatedAt: '2025-12-15',
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  'Artificial Intelligence': '#1E88FF',
  'Web Development': '#00C8FF',
  'Automation': '#5EC8FF',
  'Cloud': '#1E88FF',
  'Mobile': '#00C8FF',
  'Design': '#5EC8FF',
};

interface ArticlesSectionProps {
  articles?: Article[];
}

export default function ArticlesSection({ articles = STATIC_ARTICLES }: ArticlesSectionProps) {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(articles);

  useEffect(() => {
    if (!search) { setFiltered(articles); return; }
    const q = search.toLowerCase();
    setFiltered(articles.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.tags.some((t: string) => t.toLowerCase().includes(q))
    ));
  }, [search, articles]);

  return (
    <section id="articles" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0"
        style={{ backgroundImage: 'radial-gradient(ellipse 50% 50% at 80% 80%, rgba(30,136,255,0.05) 0%, transparent 100%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-6 items-center mb-12">
          <FadeUp>
            <div className="section-label mb-4">Knowledge Hub</div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Artikel <span className="text-gradient">Terbaru</span>
            </h2>
          </FadeUp>
          <FadeUp delay={1} className="flex flex-col gap-4 lg:items-end">
            {/* Search */}
            <div className="relative w-full lg:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8B3C7]" />
              <input
                type="text"
                placeholder="Cari artikel..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-[#A8B3C7] outline-none transition-all"
                style={{
                  background: 'rgba(15,29,53,0.8)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(30,136,255,0.4)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
            </div>
            <Link href="/articles" className="inline-flex items-center gap-2 text-sm font-semibold text-[#5EC8FF] hover:text-white transition-colors group">
              Lihat Semua <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeUp>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.slice(0, 6).map((article, i) => {
            const color = CATEGORY_COLORS[article.category] || '#1E88FF';
            return (
              <FadeUp key={article.id} delay={i + 1}>
                <Link href={`/articles/${article.slug}`} className="block group">
                  <motion.article
                    className="h-full rounded-2xl overflow-hidden"
                    style={{ background: 'rgba(15,29,53,0.8)', border: '1px solid rgba(255,255,255,0.07)' }}
                    whileHover={{ y: -4, borderColor: `${color}30`, boxShadow: `0 0 30px ${color}10` }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Card header */}
                    <div
                      className="h-44 relative overflow-hidden"
                      style={{ background: `linear-gradient(135deg, ${color}15, rgba(7,17,31,0.8))` }}
                    >
                      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 300 176">
                        <circle cx="270" cy="30" r="80" fill="none" stroke={color} strokeWidth="0.5" />
                        <line x1="0" y1="88" x2="300" y2="88" stroke={color} strokeWidth="0.5" strokeDasharray="6 4" />
                        <rect x="20" y="40" width="80" height="50" rx="4" fill="none" stroke={color} strokeWidth="0.5" />
                      </svg>
                      <div className="absolute bottom-3 left-4">
                        <span
                          className="px-2.5 py-1 rounded-full text-xs font-semibold"
                          style={{ background: `${color}20`, border: `1px solid ${color}35`, color }}
                        >
                          {article.category}
                        </span>
                      </div>
                      {article.featured && (
                        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={{ background: 'rgba(30,136,255,0.2)', border: '1px solid rgba(30,136,255,0.35)', color: '#5EC8FF' }}>
                          Featured
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="text-white font-bold text-sm leading-snug mb-2 group-hover:text-[#5EC8FF] transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-[#A8B3C7] text-xs leading-relaxed mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-[#A8B3C7]">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {article.readTime} min read
                        </div>
                        <span>{formatDate(article.createdAt)}</span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </FadeUp>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#A8B3C7]">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>Tidak ada artikel yang ditemukan untuk "<strong className="text-white">{search}</strong>"</p>
          </div>
        )}
      </div>
    </section>
  );
}
