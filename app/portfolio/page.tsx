'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ExternalLink, CheckCircle2, ArrowRight, Sparkles, FolderGit2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import { getCollection } from '@/lib/supabase/database';

const PORTFOLIO_ITEMS = [
  {
    id: '1',
    title: 'AI Analytics & Data Dashboard',
    category: 'AI Tools',
    description: 'Platform analitik data berbasis machine learning dengan visualisasi statistik real-time dan analisis prediktif.',
    tech: ['Next.js 15', 'Python', 'Firebase', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: 'E-Commerce Toko Online Modern',
    category: 'Web App',
    description: 'Platform toko online lengkap dengan integrasi Tripay Payment Gateway (QRIS/VA) & kalkulasi ongkir otomatis.',
    tech: ['Next.js App Router', 'Tripay API', 'Firestore', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1556742049-0a675659e382?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: 'Portal Berita MediaNusa Digital',
    category: 'Portal Berita',
    description: 'Portal berita bertrafik tinggi dengan optimasi Google AdSense, kecepatan ultra, dan struktur Schema News JSON-LD.',
    tech: ['Blogger Theme', 'SEO Schema', 'AdSense Ready'],
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    title: 'Design System & Admin UI Pro',
    category: 'Admin Dashboard',
    description: 'Koleksi 50+ komponen UI dashboard React modern untuk mempercepat pengerjaan aplikasi SaaS perusahaan.',
    tech: ['React 19', 'Storybook', 'TypeScript', 'Recharts'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects, setProjects] = useState<any[]>(PORTFOLIO_ITEMS);

  useEffect(() => {
    getCollection<any>('projects')
      .then((data) => {
        if (data && data.length > 0) {
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
      })
      .catch(console.error);
  }, []);

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <main className="flex-grow pt-10 pb-20">
        <PageTransition>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="badge-primary">Portfolio Showcase</span>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Hasil Karya & Studi Kasus Klien
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Lihat bagaimana kami mentransformasi kebutuhan kompleks menjadi platform digital berkinerja tinggi.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {['All', 'Web App', 'Portal Berita', 'Admin Dashboard', 'AI Tools'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeCategory === cat
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Portfolio Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filtered.map((item) => (
                <div key={item.id} className="card-product overflow-hidden flex flex-col justify-between group">
                  <div>
                    <div className="h-64 relative bg-slate-100 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-lg text-[10px] font-bold bg-white/90 text-slate-900 backdrop-blur-md shadow-xs">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-7 space-y-3">
                      <h3 className="font-extrabold text-slate-900 text-xl leading-snug group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {item.description}
                      </p>

                      {item.tech && item.tech.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {item.tech.map((t: string) => (
                            <span key={t} className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-600">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-7 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                    <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Selesai & Live
                    </span>
                    <Link
                      href="/jasa"
                      className="btn-secondary text-xs px-4 py-2 rounded-xl flex items-center gap-1 font-bold"
                    >
                      <span>Pesan Serupa</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
