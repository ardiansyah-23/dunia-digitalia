'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useAuth } from '@/lib/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const redirectedRef = useRef(false);

  const isLoginPage = pathname === '/login';

  useEffect(() => {
    if (loading || isLoginPage) return;
    if (redirectedRef.current) return;

    if (!user) {
      redirectedRef.current = true;
      router.replace('/login');
      return;
    }

    // Role-based access control
    if (user.role === 'Customer' && pathname !== '/dashboard') {
      toast.error('Akses ditolak: Anda hanya dapat mengakses halaman utama dashboard klien.');
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

  // Show brief loader ONLY if we genuinely don't know who the user is yet
  if (loading && !user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-gray-800">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  // No user and not loading = redirect in progress
  if (!user) return null;

  // Block protected pages from wrong role (prevents flash)
  if (user.role === 'Customer' && pathname !== '/dashboard') return null;
  if (user.role === 'Admin' && (pathname === '/dashboard/users' || pathname === '/dashboard/settings')) return null;

  return (
    <div className="flex min-h-screen bg-slate-50 text-gray-800">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
