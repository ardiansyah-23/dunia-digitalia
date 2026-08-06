'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Loader2 } from 'lucide-react';
import RichEditor from '@/components/admin/RichEditor';
import ImageUpload from '@/components/admin/ImageUpload';
import toast from 'react-hot-toast';
import { getCollection, setDocById, deleteDocById } from '@/lib/supabase/database';

interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  cover_image: string;
  author: string;
  published: boolean;
  featured: boolean;
  created_at: string;
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Blogger');
  const [status, setStatus] = useState<'Published' | 'Draft'>('Published');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');

  const loadArticles = async () => {
    setLoading(true);
    try {
      const data = await getCollection('articles');
      setArticles(data as ArticleItem[]);
    } catch (err) {
      toast.error('Gagal memuat data artikel.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setCategory('Blogger');
    setStatus('Published');
    setContent('');
    setCoverImage('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (art: ArticleItem) => {
    setEditingId(art.id);
    setTitle(art.title);
    setSlug(art.slug);
    setCategory(art.category);
    setStatus(art.published ? 'Published' : 'Draft');
    setContent(art.content || '');
    setCoverImage(art.cover_image || '');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      toast.error('Mohon isi judul artikel!');
      return;
    }

    setSaving(true);
    const autoSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    const record = {
      title,
      slug: slug || autoSlug,
      category,
      content,
      cover_image: coverImage,
      author: 'Admin',
      published: status === 'Published',
      featured: false,
    };

    try {
      const id = editingId || Date.now().toString();
      await setDocById('articles', id, record);
      toast.success(editingId ? 'Artikel berhasil diperbarui!' : 'Artikel baru berhasil dipublikasikan!');
      setIsModalOpen(false);
      await loadArticles();
    } catch (err) {
      toast.error('Gagal menyimpan artikel. Silakan coba lagi.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus artikel ini?')) return;
    try {
      await deleteDocById('articles', id);
      toast.success('Artikel berhasil dihapus!');
      await loadArticles();
    } catch (err) {
      toast.error('Gagal menghapus artikel. Silakan coba lagi.');
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Manajemen Artikel & Tutorial Blog</h1>
          <p className="text-xs text-gray-500">Tulis, sunting, dan publikasikan panduan teknologi & SEO.</p>
        </div>
        <button onClick={handleOpenAdd} className="btn-primary text-xs px-4 py-2.5 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Tulis Artikel Baru
        </button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
        <div className="relative w-full max-w-xs">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari artikel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-900"
          />
        </div>
        <span className="text-xs font-semibold text-gray-500">Total: {filtered.length} Artikel</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            <span className="text-xs">Memuat artikel...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <p className="text-sm font-medium">Belum ada artikel.</p>
            <p className="text-xs mt-1">Klik &quot;Tulis Artikel Baru&quot; untuk memulai.</p>
          </div>
        ) : (
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-slate-50 text-gray-900 font-bold border-b border-gray-200">
              <tr>
                <th className="p-4">Judul Artikel</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Penulis</th>
                <th className="p-4">Tanggal</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((art) => (
                <tr key={art.id} className="hover:bg-gray-50">
                  <td className="p-4 font-bold text-gray-900 max-w-md">
                    <div className="line-clamp-1">{art.title}</div>
                    <span className="text-[11px] text-gray-400 font-normal">/blog/{art.slug}</span>
                  </td>
                  <td className="p-4"><span className="badge-primary">{art.category}</span></td>
                  <td className="p-4 font-medium text-gray-800">{art.author || 'Admin'}</td>
                  <td className="p-4 text-gray-500">{formatDate(art.created_at)}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      art.published
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {art.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(art)}
                      className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(art.id)}
                      className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Form Artikel */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {editingId ? 'Sunting Artikel' : 'Tulis Artikel Baru'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Judul Artikel *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (!editingId) setSlug(e.target.value.toLowerCase().replace(/ /g, '-'));
                  }}
                  required
                  placeholder="Panduan Integrasi Payment Gateway..."
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900"
                  >
                    <option value="Blogger">Blogger</option>
                    <option value="Next.js">Next.js</option>
                    <option value="SEO">SEO</option>
                    <option value="Tutorial">Tutorial</option>
                    <option value="Digital Business">Digital Business</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Status Publikasi</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 font-semibold"
                  >
                    <option value="Published">Published / Terbit</option>
                    <option value="Draft">Draft / Konsep</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Gambar Sampul Header</label>
                <ImageUpload value={coverImage} onChange={setCoverImage} folder="articles" />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Konten Lengkap (TipTap Editor)</label>
                <RichEditor content={content} onChange={setContent} />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary">Batal</button>
                <button type="submit" disabled={saving} className="btn-primary px-6 flex items-center gap-2">
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Simpan &amp; Terbitkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
