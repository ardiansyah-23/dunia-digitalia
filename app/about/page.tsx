import Link from 'next/link';
import { MapPin, Mail, Phone, ShieldCheck, Zap, Globe, Users, CheckCircle2, ArrowRight } from 'lucide-react';
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
    <div className="flex flex-col min-h-screen bg-slate-50 text-gray-800">
      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <PageTransition>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            
            {/* Page Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="badge-primary">Profil Perusahaan</span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Membangun Ekosistem Digital <span className="text-blue-600">Indonesia</span>
              </h1>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                Dunia Digitalia adalah agensi teknologi terpadu dan digital marketplace berkualitas yang berpusat di Pancoran, Jakarta Selatan. Kami berkomitmen menyediakan template Blogger, source code, dan jasa pembuatan website profesional.
              </p>
            </div>

            {/* Vision & Mission Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Globe className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Visi Kami</h2>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Menjadi marketplace produk digital dan agensi pengembangan website nomor 1 di Indonesia yang dikenal atas kualitas kode terverifikasi, inovasi cepat, dan layanan purna jual terbaik.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Misi Utama</h2>
                <ul className="space-y-2.5 text-xs text-gray-600 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Menyediakan produk digital berkinerja tinggi yang terbebas dari malware.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Memudahkan pembayaran otomatis lewat Tripay (QRIS, VA, Indomaret/Alfamart).</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Memberikan bantuan teknis 24/7 bagi para pemilik usaha & pengembang.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Office Location & Info */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="badge-primary">Lokasi Kantor</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  Pancoran, Jakarta Selatan
                </h2>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Kantor operasional kami berlokasi strategis di Pancoran, Jakarta Selatan. Tim pengembang kami siap membantu kebutuhan transformasi digital perusahaan Anda secara langsung maupun remote.
                </p>

                <div className="space-y-2 text-xs text-gray-700 font-medium pt-2">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{COMPANY_INFO.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{COMPANY_INFO.email}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{COMPANY_INFO.phone}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 h-72 rounded-2xl overflow-hidden border border-gray-200 bg-gray-100">
                <iframe
                  src={COMPANY_INFO.googleMapsUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Pancoran Jakarta Selatan Map"
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
