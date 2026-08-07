'use client';

import { useState, useEffect } from 'react';
import { Shield, UserPlus, Search, Edit2, Trash2, Loader2, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { getCollection, setDocById, deleteDocById } from '@/lib/supabase/database';

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Admin' | 'Customer';
  password?: string;
  joinedDate: string;
  ordersCount: number;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  const toggleShowPassword = (id: string) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Super Admin' | 'Admin' | 'Customer'>('Customer');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getCollection<any>('users');
      setUsers((data as UserItem[]) || []);
    } catch (err) {
      toast.error('Gagal memuat data pengguna.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAdd = () => {
    setEditingUser(null);
    setName('');
    setEmail('');
    setRole('Customer');
    setPassword('');
    setShowPassword(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (u: UserItem) => {
    setEditingUser(u);
    setName(u.name);
    setEmail(u.email);
    setRole(u.role);
    setPassword(u.password || '');
    setShowPassword(false);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error('Mohon isi nama dan email!');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Format email tidak valid! Contoh: nama@domain.com');
      return;
    }

    // Password validation: required for new user, optional (but minimum 6 char if filled) for editing
    if (!editingUser && !password) {
      toast.error('Mohon tentukan password untuk pengguna baru!');
      return;
    }
    if (password && password.length < 6) {
      toast.error('Password minimal 6 karakter!');
      return;
    }

    setSaving(true);
    const id = editingUser ? editingUser.id : `user-${Date.now()}`;
    const record = {
      name,
      email: email.toLowerCase(),
      role,
      password: password || (editingUser?.password || ''),
      joinedDate: editingUser ? editingUser.joinedDate : new Date().toLocaleDateString('id-ID'),
      ordersCount: editingUser ? editingUser.ordersCount : 0,
    };

    try {
      await setDocById('users', id, record);
      toast.success(editingUser ? 'Akses pengguna berhasil diperbarui!' : 'Pengguna baru berhasil ditambahkan!');
      setIsModalOpen(false);
      await loadData();
    } catch (err: any) {
      console.error('Error saving user:', err);
      toast.error(`Gagal menyimpan: ${err.message || 'Terjadi kesalahan pada database.'}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) return;
    try {
      await deleteDocById('users', id);
      toast.success('Pengguna berhasil dihapus!');
      await loadData();
    } catch (err) {
      toast.error('Gagal menghapus pengguna.');
    }
  };

  const filtered = users.filter(
    (u) =>
      (u.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Manajemen Pengguna & Akses Admin</h1>
          <p className="text-xs text-gray-500">Kelola peran (role) pengguna dan daftar pelanggan terdaftar.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="btn-primary text-xs px-4 py-2.5 flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" /> Tambah User Baru
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
        <div className="relative w-full max-w-xs">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama / email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl text-gray-900"
          />
        </div>
        <span className="text-xs font-semibold text-gray-500">Total: {filtered.length} User</span>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-xs">Belum ada pengguna terdaftar.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600 min-w-[700px]">
              <thead className="bg-slate-50 text-gray-900 font-bold border-b border-gray-200">
                <tr>
                  <th className="p-4">Nama Pengguna</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Password</th>
                  <th className="p-4">Peran (Role)</th>
                  <th className="p-4">Tanggal Bergabung</th>
                  <th className="p-4">Total Pesanan</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="p-4 font-bold text-gray-900">{u.name}</td>
                    <td className="p-4 font-semibold text-gray-700">{u.email}</td>
                    <td className="p-4 font-mono text-gray-500 font-medium">
                      <div className="flex items-center gap-2">
                        <span>{showPasswords[u.id] ? u.password || '••••••••' : '••••••••'}</span>
                        {u.password && (
                          <button
                            type="button"
                            onClick={() => toggleShowPassword(u.id)}
                            className="p-1 rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title={showPasswords[u.id] ? 'Sembunyikan Password' : 'Lihat Password'}
                          >
                            {showPasswords[u.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        )}
                      </div>
                    </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        u.role === 'Super Admin'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : u.role === 'Admin'
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                    >
                      <Shield className="w-3 h-3" /> {u.role}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500">{u.joinedDate || '-'}</td>
                  <td className="p-4 font-bold text-gray-900">{u.ordersCount || 0} Pesanan</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(u)}
                      className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">
              {editingUser ? 'Edit Akses Pengguna' : 'Tambah Pengguna Baru'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Budi Santoso"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Alamat Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="budi@example.com"
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  {editingUser ? 'Password Baru (Kosongkan jika tidak diubah)' : 'Password Akun *'}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={!editingUser}
                    placeholder={editingUser ? 'Ketik untuk mengganti password' : 'Minimal 6 karakter'}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Peran Akses (Role)</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 font-bold"
                >
                  <option value="Customer">Customer (Pelanggan)</option>
                  <option value="Admin">Admin</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary py-2">
                  Batal
                </button>
                <button type="submit" disabled={saving} className="btn-primary py-2 px-5 flex items-center gap-2">
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Simpan Pengguna
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
