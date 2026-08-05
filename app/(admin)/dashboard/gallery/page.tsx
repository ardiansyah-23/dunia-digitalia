'use client';

import { useState } from 'react';
import { Copy, Trash2, ExternalLink, Image as ImageIcon, Check } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import toast from 'react-hot-toast';

const INITIAL_GALLERY = [
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1556742049-0a675659e382?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
];

export default function AdminGalleryPage() {
  const [images, setImages] = useState<string[]>(INITIAL_GALLERY);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    toast.success('URL gambar berhasil disalin!');
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    toast.success('Gambar berhasil dihapus dari galeri!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Galeri Media & Aset Gambar</h1>
        <p className="text-xs text-gray-500">Unggah dan kelola aset gambar yang tersimpan di Firebase Storage.</p>
      </div>

      {/* Uploader Box */}
      <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-4">
        <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-blue-600" /> Unggah Foto / Banner Baru
        </h3>
        <ImageUpload
          value=""
          onChange={(url) => url && setImages((prev) => [url, ...prev])}
          folder="gallery"
        />
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((url, i) => (
          <div key={i} className="group relative rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-xs">
            <div className="h-40 bg-gray-100 overflow-hidden">
              <img src={url} alt={`Gallery item ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>

            <div className="p-3 bg-white flex items-center justify-between gap-2 border-t border-gray-100">
              <button
                onClick={() => handleCopyUrl(url)}
                className="btn-secondary text-[11px] px-2.5 py-1.5 flex items-center gap-1.5 text-gray-700 flex-1 justify-center"
              >
                {copiedUrl === url ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-600 font-bold">Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-gray-400" />
                    <span>Salin URL</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleDelete(i)}
                className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                title="Hapus Aset"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
