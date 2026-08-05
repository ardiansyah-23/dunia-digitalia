'use client';

import { useState } from 'react';
import { Shield, UserPlus, Search, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Admin' | 'Customer';
  joinedDate: string;
  ordersCount: number;
}

const INITIAL_USERS: UserItem[] = [
  { id: '1', name: 'Admin Utama', email: 'admin@duniadigitalia.com', role: 'Super Admin', joinedDate: '1 Jan 2026', ordersCount: 0 },
  { id: '2', name: 'Budi Santoso', email: 'budi@example.com', role: 'Customer', joinedDate: '15 Jan 2026', ordersCount: 3 },
  { id: '3', name: 'Siti Rahma', email: 'siti@example.com', role: 'Customer', joinedDate: '20 Jan 2026', ordersCount: 1 },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>(INITIAL_USERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [search, setSearch] = useState('');

  // Form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'Super Admin' | 'Admin' | 'Customer'>('Customer');

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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error('Mohon isi nama dan email!');
      return;
    }

    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, name, email, role } : u));
      toast.success('Akses pengguna berhasil diperbarui!');
    } else {
      const newU: UserItem = {
        id: Date.now().toString(),
        name, email, role,
        joinedDate: new Date().toLocaleDateString('id-ID'),
        ordersCount: 0,
      };
      setUsers([newU, ...users]);
      toast.success('Pengguna baru berhasil ditambahkan!');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
    toast.success('Pengguna berhasil dihapus!');
  };

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

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
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 w-fit ${
                    u.role === 'Super Admin' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                    u.role === 'Admin' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                    'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}>
                    <Shield className="w-3 h-3" /> {u.role}
                  </span>
                </td>
                <td className="p-4 text-gray-500">{u.joinedDate}</td>
                <td className="p-4 font-bold text-gray-900">{u.ordersCount} Pesanan</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => handleOpenEdit(u)} className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(u.id)} className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary py-2">Batal</button>
                <button type="submit" className="btn-primary py-2 px-5">Simpan Pengguna</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
