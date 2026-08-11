'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Tag, Copy, Check, X, Sparkles, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [copied, setCopied] = useState(false);
  const couponCode = 'PROMO2026';

  if (!isVisible) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    toast.success(`Kode Promo ${couponCode} Berhasil Disalin!`);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white text-xs py-2.5 pl-4 pr-12 relative shadow-inner z-40 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
          <span className="inline-flex items-center gap-1 bg-white/15 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-amber-300 border border-amber-300/30">
            <Sparkles className="w-3 h-3 text-amber-300" /> Promo Terbaru
          </span>
          <span className="font-medium text-slate-100">
            Dapatkan Diskon Langsung Rp 20.000 dengan Kode Kupon:
          </span>
          <div className="inline-flex items-center gap-1 bg-black/30 border border-white/20 px-2 py-0.5 rounded-lg font-mono font-black text-amber-300">
            <Tag className="w-3 h-3 text-amber-300" />
            <span>{couponCode}</span>
            <button
              onClick={handleCopy}
              className="ml-1 p-0.5 hover:text-white transition-colors"
              title="Salin Kode Kupon"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/promo"
            className="font-bold underline underline-offset-2 hover:text-amber-300 transition-colors flex items-center gap-1 text-[11px]"
          >
            <span>Lihat Semua Promo & Diskon</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/70 hover:text-white"
        aria-label="Tutup Banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
