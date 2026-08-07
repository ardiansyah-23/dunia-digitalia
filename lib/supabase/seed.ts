import { setDocById } from './database';
import { PRODUCTS_DATA } from '@/lib/constants/products';
import { CATEGORIES_DATA } from '@/lib/constants/categories';

export async function seedInitialSupabaseData() {
  const results = {
    products: 0,
    categories: 0,
    coupons: 0,
    services: 0,
    settings: false,
    users: 0,
  };

  try {
    // 1. Seed Products
    let prodIdx = 1;
    for (const prod of PRODUCTS_DATA) {
      await setDocById('products', prod.id, {
        title: prod.title,
        slug: prod.slug,
        shortDescription: prod.shortDescription,
        description: prod.description,
        category: prod.category,
        price: prod.price,
        discountPrice: prod.discountPrice || 0,
        version: prod.version,
        demoUrl: prod.demoUrl || '',
        downloadUrl: prod.downloadUrl || '',
        thumbnail: prod.thumbnail,
        screenshots: prod.screenshots || [],
        features: prod.features || [],
        salesCount: prod.salesCount || 0,
        rating: prod.rating || 5.0,
        reviewCount: prod.reviewCount || 0,
        isFeatured: prod.isFeatured || false,
        position: prodIdx * 10, // spaced by 10 for easy insertion/reordering
        createdAt: prod.createdAt,
      });
      results.products++;
      prodIdx++;
    }

    // 2. Seed Categories
    for (const cat of CATEGORIES_DATA) {
      await setDocById('categories', cat.id, {
        name: cat.name,
        slug: cat.slug,
        icon: cat.icon,
        description: cat.description,
        productCount: cat.productCount,
      });
      results.categories++;
    }

    // 3. Seed Coupons
    const initialCoupons = [
      { id: 'coup-1', code: 'PROMO2026', type: 'fixed', value: 20000, usageLimit: 100, usedCount: 14, active: true },
      { id: 'coup-2', code: 'DIGITAL50', type: 'percentage', value: 50, usageLimit: 50, usedCount: 8, active: true },
    ];
    for (const coup of initialCoupons) {
      await setDocById('coupons', coup.id, coup);
      results.coupons++;
    }

    // 4. Seed Services
    const initialServices = [
      { id: 'serv-1', title: 'Company Profile Website', startingPrice: 1500000, description: 'Website profil perusahaan profesional, responsif, siap SEO, dan cepat.', features: ['Gratis Domain .com 1 Thn', 'Optimasi Kecepatan 95+', 'Form Kontak WA', 'Garansi Maintenance 30 Hari'], estimatedDays: '3 - 5 Hari', active: true },
      { id: 'serv-2', title: 'Website Toko Online E-Commerce', startingPrice: 2500000, description: 'Website penjualan dengan sistem pembayaran otomatis Tripay (QRIS/VA) dan cek ongkir.', features: ['Payment Gateway QRIS/VA', 'Katalog Produk Unlimited', 'Dashboard Penjualan', 'Cek Ongkir Otomatis'], estimatedDays: '7 - 10 Hari', active: true },
      { id: 'serv-3', title: 'Portal Berita / Media Digital', startingPrice: 3000000, description: 'Website portal berita bertrafik tinggi dengan manajemen redaksi dan slot iklan.', features: ['Slot Iklan AdSense Ready', 'Kecepatan Ultra', 'Schema News JSON-LD', 'Kategori Berita Multi-level'], estimatedDays: '5 - 7 Hari', active: true },
    ];
    for (const serv of initialServices) {
      await setDocById('services', serv.id, serv);
      results.services++;
    }

    // 5. Seed Site Settings
    await setDocById('settings', 'main', {
      siteName: 'Dunia Digitalia',
      tagline: 'Digital Marketplace & Web Development Agency',
      email: 'hello@duniadigitalia.com',
      phone: '+62 812 3456 7890',
      address: 'Pancoran, Jakarta Selatan, DKI Jakarta, Indonesia',
      workingHours: 'Senin - Jumat, 09.00 - 18.00 WIB',
      tripayMerchantCode: 'T12345',
      tripayMode: 'sandbox',
    });
    results.settings = true;

    // 6. Seed Users
    const initialUsers = [
      { id: '1', name: 'Admin Utama', email: 'admin@duniadigitalia.com', role: 'Super Admin' as const, password: 'admin123', joinedDate: '1 Jan 2026', ordersCount: 0 },
      { id: '4', name: 'Super Admin', email: 'superadmin@duniadigitalia.com', role: 'Super Admin' as const, password: 'superadmin123', joinedDate: '1 Jan 2026', ordersCount: 0 },
      { id: '2', name: 'Budi Santoso', email: 'budi@example.com', role: 'Customer' as const, password: 'user123', joinedDate: '15 Jan 2026', ordersCount: 3 },
      { id: '3', name: 'Siti Rahma', email: 'siti@example.com', role: 'Customer' as const, password: 'user123', joinedDate: '20 Jan 2026', ordersCount: 1 },
    ];
    for (const user of initialUsers) {
      await setDocById('users', user.id, {
        name: user.name,
        email: user.email,
        role: user.role,
        password: user.password,
        joinedDate: user.joinedDate,
        ordersCount: user.ordersCount,
      });
      results.users++;
    }

    return { success: true, results };
  } catch (error: any) {
    console.error('Supabase Seed Error:', error);
    return { success: false, error: error.message };
  }
}
