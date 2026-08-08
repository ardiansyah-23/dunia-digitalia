import type { Metadata } from 'next';
import Link from 'next/link';
import { Star, CheckCircle2, Download, ExternalLink, ShieldCheck, ShoppingBag, ArrowLeft, Check, Sparkles } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import { PRODUCTS_DATA } from '@/lib/constants/products';
import { getCollection } from '@/lib/supabase/database';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let product = null;
  try {
    const data = await getCollection<any>('products');
    product = data.find((p) => p.slug === slug);
  } catch (err) {}

  if (!product) {
    product = PRODUCTS_DATA.find((p) => p.slug === slug) || PRODUCTS_DATA[0];
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dunia-digitalia.vercel.app';
  const pageUrl = `${siteUrl}/produk/${slug}`;

  return {
    title: `${product.title} — Beli File Digital`,
    description: product.description || `Download ${product.title} resmi terverifikasi dan siap pakai.`,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: product.title,
      description: product.description,
      url: pageUrl,
      type: 'website',
      images: [{ url: product.thumbnail, alt: product.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description,
      images: [product.thumbnail],
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let product = null;
  try {
    const data = await getCollection<any>('products');
    product = data.find((p) => p.slug === slug);
  } catch (err) {
    console.error("Error loading product from database:", err);
  }

  if (!product) {
    product = PRODUCTS_DATA.find((p) => p.slug === slug) || PRODUCTS_DATA[0];
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dunia-digitalia.vercel.app';

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: [product.thumbnail],
    description: product.description,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'Dunia Digitalia',
    },
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/produk/${slug}`,
      priceCurrency: 'IDR',
      price: product.price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount || 10,
    } : undefined,
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Navbar />

      <main className="flex-grow pt-28 pb-24">
        <PageTransition>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
            {/* Back Button */}
            <Link
              href="/produk"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog Produk
            </Link>

            <div className="grid lg:grid-cols-12 gap-10">
              
              {/* Main Column — 8 cols */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Product Header Card */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="badge-primary">{product.category}</span>
                    {product.version && (
                      <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        Versi {product.version}
                      </span>
                    )}
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                    {product.title}
                  </h1>

                  <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold pt-1">
                    <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-slate-400 font-normal">({product.reviewCount} ulasan)</span>
                    </div>
                    <span>•</span>
                    <span>{product.salesCount || 0} Terjual</span>
                  </div>
                </div>

                {/* Main Preview Image */}
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden p-3">
                  <img
                    src={product.thumbnail || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80'}
                    alt={product.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="w-full h-auto max-h-[460px] object-cover rounded-2xl"
                  />
                </div>

                {/* Product Description & Features */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                  <h2 className="text-xl font-extrabold text-slate-900">Deskripsi & Fitur Produk</h2>
                  
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>

                  {product.features && product.features.length > 0 && (
                    <div className="pt-6 border-t border-slate-100 space-y-4">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Fitur Unggulan:</h3>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {product.features.map((feat: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs font-semibold text-slate-800">
                            <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3" />
                            </div>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Sticky Purchase Card — 4 cols */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-lg space-y-6 sticky top-28">
                  
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Harga Lisensi</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-slate-900">
                        Rp {product.price?.toLocaleString('id-ID')}
                      </span>
                      {product.discountPrice && product.discountPrice > 0 && (
                        <span className="text-sm text-slate-400 line-through font-semibold">
                          Rp {product.discountPrice?.toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-600 font-medium">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Metode Pengiriman</span>
                      <span className="font-bold text-emerald-600 flex items-center gap-1">
                        <Download className="w-3.5 h-3.5" /> Instant Download
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Jenis Lisensi</span>
                      <span className="font-bold text-slate-900">Personal & Komersial</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Pembayaran Otomatis</span>
                      <span className="font-bold text-slate-900">QRIS / VA / Retail</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Link
                      href={`/checkout?product=${product.id}`}
                      className="btn-primary w-full py-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 rounded-2xl shadow-lg shadow-blue-500/20"
                    >
                      <ShoppingBag className="w-4 h-4" /> Beli Sekarang
                    </Link>

                    {product.demoUrl && (
                      <a
                        href={product.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary w-full py-3.5 text-xs font-bold flex items-center justify-center gap-2 rounded-2xl"
                      >
                        <ExternalLink className="w-4 h-4" /> Lihat Live Demo Preview
                      </a>
                    )}
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] font-bold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Garansi 100% Bebas Virus & Bebas Malware</span>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
