'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, Globe, Layers } from 'lucide-react';
import toast from 'react-hot-toast';

interface ServicePackage {
  id: string;
  title: string;
  startingPrice: number;
  description: string;
  features: string[];
  estimatedDays: string;
  active: boolean;
}

const INITIAL_SERVICES: ServicePackage[] = [
  {
    id: '1',
    title: 'Company Profile Website',
    startingPrice: 1500000,
    description: 'Website profil perusahaan profesional, responsif, siap SEO, dan cepat.',
    features: ['Gratis Domain .com 1 Thn', 'Optimasi Kecepatan 95+', 'Form Kontak WhatsApp', 'Garansi Maintenance 30 Hari'],
    estimatedDays: '3 - 5 Hari',
    active: true,
  },
  {
    id: '2',
    title: 'Website Toko Online E-Commerce',
    startingPrice: 2500000,
    description: 'Website penjualan dengan sistem pembayaran otomatis Tripay (QRIS/VA) dan cek ongkir.',
    features: ['Payment Gateway QRIS/VA', 'Katalog Produk Unlimited', 'Dashboard Penjualan', 'Cek Ongkir Otomatis'],
    estimatedDays: '7 - 10 Hari',
    active: true,
  },
  {
    id: '3',
    title: 'Portal Berita / Media Digital',
    startingPrice: 3000000,
    description: 'Website portal berita bertrafik tinggi dengan manajemen redaksi dan slot iklan.',
    features: ['Slot Iklan AdSense Ready', 'Kecepatan Ultra', 'Schema News JSON-LD', 'Kategori Berita Multi-level'],
    estimatedDays: '5 - 7 Hari',
    active: true,
  },
];

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServicePackage[]>(INITIAL_SERVICES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [startingPrice, setStartingPrice] = useState(1500000);
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState('');
  const [estimatedDays, setEstimatedDays] = useState('3 - 5 Hari');

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
    setFeatures(s.features.join('\n'));
    setEstimatedDays(s.estimatedDays);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !startingPrice) {
      toast.error('Mohon lengkapi judul dan harga layanan!');
      return;
    }

    const featureList = features.split('\n').filter(Boolean);

    if (editingId) {
      setServices(services.map(s => s.id === editingId ? {
        ...s,
        title,
        startingPrice: Number(startingPrice),
        description,
        features: featureList,
        estimatedDays,
      } : s));
      toast.success('Paket layanan berhasil diperbarui!');
    } else {
      const newService: ServicePackage = {
        id: Date.now().toString(),
        title,
        startingPrice: Number(startingPrice),
        description,
        features: featureList,
        estimatedDays,
        active: true,
      };
      setServices([...services, newService]);
      toast.success('Paket layanan baru berhasil ditambahkan!');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setServices(services.filter(s => s.id !== id));
    toast.success('Layanan berhasil dihapus!');
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs flex flex-col justify-between hover:border-blue-500 transition-all space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="badge-primary">{service.estimatedDays}</span>
                <span className="badge-success">Aktif</span>
              </div>

              <h3 className="font-bold text-gray-900 text-lg leading-snug">{service.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{service.description}</p>
              
              <div className="text-xl font-black text-blue-600 pt-2 border-t border-gray-100">
                Mulai Rp {service.startingPrice.toLocaleString('id-ID')}
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
              <button onClick={() => handleOpenEdit(service)} className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold flex items-center gap-1">
                <Edit2 className="w-3.5 h-3.5" /> Edit
              </button>
              <button onClick={() => handleDelete(service.id)} className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold flex items-center gap-1">
                <Trash2 className="w-3.5 h-3.5" /> Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

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
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary py-2">Batal</button>
                <button type="submit" className="btn-primary py-2 px-5">Simpan Layanan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
