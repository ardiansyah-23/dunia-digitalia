'use client';

import CountUp from '@/components/animations/CountUp';
import BlurIn from '@/components/animations/BlurIn';
import { STATS_DATA } from '@/lib/constants/services';
import { TrendingUp } from 'lucide-react';

export default function StatsSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #07111F 0%, rgba(15,29,53,0.5) 50%, #07111F 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(30,136,255,0.06) 0%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <BlurIn className="text-center mb-14">
          <div className="section-label mx-auto w-fit mb-4">Our Impact</div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Angka yang <span className="text-gradient">Berbicara</span>
          </h2>
        </BlurIn>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {STATS_DATA.map((stat, i) => (
            <BlurIn key={stat.label} delay={i * 0.15}>
              <div
                className="relative group rounded-2xl p-8 text-center overflow-hidden"
                style={{
                  background: 'rgba(15,29,53,0.7)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(30,136,255,0.3)';
                  el.style.boxShadow = '0 0 40px rgba(30,136,255,0.1)';
                  el.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(255,255,255,0.08)';
                  el.style.boxShadow = 'none';
                  el.style.transform = 'translateY(0)';
                }}
              >
                {/* Corner accent */}
                <div
                  className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-20"
                  style={{ background: 'linear-gradient(135deg, #1E88FF, transparent)' }}
                />

                <div className="relative">
                  <div className="flex items-center justify-center mb-3">
                    <TrendingUp className="w-5 h-5 text-[#1E88FF] opacity-70" />
                  </div>
                  <div
                    className="text-5xl lg:text-6xl font-extrabold mb-2 tracking-tight"
                    style={{
                      background: 'linear-gradient(135deg, #fff 0%, #5EC8FF 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    <CountUp end={stat.value} suffix={stat.suffix} duration={2.2} />
                  </div>
                  <p className="text-[#A8B3C7] text-sm font-medium tracking-wide">
                    {stat.label}
                  </p>
                </div>

                {/* Bottom glow line */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(30,136,255,0.5), transparent)' }}
                />
              </div>
            </BlurIn>
          ))}
        </div>
      </div>
    </section>
  );
}
