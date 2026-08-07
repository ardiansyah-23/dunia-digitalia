import type { Metadata } from 'next';
import Link from 'next/link';
import { Star, CheckCircle2, Download, ExternalLink, ShieldCheck, ShoppingBag, ArrowLeft } from 'lucide-react';
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
    <div className="flex flex-col min-h-screen bg-slate-50 text-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <PageTransition>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <Link href="/produk" className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-blue-600 mb-6">
              <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog Produk
            </Link>

            <div className="grid lg:grid-cols-12 gap-10">
              
              {/* Main Content — 8 cols */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Header Banner */}
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="badge-primary">{product.category}</span>
                    <span className="text-xs font-semibold text-gray-400">Versi {product.version}</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
                    {product.title}
                  </h1>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-gray-400">({product.reviewCount} ulasan)</span>
                    </div>
                    <span>•</span>
                    <span>{product.salesCount} Terjual</span>
                  </div>
                </div>

                {/* Preview Image */}
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden p-2">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-auto max-h-[420px] object-cover rounded-2xl"
                  />
                </div>

                {/* Description */}
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-4">
                  <h2 className="text-lg font-extrabold text-gray-900">Deskripsi & Fitur Produk</h2>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>

                  {product.features && product.features.length > 0 && (
                    <div className="pt-4 border-t border-gray-100 space-y-3">
                      <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Fitur Unggulan:</h3>
                      <div className="grid sm:grid-cols-2 gap-2.5">
                        {product.features.map((feat: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Sidebar Purchase Box — 4 cols */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-md space-y-6 sticky top-28">
                  
                  <div className="space-y-1">
                    <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Harga Resmi</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-gray-900">
                        Rp {product.price?.toLocaleString('id-ID')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through font-medium">
                          Rp {product.originalPrice?.toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-gray-100 text-xs text-gray-600">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Pengiriman File</span>
                      <span className="font-bold text-emerald-600 flex items-center gap-1">
                        <Download className="w-3.5 h-3.5" /> Instant Download
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Lisensi</span>
                      <span className="font-bold text-gray-900">Personal / Agensi</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Pembayaran</span>
                      <span className="font-bold text-gray-900">QRIS / VA / Retail</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Link
                      href={`/checkout?product=${product.id}`}
                      className="btn-primary w-full py-3.5 text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                    >
                      <ShoppingBag className="w-4 h-4" /> Beli Sekarang
                    </Link>

                    {product.demoUrl && (
                      <a
                        href={product.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary w-full py-3 text-xs font-bold flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Lihat Live Demo
                      </a>
                    )}
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold flex items-center gap-2">
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
