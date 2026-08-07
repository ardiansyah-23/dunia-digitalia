'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants/nav';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/produk?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs py-3'
            : 'bg-white/80 backdrop-blur-md border-b border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
              D
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl text-slate-900 tracking-tight leading-none">
                Dunia<span className="text-blue-600">Digitalia</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-widest uppercase mt-0.5">
                Digital Tech Platform
              </span>
            </div>
          </Link>

          {/* Search Bar (Desktop) */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-sm relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari template, source code, jasa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-12 py-2 text-xs bg-slate-100/80 border border-slate-200/60 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none transition-all shadow-2xs"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs">
              ↵
            </span>
          </form>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all relative ${
                    isActive
                      ? 'text-blue-600 bg-blue-50/80 font-bold'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Auth & Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 rounded-xl hover:bg-slate-50 transition-colors hidden sm:block"
            >
              Masuk
            </Link>
            <Link
              href="/login?tab=register"
              className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5 shadow-sm"
            >
              <span>Daftar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-x-0 top-[65px] z-50 p-5 bg-white border-b border-slate-200 shadow-2xl lg:hidden space-y-4 max-h-[85vh] overflow-y-auto"
            >
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari template, source code, jasa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </form>

              {/* Navigation Links */}
              <div className="flex flex-col gap-1 pt-1">
                {NAV_LINKS.map((link) => {
                  const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-4 py-3 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Auth Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                <Link
                  href="/login"
                  className="flex-1 py-2.5 text-center text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  href="/login?tab=register"
                  className="flex-1 py-2.5 text-center text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs"
                >
                  Daftar Akun
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
