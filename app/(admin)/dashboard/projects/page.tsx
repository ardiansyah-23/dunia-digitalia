'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Manajemen Proyek</h1>
          <p className="text-[#A8B3C7] text-sm">Kelola daftar portfolio dan proyek karya.</p>
        </div>
        <button onClick={() => toast.success('Modal tambah proyek')} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Tambah Proyek
        </button>
      </div>

      <div className="rounded-2xl bg-[#0F1D35] border border-white/10 overflow-hidden">
        <table className="w-full text-left text-sm text-[#A8B3C7]">
          <thead className="bg-white/5 text-white font-semibold border-b border-white/10">
            <tr>
              <th className="p-4">Nama Proyek</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Teknologi</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              { title: 'AI Analytics Dashboard', category: 'AI/ML', tech: 'Python, Next.js' },
              { title: 'E-Commerce Platform', category: 'Web App', tech: 'Next.js, Stripe' },
              { title: 'RPA Workflow System', category: 'Automation', tech: 'Python, FastAPI' },
            ].map((proj, idx) => (
              <tr key={idx} className="hover:bg-white/5">
                <td className="p-4 font-semibold text-white">{proj.title}</td>
                <td className="p-4">{proj.category}</td>
                <td className="p-4">{proj.tech}</td>
                <td className="p-4 text-right space-x-2">
                  <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white"><Edit2 className="w-4 h-4" /></button>
                  <button className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
