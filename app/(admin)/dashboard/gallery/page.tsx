'use client';

import { useState, useEffect } from 'react';
import { Copy, Trash2, ExternalLink, Image as ImageIcon, Check, Loader2 } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';
import { getCollection, setDocById, deleteDocById } from '@/lib/supabase/database';
import toast from 'react-hot-toast';

interface GalleryItem {
  id: string;
  image_url: string;
  title?: string;
  category?: string;
  featured?: boolean;
}

const INITIAL_IMAGES = [
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1556742049-0a675659e382?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
];

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const loadGallery = async () => {
    setLoading(true);
    try {
      const data = await getCollection<any>('gallery');
      if (data && data.length > 0) {
        setItems(data);
      } else {
        // Seeding initial data on client side if empty
        const initialItems: GalleryItem[] = INITIAL_IMAGES.map((url, i) => ({
          id: `img-${i + 1}`,
          image_url: url,
          title: `Initial Photo ${i + 1}`,
          category: 'General',
          featured: false,
        }));
        setItems(initialItems);
      }
    } catch (err) {
      console.error(err);
      toast.error('Gagal memuat galeri media.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    toast.success('URL gambar berhasil disalin!');
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleUploadSuccess = async (url: string) => {
    if (!url) return;
    const toastId = toast.loading('Menambahkan gambar ke galeri...');
    try {
      const newId = `img-${Date.now()}`;
      const record = {
        image_url: url,
        title: 'Uploaded Photo',
        category: 'General',
        featured: false,
      };
      await setDocById('gallery', newId, record);
      toast.dismiss(toastId);
      toast.success('Gambar berhasil ditambahkan ke galeri!');
      await loadGallery();
    } catch (err) {
      toast.dismiss(toastId);
      toast.error('Gagal menyimpan gambar ke database.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus gambar ini dari galeri?')) return;
    const toastId = toast.loading('Menghapus gambar...');
    try {
      await deleteDocById('gallery', id);
      toast.dismiss(toastId);
      toast.success('Gambar berhasil dihapus dari galeri!');
      await loadGallery();
    } catch (err) {
      toast.dismiss(toastId);
      toast.error('Gagal menghapus gambar dari database.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Galeri Media & Aset Gambar</h1>
        <p className="text-xs text-gray-500">Unggah dan kelola aset gambar yang tersimpan di Supabase Storage.</p>
      </div>

      {/* Uploader Box */}
      <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-xs space-y-4">
        <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-blue-600" /> Unggah Foto / Banner Baru
        </h3>
        <ImageUpload value="" onChange={handleUploadSuccess} folder="gallery" />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : (
        /* Media Grid */
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="group relative rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-xs">
              <div className="h-40 bg-gray-100 overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.title || 'Gallery item'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-3 bg-white flex items-center justify-between gap-2 border-t border-gray-100">
                <button
                  onClick={() => handleCopyUrl(item.image_url)}
                  className="btn-secondary text-[11px] px-2.5 py-1.5 flex items-center gap-1.5 text-gray-700 flex-1 justify-center"
                >
                  {copiedUrl === item.image_url ? (
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
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                  title="Hapus Aset"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
