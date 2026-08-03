'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Globe, Zap, Palette, Smartphone, Cloud } from 'lucide-react';
import FadeUp from '@/components/animations/FadeUp';
import BlurIn from '@/components/animations/BlurIn';
import { SERVICES_DATA } from '@/lib/constants/services';

const ICON_MAP: Record<string, React.ElementType> = {
  Brain, Globe, Zap, Palette, Smartphone, Cloud,
};

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-24 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(ellipse 50% 50% at 80% 30%, rgba(94,200,255,0.04) 0%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header — asymmetric */}
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-16 lg:mb-20">
          <FadeUp>
            <div className="section-label mb-4">What We Do</div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Layanan Digital<br />
              <span className="text-gradient">Terdepan</span>
            </h2>
          </FadeUp>
          <FadeUp delay={1} className="lg:text-right">
            <p className="text-[#A8B3C7] text-lg leading-relaxed max-w-md ml-auto">
              Dari konsep hingga produk jadi — kami hadir di setiap tahap perjalanan digital Anda dengan keahlian dan dedikasi penuh.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-[#5EC8FF] hover:text-white transition-colors group"
            >
              Lihat Semua Layanan
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeUp>
        </div>

        {/* Services grid — asymmetric layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES_DATA.map((service, i) => {
            const Icon = ICON_MAP[service.icon] || Zap;
            const isLarge = i === 0 || i === 4; // featured cards

            return (
              <FadeUp key={service.id} delay={i + 1} className={isLarge ? 'md:col-span-1' : ''}>
                <motion.div
                  className="group relative h-full rounded-2xl p-7 cursor-pointer overflow-hidden"
                  style={{
                    background: 'rgba(15,29,53,0.8)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(10px)',
                  }}
                  whileHover={{
                    borderColor: `${service.color}30`,
                    boxShadow: `0 0 40px ${service.color}15, 0 4px 32px rgba(0,0,0,0.4)`,
                    y: -4,
                  }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                >
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${service.color}60, transparent)` }}
                  />

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{
                      background: `${service.color}15`,
                      border: `1px solid ${service.color}25`,
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: service.color }} />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-gradient transition-all">
                    {service.title}
                  </h3>

                  <p className="text-[#A8B3C7] text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2.5 text-xs text-[#A8B3C7]">
                        <div
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: service.color }}
                        />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                    style={{ color: service.color }}>
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </div>

                  {/* Corner glow */}
                  <div
                    className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `radial-gradient(circle at bottom right, ${service.color}15, transparent)` }}
                  />
                </motion.div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
