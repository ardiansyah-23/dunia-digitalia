'use client';

import { useState } from 'react';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import { COMPANY_INFO } from '@/lib/constants/nav';
import { setDocById } from '@/lib/supabase/database';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Konsultasi Jasa Web Development');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error('Mohon lengkapi semua field wajib!');
      return;
    }

    setLoading(true);
    const id = `msg-${Date.now()}`;
    const record = {
      name,
      email,
      phone,
      subject,
      message,
      read: false,
      replied: false,
      created_at: new Date().toISOString(),
    };

    try {
      await setDocById('messages', id, record);
      toast.success('Pesan Anda berhasil dikirim! Tim kami akan merespons dalam 1x24 jam.');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err) {
      console.error(err);
      toast.error('Gagal mengirim pesan. Silakan coba lagi atau gunakan chat WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <main className="flex-grow pt-10 pb-20">
        <PageTransition>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto space-y-3">

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Mari Bicara Tentang Proyek Anda
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Konsultasikan kebutuhan pembuatan website, lisensi produk digital, atau pertanyaan bisnis Anda bersama tim kami.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column — Contact Info (5 cols) */}
              <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-4">Informasi Kontak</h2>

                <div className="space-y-5 text-xs sm:text-sm text-slate-600 font-medium">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">Alamat Kantor</h4>
                      <p className="mt-0.5 leading-relaxed text-slate-600">{COMPANY_INFO.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">Email Resmi</h4>
                      <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-blue-600 transition-colors mt-0.5 block">{COMPANY_INFO.email}</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 shadow-2xs">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">WhatsApp Fast Response</h4>
                      <a href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 transition-colors mt-0.5 block font-bold text-emerald-700">{COMPANY_INFO.whatsapp}</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 shadow-2xs">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">Jam Operasional</h4>
                      <p className="mt-0.5">{COMPANY_INFO.workingHours}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200/80 text-blue-950 text-xs leading-relaxed space-y-1">
                  <span className="font-bold block text-blue-900">Respon Cepat 1x24 Jam</span>
                  <p>Seluruh formulir konsultasi yang dikirim akan langsung diteruskan ke tim pengembang untuk respon cepat.</p>
                </div>
              </div>

              {/* Right Column — Contact Form (7 cols) */}
              <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-4">Kirim Pesan Konsultasi</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Lengkap *</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Budi Santoso"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Alamat Email *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="budi@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Nomor Telepon / WhatsApp</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="081234567890"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Topik Konsultasi *</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                      >
                        <option value="Konsultasi Jasa Web Development">Konsultasi Jasa Web Development</option>
                        <option value="Pertanyaan Lisensi Produk Digital">Pertanyaan Lisensi Produk Digital</option>
                        <option value="Bantuan Teknis & Instalasi">Bantuan Teknis & Instalasi</option>
                        <option value="Kerjasama Business Partnership">Kerjasama Business Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Isi Pesan / Detail Proyek *</label>
                    <textarea
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      placeholder="Jelaskan kebutuhan website atau pertanyaan produk Anda..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:bg-white focus:border-blue-500 focus:outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 rounded-xl shadow-md shadow-blue-500/20"
                  >
                    {loading ? 'Mengirim Pesan...' : 'Kirim Pesan Konsultasi'}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </div>

          </div>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
