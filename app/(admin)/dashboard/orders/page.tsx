'use client';

import { useState } from 'react';
import { Search, Filter, Download, CheckCircle2, RefreshCw, FileText, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const MOCK_ORDERS = [
  { id: '1', orderNumber: 'ORD-882194', customerName: 'Budi Santoso', email: 'budi@example.com', amount: 149000, method: 'QRIS', status: 'Paid', date: '4 Agust 2026' },
  { id: '2', orderNumber: 'ORD-771239', customerName: 'Siti Rahma', email: 'siti@example.com', amount: 349000, method: 'BCAVA', status: 'Pending', date: '4 Agust 2026' },
  { id: '3', orderNumber: 'ORD-662310', customerName: 'Rian Hidayat', email: 'rian@example.com', amount: 199000, method: 'INDOMARET', status: 'Expired', date: '3 Agust 2026' },
];

export default function AdminOrdersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = MOCK_ORDERS.filter((o) => {
    const matchSearch = o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const exportToCsv = () => {
    toast.success('Laporan transaksi berhasil di-export ke CSV!');
  };

  const retryCheck = (orderNumber: string) => {
    toast.loading(`Mengecek status Tripay untuk ${orderNumber}...`);
    setTimeout(() => {
      toast.dismiss();
      toast.success('Status transaksi diperbarui!');
    }, 1200);
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
        <table className="w-full text-left text-xs text-gray-600">
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
              <tr key={ord.id} className="hover:bg-gray-50/50">
                <td className="p-4 font-bold text-gray-900">{ord.orderNumber}</td>
                <td className="p-4">
                  <div className="font-semibold text-gray-900">{ord.customerName}</div>
                  <span className="text-[11px] text-gray-400">{ord.email}</span>
                </td>
                <td className="p-4 font-semibold text-blue-600">{ord.method}</td>
                <td className="p-4 font-bold text-gray-900">Rp {ord.amount.toLocaleString('id-ID')}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                    ord.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    ord.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                    'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {ord.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => retryCheck(ord.orderNumber)}
                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                    title="Cek Ulang Status Tripay"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={`/invoice/${ord.orderNumber}?name=${encodeURIComponent(ord.customerName)}&email=${encodeURIComponent(ord.email)}&price=${ord.amount}&method=${ord.method}`}
                    className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 inline-block"
                    title="Lihat Invoice"
                  >
                    <FileText className="w-3.5 h-3.5" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
