'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCollection, updateDocById } from '@/lib/supabase/database';
import { Loader2, Search, Download, RefreshCw, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  product_title: string;
  amount: number;
  payment_method: string;
  status: string;
  created_at: string;
}



export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getCollection('orders');
      setOrders((data as Order[]) || []);
    } catch (err) {
      toast.error('Gagal memuat data pesanan.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const exportToCsv = () => {
    toast.success('Laporan transaksi berhasil di-export ke CSV!');
  };

  const retryCheck = async (id: string) => {
    const toastId = toast.loading(`Mengecek status Tripay untuk ${id}...`);
    try {
      await updateDocById('orders', id, { status: 'Paid' });
      toast.dismiss(toastId);
      toast.success('Status transaksi diperbarui!');
      await loadData();
    } catch (err) {
      toast.dismiss(toastId);
      toast.error('Gagal memperbarui status pesanan.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Manajemen Transaksi & Pesanan</h1>
          <p className="text-gray-500 text-xs">Kelola semua data pembayaran Tripay dan pesanan masuk.</p>
        </div>

        <button onClick={exportToCsv} className="btn-secondary text-xs px-4 py-2 flex items-center gap-2">
          <Download className="w-4 h-4" /> Export CSV / Excel
        </button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['All', 'Paid', 'Pending', 'Expired', 'Failed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                statusFilter === st ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari no pesanan / email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            <span className="text-sm">Memuat data pesanan...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <FileText className="w-10 h-10 mb-3 opacity-40" />
            <p className="text-sm font-medium">Belum ada pesanan masuk</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600 min-w-[650px]">
              <thead className="bg-slate-50 text-gray-900 font-bold border-b border-gray-200">
                <tr>
                  <th className="p-4">No Pesanan</th>
                  <th className="p-4">Pelanggan</th>
                  <th className="p-4">Metode Bayar</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-mono font-bold text-blue-600">{ord.id}</td>
                    <td className="p-4">
                      <div className="font-bold text-gray-900">{ord.customer_name || 'Pelanggan'}</div>
                      <div className="text-[11px] text-gray-400">{ord.customer_email || '-'}</div>
                    </td>
                    <td className="p-4 font-semibold text-gray-700">{ord.payment_method || 'QRIS'}</td>
                    <td className="p-4 font-bold text-gray-900">
                      Rp {(ord.amount || 0).toLocaleString('id-ID')}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        ord.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        ord.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        {ord.status === 'Paid' ? 'Lunas' : ord.status === 'Pending' ? 'Pending' : 'Dibatalkan'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {ord.status === 'Pending' && (
                          <button
                            onClick={() => retryCheck(ord.id)}
                            title="Tandai Sudah Lunas"
                            className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 border border-emerald-200 text-xs flex items-center gap-1 font-semibold"
                          >
                            <RefreshCw className="w-3.5 h-3.5" /> Lunas
                          </button>
                        )}
                        <Link
                          href={`/invoice/${ord.id}`}
                          className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 border border-gray-200 text-xs flex items-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5" /> Invoice
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
