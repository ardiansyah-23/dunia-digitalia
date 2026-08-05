import Link from 'next/link';
import { Star, CheckCircle2, Download, ExternalLink, ShieldCheck, ShoppingBag, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import { PRODUCTS_DATA } from '@/lib/constants/products';

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS_DATA.find((p) => p.slug === slug) || PRODUCTS_DATA[0];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-gray-800">
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

                {/* Screenshots Gallery */}
                <div className="rounded-3xl border border-gray-200 overflow-hidden bg-gray-100 shadow-sm">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-[400px] object-cover"
                  />
                </div>

                {/* Description & Features */}
                <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
                  <h2 className="text-xl font-bold text-gray-900">Deskripsi Produk</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>

                  <h3 className="text-lg font-bold text-gray-900 pt-4 border-t border-gray-100">Fitur Utama</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {product.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-semibold text-gray-700 bg-slate-50 p-3 rounded-xl border border-gray-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Sidebar Order Box — 4 cols */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-md sticky top-28 space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <span className="text-xs text-gray-400 line-through block">
                      Rp {product.discountPrice?.toLocaleString('id-ID')}
                    </span>
                    <div className="text-3xl font-extrabold text-blue-600">
                      Rp {product.price.toLocaleString('id-ID')}
                    </div>
                    <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded mt-1 inline-block">
                      Hemat Rp {((product.discountPrice || 0) - product.price).toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <Link
                      href={`/checkout?product=${product.id}`}
                      className="btn-primary w-full py-4 text-sm font-bold text-center"
                    >
                      <ShoppingBag className="w-4 h-4" /> Beli Sekarang (Tripay)
                    </Link>

                    {product.demoUrl && (
                      <a
                        href={product.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary w-full py-3 text-xs text-center flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" /> Live Demo Preview
                      </a>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Instan Download Setelah Pembayaran</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                      <span>Lisensi Standar Komersial</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                      <span>Gratis Pembaruan & Dukungan</span>
                    </div>
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
