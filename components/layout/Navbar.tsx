'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, ArrowRight, Bell, Sparkles } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants/nav';
import PromoBanner from '@/components/sections/PromoBanner';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Kupon Diskon Rp 20.000',
      message: 'Gunakan kode PROMO2026 saat checkout untuk potongan harga langsung.',
      time: 'Baru saja',
      unread: true,
    },
    {
      id: '2',
      title: 'Update Template Blogger V2.4',
      message: 'Versi terbaru template NewsFast dengan kecepatan Core Web Vitals 99.',
      time: '2 jam lalu',
      unread: true,
    },
    {
      id: '3',
      title: 'Pembayaran Otomatis Tripay',
      message: 'Sistem payment gateway QRIS & VA aktif 24 jam tanpa jeda.',
      time: '1 hari lalu',
      unread: false,
    },
  ]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setNotifOpen(false);
  }, [pathname]);

  // Click Outside Handler for Notification Dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
    }

    if (notifOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [notifOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/produk?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <PromoBanner />
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
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

          {/* Top-Right Control Buttons (Non-overlapping, neatly spaced) */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 relative">

            {/* Notification Bell Dropdown Button & Popover */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="p-2.5 rounded-xl bg-slate-100/80 hover:bg-blue-50 text-slate-600 hover:text-blue-600 relative transition-all border border-slate-200/60 focus:outline-none"
                title="Notifikasi"
                aria-label="Lonceng Notifikasi"
              >
                <Bell className="w-4.5 h-4.5" />
                {notifications.some((n) => n.unread) && (
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 absolute top-1 right-1 ring-2 ring-white animate-pulse" />
                )}
              </button>

              {/* Notification Popover Dropdown */}
              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-3 w-80 sm:w-96 rounded-2xl bg-white border border-slate-200/90 p-4 shadow-2xl z-50 space-y-3"
                  >
                    <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                      <span className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <Bell className="w-4 h-4 text-blue-600" />
                        <span>Notifikasi</span>
                      </span>
                      {notifications.some((n) => n.unread) && (
                        <button
                          onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))}
                          className="text-[10px] font-bold text-blue-600 hover:underline"
                        >
                          Tandai Dibaca
                        </button>
                      )}
                    </div>

                    <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-slate-400 text-center py-4">Belum ada notifikasi baru.</p>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            className={`p-3 rounded-xl border text-xs transition-colors space-y-1 ${
                              n.unread
                                ? 'bg-blue-50/50 border-blue-100 text-slate-800'
                                : 'bg-slate-50/60 border-slate-100 text-slate-600'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-slate-900 text-xs">{n.title}</span>
                              <span className="text-[10px] text-slate-400 shrink-0">{n.time}</span>
                            </div>
                            <p className="text-[11px] text-slate-600 leading-relaxed">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/login"
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 rounded-xl hover:bg-slate-50 transition-colors hidden sm:block"
            >
              Masuk
            </Link>
            <Link
              href="/login?tab=register"
              className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5 shadow-xs shrink-0"
            >
              <span>Daftar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors shrink-0"
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
