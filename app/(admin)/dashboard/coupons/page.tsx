'use client';

import { useState, useEffect } from 'react';
import { Plus, Tag, Trash2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getCollection, setDocById, deleteDocById } from '@/lib/supabase/database';

interface Coupon {
  id: string;
  code: string;
  type: 'fixed' | 'percentage';
  value: number;
  usageLimit: number;
  usedCount: number;
  active: boolean;
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [code, setCode] = useState('');
  const [type, setType] = useState<'fixed' | 'percentage'>('fixed');
  const [value, setValue] = useState(20000);
  const [usageLimit, setUsageLimit] = useState(100);
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getCollection('coupons');
      setCoupons((data as Coupon[]) ?? []);
    } catch (err) {
      console.error(err);
      toast.error('Gagal memuat data kupon.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const id = Date.now().toString();
    const record: Coupon = {
      id,
      code: code.trim().toUpperCase(),
      type,
      value: Number(value),
      usageLimit: Number(usageLimit),
      usedCount: 0,
      active: true,
    };

    setSaving(true);
    try {
      await setDocById('coupons', id, record);
      toast.success('Kode promo berhasil dibuat!');
      setIsModalOpen(false);
      setCode('');
      setType('fixed');
      setValue(20000);
      setUsageLimit(100);
      await loadData();
    } catch (err) {
      console.error(err);
      toast.error('Gagal menyimpan kupon.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, couponCode: string) => {
    if (!confirm(`Hapus kupon "${couponCode}"? Tindakan ini tidak dapat dibatalkan.`)) return;
    try {
      await deleteDocById('coupons', id);
      toast.success('Kupon berhasil dihapus.');
      await loadData();
    } catch (err) {
      console.error(err);
      toast.error('Gagal menghapus kupon.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Manajemen Kupon &amp; Promo</h1>
          <p className="text-xs text-gray-500">Buat dan kelola kode diskon promo marketplace.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary text-xs px-4 py-2.5 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Buat Kupon Baru
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            <span className="text-xs">Memuat data kupon…</span>
          </div>
        ) : coupons.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
            <Tag className="w-10 h-10 text-gray-300" />
            <p className="text-xs">Belum ada kupon. Buat kupon pertama Anda!</p>
          </div>
        ) : (
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-slate-50 text-gray-900 font-bold border-b border-gray-200">
              <tr>
                <th className="p-4">Kode Kupon</th>
                <th className="p-4">Tipe Diskon</th>
                <th className="p-4">Nilai Diskon</th>
                <th className="p-4">Penggunaan</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="p-4 font-bold text-blue-600 flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5" /> {c.code}
                  </td>
                  <td className="p-4 uppercase">{c.type}</td>
                  <td className="p-4 font-bold text-gray-900">
                    {c.type === 'fixed'
                      ? `Rp ${Number(c.value).toLocaleString('id-ID')}`
                      : `${c.value}%`}
                  </td>
                  <td className="p-4">
                    {c.usedCount} / {c.usageLimit} Terpakai
                  </td>
                  <td className="p-4">
                    <span className={c.active ? 'badge-success' : 'badge-error'}>
                      {c.active ? 'Aktif' : 'Nonaktif'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(c.id, c.code)}
                      className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      title="Hapus kupon"
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Buat Kupon Promo</h3>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Kode Promo *</label>
                <input
                  type="text"
                  placeholder="Contoh: HEMAT10K"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 uppercase font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Tipe Diskon *</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as 'fixed' | 'percentage')}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200"
                >
                  <option value="fixed">Fixed (Rp)</option>
                  <option value="percentage">Persentase (%)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  {type === 'fixed' ? 'Nilai Diskon (Rp) *' : 'Nilai Diskon (%) *'}
                </label>
                <input
                  type="number"
                  min={0}
                  max={type === 'percentage' ? 100 : undefined}
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Batas Penggunaan *</label>
                <input
                  type="number"
                  min={1}
                  value={usageLimit}
                  onChange={(e) => setUsageLimit(Number(e.target.value))}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary py-2"
                  disabled={saving}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-primary py-2 flex items-center gap-2"
                  disabled={saving}
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Simpan Kupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
