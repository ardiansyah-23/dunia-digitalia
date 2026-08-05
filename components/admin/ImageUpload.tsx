'use client';

import { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { uploadImage } from '@/lib/supabase/storage';
import toast from 'react-hot-toast';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}

export default function ImageUpload({ value, onChange, folder = 'uploads' }: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const url = await uploadImage(file, folder, (p) => setProgress(p));
      onChange(url);
      toast.success('Gambar berhasil diunggah!');
    } catch (err) {
      console.error(err);
      toast.error('Gagal mengunggah gambar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-gray-200 w-full h-48 bg-slate-50">
          <img src={value} alt="Uploaded preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600/85 text-white hover:bg-red-600 transition-all shadow-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-500 bg-gray-50 cursor-pointer transition-all">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {loading ? (
              <>
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-2" />
                <p className="text-xs text-gray-500 font-medium">Mengunggah ({progress}%)...</p>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm font-bold text-gray-900">Klik untuk Unggah Gambar</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP hingga 5MB</p>
              </>
            )}
          </div>
          <input type="file" accept="image/*" onChange={handleFileChange} disabled={loading} className="hidden" />
        </label>
      )}
    </div>
  );
}
