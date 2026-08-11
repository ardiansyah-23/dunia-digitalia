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

  const [recentOrders, setRecentOrders] = useState<any[]>([
    {
      id: 'TRX-9821',
      customer_name: 'Budi Santoso',
      customer_email: 'budi***@gmail.com',
      product_title: 'Tokodigital Next.js 15 App',
      amount: 349000,
      payment_method: 'Tripay QRIS',
      timeAgo: 'Baru saja',
      status: 'Paid',
    },
    {
      id: 'TRX-9820',
      customer_name: 'Rian Hidayat',
      customer_email: 'rian***@yahoo.com',
      product_title: 'NewsFast Blogger Template V2.4',
      amount: 149000,
      payment_method: 'BCA VA',
      timeAgo: '2 menit lalu',
      status: 'Paid',
    },
    {
      id: 'TRX-9819',
      customer_name: 'Siti Rahma',
      customer_email: 'siti***@outlook.com',
      product_title: 'Website Toko Online E-Commerce',
      amount: 2500000,
      payment_method: 'Mandiri VA',
      timeAgo: '5 menit lalu',
      status: 'Paid',
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

    getCollection<any>('orders')
      .then((data) => {
        if (data && data.length > 0) {
          const sorted = [...data].reverse().slice(0, 3).map((ord: any, idx: number) => ({
            id: ord.id || `TRX-${9820 - idx}`,
            customer_name: ord.customer_name || 'Pelanggan Digital',
            customer_email: ord.customer_email ? ord.customer_email.replace(/(.{2})(.*)(?=@)/, '$1***') : 'user***@gmail.com',
            product_title: ord.product_title || 'Produk Digital Premium',
            amount: Number(ord.amount) || 149000,
            payment_method: ord.payment_method || 'Tripay QRIS',
            timeAgo: idx === 0 ? 'Baru saja' : `${(idx + 1) * 3}m lalu`,
            status: ord.status || 'Paid',
          }));
          setRecentOrders(sorted);
        }
      })
      .catch((err) => console.error('Error loading recent orders:', err));
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

      <main className="flex-grow">
        <PageTransition>

          {/* ============================================
             1. HERO SECTION
             ============================================ */}
          <section className="relative bg-white border-b border-slate-200/80 pt-4 pb-12 lg:pt-6 lg:pb-20 overflow-hidden">
            {/* Background Subtle Gradient Glow */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                
                {/* Left Column — Content */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                  

                  {/* Main Headline */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.12] tracking-tight text-balance">
                    Template & Source Code Siap Pakai. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Website Kustom dalam 7 Hari.</span>
                  </h1>

                  {/* Description Paragraph */}
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                    Template Blogger premium, source code Next.js siap deploy, AI prompt, dan jasa pembuatan website kustom untuk developer dan pemilik bisnis yang tidak mau buang waktu.
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

                {/* Right Column — Recent Live Purchases Visual */}
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
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>Transaksi Masuk (Live)</span>
                      </div>
                    </div>

                    {/* Recent Orders Cards Stream */}
                    <div className="space-y-3">
                      {recentOrders.map((ord, idx) => (
                        <div
                          key={ord.id || idx}
                          className="p-3.5 rounded-2xl bg-slate-800/90 border border-slate-700/80 flex items-center gap-3.5 hover:border-blue-500/60 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold shrink-0">
                            <ShoppingBag className="w-5 h-5 text-blue-400" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-bold text-white text-xs truncate">{ord.customer_name}</span>
                              <span className="text-[10px] text-slate-400 shrink-0">{ord.timeAgo || 'Baru saja'}</span>
                            </div>
                            
                            <h4 className="font-extrabold text-blue-400 text-xs truncate mt-0.5">{ord.product_title}</h4>
                            
                            <div className="flex items-center justify-between mt-1 text-[11px]">
                              <span className="font-mono text-slate-300">Rp {Number(ord.amount).toLocaleString('id-ID')}</span>
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                ✓ Lunas ({ord.payment_method || 'Tripay'})
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Stat Footnote */}
                    <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-2 border-t border-slate-800/60">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>100% Diproses Otomatis 24 Jam via Tripay Gateway</span>
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
                Dipercayai 5.000+ developer, blogger, dan pemilik bisnis di Indonesia
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-60 hover:opacity-90 transition-all">
                {[
                  { name: 'TechCorp ID', color: '#1E40AF' },
                  { name: 'MediaNusa', color: '#0F766E' },
                  { name: 'SolusiData', color: '#7C3AED' },
                  { name: 'TokoModern', color: '#B45309' },
                  { name: 'StudioWeb', color: '#BE123C' },
                  { name: 'EduTekno', color: '#166534' },
                ].map((brand) => (
                  <span
                    key={brand.name}
                    className="text-sm sm:text-base font-black tracking-tight"
                    style={{ color: brand.color }}
                  >
                    {brand.name}
                  </span>
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
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    Produk Digital Unggulan
                  </h2>
                  <p className="text-slate-600 text-sm">
                    Template dan source code yang paling banyak dibeli developer Indonesia.
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
                          src={product.thumbnail || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80'}
                          alt={product.title}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80';
                          }}
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
             7. TESTIMONIALS SECTION
             ============================================ */}
          <section className="py-24 bg-white border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
              
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Kata Pelanggan & Klien
                </h2>
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
                        {t.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-xs">{t.name}</h4>
                        <span className="text-[11px] text-slate-500 font-medium">{t.role}, {t.company || 'Pelanggan'}</span>
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
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Pertanyaan yang Sering Diajukan
                </h2>
                <p className="text-slate-600 text-sm">
                  Jawaban cepat mengenai proses pembelian, lisensi, dan layanan kami.
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
                  Promo Eksklusif & Template Terbaru Langsung ke Inbox Anda
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                  Berlangganan newsletter kami untuk menerima voucher diskon dan produk digital terbaru lebih awal dari publik.
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
