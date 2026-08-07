'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2, Save } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import { getCollection, setDocById, deleteDocById } from '@/lib/supabase/database';
import toast from 'react-hot-toast';

interface ProjectItem {
  id: string;
  title: string;
  description?: string;
  category?: string;
  tags?: string[];
  images?: string[];
  demo_url?: string;
  featured?: boolean;
  active?: boolean;
}

const INITIAL_PROJECTS: ProjectItem[] = [
  { id: 'proj-1', title: 'AI Analytics Dashboard', category: 'AI/ML', tags: ['Python', 'Next.js'], images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'], demo_url: 'https://demo.example.com', featured: true, active: true },
  { id: 'proj-2', title: 'E-Commerce Platform', category: 'Web App', tags: ['Next.js', 'Stripe'], images: ['https://images.unsplash.com/photo-1556742049-0a675659e382?auto=format&fit=crop&w=800&q=80'], demo_url: 'https://demo.example.com', featured: true, active: true },
];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Web App');
  const [tagsInput, setTagsInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [featured, setFeatured] = useState(false);
  const [active, setActive] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await getCollection<any>('projects');
      if (data && data.length > 0) {
        setProjects(data);
      } else {
        setProjects(INITIAL_PROJECTS);
      }
    } catch (err) {
      console.error(err);
      toast.error('Gagal memuat data proyek.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setCategory('Web App');
    setTagsInput('');
    setImageUrl('');
    setDemoUrl('');
    setFeatured(false);
    setActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (proj: ProjectItem) => {
    setEditingId(proj.id);
    setTitle(proj.title);
    setDescription(proj.description || '');
    setCategory(proj.category || 'Web App');
    setTagsInput((proj.tags || []).join(', '));
    setImageUrl(proj.images?.[0] || '');
    setDemoUrl(proj.demo_url || '');
    setFeatured(proj.featured || false);
    setActive(proj.active !== false);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      toast.error('Mohon isi judul proyek!');
      return;
    }

    setSaving(true);
    const id = editingId || `proj-${Date.now()}`;
    const record = {
      title,
      description,
      category,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      images: imageUrl ? [imageUrl] : [],
      demo_url: demoUrl,
      featured,
      active,
    };

    try {
      await setDocById('projects', id, record);
      toast.success(editingId ? 'Proyek berhasil diperbarui!' : 'Proyek baru berhasil ditambahkan!');
      setIsModalOpen(false);
      await loadProjects();
    } catch (err) {
      toast.error('Gagal menyimpan proyek ke database.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus proyek ini?')) return;
    const toastId = toast.loading('Menghapus proyek...');
    try {
      await deleteDocById('projects', id);
      toast.dismiss(toastId);
      toast.success('Proyek berhasil dihapus!');
      await loadProjects();
    } catch (err) {
      toast.dismiss(toastId);
      toast.error('Gagal menghapus proyek dari database.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Manajemen Portofolio & Proyek</h1>
          <p className="text-xs text-gray-500">Kelola daftar hasil karya dan proyek agency yang ditampilkan.</p>
        </div>
        <button onClick={handleOpenAdd} className="btn-primary text-xs px-4 py-2.5 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Tambah Proyek Baru
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : (
        /* Table */
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-slate-50 text-gray-900 font-bold border-b border-gray-200">
              <tr>
                <th className="p-4">Proyek</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Teknologi / Tags</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400">Belum ada proyek terdaftar.</td>
                </tr>
              ) : (
                projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {proj.images?.[0] ? (
                          <img src={proj.images[0]} alt={proj.title} className="w-10 h-10 rounded-lg object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                            📁
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-gray-900 line-clamp-1">{proj.title}</h4>
                          <span className="text-[10px] text-gray-400">{proj.demo_url || 'No demo URL'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4"><span className="badge-primary">{proj.category}</span></td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {(proj.tags || []).map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] font-semibold">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        {proj.featured && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
                            Pilihan
                          </span>
                        )}
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          proj.active !== false
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                          {proj.active !== false ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => handleOpenEdit(proj)} className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete(proj.id)} className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">
              {editingId ? 'Edit Proyek Portofolio' : 'Tambah Proyek Baru'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs text-left">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Nama Proyek *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Contoh: E-Commerce App"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Penjelasan singkat mengenai proyek portofolio..."
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 font-bold"
                  >
                    <option value="Web App">Web App</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Design UI/UX">Design UI/UX</option>
                    <option value="Automation">Automation</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Tags (Pisahkan koma)</label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="Next.js, Python, Tailwind"
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block font-bold text-gray-700 mb-1">URL Live Demo (Opsional)</label>
                  <input
                    type="text"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    placeholder="https://demo.example.com"
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Gambar Preview Proyek</label>
                <ImageUpload value={imageUrl} onChange={setImageUrl} folder="projects" />
              </div>

              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-1.5 font-bold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Jadikan Pilihan / Unggulan</span>
                </label>

                <label className="flex items-center gap-1.5 font-bold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Aktifkan Proyek</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary py-2">
                  Batal
                </button>
                <button type="submit" disabled={saving} className="btn-primary py-2 px-5 flex items-center gap-2">
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Simpan Portofolio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
