'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Tag, Trash2, Loader2, Copy, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { getCollection, setDocById, deleteDocById } from '@/lib/supabase/database';
import { useAuth } from '@/lib/hooks/useAuth';

interface Coupon {
  id: string;
  code: string;
  type: 'fixed' | 'percentage';
  value: number;
  usageLimit: number;
  usedCount: number;
  active: boolean;
}

const DEFAULT_COUPONS: Coupon[] = [
  { id: '1', code: 'PROMO2026', type: 'fixed', value: 20000, usageLimit: 500, usedCount: 42, active: true },
  { id: '2', code: 'DIGITAL50', type: 'percentage', value: 50, usageLimit: 100, usedCount: 18, active: true },
];

export default function AdminCouponsPage() {
  const { user } = useAuth();
  const isCustomer = user?.role === 'Customer';

  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

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
      setCoupons((data && data.length > 0 ? (data as Coupon[]) : DEFAULT_COUPONS));
    } catch (err) {
      setCoupons(DEFAULT_COUPONS);
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

  const handleCopy = (couponCode: string) => {
    navigator.clipboard.writeText(couponCode);
    setCopiedCode(couponCode);
    toast.success(`Kode Kupon ${couponCode} Berhasil Disalin!`);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  // ============================================
  // CUSTOMER DASHBOARD COUPONS VIEW
  // ============================================
  if (isCustomer) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Kupon &amp; Kode Promo Diskon</h1>
          <p className="text-xs text-gray-500">Salin kode kupon di bawah ini dan gunakan pada saat checkout untuk potongan harga langsung.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {coupons.filter(c => c.active !== false).map((c) => (
              <div
                key={c.id}
                className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-300 transition-colors"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 font-mono font-black text-base tracking-wider">
                      {c.code}
                    </div>
                    <button
                      onClick={() => handleCopy(c.code)}
                      className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                      title="Salin Kode Kupon"
                    >
                      {copiedCode === c.code ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <h3 className="font-extrabold text-gray-900 text-base">
                    {c.type === 'percentage' ? `Diskon ${c.value}%` : `Diskon Rp ${Number(c.value).toLocaleString('id-ID')}`}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    Batas Pemakaian: {c.usedCount || 0}/{c.usageLimit || 100} • Berlaku S/d 31 Des 2026
                  </p>
                </div>

                <Link
                  href="/dashboard/products"
                  className="btn-primary text-xs px-5 py-2.5 rounded-xl shrink-0 font-bold flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Gunakan Kupon di Katalog</span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ============================================
  // ADMIN DASHBOARD COUPONS MANAGEMENT VIEW
  // ============================================
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Manajemen Kupon &amp; Promo</h1>
          <p className="text-xs text-gray-500">Buat dan kelola kode diskon promo marketplace.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary text-xs px-4 py-2 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Buat Kupon Baru
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : coupons.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center text-gray-500 text-xs">
          Belum ada kupon promo. Klik "Buat Kupon Baru" untuk menambahkan.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((c) => (
            <div key={c.id} className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-blue-600" />
                  <span className="font-extrabold text-lg text-gray-900 tracking-wider">{c.code}</span>
                </div>
                <button
                  onClick={() => handleDelete(c.id, c.code)}
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Hapus Kupon"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1">
                <div className="text-2xl font-black text-blue-600">
                  {c.type === 'percentage' ? `${c.value}% OFF` : `Rp ${c.value.toLocaleString('id-ID')} OFF`}
                </div>
                <p className="text-xs text-gray-500">
                  Tipe: {c.type === 'percentage' ? 'Persentase' : 'Potongan Tetap (Nominal)'}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <span>Penggunaan: <strong className="text-gray-900">{c.usedCount}</strong>/{c.usageLimit}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${c.active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                  {c.active ? 'Aktif' : 'Non-Aktif'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add Coupon */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-gray-200 shadow-2xl">
            <h3 className="font-extrabold text-gray-900 text-lg">Buat Kode Promo Baru</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Kode Promo (Kapital) *</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  required
                  placeholder="MISAL: PROMO50K"
                  className="w-full px-4 py-2 text-xs border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none uppercase font-mono font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Tipe Diskon</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-4 py-2 text-xs border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  >
                    <option value="fixed">Nominal Tetap (Rp)</option>
                    <option value="percentage">Persentase (%)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Nilai Diskon *</label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    required
                    min={1}
                    className="w-full px-4 py-2 text-xs border border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Batas Maksimal Penggunaan</label>
                <input
                  type="number"
                  value={usageLimit}
                  onChange={(e) => setUsageLimit(Number(e.target.value))}
                  min={1}
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
                  {saving ? 'Menyimpan...' : 'Simpan Kupon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
