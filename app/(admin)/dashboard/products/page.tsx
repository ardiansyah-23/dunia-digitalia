'use client';

import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Upload, ExternalLink, Tag } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import RichEditor from '@/components/admin/RichEditor';
import toast from 'react-hot-toast';
import { PRODUCTS_DATA } from '@/lib/constants/products';
import { CATEGORIES_DATA } from '@/lib/constants/categories';

export default function AdminProductsPage() {
  const [products, setProducts] = useState(PRODUCTS_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');

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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) {
      toast.error('Mohon isi judul dan harga produk!');
      return;
    }

    const newProduct = {
      id: `prod-${Date.now()}`,
      title,
      slug: title.toLowerCase().replace(/ /g, '-'),
      shortDescription: description.replace(/<[^>]*>/g, '').slice(0, 100),
      description,
      category,
      price: Number(price),
      discountPrice: Number(discountPrice) || undefined,
      version,
      demoUrl,
      downloadUrl,
      thumbnail: thumbnail || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
      screenshots: [],
      features: features.split('\n').filter(Boolean),
      salesCount: 0,
      rating: 5.0,
      reviewCount: 0,
      isFeatured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProducts([newProduct, ...products]);
    toast.success('Produk digital berhasil diunggah!');
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setPrice(149000);
    setDiscountPrice(199000);
    setDemoUrl('');
    setDownloadUrl('');
    setThumbnail('');
    setDescription('');
    setFeatures('');
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    toast.success('Produk berhasil dihapus!');
  };

  const filtered = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Upload & Kelola Produk Digital</h1>
          <p className="text-xs text-gray-500">Upload template Blogger, source code, ebook, dan file digital.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary text-xs px-4 py-2.5 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Upload Produk Baru
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
        <div className="relative w-full max-w-xs">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-900"
          />
        </div>
        <span className="text-xs font-semibold text-gray-500">Total: {filtered.length} Produk</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs text-gray-600">
          <thead className="bg-slate-50 text-gray-900 font-bold border-b border-gray-200">
            <tr>
              <th className="p-4">Produk</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Harga</th>
              <th className="p-4">Versi</th>
              <th className="p-4">Penjualan</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((prod) => (
              <tr key={prod.id} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={prod.thumbnail} alt={prod.title} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-bold text-gray-900 line-clamp-1">{prod.title}</h4>
                      <span className="text-[11px] text-gray-400">{prod.slug}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4"><span className="badge-primary">{prod.category}</span></td>
                <td className="p-4 font-bold text-gray-900">Rp {prod.price.toLocaleString('id-ID')}</td>
                <td className="p-4 font-semibold text-gray-600">{prod.version}</td>
                <td className="p-4 font-semibold text-emerald-600">{prod.salesCount} Terjual</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => handleDelete(prod.id)} className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Upload Produk */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Form Upload Produk Digital</h2>
                <p className="text-xs text-gray-500">Isi detail lengkap produk digital yang ingin dijual.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Judul Produk *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: NewsFast — Template Blogger Portal Berita"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Kategori Produk *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900"
                  >
                    {CATEGORIES_DATA.map((cat) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
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
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Harga Jual (Rp) *</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Harga Normal / Coret (Rp)</label>
                  <input
                    type="number"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">URL Live Demo (Opsional)</label>
                  <input
                    type="text"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="https://demo.example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">URL Download File (.ZIP/.PDF) *</label>
                  <input
                    type="text"
                    value={downloadUrl}
                    onChange={(e) => setDownloadUrl(e.target.value)}
                    placeholder="https://storage.googleapis.com/.../file.zip"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Gambar Thumbnail Produk</label>
                <ImageUpload value={thumbnail} onChange={setThumbnail} folder="products" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Daftar Fitur (Satu per baris)</label>
                <textarea
                  rows={3}
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="Kecepatan 98+ PageSpeed&#10;SEO Schema JSON-LD&#10;Dark Mode Toggle"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Deskripsi Lengkap Produk</label>
                <RichEditor content={description} onChange={setDescription} />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary text-xs">Batal</button>
                <button type="submit" className="btn-primary text-xs px-6">Simpan & Dipublikasikan</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
