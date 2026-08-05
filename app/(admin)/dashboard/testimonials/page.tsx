'use client';

import { useState } from 'react';
import { Plus, Star, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  { id: '1', name: 'Rian Hidayat', role: 'Blogger & Media', company: 'Portal Berita', content: 'Template NewsFast sangat cepat dan rapi. Pendapatan Google AdSense blog saya naik signifikan!', rating: 5 },
  { id: '2', name: 'Siti Rahma', role: 'Pemilik Toko Online', company: 'Toko Modern', content: 'Jasa pembuatan toko online dari Dunia Digitalia sangat profesional. Pembayaran otomatis via Tripay berjalan lancar.', rating: 5 },
  { id: '3', name: 'Budi Santoso', role: 'Full-stack Developer', company: 'StudioTekno', content: 'Source code Next.js 15 nya sangat rapi, modular, dan mudah dikembangkan lagi. Recommended!', rating: 5 },
];

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(INITIAL_TESTIMONIALS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);

  const handleOpenAdd = () => {
    setEditingId(null);
    setName('');
    setRole('');
    setCompany('');
    setContent('');
    setRating(5);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: TestimonialItem) => {
    setEditingId(t.id);
    setName(t.name);
    setRole(t.role);
    setCompany(t.company);
    setContent(t.content);
    setRating(t.rating);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !content) {
      toast.error('Mohon isi nama dan isi ulasan!');
      return;
    }

    if (editingId) {
      setTestimonials(testimonials.map(t => t.id === editingId ? {
        ...t, name, role, company, content, rating
      } : t));
      toast.success('Testimonial berhasil diperbarui!');
    } else {
      const newT: TestimonialItem = {
        id: Date.now().toString(),
        name, role, company, content, rating
      };
      setTestimonials([newT, ...testimonials]);
      toast.success('Testimonial baru berhasil ditambahkan!');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
    toast.success('Testimonial berhasil dihapus!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Manajemen Testimonial & Ulasan Klien</h1>
          <p className="text-xs text-gray-500">Kelola ulasan kepuasan dari pelanggan marketplace dan klien agency.</p>
        </div>
        <button onClick={handleOpenAdd} className="btn-primary text-xs px-4 py-2.5 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Tambah Testimonial
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t.id} className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="badge-primary">Terverifikasi</span>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed italic">"{t.content}"</p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-gray-900 text-xs">{t.name}</h4>
                <span className="text-[11px] text-gray-400">{t.role} • {t.company}</span>
              </div>
              <div className="flex gap-1">
                <button onClick={() => handleOpenEdit(t)} className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">
              {editingId ? 'Edit Testimonial' : 'Tambah Testimonial Baru'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Nama Klien *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Budi Santoso"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Peran / Jabatan</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Blogger"
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Perusahaan / Website</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Media Tekno"
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Rating Bintang (1 - 5)</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 font-bold"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 Bintang)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 Bintang)</option>
                  <option value={3}>⭐⭐⭐ (3 Bintang)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Isi Ulasan Testimonial *</label>
                <textarea
                  rows={3}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  placeholder="Tulis testimoni dari klien..."
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary py-2">Batal</button>
                <button type="submit" className="btn-primary py-2 px-5">Simpan Testimonial</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
