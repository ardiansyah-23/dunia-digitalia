'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import FadeUp from '@/components/animations/FadeUp';
import { Testimonial } from '@/types';

const STATIC_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Budi Santoso',
    role: 'CEO & Founder',
    company: 'TechVision Indonesia',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    content: 'Dunia Digitalia membantu mengotomasi 80% proses operasional kami dengan AI dan RPA. Hasilnya luar biasa, tim kami bisa fokus pada keputusan strategis!',
    rating: 5,
    featured: true,
    createdAt: '2026-01-10',
  },
  {
    id: '2',
    name: 'Siti Rahmawati',
    role: 'Head of Product',
    company: 'Nexa Digital Store',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    content: 'Redesain platform e-commerce kami oleh tim Dunia Digitalia meningkatkan conversion rate sebesar 45%. UI/UX yang dihasilkan benar-benar world-class.',
    rating: 5,
    featured: true,
    createdAt: '2026-01-05',
  },
  {
    id: '3',
    name: 'Rian Hidayat',
    role: 'CTO',
    company: 'Fintech Utama',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    content: 'Arsitektur cloud dan integrasi Next.js 15 dari Dunia Digitalia sangat stabil, mampu menangani traffic tinggi tanpa kendala sama sekali.',
    rating: 5,
    featured: true,
    createdAt: '2025-12-20',
  },
];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % STATIC_TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % STATIC_TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + STATIC_TESTIMONIALS.length) % STATIC_TESTIMONIALS.length);
  };

  const current = STATIC_TESTIMONIALS[index];

  return (
    <section id="testimonials" className="relative py-24 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,200,255,0.04) 0%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <FadeUp className="text-center mb-16">
          <div className="section-label mx-auto w-fit mb-4">Testimonials</div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Apa Kata <span className="text-gradient">Klien Kami</span>
          </h2>
        </FadeUp>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl p-8 lg:p-12 relative overflow-hidden"
              style={{
                background: 'rgba(15,29,53,0.85)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
              }}
            >
              <Quote className="w-16 h-16 text-[#1E88FF]/15 absolute top-6 right-6 pointer-events-none" />

              <div className="flex gap-1 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#5EC8FF] text-[#5EC8FF]" />
                ))}
              </div>

              <p className="text-white text-lg lg:text-2xl font-medium leading-relaxed mb-8 italic">
                "{current.content}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#1E88FF]"
                />
                <div>
                  <h4 className="text-white font-bold text-base">{current.name}</h4>
                  <p className="text-[#A8B3C7] text-sm">
                    {current.role} at <span className="text-[#5EC8FF]">{current.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {STATIC_TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? 'w-8 bg-[#1E88FF]' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#A8B3C7] hover:text-white hover:border-[#1E88FF] transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#A8B3C7] hover:text-white hover:border-[#1E88FF] transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
