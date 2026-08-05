import { supabase } from './config';

export type UploadProgressCallback = (progress: number) => void;

export async function uploadFile(
  file: File,
  path: string,
  onProgress?: UploadProgressCallback
): Promise<string> {
  const bucketName = 'uploads';

  // Local fallback if Supabase is not configured
  const isMocked = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project');
  if (isMocked) {
    onProgress?.(100);
    // Return an Unsplash placeholder or object URL for local preview
    return URL.createObjectURL(file);
  }

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    // If bucket does not exist, try to create or fail gracefully
    console.error('Supabase upload error:', error);
    throw error;
  }

  onProgress?.(100);
  const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(path);
  return publicUrl;
}

export async function uploadImage(
  file: File,
  folder: string,
  onProgress?: UploadProgressCallback
): Promise<string> {
  const ext = file.name.split('.').pop();
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const path = `${folder}/${filename}`;
  return uploadFile(file, path, onProgress);
}

export async function deleteFile(url: string): Promise<void> {
  try {
    const isMocked = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project');
    if (isMocked) return;

    // Extract path from public URL
    const bucketName = 'uploads';
    const parts = url.split(`/storage/v1/object/public/${bucketName}/`);
    if (parts.length > 1) {
      const path = parts[1];
      await supabase.storage.from(bucketName).remove([path]);
    }
  } catch (err) {
    console.error('Error deleting file:', url, err);
  }
}
