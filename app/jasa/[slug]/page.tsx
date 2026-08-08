import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Check, CheckCircle2, Clock, ShieldCheck, MessageSquare, Phone, Sparkles, Layers, FileText, ChevronDown } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';
import { AGENCY_SERVICES, WebServiceItem } from '@/lib/constants/services';
import { getCollection } from '@/lib/supabase/database';
import { COMPANY_INFO } from '@/lib/constants/nav';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let service: WebServiceItem | undefined;

  try {
    const data = await getCollection<any>('services');
    service = data.find((s: any) => s.slug === slug || s.id === slug);
  } catch (err) {}

  if (!service) {
    service = AGENCY_SERVICES.find((s) => s.slug === slug) || AGENCY_SERVICES[0];
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dunia-digitalia.vercel.app';
  const pageUrl = `${siteUrl}/jasa/${slug}`;

  return {
    title: `Jasa Pembuatan ${service.title} | Dunia Digitalia`,
    description: service.description || `Layanan pembuatan ${service.title} profesional, responsif, dan siap SEO.`,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `Jasa Pembuatan ${service.title} — Dunia Digitalia`,
      description: service.description,
      url: pageUrl,
      type: 'website',
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let service: WebServiceItem | undefined;
  try {
    const data = await getCollection<any>('services');
    service = data.find((s: any) => s.slug === slug || s.id === slug);
  } catch (err) {}

  if (!service) {
    service = AGENCY_SERVICES.find((s) => s.slug === slug) || AGENCY_SERVICES[0];
  }

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `Halo Dunia Digitalia, saya ingin berkonsultasi mengenai Jasa Pembuatan ${service.title} (Mulai Rp ${service.startingPrice.toLocaleString('id-ID')}).`
  )}`;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <main className="flex-grow pt-10 pb-20">
        <PageTransition>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            {/* Back Button */}
            <Link
              href="/jasa"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog Jasa Website
            </Link>

            <div className="grid lg:grid-cols-12 gap-10">
              
              {/* Main Content Column — 8 cols */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Service Header Card */}
                <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="badge-primary">Agency Service</span>
                    {service.estimatedDays && (
                      <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600" /> Estimasi: {service.estimatedDays}
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                    Jasa Pembuatan {service.title}
                  </h1>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-1">
                    {service.description}
                  </p>
                </div>

                {/* Long Description */}
                <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                  <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-3">Deskripsi Lengkap & Gambaran Layanan</h2>
                  
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-4 font-normal">
                    {service.longDescription || service.description}
                  </div>
                </div>

                {/* Included Features Grid */}
                {service.features && service.features.length > 0 && (
                  <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                      <h2 className="text-xl font-extrabold text-slate-900">Fitur & Fasilitas yang Didapat</h2>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3.5">
                      {service.features.map((feature: string, idx: number) => (
                        <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-800">
                          <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Deliverables & Tech Stack */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Deliverables */}
                  {service.deliverables && service.deliverables.length > 0 && (
                    <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <h3 className="text-base font-extrabold text-slate-900">Yang Anda Dapatkan</h3>
                      </div>
                      <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                        {service.deliverables.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  {service.technologies && service.technologies.length > 0 && (
                    <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                      <div className="flex items-center gap-2">
                        <Layers className="w-5 h-5 text-blue-600" />
                        <h3 className="text-base font-extrabold text-slate-900">Teknologi yang Digunakan</h3>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {service.technologies.map((tech: string) => (
                          <span key={tech} className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Service Specific FAQ */}
                {service.faq && service.faq.length > 0 && (
                  <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                    <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-3">Pertanyaan Sering Diajukan (FAQ)</h2>
                    <div className="space-y-3">
                      {service.faq.map((faqItem, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                          <h4 className="font-extrabold text-slate-900 text-sm">{faqItem.question}</h4>
                          <p className="text-xs text-slate-600 leading-relaxed">{faqItem.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Sticky Order / Consultation Sidebar — 4 cols */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-lg space-y-6 sticky top-28">
                  
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Investasi Proyek Mulai Dari</span>
                    <div className="text-3xl sm:text-4xl font-black text-blue-600">
                      Rp {service.startingPrice?.toLocaleString('id-ID')}
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-600 font-medium">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Estimasi Waktu</span>
                      <span className="font-bold text-slate-900">{service.estimatedDays || '3 - 7 Hari'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Garansi Maintenance</span>
                      <span className="font-bold text-emerald-600">30 - 60 Hari</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Kustomisasi Layout</span>
                      <span className="font-bold text-slate-900">100% Sesuai Request</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full py-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 border-none shadow-lg shadow-emerald-500/20"
                    >
                      <MessageSquare className="w-4 h-4" /> Konsultasi & Pesan via WA
                    </a>

                    <Link
                      href="/contact"
                      className="btn-secondary w-full py-3.5 text-xs font-bold flex items-center justify-center gap-2 rounded-2xl"
                    >
                      <span>Formulir Kontak Konsultasi</span>
                    </Link>
                  </div>

                  <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200/80 text-blue-950 text-xs font-semibold space-y-1">
                    <div className="flex items-center gap-1.5 text-blue-900 font-bold">
                      <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Garansi Purna Jual & Bug Fix</span>
                    </div>
                    <p className="text-[11px] text-blue-800 leading-relaxed font-normal">
                      Seluruh proyek pembuatan website dikerjakan oleh tim arsitek software berpengalaman dengan garansi perbaikan bug penuh.
                    </p>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
