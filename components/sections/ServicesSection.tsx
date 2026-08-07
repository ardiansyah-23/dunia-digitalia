'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Globe, Zap, Palette, Smartphone, Cloud, CheckCircle2 } from 'lucide-react';
import FadeUp from '@/components/animations/FadeUp';
import { SERVICES_DATA } from '@/lib/constants/services';

const ICON_MAP: Record<string, React.ElementType> = {
  Brain, Globe, Zap, Palette, Smartphone, Cloud,
};

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-28 bg-[#07111F]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(94,200,255,0.06) 0%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-16">
          <FadeUp>
            <div className="section-label mb-4">What We Do</div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Layanan Digital <span className="text-gradient">Terdepan</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.1} className="lg:text-right">
            <p className="text-[#A8B3C7] text-base sm:text-lg leading-relaxed max-w-md ml-auto">
              Solusi teknologi terpadu dari konsep, arsitektur, hingga peluncuran sistem skala besar.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-[#5EC8FF] hover:text-white transition-colors group"
            >
              Lihat Semua Layanan
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeUp>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, i) => {
            const Icon = ICON_MAP[service.icon || 'Zap'] || Zap;

            return (
              <FadeUp key={service.id} delay={i * 0.1}>
                <motion.div
                  className="glass-card rounded-3xl p-8 h-full flex flex-col justify-between relative group"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    {/* Icon container */}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                      style={{
                        background: `${service.color}15`,
                        border: `1px solid ${service.color}40`,
                        boxShadow: `0 0 20px ${service.color}20`,
                      }}
                    >
                      <Icon className="w-7 h-7" style={{ color: service.color }} />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#5EC8FF] transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-[#A8B3C7] text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Feature Bullets */}
                    <ul className="space-y-2.5 mb-8">
                      {service.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2.5 text-xs font-medium text-[#A8B3C7]">
                          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#5EC8FF]" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-bold text-[#1E88FF] group-hover:text-[#5EC8FF] transition-colors pt-4 border-t border-white/5">
                    Konsultasi Layanan
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
