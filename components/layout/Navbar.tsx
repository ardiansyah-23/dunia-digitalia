'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants/nav';
import { cn } from '@/lib/utils/cn';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-[rgba(7,17,31,0.85)] backdrop-blur-xl border-b border-white/5 shadow-[0_4px_32px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, #1E88FF, #00C8FF)',
                  boxShadow: '0 0 20px rgba(30,136,255,0.5)',
                }}
              />
              <Zap className="relative z-10 w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-[1.05rem] tracking-tight text-white group-hover:text-[#5EC8FF] transition-colors">
              Dunia<span className="text-gradient">Digitalia</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                    active
                      ? 'text-white'
                      : 'text-[#A8B3C7] hover:text-white'
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'rgba(30,136,255,0.12)', border: '1px solid rgba(30,136,255,0.2)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link href="/contact" className="hidden sm:block btn-primary text-sm px-5 py-2.5">
              Get Started
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-[#A8B3C7] hover:text-white hover:border-white/20 transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 lg:hidden"
              style={{
                background: 'rgba(7,17,31,0.98)',
                backdropFilter: 'blur(20px)',
                borderLeft: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div className="flex items-center justify-between px-6 h-16 border-b border-white/5">
                <span className="font-bold text-white">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-[#A8B3C7] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-col p-4 gap-1">
                {NAV_LINKS.map((link, i) => {
                  const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          'flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all',
                          active
                            ? 'bg-[rgba(30,136,255,0.12)] text-white border border-[rgba(30,136,255,0.2)]'
                            : 'text-[#A8B3C7] hover:text-white hover:bg-white/5'
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
                <div className="pt-4 mt-2 border-t border-white/5">
                  <Link href="/contact" className="btn-primary w-full text-center block">
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
