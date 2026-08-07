import Link from 'next/link';
import { MapPin, Mail, Phone, ShieldCheck, Zap, Globe, Users, CheckCircle2, ArrowRight, Sparkles, Award } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import { COMPANY_INFO } from '@/lib/constants/nav';

export const metadata = {
  title: 'Tentang Kami | Dunia Digitalia',
  description: 'Profil perusahaan Dunia Digitalia, digital marketplace & web development agency di Pancoran, Jakarta Selatan.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <main className="flex-grow pt-28 pb-24">
        <PageTransition>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="badge-primary">Profil Perusahaan</span>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Membangun Ekosistem Digital <span className="text-blue-600">Indonesia</span>
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
                Dunia Digitalia adalah agensi teknologi terpadu dan digital marketplace berkualitas yang berpusat di Pancoran, Jakarta Selatan. Kami berkomitmen menyediakan produk digital kelas atas dan jasa pembuatan website kustom.
              </p>
            </div>

            {/* Vision & Mission Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shadow-2xs">
                  <Globe className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900">Visi Utama Perusahaan</h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Menjadi marketplace produk digital dan agensi pengembangan website nomor 1 di Indonesia yang diakui atas standar keamanan kode terverifikasi, kecepatan pengiriman instan, dan inovasi arsitektur perangkat lunak.
                </p>
              </div>

              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shadow-2xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900">Misi Layanan Kami</h2>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-700 font-semibold">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Menyediakan berkas digital terverifikasi yang 100% bebas dari backdoor.</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Integrasi sistem pembayaran instan Tripay (QRIS & Virtual Account).</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Memberikan dukungan teknis pasca-pembelian untuk setiap klien.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Office Location & Interactive Map */}
            <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-5">
                <span className="badge-primary">Headquarters</span>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
                  Pancoran, Jakarta Selatan
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Kantor operasional kami berlokasi strategis di Pancoran, Jakarta Selatan. Tim pengembang kami siap membantu kebutuhan transformasi digital bisnis Anda secara langsung maupun secara remote dari mana saja.
                </p>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium pt-2">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                    <span>{COMPANY_INFO.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                    <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-blue-600 transition-colors">{COMPANY_INFO.email}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4.5 h-4.5 text-blue-600 shrink-0" />
                    <a href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">{COMPANY_INFO.phone}</a>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/contact" className="btn-primary text-xs px-6 py-3 rounded-xl inline-flex items-center gap-2">
                    <span>Hubungi Tim Kami</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6 h-80 rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-100 shadow-inner">
                <iframe
                  src={COMPANY_INFO.googleMapsUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Kantor Dunia Digitalia"
                />
              </div>
            </div>

          </div>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
