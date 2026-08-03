'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink, Github, X, ChevronLeft, ChevronRight } from 'lucide-react';
import FadeUp from '@/components/animations/FadeUp';
import BlurIn from '@/components/animations/BlurIn';

const CATEGORIES = ['All', 'Web App', 'AI/ML', 'Mobile', 'Automation', 'Design'];

const PORTFOLIO_ITEMS = [
  {
    id: '1', title: 'AI Analytics Dashboard', category: 'AI/ML',
    description: 'Platform analitik cerdas berbasis machine learning untuk visualisasi data real-time.',
    tech: ['Python', 'TensorFlow', 'Next.js', 'Firebase'],
    gradient: 'from-blue-600/20 to-cyan-600/20',
    color: '#1E88FF',
    featured: true,
  },
  {
    id: '2', title: 'E-Commerce Platform', category: 'Web App',
    description: 'Platform e-commerce modern dengan fitur pembayaran terintegrasi dan manajemen inventory.',
    tech: ['Next.js', 'TypeScript', 'Stripe', 'Prisma'],
    gradient: 'from-cyan-600/20 to-blue-600/20',
    color: '#00C8FF',
    featured: false,
  },
  {
    id: '3', title: 'RPA Workflow System', category: 'Automation',
    description: 'Sistem otomasi proses bisnis yang mengurangi pekerjaan manual hingga 80%.',
    tech: ['Python', 'Selenium', 'FastAPI', 'PostgreSQL'],
    gradient: 'from-blue-600/20 to-indigo-600/20',
    color: '#5EC8FF',
    featured: false,
  },
  {
    id: '4', title: 'Health Tracker App', category: 'Mobile',
    description: 'Aplikasi tracking kesehatan dengan AI coaching dan sinkronisasi wearable device.',
    tech: ['React Native', 'Firebase', 'ML Kit'],
    gradient: 'from-indigo-600/20 to-blue-600/20',
    color: '#1E88FF',
    featured: true,
  },
  {
    id: '5', title: 'Design System Pro', category: 'Design',
    description: 'Library komponen UI yang komprehensif dengan 200+ komponen siap pakai.',
    tech: ['Figma', 'Storybook', 'React', 'Tailwind'],
    gradient: 'from-blue-600/20 to-cyan-600/20',
    color: '#00C8FF',
    featured: false,
  },
  {
    id: '6', title: 'NLP Chatbot Platform', category: 'AI/ML',
    description: 'Platform chatbot berbasis NLP yang mampu memahami konteks percakapan secara natural.',
    tech: ['Python', 'GPT API', 'Firebase', 'Next.js'],
    gradient: 'from-cyan-600/20 to-indigo-600/20',
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
    <section id="portfolio" className="relative py-24 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ backgroundImage: 'radial-gradient(ellipse 60% 40% at 20% 70%, rgba(30,136,255,0.05) 0%, transparent 100%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <FadeUp className="text-center mb-12">
          <div className="section-label mx-auto w-fit mb-4">Our Work</div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Portfolio <span className="text-gradient">Terpilih</span>
          </h2>
          <p className="text-[#A8B3C7] text-lg max-w-xl mx-auto">
            Proyek-proyek yang mencerminkan standar kualitas dan inovasi kami.
          </p>
        </FadeUp>

        {/* Category filter */}
        <FadeUp delay={1} className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background: activeCategory === cat ? 'linear-gradient(135deg, #1E88FF, #1565C0)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${activeCategory === cat ? 'rgba(30,136,255,0.4)' : 'rgba(255,255,255,0.08)'}`,
                color: activeCategory === cat ? '#fff' : '#A8B3C7',
                boxShadow: activeCategory === cat ? '0 0 20px rgba(30,136,255,0.3)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </FadeUp>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  background: 'rgba(15,29,53,0.8)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  minHeight: '280px',
                }}
                onClick={() => setLightboxItem(item)}
                whileHover={{ y: -6 }}
              >
                {/* Card header gradient */}
                <div
                  className={`h-40 bg-gradient-to-br ${item.gradient} relative overflow-hidden`}
                >
                  {/* Abstract tech pattern */}
                  <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 300 160">
                    <circle cx="240" cy="40" r="60" fill="none" stroke={item.color} strokeWidth="0.5" />
                    <circle cx="240" cy="40" r="40" fill="none" stroke={item.color} strokeWidth="0.5" />
                    <line x1="0" y1="80" x2="300" y2="80" stroke={item.color} strokeWidth="0.5" strokeDasharray="8 4" />
                    <line x1="60" y1="0" x2="60" y2="160" stroke={item.color} strokeWidth="0.5" strokeDasharray="6 6" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="text-6xl font-black opacity-10 tracking-tighter"
                      style={{ color: item.color }}
                    >
                      {item.category.replace('/', '')}
                    </div>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      <ExternalLink className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  {/* Featured badge */}
                  {item.featured && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold"
                      style={{ background: 'rgba(30,136,255,0.2)', border: '1px solid rgba(30,136,255,0.4)', color: '#5EC8FF' }}>
                      Featured
                    </div>
                  )}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{ background: 'rgba(0,0,0,0.4)', color: '#A8B3C7', backdropFilter: 'blur(4px)' }}>
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-white font-bold text-base mb-2 group-hover:text-[#5EC8FF] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#A8B3C7] text-xs leading-relaxed mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tech.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded text-xs"
                        style={{ background: 'rgba(255,255,255,0.05)', color: '#A8B3C7', border: '1px solid rgba(255,255,255,0.06)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <FadeUp className="text-center mt-10">
          <Link href="/portfolio" className="btn-secondary inline-flex items-center gap-2">
            Lihat Semua Proyek <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeUp>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(7,17,31,0.95)', backdropFilter: 'blur(20px)' }}
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative max-w-2xl w-full rounded-2xl overflow-hidden"
              style={{ background: '#0F1D35', border: '1px solid rgba(255,255,255,0.1)' }}
              onClick={e => e.stopPropagation()}
            >
              <div className={`h-56 bg-gradient-to-br ${lightboxItem.gradient} relative`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl font-black opacity-10" style={{ color: lightboxItem.color }}>
                    {lightboxItem.category.replace('/', '')}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-semibold text-[#1E88FF] uppercase tracking-widest mb-2 block">{lightboxItem.category}</span>
                    <h3 className="text-2xl font-bold text-white">{lightboxItem.title}</h3>
                  </div>
                  <button onClick={() => setLightboxItem(null)} className="text-[#A8B3C7] hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-[#A8B3C7] leading-relaxed mb-6">{lightboxItem.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {lightboxItem.tech.map(t => (
                    <span key={t} className="px-3 py-1 rounded-full text-sm"
                      style={{ background: `${lightboxItem.color}15`, border: `1px solid ${lightboxItem.color}30`, color: lightboxItem.color }}>
                      {t}
                    </span>
                  ))}
                </div>
                <Link href="/contact" className="btn-primary inline-flex items-center gap-2 text-sm">
                  Diskusikan Proyek Serupa <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
