'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useAuth } from '@/lib/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === '/login';

  useEffect(() => {
    if (!loading) {
      if (!user && !isLoginPage) {
        router.push('/login');
      } else if (user) {
        // 1. Allow Customers to access main dashboard but block sub-pages
        if (user.role === 'Customer') {
          if (pathname !== '/dashboard') {
            toast.error('Akses ditolak: Anda hanya dapat mengakses halaman utama dashboard klien.');
            router.push('/dashboard');
          }
        } 
        // 2. Block standard Admins from Super Admin pages
        else if (user.role === 'Admin') {
          if (pathname === '/dashboard/users' || pathname === '/dashboard/settings') {
            toast.error('Akses ditolak: Hanya Super Admin yang dapat mengakses halaman ini.');
            router.push('/dashboard');
          }
        }
      }
    }
  }, [user, loading, isLoginPage, pathname, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-gray-800">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  // Double check role protection to prevent flash of content
  if (!user) return null;
  if (user.role === 'Customer' && pathname !== '/dashboard') return null;
  if (user.role === 'Admin' && (pathname === '/dashboard/users' || pathname === '/dashboard/settings')) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-gray-800">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
