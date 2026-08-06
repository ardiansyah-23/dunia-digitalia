'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, Star, ShoppingBag } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import { PRODUCTS_DATA } from '@/lib/constants/products';
import { CATEGORIES_DATA } from '@/lib/constants/categories';
import { getCollection } from '@/lib/supabase/database';

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [products, setProducts] = useState(PRODUCTS_DATA);
  const [categories, setCategories] = useState(CATEGORIES_DATA);

  useEffect(() => {
    getCollection<any>('products').then(data => {
      if (data && data.length > 0) setProducts(data);
    }).catch(console.error);

    getCollection<any>('categories').then(data => {
      if (data && data.length > 0) setCategories(data);
    }).catch(console.error);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = (p.title || '').toLowerCase().includes(search.toLowerCase()) ||
        (p.shortDescription || '').toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCat === 'All' || p.category === selectedCat;
      return matchSearch && matchCat;
    });
  }, [search, selectedCat, products]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-gray-800">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <PageTransition>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Page Header */}
            <div className="mb-10 text-center max-w-2xl mx-auto">
              <span className="badge-primary mb-2">Marketplace</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
                Katalog Produk Digital
              </h1>
              <p className="text-gray-500 text-sm mt-2">
                Temukan template Blogger, source code, admin dashboard, dan tools AI berkualitas tinggi.
              </p>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2 overflow-x-auto w-full md:w-auto">
                <button
                  onClick={() => setSelectedCat('All')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedCat === 'All'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Semua Produk
                </button>
                {categories.slice(0, 6).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCat(cat.name)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      selectedCat === cat.name
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Search Input */}
              <div className="relative w-full md:w-64 shrink-0">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari produk..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="card-product overflow-hidden flex flex-col justify-between">
                  <div>
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

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                <p className="text-gray-500 text-sm">Tidak ada produk yang sesuai dengan pencarian Anda.</p>
              </div>
            )}

          </div>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
