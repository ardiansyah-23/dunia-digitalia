'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Printer, Download, CheckCircle2, ShieldCheck, ArrowLeft } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants/nav';

function InvoiceContent({ params }: { params: Promise<{ orderId: string }> }) {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState('ORD-123456');
  const [name, setName] = useState('Budi Santoso');
  const [email, setEmail] = useState('budi@example.com');
  const [price, setPrice] = useState(149000);
  const [method, setMethod] = useState('QRIS');

  useEffect(() => {
    params.then((p) => setOrderId(p.orderId));
    setName(searchParams.get('name') || 'Budi Santoso');
    setEmail(searchParams.get('email') || 'budi@example.com');
    setPrice(Number(searchParams.get('price')) || 149000);
    setMethod(searchParams.get('method') || 'QRIS');
  }, [params, searchParams]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Printable Control Bar */}
      <div className="flex items-center justify-between print:hidden bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <Link href="/" className="text-xs font-semibold text-gray-600 hover:text-blue-600 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Marketplace
        </Link>
        <button onClick={handlePrint} className="btn-primary text-xs px-5 py-2.5">
          <Printer className="w-4 h-4" /> Cetak / Simpan PDF
        </button>
      </div>

      {/* Invoice Container */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-lg space-y-8 print:shadow-none print:border-none print:p-0">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black flex items-center justify-center text-lg">
                D
              </div>
              <span className="font-extrabold text-xl text-gray-900">
                Dunia<span className="text-blue-600">Digitalia</span>
              </span>
            </div>
            <p className="text-xs text-gray-500 max-w-xs">{COMPANY_INFO.address}</p>
          </div>

          <div className="sm:text-right">
            <span className="text-2xl font-black text-gray-900 tracking-tight">INVOICE</span>
            <p className="text-xs font-bold text-blue-600 mt-1">#{orderId}</p>
            <span className="badge-success inline-block mt-2">PAID / LUNAS</span>
          </div>
        </div>

        {/* Customer & Transaction Info */}
        <div className="grid grid-cols-2 gap-6 text-xs border-b border-gray-200 pb-6">
          <div>
            <span className="font-bold text-gray-400 uppercase tracking-wider block mb-1">Ditujukan Kepada:</span>
            <h4 className="font-bold text-gray-900 text-sm">{name}</h4>
            <p className="text-gray-600">{email}</p>
          </div>
          <div className="text-right">
            <span className="font-bold text-gray-400 uppercase tracking-wider block mb-1">Detail Transaksi:</span>
            <p className="text-gray-600">Tanggal: <strong className="text-gray-900">{new Date().toLocaleDateString('id-ID')}</strong></p>
            <p className="text-gray-600">Metode: <strong className="text-gray-900">{method} (Tripay)</strong></p>
          </div>
        </div>

        {/* Item Table */}
        <div>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-gray-700 font-bold border-b border-gray-200">
              <tr>
                <th className="p-3">Deskripsi Produk</th>
                <th className="p-3 text-center">Jumlah</th>
                <th className="p-3 text-right">Harga</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-3">
                  <h5 className="font-bold text-gray-900">NewsFast — Template Blogger Portal Berita</h5>
                  <span className="text-[11px] text-gray-500">Lisensi Komersial Standar + Instant Download</span>
                </td>
                <td className="p-3 text-center font-medium">1</td>
                <td className="p-3 text-right font-bold text-gray-900">Rp {price.toLocaleString('id-ID')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Total Calculation */}
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <div className="w-64 space-y-2 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>Rp {price.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Pajak (PPN 0%)</span>
              <span>Rp 0</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200 text-sm font-extrabold text-gray-900">
              <span>Total Lunas</span>
              <span className="text-blue-600">Rp {price.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="pt-6 border-t border-gray-100 text-[11px] text-gray-500 text-center space-y-1">
          <p className="font-semibold text-gray-700">Terima kasih atas pembelian Anda di Dunia Digitalia!</p>
          <p>Invoice ini sah dan diproses secara otomatis oleh sistem Tripay Payment Gateway.</p>
        </div>

      </div>

    </div>
  );
}

export default function InvoicePage({ params }: { params: Promise<{ orderId: string }> }) {
  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 print:p-0 print:bg-white text-gray-800">
      <Suspense fallback={<div className="text-center py-20 text-xs text-gray-500">Loading...</div>}>
        <InvoiceContent params={params} />
      </Suspense>
    </div>
  );
}
