'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, CheckCircle2, Loader2, ArrowRight, Check, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import { getCollection, setDocById, deleteDocById } from '@/lib/supabase/database';
import { useAuth } from '@/lib/hooks/useAuth';
import { AGENCY_SERVICES } from '@/lib/constants/services';

interface ServicePackage {
  id: string;
  slug?: string;
  title: string;
  startingPrice: number;
  description: string;
  features: string[];
  estimatedDays: string;
  active?: boolean;
}

export default function AdminServicesPage() {
  const { user } = useAuth();
  const isCustomer = user?.role === 'Customer';

  const [services, setServices] = useState<ServicePackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [startingPrice, setStartingPrice] = useState(1500000);
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState('');
  const [estimatedDays, setEstimatedDays] = useState('3 - 5 Hari');

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await getCollection('services');
      const parsed: ServicePackage[] = (data && data.length > 0 ? data : AGENCY_SERVICES).map((item: any) => ({
        ...item,
        features: Array.isArray(item.features)
          ? item.features
          : typeof item.features === 'string'
          ? item.features.split('\n').filter(Boolean)
          : [],
      }));
      setServices(parsed);
    } catch (err: any) {
      setServices(AGENCY_SERVICES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('');
    setStartingPrice(1500000);
    setDescription('');
    setFeatures('');
    setEstimatedDays('3 - 5 Hari');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s: ServicePackage) => {
    setEditingId(s.id);
    setTitle(s.title);
    setStartingPrice(s.startingPrice);
    setDescription(s.description);
    setFeatures(
      Array.isArray(s.features)
        ? s.features.join('\n')
        : typeof s.features === 'string'
        ? s.features
        : ''
    );
    setEstimatedDays(s.estimatedDays);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !startingPrice) {
      toast.error('Mohon lengkapi judul dan harga layanan!');
      return;
    }

    const featureList = features.split('\n').filter(Boolean);
    const id = editingId ?? Date.now().toString();

    const record: Omit<ServicePackage, 'id'> = {
      title,
      startingPrice: Number(startingPrice),
      description,
      features: featureList,
      estimatedDays,
      active: true,
    };

    try {
      setSaving(true);
      await setDocById('services', id, record);
      toast.success(editingId ? 'Layanan berhasil diperbarui!' : 'Layanan berhasil ditambahkan!');
      setIsModalOpen(false);
      loadServices();
    } catch (err: any) {
      toast.error('Gagal menyimpan data layanan: ' + (err?.message ?? 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus paket layanan ini?')) return;
    try {
      await deleteDocById('services', id);
      toast.success('Paket layanan berhasil dihapus');
      loadServices();
    } catch (err: any) {
      toast.error('Gagal menghapus layanan: ' + (err?.message ?? 'Unknown error'));
    }
  };

  // ============================================
  // CUSTOMER DASHBOARD SERVICES CATALOG VIEW
  // ============================================
  if (isCustomer) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Jasa Pembuatan Website Profesional</h1>
          <p className="text-xs text-gray-500">Pilih paket layanan web development kustom sesuai dengan skala bisnis Anda.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, idx) => {
              const slug = s.slug || (idx === 0 ? 'company-profile' : idx === 1 ? 'toko-online' : 'portal-berita');
              return (
                <div key={s.id || idx} className="p-7 rounded-3xl bg-white border border-gray-200 shadow-xs flex flex-col justify-between hover:border-blue-500 transition-all">
                  <div>
                    <h3 className="text-xl font-extrabold text-gray-900 mb-2">{s.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4">{s.description}</p>
                    
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 mb-6">
                      <span className="text-[11px] font-semibold text-gray-400 block uppercase tracking-wider">Investasi Mulai Dari</span>
                      <div className="text-2xl font-black text-blue-600 mt-0.5">
                        Mulai Rp {(s.startingPrice || 1500000).toLocaleString('id-ID')}
                      </div>
                    </div>

                    <ul className="space-y-2.5 mb-6 text-xs text-gray-700 font-semibold">
                      {(s.features || []).map((f: string) => (
                        <li key={f} className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3" />
                          </div>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/jasa/${slug}`}
                    className="btn-primary w-full text-center text-xs py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    <span>Lihat Deskripsi & Detail Layanan</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ============================================
  // ADMIN DASHBOARD SERVICES MANAGEMENT VIEW
  // ============================================
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Manajemen Jasa Web Development</h1>
          <p className="text-xs text-gray-500">Atur daftar paket jasa pembuatan website, harga, dan fitur pendukung.</p>
        </div>
        <button onClick={handleOpenAdd} className="btn-primary text-xs px-4 py-2.5 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Tambah Paket Layanan
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : services.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center text-gray-500 text-xs">
          Belum ada paket layanan yang ditambahkan.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.id} className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{s.title}</h3>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => handleOpenEdit(s)} className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-gray-100">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(s.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mb-4">{s.description}</p>

                <div className="text-xl font-black text-blue-600 mb-4">
                  Rp {(s.startingPrice || 1500000).toLocaleString('id-ID')}
                </div>

                <ul className="space-y-2 text-xs text-gray-700">
                  {s.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                <span>Estimasi: {s.estimatedDays || '3 - 5 Hari'}</span>
                <span className="font-semibold text-emerald-600">✓ Aktif</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL ADD / EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 border border-gray-200 shadow-2xl">
            <h3 className="font-extrabold text-gray-900 text-lg">
              {editingId ? 'Edit Paket Layanan' : 'Tambah Paket Layanan Baru'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Nama Layanan *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Misal: Website Toko Online E-Commerce"
                  className="w-full px-4 py-2 text-xs border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Harga Mulai (Rp) *</label>
                  <input
                    type="number"
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(Number(e.target.value))}
                    required
                    className="w-full px-4 py-2 text-xs border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Estimasi Pengerjaan</label>
                  <input
                    type="text"
                    value={estimatedDays}
                    onChange={(e) => setEstimatedDays(e.target.value)}
                    placeholder="3 - 5 Hari"
                    className="w-full px-4 py-2 text-xs border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Deskripsi Ringkas</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Penjelasan singkat mengenai paket jasa ini..."
                  className="w-full px-4 py-2 text-xs border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Fitur Utama (Pisahkan dengan baris baru)</label>
                <textarea
                  rows={4}
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="Gratis Domain .com 1 Thn&#10;Optimasi SEO&#10;Form Kontak WA"
                  className="w-full px-4 py-2 text-xs border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary text-xs px-4 py-2"
                >
                  Batal
                </button>
                <button type="submit" disabled={saving} className="btn-primary text-xs px-5 py-2">
                  {saving ? 'Menyimpan...' : editingId ? 'Simpan Perubahan' : 'Tambah Layanan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
