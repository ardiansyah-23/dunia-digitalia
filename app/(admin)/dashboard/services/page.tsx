'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getCollection, setDocById, deleteDocById } from '@/lib/supabase/database';

interface ServicePackage {
  id: string;
  title: string;
  startingPrice: number;
  description: string;
  features: string[];
  estimatedDays: string;
  active: boolean;
}

export default function AdminServicesPage() {
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
      const parsed: ServicePackage[] = (data ?? []).map((item: any) => ({
        ...item,
        features: Array.isArray(item.features)
          ? item.features
          : typeof item.features === 'string'
          ? item.features.split('\n').filter(Boolean)
          : [],
      }));
      setServices(parsed);
    } catch (err: any) {
      toast.error('Gagal memuat data layanan: ' + (err?.message ?? 'Unknown error'));
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
      toast.success(
        editingId
          ? 'Paket layanan berhasil diperbarui!'
          : 'Paket layanan baru berhasil ditambahkan!'
      );
      setIsModalOpen(false);
      await loadServices();
    } catch (err: any) {
      toast.error('Gagal menyimpan layanan: ' + (err?.message ?? 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus layanan ini?')) return;
    try {
      await deleteDocById('services', id);
      toast.success('Layanan berhasil dihapus!');
      await loadServices();
    } catch (err: any) {
      toast.error('Gagal menghapus layanan: ' + (err?.message ?? 'Unknown error'));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Manajemen Layanan Jasa Web</h1>
          <p className="text-xs text-gray-500">Kelola paket pengembangan website digital agency.</p>
        </div>
        <button onClick={handleOpenAdd} className="btn-primary text-xs px-4 py-2.5 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Tambah Paket Layanan
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      ) : services.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center text-gray-400 gap-3">
          <p className="text-sm font-medium">Belum ada paket layanan.</p>
          <p className="text-xs">Klik &quot;Tambah Paket Layanan&quot; untuk menambahkan yang pertama.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs flex flex-col justify-between hover:border-blue-500 transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="badge-primary">{service.estimatedDays}</span>
                  <span className={service.active ? 'badge-success' : 'badge-secondary'}>
                    {service.active ? 'Aktif' : 'Nonaktif'}
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 text-lg leading-snug">{service.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{service.description}</p>

                <div className="text-xl font-black text-blue-600 pt-2 border-t border-gray-100">
                  Mulai Rp {Number(service.startingPrice).toLocaleString('id-ID')}
                </div>

                <ul className="space-y-2 pt-2 text-xs text-gray-700 font-medium">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleOpenEdit(service)}
                  className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add / Edit Service */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">
              {editingId ? 'Edit Paket Layanan' : 'Tambah Paket Layanan Baru'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Nama Paket Layanan *</label>
                <input
                  type="text"
                  placeholder="Contoh: Company Profile Website"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Harga Mulai (Rp) *</label>
                  <input
                    type="number"
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(Number(e.target.value))}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Estimasi Pengerjaan</label>
                  <input
                    type="text"
                    value={estimatedDays}
                    onChange={(e) => setEstimatedDays(e.target.value)}
                    placeholder="3 - 5 Hari"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Deskripsi singkat mengenai paket ini..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Daftar Fitur (Satu per baris)</label>
                <textarea
                  rows={3}
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="Gratis Domain .com 1 Thn&#10;Optimasi Kecepatan 95+&#10;Form Kontak WA"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={saving}
                  className="btn-secondary py-2"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary py-2 px-5 flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Simpan Layanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
