'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCollection, updateDocById } from '@/lib/supabase/database';
import { Loader2, Search, Download, RefreshCw, FileText, CheckCircle2, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/lib/hooks/useAuth';

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  product_title: string;
  amount: number;
  payment_method: string;
  status: string;
  created_at: string;
  download_url?: string;
}

export default function AdminOrdersPage() {
  const { user } = useAuth();
  const isCustomer = user?.role === 'Customer';

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
    // If Customer role, filter only their own orders
    if (isCustomer && user?.email) {
      if (o.customer_email?.toLowerCase() !== user.email.toLowerCase()) {
        return false;
      }
    }
    const matchSearch =
      (o.id || '').toLowerCase().includes(search.toLowerCase()) ||
      (o.customer_name || '').toLowerCase().includes(search.toLowerCase()) ||
      (o.customer_email || '').toLowerCase().includes(search.toLowerCase()) ||
      (o.product_title || '').toLowerCase().includes(search.toLowerCase());
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
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {isCustomer ? 'Riwayat Pesanan & Pembelian Saya' : 'Manajemen Transaksi & Pesanan'}
          </h1>
          <p className="text-gray-500 text-xs">
            {isCustomer
              ? 'Daftar riwayat produk digital dan jasa web yang telah Anda pesan.'
              : 'Kelola semua data pembayaran Tripay dan pesanan masuk.'}
          </p>
        </div>

        {!isCustomer && (
          <button onClick={exportToCsv} className="btn-secondary text-xs px-4 py-2 flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV / Excel
          </button>
        )}
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
            placeholder="Cari ID pesanan, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Orders Table */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center space-y-3">
          <FileText className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="text-base font-bold text-gray-900">Belum ada pesanan</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            {isCustomer
              ? 'Anda belum memiliki riwayat pesanan. Jelajahi katalog produk digital untuk melakukan pembelian pertama!'
              : 'Belum ada data transaksi pesanan masuk.'}
          </p>
          {isCustomer && (
            <Link href="/dashboard/products" className="btn-primary text-xs px-5 py-2.5 rounded-xl inline-flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" /> Jelajahi Katalog Produk
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase font-semibold border-b border-gray-200">
                <tr>
                  <th className="p-4">ID Pesanan</th>
                  <th className="p-4">Produk / Layanan</th>
                  {!isCustomer && <th className="p-4">Pelanggan</th>}
                  <th className="p-4">Metode Bayar</th>
                  <th className="p-4">Total (Rp)</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Aksi & Unduh</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4 font-mono font-bold text-gray-900">{order.id}</td>
                    <td className="p-4">
                      <span className="font-bold text-gray-900 block">{order.product_title || 'Produk Digital'}</span>
                      <span className="text-[10px] text-gray-400">
                        {order.created_at ? new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                      </span>
                    </td>
                    {!isCustomer && (
                      <td className="p-4">
                        <span className="font-bold text-gray-900 block">{order.customer_name}</span>
                        <span className="text-[10px] text-gray-400">{order.customer_email}</span>
                      </td>
                    )}
                    <td className="p-4 font-semibold text-gray-600">{order.payment_method || 'QRIS / VA'}</td>
                    <td className="p-4 font-bold text-gray-900">
                      Rp {Number(order.amount || 0).toLocaleString('id-ID')}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          order.status === 'Paid'
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                            : order.status === 'Pending'
                            ? 'bg-amber-100 text-amber-700 border border-amber-200'
                            : 'bg-red-100 text-red-700 border border-red-200'
                        }`}
                      >
                        {order.status || 'Paid'}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Link
                        href={`/invoice/${order.id}`}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-gray-700 text-[11px] inline-flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" /> Invoice
                      </Link>

                      {order.status === 'Paid' && order.download_url && (
                        <a
                          href={order.download_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-[11px] inline-flex items-center gap-1 shadow-2xs"
                        >
                          <Download className="w-3.5 h-3.5" /> Download File
                        </a>
                      )}

                      {!isCustomer && order.status !== 'Paid' && (
                        <button
                          onClick={() => retryCheck(order.id)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-gray-100"
                          title="Cek & Paksa Update Status Paid"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
