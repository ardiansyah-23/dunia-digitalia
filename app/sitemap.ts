import { MetadataRoute } from 'next';
import { PRODUCTS_DATA } from '@/lib/constants/products';
import { getCollection } from '@/lib/supabase/database';

export const revalidate = 3600; // Revalidate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dunia-digitalia.vercel.app';

  // 1. Static Public Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/produk',
    '/jasa',
    '/blog',
    '/promo',
    '/portfolio',
    '/about',
    '/contact',
    '/tutorial',
    '/kebijakan-privasi',
    '/syarat-ketentuan',
    '/kebijakan-pengembalian',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/produk' || route === '/jasa' ? 0.9 : 0.8,
  }));

  // 2. Dynamic Product Pages
  let productSlugs: string[] = PRODUCTS_DATA.map((p) => p.slug);
  try {
    const dbProducts = await getCollection<any>('products');
    if (dbProducts && dbProducts.length > 0) {
      const dbSlugs = dbProducts.map((p) => p.slug).filter(Boolean);
      productSlugs = Array.from(new Set([...productSlugs, ...dbSlugs]));
    }
  } catch (e) {
    console.error('Sitemap product fetch fallback:', e);
  }

  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${baseUrl}/produk/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 3. Dynamic Blog Post Pages
  let blogSlugs: string[] = ['cara-optimasi-seo-template-blogger'];
  try {
    const dbArticles = await getCollection<any>('articles');
    if (dbArticles && dbArticles.length > 0) {
      const dbSlugs = dbArticles.map((a) => a.slug).filter(Boolean);
      blogSlugs = Array.from(new Set([...blogSlugs, ...dbSlugs]));
    }
  } catch (e) {
    console.error('Sitemap article fetch fallback:', e);
  }

  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
