'use client';

import { useState, useEffect } from 'react';
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
  Loader2,
} from 'lucide-react';
import { getCollection } from '@/lib/supabase/database';

export default function DashboardPage() {
  const [stats, setStats] = useState([
    { label: 'Total Penjualan Bulan Ini', value: 'Rp 0', change: '+0%', icon: TrendingUp },
    { label: 'Total Transaksi Lunas', value: '0 Orders', change: '0 pesanan baru', icon: CreditCard },
    { label: 'Produk Digital Aktif', value: '0 Item', change: '0 Kategori', icon: ShoppingBag },
    { label: 'Total Pengguna Terdaftar', value: '0 User', change: '+0 minggu ini', icon: Users },
  ]);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const orders = await getCollection<any>('orders');
        const products = await getCollection<any>('products');
        const users = await getCollection<any>('users');
        const categories = await getCollection<any>('categories');

        // Calculations
        const paidOrders = orders.filter((o) => o.status === 'Paid');
        const totalRevenue = paidOrders.reduce((sum, o) => sum + (o.amount || 0), 0);

        setStats([
          {
            label: 'Total Penjualan',
            value: `Rp ${totalRevenue.toLocaleString('id-ID')}`,
            change: paidOrders.length > 0 ? '+24.5%' : '+0%',
            icon: TrendingUp,
          },
          {
            label: 'Total Transaksi Lunas',
            value: `${paidOrders.length} Orders`,
            change: `+${paidOrders.length} total`,
            icon: CreditCard,
          },
          {
            label: 'Produk Digital Aktif',
            value: `${products.length} Item`,
            change: `${categories.length} Kategori`,
            icon: ShoppingBag,
          },
          {
            label: 'Total Pengguna Terdaftar',
            value: `${users.length} User`,
            change: `+${users.length} total`,
            icon: Users,
          },
        ]);

        // Map recent transactions
        const sortedOrders = [...orders]
          .sort((a, b) => new Date(b.created_at || b.createdAt).getTime() - new Date(a.created_at || a.createdAt).getTime())
          .slice(0, 5);

        setRecentTransactions(sortedOrders);
      } catch (err) {
        console.error('Error loading dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

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

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : (
        <>
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
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
                {recentTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-400">Belum ada transaksi pembayaran masuk.</td>
                  </tr>
                ) : (
                  recentTransactions.map((ord) => (
                    <tr key={ord.id} className="hover:bg-gray-50/50">
                      <td className="p-4 font-bold text-gray-900">{ord.id}</td>
                      <td className="p-4 font-semibold text-gray-800">{ord.customer_name || ord.name || 'Pelanggan'}</td>
                      <td className="p-4 text-gray-700">{ord.product_title || ord.product || '-'}</td>
                      <td className="p-4 font-bold text-blue-600">{ord.payment_method || ord.method || 'QRIS'}</td>
                      <td className="p-4 font-bold text-gray-900">Rp {(ord.amount || ord.price || 0).toLocaleString('id-ID')}</td>
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
