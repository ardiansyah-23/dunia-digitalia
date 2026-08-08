'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit2, Trash2, Loader2, ArrowUp, ArrowDown, Star, ShoppingBag, ExternalLink, ArrowRight, ArrowLeft, Check, Download, ShieldCheck } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import RichEditor from '@/components/admin/RichEditor';
import toast from 'react-hot-toast';
import { getCollection, setDocById, deleteDocById, isMockDatabase } from '@/lib/supabase/database';
import { CATEGORIES_DATA } from '@/lib/constants/categories';
import { useAuth } from '@/lib/hooks/useAuth';

export default function AdminProductsPage() {
  const { user } = useAuth();
  const isCustomer = user?.role === 'Customer';

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [sortBy, setSortBy] = useState('position');
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Customer Selected Product Detail state inside dashboard
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Template Blogger');
  const [price, setPrice] = useState(149000);
  const [discountPrice, setDiscountPrice] = useState(199000);
  const [version, setVersion] = useState('v1.0.0');
  const [demoUrl, setDemoUrl] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState('');

  // Fetch products
  async function loadProducts() {
    try {
      const data = await getCollection<any>('products');
      const sorted = (data || []).sort((a: any, b: any) => {
        const posA = Number(a.position) || 0;
        const posB = Number(b.position) || 0;
        if (posA !== posB) return posA - posB;
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      });
      setProducts(sorted);
    } catch (err: any) {
      console.error('Error loading products:', err);
      toast.error(`Gagal memuat produk dari database: ${err.message || 'Cek koneksi / izin RLS Supabase'}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod: any) => {
    setEditingId(prod.id);
    setTitle(prod.title || '');
    setCategory(prod.category || 'Template Blogger');
    setPrice(Number(prod.price) || 0);
    setDiscountPrice(Number(prod.discountPrice) || 0);
    setVersion(prod.version || 'v1.0.0');
    setDemoUrl(prod.demoUrl || '');
    setDownloadUrl(prod.downloadUrl || '');
    setThumbnail(prod.thumbnail || '');
    setDescription(prod.description || '');
    setFeatures(Array.isArray(prod.features) ? prod.features.join('\n') : '');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) {
      toast.error('Mohon isi judul dan harga produk!');
      return;
    }

    const id = editingId || `prod-${Date.now()}`;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const existingPosList = products.map(p => Number(p.position) || 0);
    const maxPos = existingPosList.length > 0 ? Math.max(...existingPosList) : 0;
    const position = editingId
      ? (products.find(p => p.id === editingId)?.position || 0)
      : maxPos + 10;

    const record = {
      title,
      slug,
      shortDescription: description.replace(/<[^>]*>/g, '').slice(0, 120),
      description,
      category,
      price: Number(price),
      discountPrice: Number(discountPrice) || 0,
      rating: editingId ? (products.find(p => p.id === editingId)?.rating || 5.0) : 5.0,
      reviewCount: editingId ? (products.find(p => p.id === editingId)?.reviewCount || 1) : 1,
      salesCount: editingId ? (products.find(p => p.id === editingId)?.salesCount || 0) : 0,
      thumbnail: thumbnail || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
      demoUrl,
      downloadUrl,
      version: version || 'v1.0.0',
      features: features.split('\n').filter(f => f.trim().length > 0),
      position,
      createdAt: editingId ? (products.find(p => p.id === editingId)?.createdAt || new Date().toISOString()) : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      toast.loading('Menyimpan produk ke database...');
      await setDocById('products', id, record);
      toast.dismiss();
      toast.success(editingId ? 'Produk berhasil diperbarui!' : 'Produk baru berhasil ditambahkan!');
      setIsModalOpen(false);
      resetForm();
      loadProducts();
    } catch (err: any) {
      toast.dismiss();
      toast.error(`Gagal menyimpan produk: ${err.message || 'Error Supabase RLS / koneksi'}`);
    }
  };

  const resetForm = () => {
    setTitle('');
    setCategory('Template Blogger');
    setPrice(149000);
    setDiscountPrice(199000);
    setVersion('v1.0.0');
    setDemoUrl('');
    setDownloadUrl('');
    setThumbnail('');
    setDescription('');
    setFeatures('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus produk ini?')) return;
    try {
      toast.loading('Menghapus produk...');
      await deleteDocById('products', id);
      toast.dismiss();
      toast.success('Produk berhasil dihapus!');
      loadProducts();
    } catch (err) {
      toast.dismiss();
      toast.error('Gagal menghapus produk dari database.');
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;
    const current = filteredProducts[index];
    const prev = filteredProducts[index - 1];

    const currentPos = current.position || index * 10;
    const prevPos = prev.position || (index - 1) * 10;

    try {
      toast.loading('Memindahkan posisi produk...');
      await setDocById('products', current.id, { ...current, position: prevPos });
      await setDocById('products', prev.id, { ...prev, position: currentPos });
      toast.dismiss();
      toast.success('Urutan produk berhasil diubah!');
      loadProducts();
    } catch (err) {
      toast.dismiss();
      toast.error('Gagal mengubah urutan produk.');
    }
  };

  const handleMoveDown = async (index: number) => {
    if (index === filteredProducts.length - 1) return;
    const current = filteredProducts[index];
    const next = filteredProducts[index + 1];

    const currentPos = current.position || index * 10;
    const nextPos = next.position || (index + 1) * 10;

    try {
      toast.loading('Memindahkan posisi produk...');
      await setDocById('products', current.id, { ...current, position: nextPos });
      await setDocById('products', next.id, { ...next, position: currentPos });
      toast.dismiss();
      toast.success('Urutan produk berhasil diubah!');
      loadProducts();
    } catch (err) {
      toast.dismiss();
      toast.error('Gagal mengubah urutan produk.');
    }
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter(p =>
      (p.title || '').toLowerCase().includes(search.toLowerCase())
    );

    if (selectedCat !== 'All') {
      result = result.filter(p => p.category === selectedCat);
    }

    result = [...result].sort((a, b) => {
      if (sortBy === 'position') {
        return (Number(a.position) || 0) - (Number(b.position) || 0);
      } else if (sortBy === 'price-asc') {
        return (Number(a.price) || 0) - (Number(b.price) || 0);
      } else if (sortBy === 'price-desc') {
        return (Number(b.price) || 0) - (Number(a.price) || 0);
      } else if (sortBy === 'sales') {
        return (Number(b.salesCount) || 0) - (Number(a.salesCount) || 0);
      }
      return 0;
    });

    return result;
  }, [products, search, selectedCat, sortBy]);

  // ============================================
  // CUSTOMER DASHBOARD PRODUCT CATALOG VIEW
  // ============================================
  if (isCustomer) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Katalog Produk Digital</h1>
          <p className="text-xs text-gray-500">Pilih dan beli template Blogger, source code, serta produk digital terverifikasi langsung dari portal Anda.</p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto w-full md:w-auto">
            <button
              onClick={() => setSelectedCat('All')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCat === 'All'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Semua Produk ({products.length})
            </button>
            {CATEGORIES_DATA.slice(0, 6).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.name)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCat === cat.name
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari produk digital..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Customer Product Cards Grid — Clean & Uncluttered */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center text-gray-500 text-xs">
            Tidak ada produk yang cocok dengan pencarian Anda.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="card-product overflow-hidden flex flex-col justify-between group">
                <div>
                  <div className="h-44 relative bg-gray-100 overflow-hidden">
                    <img
                      src={product.thumbnail || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80'}
                      alt={product.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold bg-white/90 text-gray-900 backdrop-blur-xs shadow-2xs">
                      {product.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-1.5 text-amber-500 text-xs font-bold">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span>{product.rating || 5.0}</span>
                      <span className="text-gray-400 font-normal">({product.reviewCount || 10} ulasan)</span>
                    </div>

                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="text-left w-full block group-hover:text-blue-600 transition-colors"
                    >
                      <h3 className="font-extrabold text-gray-900 text-base leading-snug line-clamp-2">
                        {product.title}
                      </h3>
                    </button>

                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {product.shortDescription || product.description?.replace(/<[^>]*>/g, '').slice(0, 100)}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-gray-100 flex items-center justify-between mt-4">
                  <div>
                    {product.discountPrice && product.discountPrice > 0 && (
                      <span className="text-[11px] text-gray-400 line-through block">
                        Rp {Number(product.discountPrice).toLocaleString('id-ID')}
                      </span>
                    )}
                    <span className="text-lg font-black text-blue-600">
                      Rp {Number(product.price).toLocaleString('id-ID')}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="btn-secondary text-xs px-3 py-2 rounded-xl font-bold"
                    >
                      Detail
                    </button>
                    <Link
                      href={`/checkout?product=${product.id}`}
                      className="btn-primary text-xs px-4 py-2 rounded-xl shadow-xs font-bold"
                    >
                      Beli
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ULTRA-PREMIUM PRODUCT DETAIL MODAL */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 relative">
              
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="badge-primary">{selectedProduct.category}</span>
                    {selectedProduct.version && (
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-0.5 rounded-full">
                        Versi {selectedProduct.version}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                    {selectedProduct.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Thumbnail Image */}
              <div className="rounded-2xl bg-slate-100 overflow-hidden max-h-64">
                <img
                  src={selectedProduct.thumbnail || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80'}
                  alt={selectedProduct.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80';
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Price Banner Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Harga Lisensi Resmi</span>
                  <div className="text-2xl font-black text-blue-600">
                    Rp {Number(selectedProduct.price).toLocaleString('id-ID')}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-600 block">✓ Instant Download 24/7</span>
                  <span className="text-[11px] text-slate-500">Lisensi Komersial & Personal</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Deskripsi Produk</h3>
                <div className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{ __html: selectedProduct.description || selectedProduct.shortDescription }} />
              </div>

              {/* Features List */}
              {selectedProduct.features && selectedProduct.features.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Fitur Utama</h3>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {selectedProduct.features.map((feat: string, idx: number) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2 text-xs font-semibold text-slate-800">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="btn-secondary text-xs px-5 py-3 rounded-xl font-bold"
                >
                  Tutup
                </button>
                <Link
                  href={`/checkout?product=${selectedProduct.id}`}
                  className="btn-primary text-xs px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md shadow-blue-500/20"
                >
                  <ShoppingBag className="w-4 h-4" /> Beli Sekarang
                </Link>
              </div>

            </div>
          </div>
        )}

      </div>
    );
  }

  // ============================================
  // ADMIN DASHBOARD PRODUCT MANAGEMENT VIEW
  // ============================================
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Upload & Kelola Produk Digital</h1>
          <p className="text-xs text-gray-500">Upload template Blogger, source code, ebook, dan file digital.</p>
          
          {isMockDatabase ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Mode Simulasi / Local Mock (Data akan hilang jika di-refresh karena Vercel Env Variables belum aktif)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Koneksi Supabase Live Database Aktif
            </span>
          )}
        </div>
        <button onClick={handleOpenAdd} className="btn-primary text-xs px-4 py-2.5 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Upload Produk Baru
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setSelectedCat('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCat === 'All'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Semua ({products.length})
          </button>
          {CATEGORIES_DATA.slice(0, 5).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.name)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCat === cat.name
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none"
          >
            <option value="position">Urutan Manual (Default)</option>
            <option value="price-asc">Harga Terendah</option>
            <option value="price-desc">Harga Tertinggi</option>
            <option value="sales">Terjual Perbanyak</option>
          </select>

          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Table Products */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center text-gray-500 text-xs">
          Belum ada produk digital yang ditambahkan. Klik "Upload Produk Baru" di atas untuk menambahkan.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase font-semibold border-b border-gray-200">
                <tr>
                  <th className="p-4 w-12 text-center">Urutan</th>
                  <th className="p-4">Produk</th>
                  <th className="p-4">Kategori</th>
                  <th className="p-4">Harga & Diskon</th>
                  <th className="p-4">Terjual</th>
                  <th className="p-4">Link File Download</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {filteredProducts.map((prod, index) => (
                  <tr key={prod.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <button
                          disabled={index === 0}
                          onClick={() => handleMoveUp(index)}
                          className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-20"
                          title="Naikkan Urutan"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-bold text-[11px] text-gray-600">{index + 1}</span>
                        <button
                          disabled={index === filteredProducts.length - 1}
                          onClick={() => handleMoveDown(index)}
                          className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-20"
                          title="Turunkan Urutan"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.thumbnail || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80'}
                          alt={prod.title}
                          className="w-12 h-12 rounded-lg object-cover border border-gray-200 shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{prod.title}</h4>
                          <span className="text-[10px] text-gray-400">Versi {prod.version || 'v1.0.0'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="badge-primary text-[10px]">{prod.category}</span>
                    </td>
                    <td className="p-4">
                      <div className="space-y-0.5">
                        <span className="font-bold text-gray-900">
                          Rp {Number(prod.price || 0).toLocaleString('id-ID')}
                        </span>
                        {prod.discountPrice > 0 && (
                          <span className="text-[10px] text-gray-400 line-through block">
                            Rp {Number(prod.discountPrice).toLocaleString('id-ID')}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-gray-600">
                      {prod.salesCount || 0} pcs
                    </td>
                    <td className="p-4">
                      {prod.downloadUrl ? (
                        <span className="text-[11px] text-emerald-600 font-bold max-w-[150px] truncate block" title={prod.downloadUrl}>
                          ✓ Terpasang ({prod.downloadUrl.slice(0, 20)}...)
                        </span>
                      ) : (
                        <span className="text-[11px] text-amber-500 font-medium">⚠️ Belum Diisi</span>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(prod)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Produk"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus Produk"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL FORM ADD / EDIT PRODUCT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-gray-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="font-extrabold text-gray-900 text-lg">
                {editingId ? 'Edit Produk Digital' : 'Upload Produk Digital Baru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Judul Produk *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Misal: NewsFast — Premium Blogger Template"
                  className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Kategori Produk *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  >
                    {CATEGORIES_DATA.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Versi Produk</label>
                  <input
                    type="text"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    placeholder="v1.0.0"
                    className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Harga Jual (Rp) *</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                    className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Harga Coret / Asli (Rp)</label>
                  <input
                    type="number"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(Number(e.target.value))}
                    className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Upload Gambar Thumbnail Produk</label>
                <ImageUpload
                  value={thumbnail}
                  onChange={(url) => setThumbnail(url)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Link Live Demo Preview</label>
                  <input
                    type="url"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="https://demo.dunia-digitalia.com"
                    className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Link Download File (Google Drive / Zip) *</label>
                  <input
                    type="url"
                    value={downloadUrl}
                    onChange={(e) => setDownloadUrl(e.target.value)}
                    placeholder="https://drive.google.com/file/d/..."
                    className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Deskripsi Produk *</label>
                <RichEditor
                  content={description}
                  onChange={(html) => setDescription(html)}
                  placeholder="Tuliskan deskripsi lengkap produk..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Fitur Utama (Pisahkan dengan baris baru)</label>
                <textarea
                  rows={4}
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="Responsive Layout&#10;SEO Schema Integrated&#10;Google AdSense Ready"
                  className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary text-xs px-4 py-2"
                >
                  Batal
                </button>
                <button type="submit" className="btn-primary text-xs px-6 py-2">
                  {editingId ? 'Simpan Perubahan' : 'Upload Produk'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
