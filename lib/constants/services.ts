export interface WebServiceItem {
  id: string;
  slug: string;
  title: string;
  startingPrice: number;
  estimatedDays: string;
  description: string;
  longDescription: string;
  features: string[];
  deliverables: string[];
  technologies: string[];
  faq: { question: string; answer: string }[];
  active?: boolean;
  icon?: string;
  color?: string;
}

export const AGENCY_SERVICES: WebServiceItem[] = [
  {
    id: 'serv-1',
    slug: 'company-profile',
    title: 'Company Profile Website',
    startingPrice: 1500000,
    estimatedDays: '3 - 5 Hari Kerja',
    description: 'Profil bisnis profesional dengan desain kustom eksklusif, responsif di semua perangkat, dan dioptimasi penuh untuk Google SEO.',
    longDescription: `Website Company Profile adalah fondasi utama kredibilitas bisnis Anda di era digital. Kami merancang website profil perusahaan berarsitektur cepat, estetis, dan profesional menggunakan Next.js / Blogger / WordPress modern.

Website ini dilengkapi dengan optimasi kecepatan muat (Core Web Vitals 95+), integrasi tombol formulir WhatsApp langsung, serta penataan halaman tentang perusahaan, layanan/produk utama, galeri portfolio, dan alamat Google Maps interaktif.`,
    features: [
      'Gratis Domain .com 1 Tahun',
      'Gratis SSL Security Certificate (HTTPS)',
      'Optimasi Kecepatan Muat 95+ (Google PageSpeed)',
      'Desain Responsif (HP, Tablet, Laptop)',
      'Form Kontak WhatsApp & Email Direct',
      'Integrasi Google Maps Alamat Perusahaan',
      'Struktur SEO Dasar (Meta Tag & Schema)',
      'Garansi & Pemeliharaan 30 Hari',
    ],
    deliverables: [
      'Akses Penuh Akun Domain & Hosting/Server',
      'Source Code & Berkas Website Utama',
      'Dokumentasi & Panduan Edit Konten',
      'Garansi Perbaikan Bug Selama 30 Hari',
    ],
    technologies: ['Next.js 15', 'React', 'Tailwind CSS', 'TypeScript', 'Google SEO Schema'],
    faq: [
      {
        question: 'Berapa lama proses pengerjaan pembuatan Company Profile?',
        answer: 'Proses pengerjaan berkisar antara 3 hingga 5 hari kerja setelah seluruh materi konten (logo, foto, dan profil singkat) kami terima.',
      },
      {
        question: 'Apakah saya bisa mengedit tulisan dan foto sendiri nantinya?',
        answer: 'Ya, kami menyediakan dashboard admin yang sangat mudah digunakan tanpa perlu keahlian coding untuk menambah atau mengedit isi konten website.',
      },
      {
        question: 'Apakah harga sudah termasuk domain dan server?',
        answer: 'Ya! Harga sudah termasuk domain .com selama 1 tahun pertama dan konfigurasi hosting/server bebas biaya bulanan.',
      },
    ],
    active: true,
  },
  {
    id: 'serv-2',
    slug: 'toko-online',
    title: 'Website Toko Online E-Commerce',
    startingPrice: 2500000,
    estimatedDays: '7 - 10 Hari Kerja',
    description: 'Website penjualan dengan sistem pembayaran otomatis Tripay (QRIS/VA) dan kalkulasi ongkir otomatis seluruh ekspedisi.',
    longDescription: `Toko Online E-Commerce modern yang siap memproses pesanan pembeli secara otomatis 24 jam non-stop tanpa mengganggu waktu istirahat Anda.

Sistem toko online ini terintegrasi langsung dengan Payment Gateway Tripay (pembayaran via QRIS all e-wallet, Virtual Account Bank BCA/BNI/BRI/Mandiri, serta Indomaret/Alfamart) dan fitur Cek Ongkir Otomatis (JNE, TIKI, POS, J&T, SiCepat). Pengunjung dapat langsung melakukan checkout dan mengunduh produk digital atau menerima nomor resi pengiriman fisik.`,
    features: [
      'Sistem Pembayaran Otomatis Tripay (QRIS & VA)',
      'Hitung Ongkir Otomatis All Ekspedisi (JNE, SiCepat, dll)',
      'Katalog Produk Tanpa Batas (Unlimited Items)',
      'Manajemen Kategori, Stok, & Varian Ukuran/Warna',
      'Notifikasi Pesanan Masuk via WhatsApp / Email',
      'Dashboard Laporan Penjualan & Keuangan Admin',
      'Fitur Kupon Diskon & Kode Promo',
      'Garansi Maintenance & Support 60 Hari',
    ],
    deliverables: [
      'Source Code Lengkap Toko Online E-Commerce',
      'Konfigurasi Tripay Merchant API Key & Webhook',
      'Akses Admin Dashboard Manajemen Toko',
      'Panduan Penggunaan & Manajemen Produk',
    ],
    technologies: ['Next.js', 'Tripay Payment Gateway', 'Supabase Database', 'Tailwind CSS', 'RajaOngkir API'],
    faq: [
      {
        question: 'Metode pembayaran apa saja yang didukung oleh Toko Online ini?',
        answer: 'Sistem mendukung QRIS (Gopay, OVO, Dana, LinkAja, ShopeePay), Virtual Account Bank (BCA, BNI, BRI, Mandiri, Permata), dan pembayaran gerai retail Alfamart/Indomaret via Tripay Gateway.',
      },
      {
        question: 'Apakah uang pembayaran pembeli langsung masuk ke rekening saya?',
        answer: 'Ya, seluruh dana pembayaran dari pembeli akan langsung masuk ke akun Tripay Merchant Anda dan otomatis ditarik (disettle) ke rekening bank pribadi Anda.',
      },
    ],
    active: true,
  },
  {
    id: 'serv-3',
    slug: 'portal-berita',
    title: 'Portal Berita / Media Digital',
    startingPrice: 3000000,
    estimatedDays: '5 - 7 Hari Kerja',
    description: 'Website portal berita bertrafik tinggi dengan manajemen redaksi multi-penulis, slot iklan Google AdSense, dan Schema News JSON-LD.',
    longDescription: `Portal Berita dan Media Informasi Digital dirancang khusus untuk mempublikasikan berita, opini, dan artikel bertrafik tinggi secara stabil dan cepat.

Website ini sudah dioptimasi untuk penempatan iklan Google AdSense (Header, In-Feed, In-Article, Sticky Bottom), siap didaftarkan ke Google News, serta dilengkapi dengan struktur Schema NewsArticle JSON-LD agar artikel lebih cepat diindeks di halaman utama pencarian Google.`,
    features: [
      'Desain Layout Portal Berita (Headline, Breaking News, Trending)',
      'Slot Iklan Google AdSense Ready (Auto & Manual Placement)',
      'Schema NewsArticle JSON-LD untuk Fast Google Indexing',
      'Manajemen Redaksi Multi-Penulis (Editor, Reporter, Admin)',
      'Kategori Berita Multi-Level & Tag Populer',
      'Optimasi Kecepatan Muat Server Ultra Fast',
      'Fitur Komentar Pengunjung & Social Share Buttons',
      'Garansi Dukungan Teknis 30 Hari',
    ],
    deliverables: [
      'Source Code & Berkas Portal Berita',
      'Konfigurasi SEO Schema Google News',
      'Akses Dashboard Redaksi & Penulis',
      'Panduan Penulisan SEO Friendly',
    ],
    technologies: ['Next.js / Blogger Engine', 'Google News Schema', 'AdSense Integration', 'Tailwind CSS'],
    faq: [
      {
        question: 'Apakah portal berita ini mudah diterima oleh Google AdSense?',
        answer: 'Ya, tata letak dan struktur HTML portal berita yang kami buat telah disesuaikan dengan Kebijakan Mutu Google AdSense untuk memperbesar peluang pendaftaran Anda diterima.',
      },
    ],
    active: true,
  },
  {
    id: 'serv-4',
    slug: 'custom-system',
    title: 'Custom Web Application & SaaS',
    startingPrice: 4500000,
    estimatedDays: '10 - 14 Hari Kerja',
    description: 'Pengembangan aplikasi berbasis web khusus (SaaS, Kasir POS, CRM, ERP, atau Portal Internal) sesuai kebutuhan alur kerja unik Anda.',
    longDescription: `Solusi rekayasa perangkat lunak web kustom yang dibangun dari nol sesuai dengan kebutuhan spesifik dan alur operasional unik perusahaan Anda.

Baik Anda memerlukan sistem manajemen inventaris, kasir POS online, platform SaaS berlangganan, portal absensi karyawan, hingga integrasi API Pihak Ketiga, tim arsitek software kami siap merealisasikannya dengan standar performa dan keamanan tertinggi.`,
    features: [
      'Analisis Kebutuhan Sistem & Wireframing UI/UX',
      'Pengembangan Full-Stack Architecture (Next.js & Supabase/Node)',
      'Manajemen Role Akses Berbuntut (Super Admin, Manager, User)',
      'Integrasi API Pihak Ketiga & Payment Gateway',
      'Export Laporan PDF, Excel, & Grafik Statistik Real-time',
      'Sistem Keamanan Autentikasi JWT & Role Control',
      'Uji Coba Pengetesan Beban & Bug Checking',
      'Garansi Pemeliharaan & Bug Fix 90 Hari',
    ],
    deliverables: [
      'Source Code Utama (GitHub Repository)',
      'Dokumentasi API & Arsitektur Database',
      'Konfigurasi Cloud Server (Vercel / Supabase / AWS)',
      'Pelatihan Penggunaan Sistem untuk Tim Anda',
    ],
    technologies: ['Next.js 15', 'TypeScript', 'Supabase PostgreSQL', 'Tailwind CSS', 'Node.js'],
    faq: [
      {
        question: 'Bagaimana alur diskusi jika kebutuhan fitur proyek saya sangat unik?',
        answer: 'Kami akan mengadakan sesi diskusi atau rapat online untuk membedah daftar fitur (Requirement List), memberikan saran arsitektur terbaik, serta membuatkan penawaran harga (Proposal) yang transparan.',
      },
    ],
    active: true,
  },
  {
    id: 'serv-5',
    slug: 'optimasi-seo',
    title: 'Optimasi SEO & Speed Performance',
    startingPrice: 1000000,
    estimatedDays: '2 - 3 Hari Kerja',
    description: 'Layanan pembenahan skor SEO teknis, perbaikan kecepatan muat Google PageSpeed, kompresi gambar, dan perbaikan data terstruktur.',
    longDescription: `Perbaiki skor kecepatan muat dan optimasi SEO teknis pada website yang sudah Anda miliki agar berada di posisi terbaik Google.

Layanan ini mencakup perbaikan skor Google PageSpeed Insights (Mobile & Desktop), optimasi Core Web Vitals (LCP, CLS, INP), perbaikan struktur Meta Tag SEO, serta pemasangan Schema JSON-LD yang valid.`,
    features: [
      'Audit SEO Teknis & Laporan Masalah Website',
      'Perbaikan Skor Google PageSpeed Mobile (85+ s/d 95+)',
      'Optimasi Core Web Vitals (LCP, CLS, INP)',
      'Pemasangan Data Terstruktur Schema JSON-LD Valid',
      'Pembersihan Unused CSS & JS Script',
      'Optimasi Kompresi Gambar & Responsive Image Format',
      'Perbaikan Sitemap.xml & Robots.txt',
      'Laporan Hasil Uji Kecepatan Sebelum & Sesudah',
    ],
    deliverables: [
      'Laporan Hasil Optimasi SEO Teknis & PageSpeed',
      'Berkas Perbaikan Kode Website',
      'Panduan Menjaga Kecepatan Website',
    ],
    technologies: ['Google PageSpeed', 'Core Web Vitals Audit', 'JSON-LD Schema', 'Lighthouse Optimization'],
    faq: [
      {
        question: 'Apakah optimasi ini aman untuk website yang sudah berjalan?',
        answer: 'Sangat aman! Kami akan membuat backup penuh sebelum melakukan proses perbaikan sehingga data website Anda tidak akan hilang.',
      },
    ],
    active: true,
  },
];

export const SERVICES_DATA = AGENCY_SERVICES;

export const STATS_DATA = [
  { label: 'Proyek Selesai', value: 150, suffix: '+' },
  { label: 'Klien Puas', value: 80, suffix: '+' },
  { label: 'Artikel & Tutorial', value: 200, suffix: '+' },
  { label: 'File Terunduh', value: 5000, suffix: '+' },
];
