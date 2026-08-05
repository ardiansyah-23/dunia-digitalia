'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone, Clock, MessageCircle } from 'lucide-react';
import { GithubIcon, InstagramIcon, LinkedinIcon } from '@/components/ui/SocialIcons';
import toast from 'react-hot-toast';
import FadeUp from '@/components/animations/FadeUp';
import { submitContactMessage } from '@/lib/supabase/database';
import { COMPANY_INFO } from '@/lib/constants/nav';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Mohon isi semua bidang yang wajib!');
      return;
    }

    setLoading(true);
    try {
      await submitContactMessage(formData);
      toast.success('Pesan Anda telah berhasil dikirim! Tim kami akan menghubungi Anda segera.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      toast.error('Gagal mengirim pesan. Silakan coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <FadeUp className="text-center mb-16">
          <div className="section-label mx-auto w-fit mb-4">Get In Touch</div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Hubungi <span className="text-gradient">Dunia Digitalia</span>
          </h2>
          <p className="text-[#A8B3C7] text-lg mt-4 max-w-xl mx-auto">
            Siap memulai transformasi digital Anda? Konsultasikan kebutuhan Anda bersama tim kami.
          </p>
        </FadeUp>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Contact Info & Map */}
          <FadeUp delay={1} className="space-y-8">
            <div className="rounded-3xl p-8 space-y-6" style={{ background: 'rgba(15,29,53,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="text-2xl font-bold text-white mb-6">Informasi Kontak</h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1E88FF]/10 border border-[#1E88FF]/20 flex items-center justify-center text-[#5EC8FF] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Alamat Kantor</h4>
                    <p className="text-[#A8B3C7] text-sm leading-relaxed">{COMPANY_INFO.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1E88FF]/10 border border-[#1E88FF]/20 flex items-center justify-center text-[#5EC8FF] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Email</h4>
                    <p className="text-[#A8B3C7] text-sm">{COMPANY_INFO.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1E88FF]/10 border border-[#1E88FF]/20 flex items-center justify-center text-[#5EC8FF] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">WhatsApp / Telepon</h4>
                    <p className="text-[#A8B3C7] text-sm">{COMPANY_INFO.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1E88FF]/10 border border-[#1E88FF]/20 flex items-center justify-center text-[#5EC8FF] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Jam Kerja</h4>
                    <p className="text-[#A8B3C7] text-sm">{COMPANY_INFO.workingHours}</p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-6 border-t border-white/10">
                <h4 className="text-white font-semibold text-sm mb-4">Media Sosial</h4>
                <div className="flex gap-3">
                  {[
                    { icon: MessageCircle, href: 'https://wa.me/6281234567890', color: '#25D366' },
                    { icon: InstagramIcon, href: 'https://instagram.com/duniadigitalia', color: '#E1306C' },
                    { icon: LinkedinIcon, href: 'https://linkedin.com/company/duniadigitalia', color: '#0077B5' },
                    { icon: GithubIcon, href: 'https://github.com/duniadigitalia', color: '#FFFFFF' },
                  ].map(({ icon: Icon, href, color }, idx) => (
                    <a
                      key={idx}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
                    >
                      <Icon className="w-5 h-5" style={{ color }} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-3xl overflow-hidden h-64 border border-white/10 shadow-lg">
              <iframe
                title="Pancoran South Jakarta Location Map"
                src={COMPANY_INFO.googleMapsUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.8) contrast(1.2) invert(0.9)' }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
          </FadeUp>

          {/* Right: Contact Form */}
          <FadeUp delay={2}>
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl p-8 space-y-6"
              style={{ background: 'rgba(15,29,53,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <h3 className="text-2xl font-bold text-white mb-2">Kirim Pesan</h3>
              <p className="text-[#A8B3C7] text-sm mb-6">Isi formulir di bawah ini dan tim kami akan segera membalasnya.</p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white mb-2">Nama Lengkap *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#A8B3C7] text-sm focus:border-[#1E88FF] focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#A8B3C7] text-sm focus:border-[#1E88FF] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white mb-2">Nomor Telepon / WA</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+62 812..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#A8B3C7] text-sm focus:border-[#1E88FF] focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white mb-2">Subjek / Topik</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Konsultasi Proyek AI"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#A8B3C7] text-sm focus:border-[#1E88FF] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white mb-2">Pesan Anda *</label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Jelaskan kebutuhan proyek atau pertanyaan Anda di sini..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#A8B3C7] text-sm focus:border-[#1E88FF] focus:outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-4 flex items-center justify-center gap-2 text-base font-semibold"
              >
                {loading ? (
                  <span>Mengirim...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Kirim Pesan
                  </>
                )}
              </button>
            </form>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
