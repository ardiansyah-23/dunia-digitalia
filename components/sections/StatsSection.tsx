'use client';

import CountUp from '@/components/animations/CountUp';
import BlurIn from '@/components/animations/BlurIn';
import { STATS_DATA } from '@/lib/constants/services';
import { TrendingUp, Layers, Users, BookOpen } from 'lucide-react';

const STAT_ICONS = [Layers, Users, BookOpen, TrendingUp];

export default function StatsSection() {
  return (
    <section className="relative py-20 bg-[#07111F]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(30,136,255,0.08) 0%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <BlurIn className="text-center mb-14">
          <div className="section-label mx-auto w-fit mb-3">Our Impact</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Angka yang <span className="text-gradient">Berbicara</span>
          </h2>
        </BlurIn>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS_DATA.map((stat, i) => {
            const Icon = STAT_ICONS[i % STAT_ICONS.length];
            return (
              <BlurIn key={stat.label} delay={i * 0.15}>
                <div className="glass-card rounded-2xl p-8 text-center relative overflow-hidden group">
                  {/* Top glowing line */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#1E88FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="w-12 h-12 rounded-2xl bg-[#1E88FF]/10 border border-[#1E88FF]/30 flex items-center justify-center text-[#5EC8FF] mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="text-4xl sm:text-5xl font-black mb-2 text-gradient tracking-tight">
                    <CountUp end={stat.value} suffix={stat.suffix} duration={2.5} />
                  </div>

                  <p className="text-[#A8B3C7] text-sm font-semibold tracking-wide uppercase">
                    {stat.label}
                  </p>
                </div>
              </BlurIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
