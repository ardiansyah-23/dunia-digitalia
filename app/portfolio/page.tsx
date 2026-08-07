'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ExternalLink, CheckCircle2, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import { getCollection } from '@/lib/supabase/database';

const PORTFOLIO_ITEMS = [
  {
    id: '1', title: 'AI Analytics Dashboard', category: 'AI Tools',
    description: 'Platform analitik data berbasis machine learning dengan visualisasi statistik real-time.',
    tech: ['Next.js 15', 'Python', 'Firebase', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2', title: 'E-Commerce Toko Online Modern', category: 'Web App',
    description: 'Platform toko online lengkap dengan integrasi Tripay Payment Gateway & kalkulasi ongkir.',
    tech: ['Next.js', 'Tripay API', 'Firestore', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1556742049-0a675659e382?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3', title: 'Portal Berita MediaNusa', category: 'Portal Berita',
    description: 'Portal berita bertrafik tinggi dengan optimasi AdSense, kecepatan ultra, dan JSON-LD News schema.',
    tech: ['Blogger Theme', 'SEO Schema', 'AdSense Ready'],
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4', title: 'Design System & Admin UI Pro', category: 'Admin Dashboard',
    description: 'Koleksi 50+ komponen UI dashboard React modern untuk mempercepat pengerjaan aplikasi SaaS.',
    tech: ['React 19', 'Storybook', 'TypeScript', 'Recharts'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects, setProjects] = useState<any[]>(PORTFOLIO_ITEMS);

  useEffect(() => {
    getCollection<any>('projects').then((data) => {
      if (data && data.length > 0) {
        // Map database fields to what UI expects
        const mapped = data.map((p) => ({
          id: p.id,
          title: p.title,
          category: p.category,
          description: p.description,
          tech: p.tags || [],
          image: p.images?.[0] || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        }));
        setProjects(mapped);
      }
    }).catch(console.error);
  }, []);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-gray-800">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <PageTransition>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Page Header */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="badge-primary">Portfolio & Studi Kasus</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Hasil Karya & Proyek Klien
              </h1>
              <p className="text-gray-500 text-sm">
                Lihat bagaimana kami mentransformasi ide kompleks menjadi produk digital berkualitas tinggi.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {['All', 'Web App', 'Portal Berita', 'Admin Dashboard', 'AI Tools'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filtered.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all space-y-4">
                  <div className="h-60 bg-gray-100 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-4 left-4 badge-primary bg-white/90 backdrop-blur-sm shadow-xs">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 leading-snug">{item.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {Array.isArray(item.tech) && (item.tech as string[]).map((t: string) => (
                        <span key={t} className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 text-gray-700 border border-gray-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Box */}
            <div className="p-8 rounded-3xl bg-blue-600 text-white text-center space-y-4 shadow-xl shadow-blue-500/20 max-w-3xl mx-auto">
              <h3 className="text-2xl font-extrabold">Tertarik Membangun Proyek Serupa?</h3>
              <p className="text-xs text-blue-100 max-w-md mx-auto">
                Konsultasikan kebutuhan website atau produk digital bisnis Anda bersama tim pengembang berpengalaman kami.
              </p>
              <Link href="/contact" className="btn-secondary text-xs px-6 py-3 font-bold inline-flex items-center gap-2">
                Konsultasikan Proyek Sekarang <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
