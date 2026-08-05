'use client';

import Link from 'next/link';
import {
  ShoppingBag,
  CreditCard,
  FileText,
  Users,
  TrendingUp,
  ArrowUpRight,
  Plus,
  Tag,
  CheckCircle2,
  Clock,
  Download,
} from 'lucide-react';

const DASHBOARD_STATS = [
  { label: 'Total Penjualan Bulan Ini', value: 'Rp 14.850.000', change: '+24.5%', isPositive: true, icon: TrendingUp },
  { label: 'Total Transaksi Lunas', value: '142 Orders', change: '+18 pesanan baru', isPositive: true, icon: CreditCard },
  { label: 'Produk Digital Aktif', value: '48 Item', change: '12 Kategori', isPositive: true, icon: ShoppingBag },
  { label: 'Total Pengguna Terdaftar', value: '1.240 User', change: '+32 minggu ini', isPositive: true, icon: Users },
];

const RECENT_TRANSACTIONS = [
  { id: 'ORD-882194', name: 'Budi Santoso', product: 'NewsFast Blogger Template', amount: 149000, method: 'QRIS', status: 'Paid', date: 'Hari ini, 14:20' },
  { id: 'ORD-771239', name: 'Siti Rahma', product: 'Tokodigital Next.js 15 App', amount: 349000, method: 'BCA VA', status: 'Pending', date: 'Hari ini, 13:05' },
  { id: 'ORD-662310', name: 'Rian Hidayat', product: 'OmniDash Admin Dashboard', amount: 199000, method: 'Indomaret', status: 'Expired', date: 'Kemarin, 19:40' },
  { id: 'ORD-553411', name: 'Dini Lestari', product: 'Master Prompt ChatGPT 500+', amount: 79000, method: 'Mandiri VA', status: 'Paid', date: 'Kemarin, 16:15' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-1">
            Overview Dashboard Marketplace
          </h1>
          <p className="text-xs text-gray-500">
            Ringkasan pendapatan, transaksi Tripay, dan pengelolaan konten Dunia Digitalia.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard/products" className="btn-primary text-xs px-4 py-2.5 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Upload Produk Baru
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {DASHBOARD_STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500">{stat.label}</span>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-black text-gray-900 tracking-tight mb-1">{stat.value}</div>
                <span className="text-xs font-bold text-emerald-600 inline-flex items-center gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5" /> {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link href="/dashboard/products" className="p-4 rounded-2xl bg-white border border-gray-200 hover:border-blue-500 transition-all flex items-center gap-3 group shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900">Kelola Produk</h4>
            <span className="text-[10px] text-gray-400">Upload & Edit File</span>
          </div>
        </Link>

        <Link href="/dashboard/orders" className="p-4 rounded-2xl bg-white border border-gray-200 hover:border-blue-500 transition-all flex items-center gap-3 group shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900">Cek Transaksi</h4>
            <span className="text-[10px] text-gray-400">Tripay Payment</span>
          </div>
        </Link>

        <Link href="/dashboard/coupons" className="p-4 rounded-2xl bg-white border border-gray-200 hover:border-blue-500 transition-all flex items-center gap-3 group shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <Tag className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900">Kupon Diskon</h4>
            <span className="text-[10px] text-gray-400">Buat Promo Baru</span>
          </div>
        </Link>

        <Link href="/dashboard/articles" className="p-4 rounded-2xl bg-white border border-gray-200 hover:border-blue-500 transition-all flex items-center gap-3 group shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900">Tulis Artikel</h4>
            <span className="text-[10px] text-gray-400">Blog & Tutorial</span>
          </div>
        </Link>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900 text-sm">Transaksi Pembayaran Terbaru</h3>
            <p className="text-[11px] text-gray-400">Transaksi otomatis dari Tripay Payment Gateway.</p>
          </div>
          <Link href="/dashboard/orders" className="text-xs font-bold text-blue-600 hover:underline">
            Lihat Semua Transaksi →
          </Link>
        </div>

        <table className="w-full text-left text-xs text-gray-600">
          <thead className="bg-slate-50 text-gray-900 font-bold border-b border-gray-200">
            <tr>
              <th className="p-4">No Order</th>
              <th className="p-4">Pembeli</th>
              <th className="p-4">Produk Digital</th>
              <th className="p-4">Metode</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {RECENT_TRANSACTIONS.map((ord) => (
              <tr key={ord.id} className="hover:bg-gray-50/50">
                <td className="p-4 font-bold text-gray-900">{ord.id}</td>
                <td className="p-4 font-semibold text-gray-800">{ord.name}</td>
                <td className="p-4 text-gray-700">{ord.product}</td>
                <td className="p-4 font-bold text-blue-600">{ord.method}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
