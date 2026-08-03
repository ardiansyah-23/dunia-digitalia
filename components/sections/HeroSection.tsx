'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle } from 'lucide-react';
import dynamic from 'next/dynamic';
import CircuitBackground from '@/components/animations/CircuitBackground';
import BlurIn from '@/components/animations/BlurIn';
import FadeUp from '@/components/animations/FadeUp';

const ParticleField = dynamic(() => import('@/components/animations/ParticleField'), { ssr: false });
const Globe3D = dynamic(() => import('@/components/animations/Globe3D'), { ssr: false });

const TECH_TAGS = ['Next.js', 'AI / ML', 'React', 'Python', 'Firebase', 'TypeScript', 'Automation', 'Cloud'];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 10% 50%, rgba(30,136,255,0.08) 0%, transparent 70%), #07111F',
      }}
    >
      <CircuitBackground />
      <ParticleField />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(30,136,255,0.06) 0%, transparent 70%)', transform: 'translate(-50%, -50%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-screen py-28 lg:py-20">

          {/* Left — Content */}
          <div className="max-w-xl">
            <BlurIn delay={0.1}>
              <div className="section-label mb-6">
                Digital Agency & Tech Education
              </div>
            </BlurIn>

            <FadeUp delay={2}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">
                Build Your{' '}
                <span className="text-gradient">Digital</span>
                <br />
                Future.
              </h1>
            </FadeUp>

            <FadeUp delay={3}>
              <p className="text-[#A8B3C7] text-lg lg:text-xl leading-relaxed mb-8 max-w-md">
                Pelajari{' '}
                <span className="text-white font-medium">Kecerdasan Buatan</span>,{' '}
                <span className="text-white font-medium">Pengembangan Web</span>,{' '}
                <span className="text-white font-medium">Otomasi</span>,{' '}
                dan Teknologi Modern dalam satu platform.
              </p>
            </FadeUp>

            <FadeUp delay={4}>
              <div className="flex flex-wrap gap-4 mb-12">
                <Link href="/tutorial" className="btn-primary flex items-center gap-2">
                  <PlayCircle className="w-4 h-4" />
                  Start Learning
                </Link>
                <Link href="/portfolio" className="btn-secondary flex items-center gap-2">
                  View Portfolio
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeUp>

            {/* Tech tags */}
            <FadeUp delay={5}>
              <div className="flex flex-wrap gap-2">
                {TECH_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: 'rgba(30,136,255,0.08)',
                      border: '1px solid rgba(30,136,255,0.18)',
                      color: '#A8B3C7',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Right — Globe */}
          <BlurIn delay={0.3} className="hidden lg:flex items-center justify-center relative h-[520px]">
            <Globe3D />
          </BlurIn>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-px h-12 rounded-full" style={{ background: 'linear-gradient(180deg, rgba(30,136,255,0.6) 0%, transparent 100%)' }} />
        <div className="w-1.5 h-1.5 rounded-full bg-[#1E88FF]" />
      </motion.div>
    </section>
  );
}
