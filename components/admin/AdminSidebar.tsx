'use client';

import { useState, useEffect } from 'react';
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
  Home,
  X,
  ChevronLeft,
  ChevronRight,
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
  { label: 'Kembali ke Beranda', href: '/', icon: Home },
  { label: 'Beli Produk', href: '/produk', icon: ShoppingBag },
  { label: 'Jasa Web', href: '/jasa', icon: Layers },
];

interface AdminSidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
  collapsed?: boolean;
  setCollapsed?: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
}

export default function AdminSidebar({
  mobileOpen = false,
  setMobileOpen,
  collapsed: externalCollapsed,
  setCollapsed: externalSetCollapsed,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const role = user?.role || 'Customer';

  // Internal collapsed state if not controlled externally
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isCollapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;

  const toggleCollapse = () => {
    if (externalSetCollapsed) {
      externalSetCollapsed((prev: boolean) => !prev);
    } else {
      setInternalCollapsed((prev) => !prev);
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('admin_demo_user');
      await signOutUser();
    } catch (e) {
      console.error(e);
    }
    toast.success('Berhasil keluar');
    setMobileOpen?.(false);
    router.push('/login');
  };

  const menuItems = role === 'Customer' ? CUSTOMER_MENU : ADMIN_MENU.filter((item) => {
    if (item.roles) {
      return item.roles.includes(role);
    }
    return role === 'Super Admin' || role === 'Admin';
  });

  return (
    <>
      {/* Backdrop for Mobile Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={() => setMobileOpen?.(false)}
        />
      )}

      {/* Sidebar Drawer / Desktop Collapsible Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 flex flex-col h-full shadow-xl transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:sticky lg:top-0 lg:shadow-xs shrink-0 ${
          mobileOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-72'}`}
      >
        {/* Header */}
        <div className={`p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between gap-2 ${isCollapsed ? 'lg:px-3 lg:justify-center' : ''}`}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shrink-0 shadow-md shadow-blue-500/20">
              D
            </div>
            {!isCollapsed && (
              <div className="hidden lg:block min-w-0">
                <h2 className="font-extrabold text-gray-900 text-sm whitespace-nowrap truncate">Dunia Digitalia</h2>
                <span className="text-[10px] font-bold tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded whitespace-nowrap">
                  {role === 'Customer' ? 'Portal Pelanggan' : 'Admin Panel'}
                </span>
              </div>
            )}
            {/* Mobile Header Label */}
            <div className="lg:hidden">
              <h2 className="font-extrabold text-gray-900 text-sm whitespace-nowrap">Dunia Digitalia</h2>
              <span className="text-[10px] font-bold tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded whitespace-nowrap">
                {role === 'Customer' ? 'Portal Pelanggan' : 'Admin Panel'}
              </span>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            onClick={() => setMobileOpen?.(false)}
            className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Desktop Collapse Toggle Button */}
          <button
            onClick={toggleCollapse}
            title={isCollapsed ? 'Buka Panel Samping' : 'Tutup / Lipat Panel Samping'}
            className="hidden lg:flex p-1.5 rounded-xl text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors shrink-0"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5 text-blue-600" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Nav List */}
        <nav className="flex-grow p-3 space-y-1.5 overflow-y-auto overflow-x-hidden">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={isCollapsed ? item.label : undefined}
                onClick={() => setMobileOpen?.(false)}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm font-bold'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                } ${isCollapsed ? 'lg:justify-center lg:px-0' : ''}`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className={`whitespace-nowrap ${isCollapsed ? 'lg:hidden' : ''}`}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Session Info Card */}
        {user && (
          <div className={`p-3 mx-3 mb-2 bg-slate-50 border border-gray-200 rounded-2xl space-y-2 ${isCollapsed ? 'lg:mx-2 lg:p-2' : ''}`}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <UserIcon className="w-4 h-4" />
              </div>
              <div className={`min-w-0 flex-1 ${isCollapsed ? 'lg:hidden' : ''}`}>
                <p className="text-xs font-bold text-gray-900 truncate leading-none mb-1">
                  {user.displayName || 'Pengguna'}
                </p>
                <p className="text-[10px] text-gray-400 truncate leading-none">
                  {user.email}
                </p>
              </div>
            </div>
            <div className={`flex items-center gap-1 text-[10px] font-bold bg-white border border-gray-200 px-2.5 py-1 rounded-lg w-fit text-blue-600 ${isCollapsed ? 'lg:hidden' : ''}`}>
              <Shield className="w-3 h-3" />
              <span>{role}</span>
            </div>
          </div>
        )}

        {/* Footer / Logout */}
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={handleLogout}
            title={isCollapsed ? (role === 'Customer' ? 'Keluar Akun' : 'Keluar Admin') : undefined}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-all ${
              isCollapsed ? 'lg:justify-center lg:px-0' : ''
            }`}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span className={`whitespace-nowrap ${isCollapsed ? 'lg:hidden' : ''}`}>
              {role === 'Customer' ? 'Keluar Akun' : 'Keluar Admin'}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
