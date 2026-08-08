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
  Download,
  AlertCircle,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { getCollection } from '@/lib/supabase/database';
import { useAuth } from '@/lib/hooks/useAuth';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);

  // Admin stats states
  const [stats, setStats] = useState([
    { label: 'Total Penjualan', value: 'Rp 0', change: '+0%', icon: TrendingUp },
    { label: 'Total Transaksi Lunas', value: '0 Orders', change: '0 pesanan baru', icon: CreditCard },
    { label: 'Produk Digital Aktif', value: '0 Item', change: '0 Kategori', icon: ShoppingBag },
    { label: 'Total Pengguna Terdaftar', value: '0 User', change: '+0 minggu ini', icon: Users },
  ]);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);

  // Client / Customer states
  const [clientOrders, setClientOrders] = useState<any[]>([]);
  const [productsMap, setProductsMap] = useState<Record<string, any>>({});

  useEffect(() => {
    if (authLoading || !user) return;
    const currentUser = user;

    async function loadDashboardData() {
      try {
        const orders = await getCollection<any>('orders');
        const products = await getCollection<any>('products');

        // Create a mapping of product titles/ids to product records for easy access
        const pMap: Record<string, any> = {};
        products.forEach((p) => {
          pMap[p.title.toLowerCase()] = p;
          pMap[p.id] = p;
        });
        setProductsMap(pMap);

        if (currentUser.role === 'Customer') {
          // Filter customer orders (case-insensitive email matching)
          const filteredOrders = orders.filter(
            (o) => o.customer_email?.toLowerCase() === currentUser.email?.toLowerCase()
          );
          // Sort by newest order
          const sorted = [...filteredOrders].sort(
            (a, b) => new Date(b.created_at || b.createdAt || 0).getTime() - new Date(a.created_at || a.createdAt || 0).getTime()
          );
          setClientOrders(sorted);
        } else {
          // Admin calculations
          const users = await getCollection<any>('users');
          const categories = await getCollection<any>('categories');

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

          const sortedOrders = [...orders]
            .sort((a, b) => new Date(b.created_at || b.createdAt || 0).getTime() - new Date(a.created_at || a.createdAt || 0).getTime())
            .slice(0, 5);

          setRecentTransactions(sortedOrders);
        }
      } catch (err) {
        console.error('Error loading dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-[50vh]">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  // ============================================================
  // CLIENT / CUSTOMER VIEW
  // ============================================================
  if (user?.role === 'Customer') {
    const paidClientOrders = clientOrders.filter((o) => o.status === 'Paid');
    const pendingClientOrders = clientOrders.filter((o) => o.status === 'Pending');

    return (
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-1">
              Portal Pelanggan Dunia Digitalia
            </h1>
            <p className="text-xs text-gray-500">
              Selamat datang kembali, <strong className="text-blue-600 font-bold">{user.displayName || 'Pelanggan'}</strong>. Kelola pembelian produk digital Anda di sini.
            </p>
          </div>
          <Link href="/" className="btn-primary text-xs px-5 py-2.5">
            Lanjut Belanja →
          </Link>
        </div>

        {/* Client stats summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-2">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Total Transaksi</span>
            <div className="text-3xl font-black text-gray-900">{clientOrders.length}</div>
            <p className="text-[10px] text-gray-400">Total riwayat pembelian Anda</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-2 border-l-4 border-l-emerald-500">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Produk Terbeli (Lunas)</span>
            <div className="text-3xl font-black text-emerald-600">{paidClientOrders.length}</div>
            <p className="text-[10px] text-gray-400">Siap untuk diunduh secara instan</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-2 border-l-4 border-l-amber-500">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Menunggu Pembayaran</span>
            <div className="text-3xl font-black text-amber-600">{pendingClientOrders.length}</div>
            <p className="text-[10px] text-gray-400">Menunggu pembayaran Tripay selesai</p>
          </div>
        </div>

        {/* Purchased Products Grid list */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="font-bold text-gray-900 text-sm">Daftar Pembelian & Link Download</h3>
            <p className="text-[11px] text-gray-400">Semua produk digital yang sudah Anda beli di toko kami.</p>
          </div>

          {clientOrders.length === 0 ? (
            <div className="p-12 text-center text-gray-400 space-y-3">
              <AlertCircle className="w-12 h-12 mx-auto text-gray-300" />
              <p className="text-sm font-medium">Anda belum pernah melakukan pembelian produk digital.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {clientOrders.map((ord) => {
                // Find matching product download details
                const titleLower = (ord.product_title || ord.product || '').toLowerCase();
                const matchedProd = productsMap[titleLower];
                const downloadUrl = matchedProd?.downloadUrl || matchedProd?.download_url || '';
                const thumbnail = matchedProd?.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80';
                
                return (
                  <div key={ord.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors">
                    {/* Left: Product Info */}
                    <div className="flex gap-4 items-center">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                        <img src={thumbnail} alt={ord.product_title} className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          Order #{ord.id}
                        </span>
                        <h4 className="font-bold text-gray-900 text-sm">{ord.product_title || 'Produk Digital'}</h4>
                        <p className="text-xs text-gray-500">
                          {new Date(ord.created_at || ord.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })} • Rp {(ord.amount || 0).toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>

                    {/* Middle: Payment status badge */}
                    <div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        ord.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        ord.status === 'Pending' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        {ord.status === 'Paid' ? 'Lunas / Berhasil' :
                         ord.status === 'Pending' ? 'Menunggu Pembayaran' : 'Dibatalkan'}
                      </span>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3">
                      {ord.status === 'Paid' ? (
                        <>
                          {downloadUrl ? (
                            <a
                              href={downloadUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 border-none shadow-xs shadow-emerald-500/20"
                            >
                              <Download className="w-3.5 h-3.5" /> Download File
                            </a>
                          ) : (
                            <span className="text-xs text-gray-400 italic font-semibold">File download belum diset</span>
                          )}
                          <Link
                            href={`/invoice/${ord.id}`}
                            className="btn-secondary text-xs px-4 py-2 flex items-center gap-1"
                          >
                            Invoice <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </>
                      ) : ord.status === 'Pending' ? (
                        <Link
                          href={`/checkout/${ord.id}`}
                          className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 border-none shadow-xs shadow-amber-500/20"
                        >
                          <CreditCard className="w-3.5 h-3.5" /> Bayar Sekarang
                        </Link>
                      ) : (
                        <span className="text-xs text-gray-400">Pembelian Gagal</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Support & Quick Contact card */}
        <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h4 className="font-bold text-blue-900 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600 shrink-0" /> Butuh Bantuan Integrasi atau Instalasi?
            </h4>
            <p className="text-xs text-blue-700">
              Tim support teknis Dunia Digitalia siap membantu memasang template Blogger maupun melakukan setup database API Anda.
            </p>
          </div>
          <Link href="/contact" className="btn-primary text-xs px-5 py-2.5 bg-blue-600 hover:bg-blue-700 shrink-0 border-none">
            Hubungi Support Kami
          </Link>
        </div>
      </div>
    );
  }

  // ============================================================
  // ADMIN VIEW
  // ============================================================
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
    </div>
  );
}
