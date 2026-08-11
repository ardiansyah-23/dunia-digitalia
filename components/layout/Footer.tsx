import Link from 'next/link';
import { Mail, Phone, MapPin, ShieldCheck, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants/nav';

const paymentBadges = [
  'QRIS', 'BCA VA', 'BNI VA', 'BRI VA', 'Mandiri VA', 'Permata VA', 'Alfamart', 'Indomaret'
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80">

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Column 1: Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20">
                D
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-white tracking-tight leading-none">
                  Dunia<span className="text-blue-500">Digitalia</span>
                </span>
                <span className="text-[10px] font-semibold text-slate-500 tracking-widest uppercase mt-0.5">
                  Digital Marketplace & Agency
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Pusat marketplace produk digital terpercaya di Indonesia. Menyediakan template Blogger premium, source code aplikasi web, AI prompt, serta jasa pembuatan website profesional.
            </p>

            <div className="space-y-2.5 text-xs text-slate-400 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors">{COMPANY_INFO.email}</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <a href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{COMPANY_INFO.phone}</a>
              </div>
            </div>
          </div>

          {/* Column 2: Digital Products */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Produk Digital</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/produk?kategori=template-blogger" className="hover:text-white transition-colors flex items-center gap-1 group"><span>Template Blogger</span><ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" /></Link></li>
              <li><Link href="/produk?kategori=source-code" className="hover:text-white transition-colors flex items-center gap-1 group"><span>Source Code Web</span><ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" /></Link></li>
              <li><Link href="/produk?kategori=website-toko-online" className="hover:text-white transition-colors flex items-center gap-1 group"><span>Toko Online</span><ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" /></Link></li>
              <li><Link href="/produk?kategori=template-admin-dashboard" className="hover:text-white transition-colors flex items-center gap-1 group"><span>Admin Dashboard</span><ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" /></Link></li>
              <li><Link href="/produk?kategori=ai-prompt" className="hover:text-white transition-colors flex items-center gap-1 group"><span>AI Prompt & Tools</span><ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" /></Link></li>
              <li><Link href="/produk?kategori=ebook" className="hover:text-white transition-colors flex items-center gap-1 group"><span>Ebook Pemrograman</span><ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" /></Link></li>
            </ul>
          </div>

          {/* Column 3: Web Agency Services */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Jasa Website</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/jasa#company-profile" className="hover:text-white transition-colors">Company Profile</Link></li>
              <li><Link href="/jasa#toko-online" className="hover:text-white transition-colors">Website Toko Online</Link></li>
              <li><Link href="/jasa#portal-berita" className="hover:text-white transition-colors">Portal Berita / Media</Link></li>
              <li><Link href="/jasa#custom-system" className="hover:text-white transition-colors">Custom Web App</Link></li>
              <li><Link href="/jasa#seo" className="hover:text-white transition-colors">Optimasi SEO Website</Link></li>
              <li><Link href="/portfolio" className="hover:text-white transition-colors text-blue-400 font-semibold">Lihat Portfolio Klien →</Link></li>
            </ul>
          </div>

          {/* Column 4: Perusahaan & Pembayaran */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Informasi & Bantuan</h4>
            <ul className="space-y-2 text-xs mb-4">
              <li><Link href="/about" className="hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Hubungi Kami</Link></li>
              <li><Link href="/promo" className="hover:text-white transition-colors text-amber-400 font-semibold">Kupon & Promo Spesial 🔥</Link></li>
            </ul>

            <h4 className="text-xs font-bold text-white uppercase tracking-widest pt-2">Pembayaran Otomatis</h4>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {paymentBadges.map((badge) => (
                <span key={badge} className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-lg text-[10px] font-bold text-slate-300">
                  {badge}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-12 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Dunia Digitalia. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex flex-wrap gap-6 text-xs font-medium">
            <Link href="/about" className="hover:text-slate-300 transition-colors">Tentang Kami</Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">Hubungi Kami</Link>
            <Link href="/kebijakan-privasi" className="hover:text-slate-300 transition-colors">Kebijakan Privasi</Link>
            <Link href="/syarat-ketentuan" className="hover:text-slate-300 transition-colors">Syarat & Ketentuan</Link>
            <Link href="/kebijakan-pengembalian" className="hover:text-slate-300 transition-colors">Kebijakan Pengembalian</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
