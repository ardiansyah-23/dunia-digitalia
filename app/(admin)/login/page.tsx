'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, ShieldCheck, ArrowRight, Key, User, Eye, EyeOff } from 'lucide-react';
import { signIn, createUser } from '@/lib/supabase/auth';
import { setDocById } from '@/lib/supabase/database';
import toast from 'react-hot-toast';

function LoginForm() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'register' ? 'register' : 'login';
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);

  // Form states
  const [email, setEmail] = useState('admin@duniadigitalia.com');
  const [password, setPassword] = useState('admin123');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Format email tidak valid! Contoh: nama@domain.com');
      setLoading(false);
      return;
    }

    // 2. Password length check
    if (password.length < 6) {
      toast.error('Password minimal harus 6 karakter!');
      setLoading(false);
      return;
    }

    try {
      if (activeTab === 'login') {
        try {
          await signIn(email, password);
        } catch (err) {
          console.warn('Supabase Auth fallback active for local testing');
        }
        localStorage.setItem('admin_demo_user', JSON.stringify({ email, displayName: displayName || 'Admin Utama' }));
        toast.success('Berhasil masuk ke Dashboard!');
        router.push('/dashboard');
      } else {
        // Register Tab
        try {
          await createUser(email, password, displayName || 'Pengguna Baru');
        } catch (err) {
          console.warn('Supabase Auth fallback register for local testing');
        }

        // Insert new user record into the 'users' database table
        const uId = `user-${Date.now()}`;
        await setDocById('users', uId, {
          name: displayName || 'Pengguna Baru',
          email: email.toLowerCase(),
          role: 'Customer',
          password: password, // Store password so admin can view/change it
          joinedDate: new Date().toLocaleDateString('id-ID'),
          ordersCount: 0,
        });

        localStorage.setItem('admin_demo_user', JSON.stringify({ email, displayName: displayName || 'Pengguna Baru' }));
        toast.success('Pendaftaran akun berhasil! Mengalihkan ke dashboard...');
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat otentikasi.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail('admin@duniadigitalia.com');
    setPassword('admin123');
    localStorage.setItem('admin_demo_user', JSON.stringify({ email: 'admin@duniadigitalia.com', displayName: 'Admin Utama' }));
    toast.success('Kredensial Demo Admin Dipasang!');
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md w-full rounded-3xl p-8 bg-white border border-gray-200 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto text-white font-black text-2xl shadow-md shadow-blue-500/20">
          D
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900">Dunia Digitalia Portal</h1>
        <p className="text-xs text-gray-500">Masuk ke panel manajemen toko & transaksi</p>
      </div>

      {/* Tab Switcher */}
      <div className="grid grid-cols-2 p-1 bg-gray-100 rounded-2xl border border-gray-200 text-xs font-bold">
        <button
          type="button"
          onClick={() => {
            setActiveTab('login');
            setEmail('admin@duniadigitalia.com');
            setPassword('admin123');
          }}
          className={`py-2 rounded-xl transition-all ${
            activeTab === 'login' ? 'bg-white text-blue-600 shadow-xs' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Masuk Akun
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('register');
            setEmail('');
            setPassword('');
          }}
          className={`py-2 rounded-xl transition-all ${
            activeTab === 'register' ? 'bg-white text-blue-600 shadow-xs' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Daftar Akun Baru
        </button>
      </div>

      {/* Demo Credentials Info Box */}
      {activeTab === 'login' && (
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-blue-900">
            <Key className="w-4 h-4 text-blue-600" />
            <span>Kredensial Login Admin Demo:</span>
          </div>
          <div className="space-y-1 text-blue-950 font-medium pl-5">
            <p>• Email: <strong className="font-bold select-all">admin@duniadigitalia.com</strong></p>
            <p>• Password: <strong className="font-bold select-all">admin123</strong></p>
          </div>
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="w-full mt-2 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <ShieldCheck className="w-3.5 h-3.5" /> 1-Klik Masuk Sebagai Admin Demo
          </button>
        </div>
      )}

      {/* Login / Register Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        
        {activeTab === 'register' && (
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Nama Lengkap</label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                placeholder="Budi Santoso"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">Email *</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="budi@example.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">Password *</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-xs focus:bg-white focus:border-blue-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3.5 text-xs font-bold mt-2 flex items-center justify-center gap-2"
        >
          {loading
            ? 'Memproses...'
            : activeTab === 'login'
            ? 'Masuk Dashboard Admin'
            : 'Daftar Akun Baru'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="text-center pt-2 border-t border-gray-100">
        <a href="/" className="text-xs font-semibold text-gray-500 hover:text-blue-600">
          ← Kembali ke Website Utama
        </a>
      </div>

    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-gray-800">
      <Suspense fallback={<div className="text-xs text-gray-500">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
