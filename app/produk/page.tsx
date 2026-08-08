'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, Star, ShoppingBag, ArrowRight, LayoutGrid, Check } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import { PRODUCTS_DATA } from '@/lib/constants/products';
import { CATEGORIES_DATA } from '@/lib/constants/categories';
import { getCollection } from '@/lib/supabase/database';

function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('kategori') || 'All';

  const [search, setSearch] = useState(initialSearch);
  const [selectedCat, setSelectedCat] = useState(initialCategory);
  const [products, setProducts] = useState(PRODUCTS_DATA);
  const [categories, setCategories] = useState(CATEGORIES_DATA);

  useEffect(() => {
    getCollection<any>('products')
      .then((data) => {
        if (data && data.length > 0) setProducts(data);
      })
      .catch(console.error);

    getCollection<any>('categories')
      .then((data) => {
        if (data && data.length > 0) setCategories(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (initialCategory !== 'All') {
      // Find matching category by slug or name
      const matched = categories.find(
        (c) => c.slug === initialCategory || c.name.toLowerCase() === initialCategory.toLowerCase()
      );
      if (matched) {
        setSelectedCat(matched.name);
      }
    }
  }, [initialCategory, categories]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        (p.title || '').toLowerCase().includes(search.toLowerCase()) ||
        (p.shortDescription || '').toLowerCase().includes(search.toLowerCase());
      const matchCat =
        selectedCat === 'All' ||
        (p.category || '').toLowerCase() === selectedCat.toLowerCase();
      return matchSearch && matchCat;
    });
  }, [search, selectedCat, products]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="badge-primary">Katalog Resmi</span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Katalog Produk Digital
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Temukan template Blogger premium, source code website, admin dashboard, dan tools AI berkualitas tinggi.
        </p>
      </div>

      {/* Filter & Search Control Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-4 md:space-y-0 md:flex md:items-center md:justify-between md:gap-4">
        
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCat('All')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedCat === 'All'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            Semua Produk ({products.length})
          </button>
          {categories.map((cat) => {
            const isSelected = selectedCat.toLowerCase() === cat.name.toLowerCase();
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.name)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Search Input Box */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari produk digital..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200/80 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
          />
        </div>

      </div>

      {/* Product Items Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-16 rounded-3xl bg-white border border-slate-200 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Tidak ada produk yang cocok</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Coba gunakan kata kunci lain atau reset filter kategori produk Anda.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCat('All');
            }}
            className="btn-secondary text-xs px-4 py-2 rounded-xl"
          >
            Reset Filter Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card-product overflow-hidden flex flex-col justify-between group">
              <div>
                {/* Image Banner */}
                <div className="h-52 relative overflow-hidden bg-slate-100">
                  <img
                    src={product.thumbnail || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80'}
                    alt={product.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-lg text-[10px] font-bold bg-white/90 text-slate-900 backdrop-blur-md shadow-xs">
                    {product.category}
                  </span>
                </div>

                {/* Content */}
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

              {/* Pricing & Checkout */}
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
      )}

    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      <Navbar />
      <main className="flex-grow pt-6 pb-16">
        <PageTransition>
          <Suspense fallback={<div className="text-center py-20 text-xs text-slate-500">Loading catalog...</div>}>
            <ProductsCatalogContent />
          </Suspense>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
