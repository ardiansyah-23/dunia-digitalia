import Link from 'next/link';
import { Mail, Phone, MapPin, ShieldCheck, Zap } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants/nav';

const paymentBadges = [
  'QRIS', 'BCA VA', 'BNI VA', 'BRI VA', 'Mandiri VA', 'Permata VA', 'Alfamart', 'Indomaret'
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Column 1: Brand & Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-lg">
                D
              </div>
              <span className="font-extrabold text-lg text-gray-900">
                Dunia<span className="text-blue-600">Digitalia</span>
              </span>
            </Link>
            <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
              Digital Marketplace & Web Development Agency terpercaya. Menyediakan template Blogger, source code aplikasi, dan jasa pembuatan website profesional.
            </p>

            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{COMPANY_INFO.phone}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Marketplace Products */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Produk Digital</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><Link href="/produk?kategori=template-blogger" className="hover:text-blue-600">Template Blogger</Link></li>
              <li><Link href="/produk?kategori=source-code" className="hover:text-blue-600">Source Code Web</Link></li>
              <li><Link href="/produk?kategori=website-toko-online" className="hover:text-blue-600">Toko Online</Link></li>
              <li><Link href="/produk?kategori=template-admin-dashboard" className="hover:text-blue-600">Admin Dashboard</Link></li>
              <li><Link href="/produk?kategori=ai-prompt" className="hover:text-blue-600">AI Prompt & Tools</Link></li>
              <li><Link href="/produk?kategori=ebook" className="hover:text-blue-600">Ebook Panduan</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Jasa Website</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><Link href="/jasa#company-profile" className="hover:text-blue-600">Company Profile</Link></li>
              <li><Link href="/jasa#toko-online" className="hover:text-blue-600">Website Toko Online</Link></li>
              <li><Link href="/jasa#portal-berita" className="hover:text-blue-600">Portal Berita</Link></li>
              <li><Link href="/jasa#custom-system" className="hover:text-blue-600">Custom Web App</Link></li>
              <li><Link href="/jasa#seo" className="hover:text-blue-600">Optimasi SEO Web</Link></li>
            </ul>
          </div>

          {/* Column 4: Supported Payments & Trust */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Metode Pembayaran</h4>
            <p className="text-[11px] text-gray-500 mb-3">Diproses otomatis via Tripay Payment Gateway:</p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {paymentBadges.map((badge) => (
                <span key={badge} className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-[10px] font-bold text-gray-700">
                  {badge}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold text-[11px]">100% Garansi Instan Download</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-10 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Dunia Digitalia. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-gray-900">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-gray-900">Syarat & Ketentuan</Link>
            <Link href="#" className="hover:text-gray-900">Kebijakan Pengembalian</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
