'use client';

import { useState, useEffect } from 'react';
import { Shield, UserPlus, Search, Edit2, Trash2, Loader2, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getCollection, setDocById, deleteDocById } from '@/lib/supabase/database';

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Admin' | 'Customer';
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

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Super Admin' | 'Admin' | 'Customer'>('Customer');

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
    setIsModalOpen(true);
  };

  const handleOpenEdit = (u: UserItem) => {
    setEditingUser(u);
    setName(u.name);
    setEmail(u.email);
    setRole(u.role);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error('Mohon isi nama dan email!');
      return;
    }

    setSaving(true);
    const id = editingUser ? editingUser.id : Date.now().toString();
    const record = {
      name,
      email,
      role,
      joinedDate: editingUser ? editingUser.joinedDate : new Date().toLocaleDateString('id-ID'),
      ordersCount: editingUser ? editingUser.ordersCount : 0,
    };

    try {
      await setDocById('users', id, record);
      toast.success(editingUser ? 'Akses pengguna berhasil diperbarui!' : 'Pengguna baru berhasil ditambahkan!');
      setIsModalOpen(false);
      await loadData();
    } catch (err) {
      toast.error('Gagal menyimpan data pengguna ke database.');
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Manajemen Pengguna & Akses Admin</h1>
          <p className="text-xs text-gray-500">Kelola peran (role) pengguna dan daftar pelanggan terdaftar.</p>
        </div>
        <button onClick={handleOpenAdd} className="btn-primary text-xs px-4 py-2.5 flex items-center gap-2">
          <UserPlus className="w-4 h-4" /> Tambah User Baru
        </button>
      </div>

      {/* Filter & Search */}
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

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            <span className="text-xs">Memuat data pengguna...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <p className="text-sm font-medium">Belum ada pengguna terdaftar.</p>
          </div>
        ) : (
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-slate-50 text-gray-900 font-bold border-b border-gray-200">
              <tr>
                <th className="p-4">Nama Pengguna</th>
                <th className="p-4">Email</th>
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
                  <td className="p-4 font-medium text-gray-700">{u.email}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 w-fit ${
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
