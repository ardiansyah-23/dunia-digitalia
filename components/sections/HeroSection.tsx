'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle, Sparkles, Shield, Cpu, Code2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import CircuitBackground from '@/components/animations/CircuitBackground';
import BlurIn from '@/components/animations/BlurIn';
import FadeUp from '@/components/animations/FadeUp';

const ParticleField = dynamic(() => import('@/components/animations/ParticleField'), { ssr: false });
const Globe3D = dynamic(() => import('@/components/animations/Globe3D'), { ssr: false });

const TECH_TAGS = ['Next.js 15', 'Artificial Intelligence', 'React 19', 'Python Automation', 'Firebase', 'TypeScript', 'Cloud Solutions'];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(30,136,255,0.18) 0%, transparent 70%), #07111F',
      }}
    >
      <CircuitBackground />
      <ParticleField />

      {/* Ambient background glow orbs */}
      <div
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(30,136,255,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute top-1/2 right-10 w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,200,255,0.1) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column — 7 cols */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <BlurIn delay={0.1}>
              <div className="section-label">
                <Sparkles className="w-3.5 h-3.5 text-[#5EC8FF]" />
                Digital Agency & Technology Education
              </div>
            </BlurIn>

            <FadeUp delay={0.2}>
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold text-white leading-[1.08] tracking-tight">
                Build Your{' '}
                <span className="text-gradient">Digital</span>
                <br />
                Future.
              </h1>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="text-[#A8B3C7] text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Platform edukasi dan agensi teknologi untuk tim yang ingin membangun{' '}
                <strong className="text-white font-semibold">AI siap produksi</strong>,{' '}
                <strong className="text-white font-semibold">aplikasi web modern</strong>,{' '}
                <strong className="text-white font-semibold">otomasi bisnis</strong>, dan{' '}
                <strong className="text-white font-semibold">infrastruktur cloud</strong>.
              </p>
            </FadeUp>

            {/* CTAs */}
            <FadeUp delay={0.4}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link href="/tutorial" className="btn-primary text-base px-8 py-4">
                  <PlayCircle className="w-5 h-5" />
                  Start Learning
                </Link>
                <Link href="/portfolio" className="btn-secondary text-base px-8 py-4">
                  View Portfolio
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </FadeUp>

            {/* Technology Pill Badges */}
            <FadeUp delay={0.5}>
              <div className="pt-4">
                <p className="text-xs uppercase font-bold tracking-widest text-[#A8B3C7] mb-3">Teknologi Utama</p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                  {TECH_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1.5 rounded-full text-xs font-semibold"
                      style={{
                        background: 'rgba(15,29,53,0.9)',
                        border: '1px solid rgba(30,136,255,0.25)',
                        color: '#A8B3C7',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right Column — 5 cols (3D Globe & Highlights) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <BlurIn delay={0.3} className="w-full h-[480px] relative">
              <Globe3D />

              {/* Floating Feature Badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-10 -left-4 p-4 rounded-2xl glass-card hidden sm:flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1E88FF]/20 border border-[#1E88FF]/40 flex items-center justify-center text-[#5EC8FF]">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">AI Machine Learning</h4>
                  <p className="text-[10px] text-[#A8B3C7]">Model produksi terintegrasi</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-12 -right-4 p-4 rounded-2xl glass-card hidden sm:flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#00C8FF]/20 border border-[#00C8FF]/40 flex items-center justify-center text-[#00C8FF]">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Next.js 15 & React 19</h4>
                  <p className="text-[10px] text-[#A8B3C7]">Performa Kilat 100/100</p>
                </div>
              </motion.div>
            </BlurIn>
          </div>

        </div>
      </div>
    </section>
  );
}
