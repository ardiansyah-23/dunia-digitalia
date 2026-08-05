'use client';

import { useState } from 'react';
import { Plus, Tag, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState([
    { id: '1', code: 'PROMO2026', type: 'fixed', value: 20000, usageLimit: 100, usedCount: 14, active: true },
    { id: '2', code: 'DIGITAL50', type: 'percentage', value: 50, usageLimit: 50, usedCount: 8, active: true },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState('');
  const [value, setValue] = useState(20000);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    const newCoupon = {
      id: Date.now().toString(),
      code: code.toUpperCase(),
      type: 'fixed' as const,
      value: Number(value),
      usageLimit: 100,
      usedCount: 0,
      active: true,
    };
    setCoupons([newCoupon, ...coupons]);
    toast.success('Kode promo berhasil dibuat!');
    setIsModalOpen(false);
    setCode('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Manajemen Kupon & Promo</h1>
          <p className="text-xs text-gray-500">Buat dan kelola kode diskon promo marketplace.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary text-xs px-4 py-2.5 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Buat Kupon Baru
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
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
                  {c.type === 'fixed' ? `Rp ${c.value.toLocaleString('id-ID')}` : `${c.value}%`}
                </td>
                <td className="p-4">{c.usedCount} / {c.usageLimit} Terpakai</td>
                <td className="p-4"><span className="badge-success">Aktif</span></td>
                <td className="p-4 text-right">
                  <button onClick={() => setCoupons(coupons.filter(x => x.id !== c.id))} className="p-1.5 rounded-lg bg-red-50 text-red-600">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
                <label className="block font-bold text-gray-700 mb-1">Nilai Diskon (Rp) *</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary py-2">Batal</button>
                <button type="submit" className="btn-primary py-2">Simpan Kupon</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
