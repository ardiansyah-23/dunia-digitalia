'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  FileText,
  Layers,
  Image as ImageIcon,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  Star,
  CreditCard,
  Tag,
  Shield,
  User as UserIcon,
} from 'lucide-react';
import { signOutUser } from '@/lib/supabase/auth';
import { useAuth } from '@/lib/hooks/useAuth';
import toast from 'react-hot-toast';

const ADMIN_MENU = [
  { label: 'Dashboard Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Transaksi & Orders', href: '/dashboard/orders', icon: CreditCard },
  { label: 'Produk Digital', href: '/dashboard/products', icon: ShoppingBag },
  { label: 'Kupon & Promo', href: '/dashboard/coupons', icon: Tag },
  { label: 'Jasa Pembuatan Web', href: '/dashboard/services', icon: Layers },
  { label: 'Artikel & Blog', href: '/dashboard/articles', icon: FileText },
  { label: 'Galeri Media', href: '/dashboard/gallery', icon: ImageIcon },
  { label: 'Testimonial Klien', href: '/dashboard/testimonials', icon: Star },
  { label: 'Pesan Masuk', href: '/dashboard/messages', icon: MessageSquare },
  { label: 'User & Akses', href: '/dashboard/users', icon: Users, roles: ['Super Admin'] },
  { label: 'Pengaturan Situs', href: '/dashboard/settings', icon: Settings, roles: ['Super Admin'] },
];

const CUSTOMER_MENU = [
  { label: 'Dashboard Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Kembali ke Beranda', href: '/', icon: ShoppingBag },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const role = user?.role || 'Customer';

  const handleLogout = async () => {
    try {
      localStorage.removeItem('admin_demo_user');
      await signOutUser();
    } catch (e) {
      console.error(e);
    }
    toast.success('Berhasil keluar');
    router.push('/login');
  };

  const menuItems = role === 'Customer' ? CUSTOMER_MENU : ADMIN_MENU.filter((item) => {
    if (item.roles) {
      return item.roles.includes(role);
    }
    return role === 'Super Admin' || role === 'Admin';
  });

  return (
    <aside className="w-72 shrink-0 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0 shadow-xs z-20">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shrink-0 shadow-md shadow-blue-500/20">
          D
        </div>
        <div>
          <h2 className="font-extrabold text-gray-900 text-sm whitespace-nowrap">Dunia Digitalia</h2>
          <span className="text-[10px] font-bold tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded whitespace-nowrap">
            {role === 'Customer' ? 'Portal Pelanggan' : 'Admin Panel'}
          </span>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm font-bold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Session Info Card */}
      {user && (
        <div className="p-4 mx-4 mb-2 bg-slate-50 border border-gray-200 rounded-2xl space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <UserIcon className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-gray-900 truncate leading-none mb-1">
                {user.displayName || 'Pengguna'}
              </p>
              <p className="text-[10px] text-gray-400 truncate leading-none">
                {user.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold bg-white border border-gray-200 px-2.5 py-1 rounded-lg w-fit text-blue-600">
            <Shield className="w-3 h-3" />
            <span>{role}</span>
          </div>
        </div>
      )}

      {/* Footer / Logout */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span className="whitespace-nowrap">
            {role === 'Customer' ? 'Keluar Akun' : 'Keluar Admin'}
          </span>
        </button>
      </div>
    </aside>
  );
}
