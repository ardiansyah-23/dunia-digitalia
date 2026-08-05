'use client';

import { useState } from 'react';
import { Save, Globe, Mail, Phone, MapPin, CreditCard, Database, CheckCircle2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { COMPANY_INFO } from '@/lib/constants/nav';

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState(COMPANY_INFO.name);
  const [tagline, setTagline] = useState(COMPANY_INFO.tagline);
  const [email, setEmail] = useState(COMPANY_INFO.email);
  const [phone, setPhone] = useState(COMPANY_INFO.phone);
  const [address, setAddress] = useState(COMPANY_INFO.address);
  const [workingHours, setWorkingHours] = useState(COMPANY_INFO.workingHours);
  const [merchantCode, setMerchantCode] = useState('T12345');
  const [tripayMode, setTripayMode] = useState<'sandbox' | 'production'>('sandbox');
  const [seeding, setSeeding] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Pengaturan website & Tripay berhasil diperbarui!');
  };

  const handleSeedSupabase = async () => {
    setSeeding(true);
    try {
      const res = await fetch('/api/supabase/seed', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        toast.success('Data awal produk, kategori, kupon & layanan BERHASIL dimasukkan ke Supabase Database!');
      } else {
        toast.error('Gagal memasukkan data ke Supabase: ' + (data.error || 'Terjadi kesalahan'));
      }
    } catch (err: any) {
      toast.error('Gagal menghubungkan ke Supabase API');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Pengaturan Website & System Config</h1>
          <p className="text-xs text-gray-500">Konfigurasi profil perusahaan, informasi kontak, dan Tripay Payment Gateway.</p>
        </div>

        {/* 1-Click Supabase Seeder Button */}
        <button
          type="button"
          onClick={handleSeedSupabase}
          disabled={seeding}
          className="btn-secondary text-xs px-4 py-2.5 flex items-center gap-2 border-blue-300 text-blue-700 bg-blue-50 hover:bg-blue-100 font-bold"
        >
          {seeding ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              <span>Memasukkan Data ke Supabase...</span>
            </>
          ) : (
            <>
              <Database className="w-4 h-4 text-blue-600" />
              <span>Seed Data Awal Ke Supabase</span>
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Company Identity */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-4">
          <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2 pb-3 border-b border-gray-100">
            <Globe className="w-4 h-4 text-blue-600" /> Identitas Perusahaan & Website
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Nama Website / Marketplace *</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                required
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Slogan / Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-4">
          <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2 pb-3 border-b border-gray-100">
            <Mail className="w-4 h-4 text-blue-600" /> Informasi Kontak & Kantor
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Email Resmi</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Nomor WhatsApp / Telepon</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Alamat Lengkap Kantor</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 text-gray-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Jam Operasional</label>
            <input
              type="text"
              value={workingHours}
              onChange={(e) => setWorkingHours(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 text-gray-900"
            />
          </div>
        </div>

        {/* Tripay Payment Integration Settings */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-4">
          <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2 pb-3 border-b border-gray-100">
            <CreditCard className="w-4 h-4 text-blue-600" /> Integrasi Tripay Payment Gateway
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Kode Merchant Tripay</label>
              <input
                type="text"
                value={merchantCode}
                onChange={(e) => setMerchantCode(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 text-gray-900 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Mode Tripay API</label>
              <select
                value={tripayMode}
                onChange={(e) => setTripayMode(e.target.value as any)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 text-gray-900 font-bold"
              >
                <option value="sandbox">Sandbox / Uji Coba</option>
                <option value="production">Production / Real Payment</option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit" className="btn-primary text-xs px-6 py-3 font-bold flex items-center gap-2">
          <Save className="w-4 h-4" /> Simpan Semua Pengaturan
        </button>

      </form>
    </div>
  );
}
