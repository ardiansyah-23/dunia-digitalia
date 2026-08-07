'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShoppingBag,
  Star,
  Download,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Globe,
  Layout,
  Code,
  Newspaper,
  BookOpen,
  LayoutGrid,
  Puzzle,
  ChevronDown,
  Sparkles,
  Laptop,
  Smartphone,
  Tablet,
  TrendingUp,
  Award,
  Users,
  Check,
  Mail,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import { PRODUCTS_DATA } from '@/lib/constants/products';
import { CATEGORIES_DATA } from '@/lib/constants/categories';
import { FAQ_DATA } from '@/lib/constants/faq';
import { getCollection } from '@/lib/supabase/database';

export default function MarketplaceHomePage() {
  const [openFaq, setOpenFaq] = useState<string | null>('1');
  const [products, setProducts] = useState(PRODUCTS_DATA);
  const [categories, setCategories] = useState(CATEGORIES_DATA);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [services, setServices] = useState<any[]>([
    {
      title: 'Company Profile Website',
      startingPrice: 1500000,
      description: 'Website profil perusahaan profesional, responsif, dan siap SEO untuk meningkatkan kredibilitas merek Anda.',
      features: ['Desain Kustom Eksklusif', 'Gratis Domain .com 1 Tahun', 'Optimasi Kecepatan 95+', 'Garansi & Maintenance 30 Hari'],
    },
    {
      title: 'Website Toko Online E-Commerce',
      startingPrice: 2500000,
      description: 'Toko online lengkap dengan integrasi payment gateway Tripay (QRIS/VA) dan kalkulasi ongkir otomatis.',
      features: ['Payment Gateway QRIS/VA', 'Katalog Produk Unlimited', 'Kalkulasi Cek Ongkir Otomatis', 'Dashboard Penjualan Admin'],
    },
    {
      title: 'Portal Berita / Media Digital',
      startingPrice: 3000000,
      description: 'Website portal berita bertrafik tinggi dengan manajemen sistem redaksi lengkap dan slot iklan AdSense.',
      features: ['Arsitektur Kecepatan Tinggi', 'Slot Iklan AdSense Ready', 'Schema News JSON-LD SEO', 'Kategori Berita Multi-level'],
    },
  ]);
  const [testimonials, setTestimonials] = useState<any[]>([
    {
      name: 'Rian Hidayat',
      role: 'Blogger & Media Creator',
      company: 'TeknoNusa',
      content: 'Template NewsFast sangat cepat dan rapi. Struktur SEO JSON-LD membuat pendapatan Google AdSense blog saya naik lebih dari 40% dalam 2 bulan!',
      rating: 5,
    },
    {
      name: 'Siti Rahma',
      role: 'Pemilik Toko Online',
      company: 'FashionKu ID',
      content: 'Jasa pembuatan website toko online dari Dunia Digitalia sangat profesional. Pembayaran otomatis via Tripay QRIS membuat transaksi dari pembeli langsung terproses 24 jam.',
      rating: 5,
    },
    {
      name: 'Budi Santoso',
      role: 'Frontend Architect',
      company: 'Digital Agency Jakarta',
      content: 'Source code Next.js 15 App Router-nya sangat bersih, modular, dan dokumentasinya jelas. Sangat menghemat waktu pengembangan proyek klien kami.',
      rating: 5,
    },
  ]);

  useEffect(() => {
    getCollection<any>('products')
      .then((data) => {
        if (data && data.length > 0) {
          setProducts(data);
        }
      })
      .catch((err) => console.error('Error loading products:', err));

    getCollection<any>('categories')
      .then((data) => {
        if (data && data.length > 0) {
          setCategories(data);
        }
      })
      .catch((err) => console.error('Error loading categories:', err));

    getCollection<any>('services')
      .then((data) => {
        if (data && data.length > 0) {
          setServices(data.filter((s) => s.active !== false));
        }
      })
      .catch((err) => console.error('Error loading services:', err));

    getCollection<any>('testimonials')
      .then((data) => {
        if (data && data.length > 0) {
          setTestimonials(data);
        }
      })
      .catch((err) => console.error('Error loading testimonials:', err));
  }, []);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(false), 5000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <main className="flex-grow pt-20">
        <PageTransition>

          {/* ============================================
             1. HERO SECTION
             ============================================ */}
          <section className="relative bg-white border-b border-slate-200/80 py-20 lg:py-28 overflow-hidden">
            {/* Background Subtle Gradient Glow */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                
                {/* Left Column — Content */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                  
                  {/* Category Pill Tag */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                    <span>Marketplace Digital & Web Development Agency #1</span>
                  </div>

                  {/* Main Headline */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.12] tracking-tight text-balance">
                    Bangun Website & Aplikasi Web <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Lebih Cepat & Professional.</span>
                  </h1>

                  {/* Description Paragraph */}
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                    Pusat template Blogger premium, source code aplikasi web siap pakai, AI prompt, serta jasa pembuatan website kustom berkinerja tinggi untuk mengakselerasi pertumbuhan bisnis Anda.
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
                    <Link href="/produk" className="btn-primary text-sm px-8 py-3.5 rounded-2xl flex items-center gap-2 shadow-lg shadow-blue-500/20">
                      <ShoppingBag className="w-4 h-4" />
                      <span>Jelajahi Katalog Produk</span>
                    </Link>
                    <Link href="/jasa" className="btn-secondary text-sm px-7 py-3.5 rounded-2xl flex items-center gap-2">
                      <span>Pesan Jasa Website</span>
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                    </Link>
                  </div>

                  {/* Trust Indicators Bar */}
                  <div className="pt-8 border-t border-slate-100 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 font-semibold">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>Instan Download 24/7</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>100% Bebas Malware</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>Bayar QRIS / VA Otomatis</span>
                    </div>
                  </div>

                </div>

                {/* Right Column — Card Showcase Visual */}
                <div className="lg:col-span-5 relative flex items-center justify-center">
                  <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 text-white shadow-2xl border border-slate-800 space-y-4 relative overflow-hidden">
                    {/* Subtle Glow inside mockup container */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500" />
                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">dunia-digitalia.com</span>
                    </div>

                    {/* Featured Item 1 */}
                    <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex items-center gap-4 hover:border-blue-500/60 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold shrink-0">
                        <Laptop className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-sm truncate">NewsFast Blogger Template</h4>
                        <p className="text-xs text-slate-400 truncate">V2.4 • AdSense Ready & Fast</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-extrabold text-blue-400">Rp 149.000</span>
                          <span className="text-[10px] text-slate-500 line-through">Rp 299.000</span>
                        </div>
                      </div>
                    </div>

                    {/* Featured Item 2 */}
                    <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex items-center gap-4 hover:border-emerald-500/60 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold shrink-0">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-sm truncate">Tokodigital Next.js App</h4>
                        <p className="text-xs text-slate-400 truncate">Tripay QRIS & Ongkir Auto</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-extrabold text-emerald-400">Rp 349.000</span>
                          <span className="text-[10px] text-slate-500 line-through">Rp 500.000</span>
                        </div>
                      </div>
                    </div>

                    {/* Featured Item 3 */}
                    <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex items-center gap-4 hover:border-purple-500/60 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 flex items-center justify-center font-bold shrink-0">
                        <Tablet className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-sm truncate">OmniDash Admin Template</h4>
                        <p className="text-xs text-slate-400 truncate">Recharts & 50+ Komponen UI</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-extrabold text-purple-400">Rp 199.000</span>
                          <span className="text-[10px] text-slate-500 line-through">Rp 350.000</span>
                        </div>
                      </div>
                    </div>

                    {/* Stat Footnote */}
                    <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-2">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>Rating Kepuasan 4.9/5 dari 500+ Pembeli</span>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* ============================================
             2. TRUSTED LOGO PROOF WALL
             ============================================ */}
          <section className="bg-slate-100/70 border-b border-slate-200/80 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Dipercayai oleh 5.000+ Developer, Blogger, & Pelaku Usaha di Seluruh Indonesia
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all">
                {['TechCorp ID', 'MediaNusa Digital', 'SolusiData Web', 'TokoModern App', 'StudioWeb Kreatif', 'EduTekno'].map((brand) => (
                  <span key={brand} className="text-sm sm:text-base font-black text-slate-700 tracking-tight">
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ============================================
             3. PRODUCT CATEGORIES (12 Categories Grid)
             ============================================ */}
          <section className="py-24 bg-white border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
              
              {/* Section Header */}
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="badge-primary">Kategori Produk</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Jelajahi Produk Berdasarkan Kategori
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Temukan berbagai kategori template, source code, dan aset digital yang dirancang untuk mempercepat alur kerja Anda.
                </p>
              </div>

              {/* Grid 12 Categories */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/produk?kategori=${cat.slug}`}
                    className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-blue-500 hover:bg-blue-50/40 hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-xs">
                        <Layout className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-200/50 flex items-center justify-between text-xs font-semibold text-blue-600">
                      <span>{cat.productCount} Item Tersedia</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          </section>

          {/* ============================================
             4. FEATURED PRODUCTS GRID
             ============================================ */}
          <section className="py-24 bg-slate-50 border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              
              {/* Header with View All Button */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/60 pb-6">
                <div className="space-y-2">
                  <span className="badge-primary">Pilihan Terpopuler</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    Produk Digital Unggulan
                  </h2>
                  <p className="text-slate-600 text-sm">
                    Template & source code siap pakai yang paling banyak digunakan oleh developer.
                  </p>
                </div>
                <Link href="/produk" className="btn-secondary text-xs px-5 py-3 rounded-xl flex items-center gap-1.5 shrink-0">
                  <span>Lihat Semua Produk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Product Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.slice(0, 6).map((product) => (
                  <div key={product.id} className="card-product overflow-hidden flex flex-col justify-between group">
                    <div>
                      {/* Product Thumbnail Banner */}
                      <div className="h-52 relative overflow-hidden bg-slate-100">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-lg text-[10px] font-bold bg-white/90 text-slate-900 backdrop-blur-md shadow-xs">
                          {product.category}
                        </span>
                      </div>

                      {/* Product Content Details */}
                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-1.5 text-amber-500 text-xs font-bold">
                          <Star className="w-4 h-4 fill-amber-400" />
                          <span>{product.rating}</span>
                          <span className="text-slate-400 font-normal">({product.reviewCount} ulasan)</span>
                        </div>

                        <Link href={`/produk/${product.slug}`} className="block">
                          <h3 className="font-extrabold text-slate-900 text-lg leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                            {product.title}
                          </h3>
                        </Link>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {product.shortDescription}
                        </p>
                      </div>
                    </div>

                    {/* Card Pricing & Action Footer */}
                    <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                      <div>
                        {product.discountPrice && product.discountPrice > 0 && (
                          <span className="text-xs text-slate-400 line-through block">
                            Rp {product.discountPrice.toLocaleString('id-ID')}
                          </span>
                        )}
                        <span className="text-xl font-black text-blue-600">
                          Rp {product.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <Link
                        href={`/checkout?product=${product.id}`}
                        className="btn-primary text-xs px-5 py-2.5 rounded-xl shadow-xs"
                      >
                        Beli Sekarang
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* ============================================
             5. AGENCY WEB SERVICES COMPARISON
             ============================================ */}
          <section className="py-24 bg-white border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="badge-primary">Web Development Agency</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Jasa Pembuatan Website Kustom & Profesional
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Tim pengembang berpengalaman kami siap membangun platform digital dengan standar performa dan arsitektur kelas atas.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service, idx) => (
                  <div
                    key={idx}
                    className="p-8 rounded-3xl bg-slate-50/90 border border-slate-200/90 hover:border-blue-500 hover:shadow-xl transition-all flex flex-col justify-between relative overflow-hidden"
                  >
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900 mb-2">{service.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-6">{service.description || service.desc}</p>
                      
                      <div className="p-4 rounded-2xl bg-white border border-slate-200/70 mb-6">
                        <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">Investasi Mulai Dari</span>
                        <div className="text-2xl font-black text-blue-600 mt-0.5">
                          Rp {(service.startingPrice || 1500000).toLocaleString('id-ID')}
                        </div>
                      </div>

                      <ul className="space-y-3 mb-8 text-xs text-slate-700 font-semibold">
                        {Array.isArray(service.features) &&
                          (service.features as string[]).map((feature: string) => (
                            <li key={feature} className="flex items-center gap-2.5">
                              <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                <Check className="w-3 h-3" />
                              </div>
                              <span>{feature}</span>
                            </li>
                          ))}
                      </ul>
                    </div>

                    <Link href="/jasa" className="btn-secondary w-full text-center text-xs py-3.5 rounded-xl font-bold">
                      Konsultasi & Pesan Jasa Ini
                    </Link>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* ============================================
             6. WHY CHOOSE US (3 MAIN ADVANTAGES)
             ============================================ */}
          <section className="py-24 bg-slate-50 border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-center">
              
              <div className="space-y-3 max-w-2xl mx-auto">
                <span className="badge-primary">Keunggulan Layanan</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Mengapa Memilih Dunia Digitalia?
                </h2>
                <p className="text-slate-600 text-sm">
                  Komitmen kami dalam memberikan standar kode, kualitas desain, dan kenyamanan terbaik bagi setiap klien.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-8">
                
                <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs text-center space-y-4 hover:border-blue-300 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
                    <Download className="w-7 h-7" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg">Pengunduhan Instan 24/7</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Setelah pembayaran berhasil dikonfirmasi secara otomatis via Tripay, berkas produk dapat langsung diunduh tanpa menunggu verifikasi manual.
                  </p>
                </div>

                <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs text-center space-y-4 hover:border-emerald-300 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg">Kode Bebas Backdoor</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Seluruh berkas source code dan template Blogger diuji secara intensif untuk menjamin 100% keamanan dari backdoor atau script berbahaya.
                  </p>
                </div>

                <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs text-center space-y-4 hover:border-purple-300 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto shadow-xs">
                    <Zap className="w-7 h-7" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg">Garansi & Bantuan Technical</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tim pengembang kami selalu siap membantu memberikan petunjuk teknis jika Anda mengalami kendala pada proses instalasi.
                  </p>
                </div>

              </div>

            </div>
          </section>

          {/* ============================================
             7. TESTIMONIALS SECTION
             ============================================ */}
          <section className="py-24 bg-white border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <span className="badge-primary">Ulasan Pengguna</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Apa Kata Pelanggan & Klien Kami?
                </h2>
                <p className="text-slate-600 text-sm">
                  Dengarkan pengalaman langsung dari para pembeli dan pemilik bisnis yang telah mempercayakan proyeknya pada kami.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((t, idx) => (
                  <div key={idx} className="p-7 rounded-3xl bg-slate-50/80 border border-slate-200/80 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex gap-1 text-amber-400">
                        {[...Array(t.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed italic">
                        "{t.content}"
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-200/60 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                        {t.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-xs">{t.name}</h4>
                        <span className="text-[11px] text-slate-500 font-medium">{t.role} • {t.company || 'Pelanggan'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* ============================================
             8. FAQ & NEWSLETTER
             ============================================ */}
          <section className="py-24 bg-slate-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              
              {/* FAQ Header */}
              <div className="text-center space-y-3">
                <span className="badge-primary">FAQ</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Pertanyaan yang Sering Diajukan
                </h2>
                <p className="text-slate-600 text-sm">
                  Temukan jawaban cepat mengenai proses pembelian, lisensi, dan layanan kami.
                </p>
              </div>

              {/* Accordion List */}
              <div className="space-y-3.5">
                {FAQ_DATA.map((faq) => (
                  <div key={faq.id} className="rounded-2xl bg-white border border-slate-200/80 overflow-hidden shadow-2xs">
                    <button
                      onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                      className="w-full p-5 text-left font-bold text-slate-900 text-sm sm:text-base flex items-center justify-between gap-4"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${openFaq === faq.id ? 'rotate-180 text-blue-600' : ''}`} />
                    </button>
                    {openFaq === faq.id && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Premium Dark Newsletter Container */}
              <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white text-center space-y-5 shadow-2xl border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto">
                  <Mail className="w-6 h-6" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Dapatkan Promo Exklusif & Update Template Terbaru
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                  Berlangganan newsletter kami untuk menerima voucher diskon khusus dan rilisan produk digital terbaru secara langsung.
                </p>

                {newsletterSuccess ? (
                  <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold max-w-md mx-auto">
                    ✓ Terima kasih! Alamat email Anda telah berhasil terdaftar dalam newsletter kami.
                  </div>
                ) : (
                  <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto pt-2">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      required
                      placeholder="Masukkan alamat email Anda"
                      className="flex-grow px-4 py-3.5 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold transition-colors shadow-lg shadow-blue-500/30 shrink-0"
                    >
                      Berlangganan
                    </button>
                  </form>
                )}
              </div>

            </div>
          </section>

        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
