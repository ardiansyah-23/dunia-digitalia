'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink, X } from 'lucide-react';
import FadeUp from '@/components/animations/FadeUp';

const CATEGORIES = ['All', 'Web App', 'AI/ML', 'Mobile', 'Automation', 'Design'];

const PORTFOLIO_ITEMS = [
  {
    id: '1', title: 'AI Analytics Dashboard', category: 'AI/ML',
    description: 'Platform analitik cerdas berbasis machine learning untuk visualisasi data real-time.',
    tech: ['Python', 'TensorFlow', 'Next.js', 'Firebase'],
    color: '#1E88FF',
    featured: true,
  },
  {
    id: '2', title: 'E-Commerce Platform', category: 'Web App',
    description: 'Platform e-commerce modern dengan fitur pembayaran terintegrasi dan manajemen inventory.',
    tech: ['Next.js', 'TypeScript', 'Stripe', 'Prisma'],
    color: '#00C8FF',
    featured: false,
  },
  {
    id: '3', title: 'RPA Workflow System', category: 'Automation',
    description: 'Sistem otomasi proses bisnis yang mengurangi pekerjaan manual hingga 80%.',
    tech: ['Python', 'Selenium', 'FastAPI', 'PostgreSQL'],
    color: '#5EC8FF',
    featured: false,
  },
  {
    id: '4', title: 'Health Tracker App', category: 'Mobile',
    description: 'Aplikasi tracking kesehatan dengan AI coaching dan sinkronisasi wearable device.',
    tech: ['React Native', 'Firebase', 'ML Kit'],
    color: '#1E88FF',
    featured: true,
  },
  {
    id: '5', title: 'Design System Pro', category: 'Design',
    description: 'Library komponen UI yang komprehensif dengan 200+ komponen siap pakai.',
    tech: ['Figma', 'Storybook', 'React', 'Tailwind'],
    color: '#00C8FF',
    featured: false,
  },
  {
    id: '6', title: 'NLP Chatbot Platform', category: 'AI/ML',
    description: 'Platform chatbot berbasis NLP yang mampu memahami konteks percakapan secara natural.',
    tech: ['Python', 'GPT API', 'Firebase', 'Next.js'],
    color: '#5EC8FF',
    featured: false,
  },
];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxItem, setLightboxItem] = useState<typeof PORTFOLIO_ITEMS[0] | null>(null);

  const filtered = activeCategory === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-28 bg-[#07111F]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(ellipse 60% 50% at 20% 80%, rgba(30,136,255,0.06) 0%, transparent 100%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <FadeUp className="text-center mb-12">
          <div className="section-label mx-auto w-fit mb-4">Our Work</div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Portfolio <span className="text-gradient">Terpilih</span>
          </h2>
          <p className="text-[#A8B3C7] text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Proyek-proyek unggulan yang mencerminkan standar kualitas dan inovasi kami.
          </p>
        </FadeUp>

        {/* Category filter */}
        <FadeUp delay={0.1} className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#1E88FF] to-[#00C8FF] text-white shadow-[0_0_20px_rgba(30,136,255,0.4)] scale-105'
                  : 'bg-white/5 border border-white/10 text-[#A8B3C7] hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </FadeUp>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="glass-card rounded-3xl overflow-hidden cursor-pointer group flex flex-col justify-between"
                onClick={() => setLightboxItem(item)}
              >
                {/* Header Banner */}
                <div className="h-48 relative overflow-hidden flex items-center justify-center p-6"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}25 0%, #0F1D35 100%)`,
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                  }}>
                  {/* Abstract Tech SVG */}
                  <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 300 180">
                    <circle cx="150" cy="90" r="70" fill="none" stroke={item.color} strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="0" y1="90" x2="300" y2="90" stroke={item.color} strokeWidth="0.5" />
                  </svg>
                  
                  <div className="text-3xl font-black tracking-tight text-white/90 group-hover:scale-110 transition-transform">
                    {item.title}
                  </div>

                  {item.featured && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#1E88FF]/30 text-[#5EC8FF] border border-[#1E88FF]/50 backdrop-blur-md">
                      Featured
                    </span>
                  )}
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/40 text-[#A8B3C7] border border-white/10 backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  <p className="text-[#A8B3C7] text-sm leading-relaxed">{item.description}</p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.tech.map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 border border-white/10 text-[#A8B3C7]">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-[#5EC8FF] pt-2 group-hover:translate-x-1 transition-transform">
                    Detail Proyek <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <FadeUp className="text-center mt-12">
          <Link href="/portfolio" className="btn-secondary inline-flex items-center gap-2 text-sm">
            Lihat Semua Proyek Portfolio <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeUp>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0F1D35] border border-white/15 rounded-3xl max-w-xl w-full p-8 relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setLightboxItem(null)} className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-[#A8B3C7] hover:text-white">
                <X className="w-5 h-5" />
              </button>

              <span className="text-xs font-bold text-[#5EC8FF] uppercase tracking-wider mb-2 block">{lightboxItem.category}</span>
              <h3 className="text-3xl font-extrabold text-white mb-4">{lightboxItem.title}</h3>
              <p className="text-[#A8B3C7] leading-relaxed text-sm mb-6">{lightboxItem.description}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {lightboxItem.tech.map(t => (
                  <span key={t} className="px-3 py-1 rounded-full text-xs font-semibold bg-[#1E88FF]/20 text-[#5EC8FF] border border-[#1E88FF]/40">
                    {t}
                  </span>
                ))}
              </div>

              <Link href="/contact" className="btn-primary w-full text-center text-sm">
                Diskusikan Proyek Serupa
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
