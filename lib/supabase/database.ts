import { supabase } from './config';
import { PRODUCTS_DATA } from '@/lib/constants/products';
import { CATEGORIES_DATA } from '@/lib/constants/categories';

// Local memory store for instant fallback if Supabase url is default/mock
let localMemoryStore: Record<string, any[]> = {
  products: [...PRODUCTS_DATA],
  categories: [...CATEGORIES_DATA],
  coupons: [
    { id: '1', code: 'PROMO2026', type: 'fixed', value: 20000, usageLimit: 100, usedCount: 14, active: true },
    { id: '2', code: 'DIGITAL50', type: 'percentage', value: 50, usageLimit: 50, usedCount: 8, active: true }
  ],
  services: [
    { id: '1', title: 'Company Profile Website', startingPrice: 1500000, description: 'Website profil perusahaan profesional, responsif, siap SEO, dan cepat.', features: ['Gratis Domain .com 1 Thn', 'Optimasi Kecepatan 95+', 'Form Kontak WA', 'Garansi Maintenance 30 Hari'], estimatedDays: '3 - 5 Hari', active: true },
    { id: '2', title: 'Website Toko Online E-Commerce', startingPrice: 2500000, description: 'Website penjualan dengan sistem pembayaran otomatis Tripay (QRIS/VA) dan cek ongkir.', features: ['Payment Gateway QRIS/VA', 'Katalog Produk Unlimited', 'Dashboard Penjualan', 'Cek Ongkir Otomatis'], estimatedDays: '7 - 10 Hari', active: true },
    { id: '3', title: 'Portal Berita / Media Digital', startingPrice: 3000000, description: 'Website portal berita bertrafik tinggi dengan manajemen redaksi dan slot iklan.', features: ['Slot Iklan AdSense Ready', 'Kecepatan Ultra', 'Schema News JSON-LD', 'Kategori Berita Multi-level'], estimatedDays: '5 - 7 Hari', active: true }
  ],
  settings: [
    {
      id: 'main',
      site_name: 'Dunia Digitalia',
      tagline: 'Digital Marketplace & Web Development Agency',
      email: 'hello@duniadigitalia.com',
      phone: '+62 812 3456 7890',
      address: 'Pancoran, Jakarta Selatan, DKI Jakarta, Indonesia',
      working_hours: 'Senin - Jumat, 09.00 - 18.00 WIB',
      tripay_merchant_code: 'T12345',
      tripay_mode: 'sandbox'
    }
  ],
  testimonials: [
    { id: '1', name: 'Rian Hidayat', role: 'Blogger & Media', company: 'Portal Berita', content: 'Template NewsFast sangat cepat dan rapi. Pendapatan Google AdSense blog saya naik signifikan!', rating: 5, featured: true },
    { id: '2', name: 'Siti Rahma', role: 'Pemilik Toko Online', company: 'Toko Modern', content: 'Jasa pembuatan toko online dari Dunia Digitalia sangat profesional. Pembayaran otomatis via Tripay berjalan lancar.', rating: 5, featured: true }
  ],
  articles: [
    { id: '1', title: 'Cara Optimasi SEO Template Blogger Agar Lolos Google AdSense & Fast Indexing', slug: 'cara-optimasi-seo-template-blogger', excerpt: 'Panduan langkah demi langkah...', category: 'Blogger', author: 'Admin Utama', date: '2 Agust 2026', readTime: '5 min baca', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80', published: true, featured: true, views: 120 }
  ],
  messages: [],
  orders: []
};

// Check if using default placeholder config
export const isMockDatabase = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project');
const isMocked = isMockDatabase;

export async function getDocById<T>(collectionName: string, id: string): Promise<T | null> {
  if (isMocked) {
    const list = localMemoryStore[collectionName] || [];
    return (list.find((item) => item.id === id) || null) as T | null;
  }
  const { data, error } = await supabase
    .from(collectionName)
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) {
    console.error(error);
    throw error;
  }
  return data as T | null;
}

export async function getCollection<T>(
  collectionName: string,
  constraints: any[] = []
): Promise<T[]> {
  if (isMocked) {
    return (localMemoryStore[collectionName] || []) as T[];
  }
  let query = supabase.from(collectionName).select('*');
  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw error;
  }
  return (data || []) as T[];
}

export async function createDoc<T>(collectionName: string, data: Omit<T, 'id'>): Promise<string> {
  const newId = Date.now().toString() + Math.random().toString(36).slice(2, 6);
  const record = { id: newId, ...data, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };

  if (isMocked) {
    if (!localMemoryStore[collectionName]) localMemoryStore[collectionName] = [];
    localMemoryStore[collectionName].push(record);
    return newId;
  }

  const { error } = await supabase.from(collectionName).insert([record]);
  if (error) throw error;
  return newId;
}

export async function updateDocById<T>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> {
  if (isMocked) {
    const list = localMemoryStore[collectionName] || [];
    localMemoryStore[collectionName] = list.map((item) =>
      item.id === id ? { ...item, ...data, updated_at: new Date().toISOString() } : item
    );
    return;
  }
  const { error } = await supabase
    .from(collectionName)
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

export async function deleteDocById(collectionName: string, id: string): Promise<void> {
  if (isMocked) {
    const list = localMemoryStore[collectionName] || [];
    localMemoryStore[collectionName] = list.filter((item) => item.id !== id);
    return;
  }
  const { error } = await supabase.from(collectionName).delete().eq('id', id);
  if (error) throw error;
}

export async function setDocById<T>(
  collectionName: string,
  id: string,
  data: Omit<T, 'id'>
): Promise<void> {
  const record = { id, ...data, updated_at: new Date().toISOString() };
  if (isMocked) {
    const list = localMemoryStore[collectionName] || [];
    const exists = list.some((item) => item.id === id);
    if (exists) {
      localMemoryStore[collectionName] = list.map((item) => (item.id === id ? record : item));
    } else {
      localMemoryStore[collectionName] = [...list, record];
    }
    return;
  }
  const { error } = await supabase.from(collectionName).upsert([record]);
  if (error) throw error;
}

// Helper methods
export async function getPublishedArticles(limitCount = 10) {
  if (isMocked) {
    return (localMemoryStore.articles || []).filter(a => a.published).slice(0, limitCount);
  }
  const { data } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(limitCount);
  return data || [];
}

export async function getArticleBySlug(slug: string) {
  if (isMocked) {
    return (localMemoryStore.articles || []).find(a => a.slug === slug && a.published) || null;
  }
  const { data } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();
  return data;
}

export async function getFeaturedArticles(limitCount = 3) {
  if (isMocked) {
    return (localMemoryStore.articles || []).filter(a => a.published && a.featured).slice(0, limitCount);
  }
  const { data } = await supabase
    .from('articles')
    .select('*')
    .eq('published', true)
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(limitCount);
  return data || [];
}

export async function incrementArticleViews(id: string) {
  if (isMocked) {
    const list = localMemoryStore.articles || [];
    localMemoryStore.articles = list.map(a => a.id === id ? { ...a, views: (a.views || 0) + 1 } : a);
    return;
  }
  const { data } = await supabase.rpc('increment_views', { article_id: id });
}

export async function getProjects(category?: string, limitCount = 12) {
  if (isMocked) {
    let list = localMemoryStore.projects || [];
    if (category) list = list.filter(p => p.category === category);
    return list.slice(0, limitCount);
  }
  let query = supabase.from('projects').select('*').order('created_at', { ascending: false }).limit(limitCount);
  if (category) query = query.eq('category', category);
  const { data } = await query;
  return data || [];
}

export async function getFeaturedProjects(limitCount = 6) {
  if (isMocked) {
    return (localMemoryStore.projects || []).filter(p => p.featured).slice(0, limitCount);
  }
  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(limitCount);
  return data || [];
}

export async function getActiveServices() {
  if (isMocked) {
    return (localMemoryStore.services || []).filter(s => s.active);
  }
  const { data } = await supabase
    .from('services')
    .select('*')
    .eq('active', true)
    .order('id', { ascending: true });
  return data || [];
}

export async function getFeaturedTestimonials(limitCount = 8) {
  if (isMocked) {
    return (localMemoryStore.testimonials || []).filter(t => t.featured).slice(0, limitCount);
  }
  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(limitCount);
  return data || [];
}

export async function submitContactMessage(data: any) {
  return createDoc('messages', { ...data, read: false, replied: false });
}

export async function getGalleryItems(category?: string) {
  if (isMocked) {
    let list = localMemoryStore.gallery || [];
    if (category) list = list.filter(g => g.category === category);
    return list;
  }
  let query = supabase.from('gallery').select('*').order('id', { ascending: true });
  if (category) query = query.eq('category', category);
  const { data } = await query;
  return data || [];
}

export async function getSiteSettings() {
  return getDocById('settings', 'main');
}

export async function getCategories(type?: string) {
  if (isMocked) {
    return localMemoryStore.categories || [];
  }
  const { data } = await supabase.from('categories').select('*').order('id', { ascending: true });
  return data || [];
}

export function toDate(value: any): Date {
  if (!value) return new Date();
  return new Date(value);
}
