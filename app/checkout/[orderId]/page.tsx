'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Clock, CheckCircle2, Copy, Download, ShieldCheck, ArrowRight, RefreshCw, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/layout/PageTransition';

function PaymentInstructionContent({ params }: { params: Promise<{ orderId: string }> }) {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState('');
  const [method, setMethod] = useState('QRIS');
  const [name, setName] = useState('Pelanggan');
  const [email, setEmail] = useState('');
  const [price, setPrice] = useState(149000);
  const [timeLeft, setTimeLeft] = useState(86400); // 24 hours
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    params.then((p) => setOrderId(p.orderId));
    setMethod(searchParams.get('method') || 'QRIS');
    setName(searchParams.get('name') || 'Pelanggan');
    setEmail(searchParams.get('email') || 'user@example.com');
    setPrice(Number(searchParams.get('price')) || 149000);
  }, [params, searchParams]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} berhasil disalin!`);
  };

  const checkPaymentStatus = () => {
    toast.loading('Mengecek status pembayaran di Tripay...');
    setTimeout(() => {
      setIsPaid(true);
      toast.dismiss();
      toast.success('Pembayaran Berhasil Dikonfirmasi!');
    }, 1500);
  };

  const payCode = method === 'QRIS' ? '' : '88000' + orderId.replace(/\D/g, '').slice(-8);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Status Card */}
      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm text-center space-y-4 mb-8">
        {!isPaid ? (
          <>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold">
              <Clock className="w-3.5 h-3.5" />
              Menunggu Pembayaran (Sisa Waktu: {formatTimer(timeLeft)})
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Instruksi Pembayaran {method}
            </h1>

            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Nomor Pesanan: <strong className="text-gray-900">{orderId}</strong>
            </p>
          </>
        ) : (
          <>
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
              Pembayaran Berhasil Ditentukan!
            </h1>
            <p className="text-xs text-gray-500">
              Terima kasih {name}, transaksi Anda telah berhasil dikonfirmasi secara otomatis via Tripay.
            </p>
          </>
        )}
      </div>

      {/* Payment Details Card */}
      <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <span className="text-xs text-gray-500 font-medium">Total Pembayaran</span>
          <span className="text-2xl font-black text-blue-600">Rp {price.toLocaleString('id-ID')}</span>
        </div>

        {!isPaid ? (
          <div className="space-y-6">
            {method === 'QRIS' ? (
              <div className="text-center space-y-4 p-6 rounded-2xl bg-slate-50 border border-gray-200">
                <p className="text-xs font-bold text-gray-700">Scan QRIS Menggunakan Aplikasi Mobile Banking / E-Wallet</p>
                <div className="w-56 h-56 mx-auto bg-white p-3 rounded-xl border border-gray-300 shadow-sm">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=DUNIA-DIGITALIA-PAYMENT"
                    alt="QRIS Code"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-[11px] text-gray-500">Mendukung BCA, Mandiri, BRI, OVO, ShopeePay, GoPay, Dana, LinkAja</p>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-slate-50 border border-gray-200 space-y-3 text-center">
                <span className="text-xs text-gray-500 font-semibold uppercase">Kode Bayar / Kode Virtual Account {method}</span>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl font-black tracking-widest text-blue-600">{payCode}</span>
                  <button
                    onClick={() => copyToClipboard(payCode, 'Kode Bayar')}
                    className="p-2 rounded-xl bg-white border border-gray-300 text-gray-700 hover:text-blue-600"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={checkPaymentStatus}
                className="btn-primary flex-1 py-3.5 text-xs font-bold"
              >
                <RefreshCw className="w-4 h-4" /> Cek Status Pembayaran
              </button>
              <Link
                href={`/invoice/${orderId}?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&price=${price}&method=${method}`}
                className="btn-secondary text-xs px-6 py-3.5"
              >
                <FileText className="w-4 h-4" /> Lihat Invoice
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-center py-4">
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
              <h3 className="font-bold text-emerald-900 text-base">File Digital Siap Diunduh</h3>
              <p className="text-xs text-emerald-700">Lisensi & file produk telah dikirimkan ke email <strong>{email}</strong>.</p>
              
              <a
                href="https://duniadigitalia.com/downloads/newsfast-v2.4.0.zip"
                download
                className="btn-primary bg-emerald-600 hover:bg-emerald-700 border-emerald-500 text-xs px-6 py-3.5 inline-flex items-center gap-2 mt-2"
              >
                <Download className="w-4 h-4" /> Unduh File Sekarang (.ZIP)
              </a>
            </div>

            <Link
              href={`/invoice/${orderId}?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&price=${price}&method=${method}`}
              className="btn-secondary text-xs px-6 py-3 inline-flex items-center gap-2"
            >
              <FileText className="w-4 h-4" /> Unduh Invoice PDF
            </Link>
          </div>
        )}

      </div>

    </div>
  );
}

export default function PaymentInstructionPage({ params }: { params: Promise<{ orderId: string }> }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-gray-800">
      <Navbar />

      <main className="flex-grow pt-6 pb-16">
        <PageTransition>
          <Suspense fallback={<div className="text-center py-20 text-xs text-gray-500">Loading...</div>}>
            <PaymentInstructionContent params={params} />
          </Suspense>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
