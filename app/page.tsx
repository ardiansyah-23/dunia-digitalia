'use client';

import Link from 'next/link';
import Image from 'next/image';
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
  HelpCircle,
  Sparkles,
  Laptop,
  Smartphone,
  Tablet,
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
  const [services, setServices] = useState<any[]>([
    { title: 'Company Profile', startingPrice: 1500000, description: 'Website profil perusahaan profesional, responsif, dan SEO friendly.', features: ['Desain Kustom', 'Gratis Domain .com 1 Thn', 'Optimasi SEO', 'Garansi 30 Hari'] },
    { title: 'Website Toko Online', startingPrice: 2500000, description: 'Toko online lengkap dengan integrasi payment gateway Tripay & ongkir.', features: ['Payment Gateway QRIS/VA', 'Katalog Produk Unlimited', 'Cek Ongkir Otomatis', 'Admin Dashboard'] },
    { title: 'Portal Berita / Media', startingPrice: 3000000, description: 'Portal berita bertrafik tinggi dengan manajemen redaksi dan slot iklan.', features: ['Kecepatan Tinggi', 'Slot Iklan AdSense', 'Kategori Berita Multi-level', 'SEO Schema News'] }
  ]);
  const [testimonials, setTestimonials] = useState<any[]>([
    { name: 'Rian Hidayat', role: 'Blogger', content: 'Template NewsFast sangat cepat dan rapi. Pendapatan Google AdSense blog saya naik signifikan!', rating: 5 },
    { name: 'Siti Rahma', role: 'Pemilik Olshop', content: 'Jasa pembuatan toko online dari Dunia Digitalia sangat profesional. Pembayaran otomatis via Tripay berjalan lancar.', rating: 5 },
    { name: 'Budi Santoso', role: 'Developer', content: 'Source code Next.js 15 nya sangat rapi, modular, dan mudah dikembangkan lagi. Recommended!', rating: 5 }
  ]);

  useEffect(() => {
    getCollection<any>('products').then(data => {
      if (data && data.length > 0) {
        setProducts(data);
      }
    }).catch(err => console.error("Error loading products:", err));

    getCollection<any>('categories').then(data => {
      if (data && data.length > 0) {
        setCategories(data);
      }
    }).catch(err => console.error("Error loading categories:", err));

    getCollection<any>('services').then(data => {
      if (data && data.length > 0) {
        setServices(data.filter(s => s.active !== false));
      }
    }).catch(err => console.error("Error loading services:", err));

    getCollection<any>('testimonials').then(data => {
      if (data && data.length > 0) {
        setTestimonials(data);
      }
    }).catch(err => console.error("Error loading testimonials:", err));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-gray-800">
      <Navbar />

      <main className="flex-grow pt-24">
        <PageTransition>
          {/* ============================================
             1. HERO SECTION
             ============================================ */}
          <section className="bg-white border-b border-gray-200 py-16 lg:py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Column — Text */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    #1 Digital Marketplace & Agency di Indonesia
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15] tracking-tight">
                    Bangun Website Profesional <span className="text-blue-600">Tanpa Ribet.</span>
                  </h1>

                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    Temukan template Blogger premium, jasa pembuatan website, source code siap pakai, serta berbagai produk digital berkualitas untuk membantu bisnis dan proyek Anda berkembang.
                  </p>

                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                    <Link href="/produk" className="btn-primary text-sm px-7 py-3.5">
                      <ShoppingBag className="w-4 h-4" />
                      Jelajahi Produk
                    </Link>
                    <Link href="/portfolio" className="btn-secondary text-sm px-7 py-3.5">
                      Lihat Portfolio
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Trust Indicators */}
                  <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-gray-500 font-medium">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Instan Download 24/7</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>100% Bebas Malware</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Bayar Otomatis via QRIS/VA</span>
                    </div>
                  </div>
                </div>

                {/* Right Column — Device Mockup Showcase */}
                <div className="lg:col-span-5 relative flex items-center justify-center">
                  <div className="w-full max-w-md p-6 rounded-3xl bg-slate-50 border border-gray-200 shadow-xl space-y-4">
                    {/* Mockup Laptop Card */}
                    <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                        <Laptop className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">NewsFast Blogger Template</h4>
                        <p className="text-xs text-gray-500">Demo Live Preview & Dark Mode</p>
                        <span className="text-xs font-bold text-blue-600">Rp 149.000</span>
                      </div>
                    </div>

                    {/* Mockup Ecommerce Card */}
                    <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">Tokodigital Next.js 15 App</h4>
                        <p className="text-xs text-gray-500">Tripay Payment Gateway Included</p>
                        <span className="text-xs font-bold text-emerald-600">Rp 349.000</span>
                      </div>
                    </div>

                    {/* Mockup Tablet Card */}
                    <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                        <Tablet className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">OmniDash Admin Dashboard</h4>
                        <p className="text-xs text-gray-500">50+ Komponen UI Recharts</p>
                        <span className="text-xs font-bold text-indigo-600">Rp 199.000</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* ============================================
             2. TRUSTED BY LOGO WALL
             ============================================ */}
          <section className="bg-slate-50 border-b border-gray-200 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-6">
                Dipercayai oleh 5.000+ Pengembang & Pelaku Usaha di Indonesia
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60">
                {['TechCorp', 'MediaNusa', 'SolusiData', 'TokoModern', 'StudioWeb', 'EduTekno'].map((name) => (
                  <span key={name} className="text-sm font-extrabold text-gray-600 tracking-tight">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ============================================
             3. PRODUCT CATEGORIES (12 Categories Grid)
             ============================================ */}
          <section className="py-20 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="badge-primary mb-3">Kategori Produk</span>
                <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
                  Jelajahi Produk Berdasarkan Kategori
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                  Pilih kategori produk digital atau layanan yang sesuai dengan kebutuhan bisnis Anda.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/produk?kategori=${cat.slug}`}
                    className="p-5 rounded-2xl bg-slate-50 border border-gray-200 hover:border-blue-500 hover:bg-blue-50/50 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-blue-600 mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                      <Layout className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{cat.description}</p>
                    <span className="text-[11px] font-semibold text-blue-600 mt-2 inline-block">
                      {cat.productCount} Item Tersedia →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ============================================
             4. FEATURED PRODUCTS GRID
             ============================================ */}
          <section className="py-20 bg-slate-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <span className="badge-primary mb-2">Pilihan Terbaik</span>
                  <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
                    Produk Digital Terpopuler
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Template & source code siap pakai yang paling banyak diunduh.
                  </p>
                </div>
                <Link href="/produk" className="btn-secondary text-xs px-5 py-2.5">
                  Lihat Semua Produk
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(0, 6).map((product) => (
                  <div key={product.id} className="card-product overflow-hidden flex flex-col justify-between">
                    <div>
                      {/* Image Preview */}
                      <div className="h-48 relative overflow-hidden bg-gray-100">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold bg-white/90 text-gray-800 backdrop-blur-sm shadow-sm">
                          {product.category}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="p-5 space-y-3">
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{product.rating}</span>
                          <span className="text-gray-400 font-normal">({product.reviewCount} ulasan)</span>
                        </div>

                        <Link href={`/produk/${product.slug}`} className="block">
                          <h3 className="font-bold text-gray-900 text-base leading-snug hover:text-blue-600 transition-colors line-clamp-2">
                            {product.title}
                          </h3>
                        </Link>

                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                          {product.shortDescription}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="p-5 pt-0 border-t border-gray-100 flex items-center justify-between mt-4">
                      <div>
                        <span className="text-xs text-gray-400 line-through block">
                          Rp {product.discountPrice?.toLocaleString('id-ID')}
                        </span>
                        <span className="text-lg font-extrabold text-blue-600">
                          Rp {product.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <Link href={`/checkout?product=${product.id}`} className="btn-primary text-xs px-4 py-2">
                        Beli Sekarang
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ============================================
             5. POPULAR AGENCY SERVICES
             ============================================ */}
          <section className="py-20 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="badge-primary mb-2">Web Development Agency</span>
                <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
                  Jasa Pembuatan Website Profesional
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                  Tim berpengalaman kami siap membangun website kustom berkinerja tinggi untuk bisnis Anda.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map((service, idx) => (
                  <div key={idx} className="p-7 rounded-2xl bg-slate-50 border border-gray-200 hover:border-blue-500 transition-all flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-xs text-gray-500 mb-4">{service.description || service.desc}</p>
                      <div className="text-2xl font-black text-blue-600 mb-6">
                        Mulai Rp {(service.startingPrice || 1500000).toLocaleString('id-ID')}
                      </div>
                      <ul className="space-y-2.5 mb-8 text-xs text-gray-700 font-medium">
                        {Array.isArray(service.features) && (service.features as string[]).map((f: string) => (
                          <li key={f} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link href="/jasa" className="btn-secondary w-full text-center text-xs py-3">
                      Pesan Jasa Ini
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ============================================
             6. WHY CHOOSE US
             ============================================ */}
          <section className="py-20 bg-slate-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <span className="badge-primary mb-2">Keunggulan</span>
              <h2 className="text-3xl font-extrabold text-gray-900 mt-2 mb-12">
                Mengapa Memilih Dunia Digitalia?
              </h2>

              <div className="grid sm:grid-cols-3 gap-8">
                <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm text-center">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                    <Download className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">Download Instan</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Setelah pembayaran berhasil dikonfirmasi Tripay, file dapat langsung diunduh secara instan 24 jam non-stop.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm text-center">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">Kode Terverifikasi</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Setiap template dan source code diuji secara ketat, 100% bebas dari backdoor atau malware berbahaya.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm text-center">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">Dukungan Garansi</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Tim pengembang kami siap membantu jika Anda mengalami kendala saat instalasi atau penggunaan.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ============================================
             7. CUSTOMER TESTIMONIALS
             ============================================ */}
          <section className="py-20 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="badge-primary mb-2">Ulasan Klien</span>
                <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
                  Apa Kata Pelanggan Kami?
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((t, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-gray-200 space-y-4">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed italic">"{t.content}"</p>
                    <div className="pt-2 border-t border-gray-200">
                      <h4 className="font-bold text-gray-900 text-xs">{t.name}</h4>
                      <span className="text-[11px] text-gray-400">{t.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ============================================
             8. FAQ & NEWSLETTER
             ============================================ */}
          <section className="py-20 bg-slate-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="badge-primary mb-2">FAQ</span>
                <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
                  Pertanyaan Sering Diajukan
                </h2>
              </div>

              <div className="space-y-3 mb-16">
                {FAQ_DATA.map((faq) => (
                  <div key={faq.id} className="rounded-xl bg-white border border-gray-200 overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                      className="w-full p-4 text-left font-bold text-gray-900 text-sm flex items-center justify-between"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openFaq === faq.id ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === faq.id && (
                      <div className="px-4 pb-4 text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Newsletter Box */}
              <div className="p-8 rounded-3xl bg-blue-600 text-white text-center space-y-4 shadow-xl shadow-blue-500/20">
                <h3 className="text-2xl font-bold">Dapatkan Promo & Update Produk Terbaru</h3>
                <p className="text-xs text-blue-100 max-w-md mx-auto">
                  Berlangganan newsletter kami untuk mendapatkan diskon eksklusif dan panduan teknologi gratis.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
                  <input
                    type="email"
                    placeholder="Masukkan alamat email Anda"
                    className="flex-grow px-4 py-3 rounded-xl text-xs text-gray-900 placeholder-gray-400 bg-white focus:outline-none"
                  />
                  <button className="px-6 py-3 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition-colors">
                    Berlangganan
                  </button>
                </div>
              </div>

            </div>
          </section>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
