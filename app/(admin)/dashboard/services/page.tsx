'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, CheckCircle2, Loader2, ArrowRight, Check, MessageSquare, Clock, ShieldCheck, Sparkles, X, PhoneCall } from 'lucide-react';
import toast from 'react-hot-toast';
import { getCollection, setDocById, deleteDocById } from '@/lib/supabase/database';
import { useAuth } from '@/lib/hooks/useAuth';
import { AGENCY_SERVICES } from '@/lib/constants/services';
import { COMPANY_INFO } from '@/lib/constants/nav';

interface ServicePackage {
  id: string;
  slug?: string;
  title: string;
  startingPrice: number;
  description: string;
  longDescription?: string;
  features: string[];
  deliverables?: string[];
  technologies?: string[];
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
  
  // Selected Service for In-Dashboard Modal Detail View
  const [selectedService, setSelectedService] = useState<ServicePackage | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [startingPrice, setStartingPrice] = useState(1500000);
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
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
    setLongDescription('');
    setFeatures('');
    setEstimatedDays('3 - 5 Hari');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s: ServicePackage) => {
    setEditingId(s.id);
    setTitle(s.title);
    setStartingPrice(s.startingPrice);
    setDescription(s.description || '');
    setLongDescription(s.longDescription || s.description || '');
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
      longDescription: longDescription || description,
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
    const fullService = selectedService;

    const whatsappUrl = fullService
      ? `https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
          `Halo Dunia Digitalia, saya ingin berkonsultasi mengenai Jasa Pembuatan ${fullService.title} (Mulai Rp ${fullService.startingPrice.toLocaleString('id-ID')}).`
        )}`
      : '';

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Jasa Pembuatan Website Profesional</h1>
          <p className="text-xs text-gray-500">Pilih paket layanan web development kustom sesuai skala bisnis Anda.</p>
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, idx) => (
              <div
                key={s.id || idx}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:border-blue-500 hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{s.description}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Investasi Mulai Dari</span>
                    <div className="text-xl font-black text-blue-600 mt-0.5">
                      Rp {(s.startingPrice || 1500000).toLocaleString('id-ID')}
                    </div>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-700 font-medium">
                    {(s.features || []).slice(0, 3).map((f: string) => (
                      <li key={f} className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="line-clamp-1">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setSelectedService(s)}
                    className="btn-primary w-full text-center text-xs py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-2xs"
                  >
                    <span>Detail & Pesan Layanan</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ULTRA-PREMIUM SLIDE-OVER DETAIL MODAL */}
        {fullService && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 relative">
              
              {/* Top Modal Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    <Sparkles className="w-3 h-3 text-blue-600" /> Web Development Agency
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                    Jasa Pembuatan {fullService.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Price & Delivery Card Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md shadow-blue-500/20">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200 block">Investasi Proyek</span>
                  <div className="text-2xl sm:text-3xl font-black mt-0.5">
                    Rp {fullService.startingPrice?.toLocaleString('id-ID')}
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/15 px-3 py-1.5 rounded-xl border border-white/20 text-xs font-semibold text-white shrink-0">
                  <Clock className="w-4 h-4 text-amber-300" />
                  <span>Estimasi: {fullService.estimatedDays || '3 - 5 Hari'}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Ringkasan Layanan</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {fullService.longDescription || fullService.description}
                </p>
              </div>

              {/* Features List */}
              {fullService.features && fullService.features.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Fitur & Fasilitas Lengkap</h3>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {fullService.features.map((feature: string, idx: number) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2 text-xs font-semibold text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Support & Guarantee Badge */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs font-semibold flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-emerald-900">Garansi Maintenance & Bug Fix 30-60 Hari</h4>
                  <p className="text-[11px] text-emerald-800 font-normal">Pengerjaan ditangani arsitek software berpengalaman dengan garansi pendampingan penuh.</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full py-3.5 text-xs font-bold flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 border-none shadow-md shadow-emerald-500/20"
                >
                  <MessageSquare className="w-4 h-4" /> Konsultasi & Pesan via WA
                </a>
                <button
                  onClick={() => setSelectedService(null)}
                  className="btn-secondary w-full sm:w-auto py-3.5 px-6 text-xs font-bold rounded-2xl shrink-0"
                >
                  Tutup
                </button>
              </div>

            </div>
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
                <label className="block text-xs font-bold text-gray-700 mb-1">Deskripsi Ringkas (Kartu)</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Penjelasan singkat mengenai paket jasa ini..."
                  className="w-full px-4 py-2 text-xs border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Deskripsi Lengkap & Gambaran Detail Layanan</label>
                <textarea
                  rows={4}
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                  placeholder="Penjelasan detail mengenai cakupan layanan, keunggulan, dan alur pengerjaan..."
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
