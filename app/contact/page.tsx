'use client';

import { useState } from 'react';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import { COMPANY_INFO } from '@/lib/constants/nav';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Konsultasi Jasa Web Development');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success('Pesan Anda berhasil dikirim! Tim kami akan merespons dalam 1x24 jam.');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-gray-800">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <PageTransition>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Page Header */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="badge-primary">Get In Touch</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                Hubungi Dunia Digitalia
              </h1>
              <p className="text-gray-500 text-sm">
                Siap memulai transformasi digital Anda? Konsultasikan kebutuhan proyek atau pertanyaan produk Anda bersama tim kami.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Box — Contact Info (5 cols) */}
              <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">Informasi Kontak</h2>

                <div className="space-y-4 text-xs text-gray-600 font-medium">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Alamat Kantor</h4>
                      <p className="mt-0.5 leading-relaxed">{COMPANY_INFO.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Email Resmi</h4>
                      <p className="mt-0.5">{COMPANY_INFO.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Telepon / WhatsApp</h4>
                      <p className="mt-0.5">{COMPANY_INFO.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Jam Operasional</h4>
                      <p className="mt-0.5">{COMPANY_INFO.workingHours}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/\D/g, '')}?text=Halo%20Dunia%20Digitalia,%20saya%20ingin%20konsultasi.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary bg-emerald-600 hover:bg-emerald-700 border-emerald-500 w-full text-xs py-3.5 flex items-center justify-center gap-2 font-bold"
                  >
                    <Send className="w-4 h-4" /> Chat Langsung via WhatsApp
                  </a>
                </div>
              </div>

              {/* Right Box — Contact Form (7 cols) */}
              <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">Kirim Pesan Formulir</h2>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1.5">Nama Lengkap *</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Budi Santoso"
                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1.5">Alamat Email *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="budi@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1.5">Nomor WhatsApp</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="081234567890"
                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1.5">Subjek Keperluan</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:outline-none font-medium"
                      >
                        <option value="Konsultasi Jasa Web Development">Konsultasi Jasa Web Development</option>
                        <option value="Pertanyaan Produk Digital">Pertanyaan Produk Digital</option>
                        <option value="Bantuan Teknis / Support">Bantuan Teknis / Support</option>
                        <option value="Kerjasama Bisnis">Kerjasama Bisnis</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1.5">Pesan Detail *</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      placeholder="Jelaskan kebutuhan proyek atau pertanyaan Anda..."
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary py-3.5 px-6 font-bold text-xs flex items-center justify-center gap-2"
                  >
                    {loading ? 'Mengirim Pesan...' : 'Kirim Pesan Sekarang'}
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
