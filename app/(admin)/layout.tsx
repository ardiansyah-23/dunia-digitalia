'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useAuth } from '@/lib/hooks/useAuth';
import { Loader2, Menu, X, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const CUSTOMER_ALLOWED_ROUTES = [
  '/dashboard',
  '/dashboard/products',
  '/dashboard/services',
  '/dashboard/orders',
  '/dashboard/coupons',
  '/dashboard/settings',
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const redirectedRef = useRef(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const isLoginPage = pathname === '/login';

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (loading || isLoginPage) return;
    if (redirectedRef.current) return;

    if (!user) {
      redirectedRef.current = true;
      router.replace('/login');
      return;
    }

    // Role-based access control
    if (user.role === 'Customer' && !CUSTOMER_ALLOWED_ROUTES.includes(pathname)) {
      toast.error('Akses ditolak: Halaman ini hanya untuk Admin.');
      router.replace('/dashboard');
    } else if (user.role === 'Admin') {
      if (pathname === '/dashboard/users' || pathname === '/dashboard/settings') {
        toast.error('Akses ditolak: Hanya Super Admin yang dapat mengakses halaman ini.');
        router.replace('/dashboard');
      }
    }
  }, [user, loading, isLoginPage, pathname, router]);

  // Login page renders without sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Show brief loader if loading or if resolving user from localStorage
  if (loading || !user) {
    if (!isLoginPage && typeof window !== 'undefined' && localStorage.getItem('admin_demo_user')) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center text-gray-800">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <span className="text-xs font-semibold text-gray-500">Memuat Dashboard...</span>
          </div>
        </div>
      );
    }
  }

  // No user and not loading = redirect in progress
  if (!user) return null;

  // Block protected pages from wrong role (prevents flash)
  if (user.role === 'Customer' && !CUSTOMER_ALLOWED_ROUTES.includes(pathname)) return null;
  if (user.role === 'Admin' && (pathname === '/dashboard/users' || pathname === '/dashboard/settings')) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 flex flex-col lg:flex-row">
      {/* Mobile Top Header Navigation Bar */}
      <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-500/20">
            D
          </div>
          <div>
            <h1 className="font-extrabold text-gray-900 text-xs">Dunia Digitalia</h1>
            <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
              {user.role === 'Customer' ? 'Portal Pelanggan' : 'Admin Panel'}
            </span>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none flex items-center gap-1 text-xs font-semibold"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-gray-900" />
          ) : (
            <>
              <Menu className="w-5 h-5 text-gray-700" />
              <span className="text-xs text-gray-600 font-bold hidden sm:inline">Menu</span>
            </>
          )}
        </button>
      </header>

      {/* Admin / Customer Sidebar */}
      <AdminSidebar
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* Main Content Body */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
