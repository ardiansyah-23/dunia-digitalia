'use client';

import { useState } from 'react';
import { Mail, Phone, Calendar, MessageSquare, Trash2, CheckCircle2, Send } from 'lucide-react';
import toast from 'react-hot-toast';

interface MessageItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

const INITIAL_MESSAGES: MessageItem[] = [
  { id: '1', name: 'Ahmad Fauzi', email: 'ahmad@example.com', phone: '081299998888', subject: 'Konsultasi Jasa Web Development', message: 'Halo tim Dunia Digitalia, saya berminat membuat website toko online e-commerce terintegrasi Tripay. Mohon info estimasi biaya.', date: '4 Agust 2026', read: false },
  { id: '2', name: 'Diana Putri', email: 'diana@example.com', phone: '081177776666', subject: 'Pertanyaan Lisensi Template Blogger', message: 'Apakah template NewsFast bisa digunakan untuk 3 domain berbeda? Terima kasih.', date: '3 Agust 2026', read: true },
];

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<MessageItem[]>(INITIAL_MESSAGES);

  const toggleRead = (id: string) => {
    setMessages(messages.map(m => m.id === id ? { ...m, read: !m.read } : m));
  };

  const handleDelete = (id: string) => {
    setMessages(messages.filter(m => m.id !== id));
    toast.success('Pesan berhasil dihapus!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 mb-1">Pesan Masuk (Form Kontak)</h1>
          <p className="text-xs text-gray-500">Pesan dan pertanyaan dari calon pelanggan dan klien agency.</p>
        </div>
        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
          {messages.filter(m => !m.read).length} Belum Dibaca
        </span>
      </div>

      <div className="space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-6 rounded-2xl border transition-all space-y-3 ${
              !m.read
                ? 'bg-blue-50 border-blue-300 shadow-sm'
                : 'bg-white border-gray-200 shadow-xs'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200/60 pb-3">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900 text-sm">{m.name}</h3>
                {!m.read && (
                  <span className="badge-danger text-[10px] py-0.5">Baru</span>
                )}
              </div>
              <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {m.date}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-blue-600 font-semibold">
              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-gray-400" /> {m.email}</span>
              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gray-400" /> {m.phone}</span>
            </div>

            <div className="text-xs font-bold text-gray-900">
              Subjek: <span className="text-blue-600 font-medium">{m.subject}</span>
            </div>

            <p className="text-xs text-gray-700 leading-relaxed bg-white p-4 rounded-xl border border-gray-200">
              {m.message}
            </p>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => toggleRead(m.id)}
                className="text-xs font-semibold text-gray-600 hover:text-blue-600 flex items-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-gray-400" />
                {m.read ? 'Tandai Belum Dibaca' : 'Tandai Sudah Dibaca'}
              </button>

              <div className="flex gap-2">
                <a
                  href={`https://wa.me/${m.phone.replace(/\D/g, '')}?text=Halo%20${encodeURIComponent(m.name)},%20terima%20kasih%20telah%20menghubungi%20Dunia%20Digitalia.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs px-3 py-1.5 inline-flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Balas via WhatsApp
                </a>

                <button
                  onClick={() => handleDelete(m.id)}
                  className="p-1.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 text-xs"
                  title="Hapus Pesan"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
