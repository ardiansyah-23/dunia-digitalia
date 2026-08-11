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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20">
                D
              </div>
              <div className="flex flex-col text-left">
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
          </div>

          {/* Column 2: Contact Info */}
          <div className="space-y-4 md:pt-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Hubungi Kami</h4>
            <div className="space-y-3 text-xs text-slate-400">
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

          {/* Column 3: Payment Badges */}
          <div className="space-y-4 md:pt-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Pembayaran Otomatis</h4>
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
        <div className="pt-6 mt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Dunia Digitalia. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs font-medium">
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
