import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dunia-digitalia.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Dunia Digitalia — Marketplace Produk Digital & Jasa Pembuatan Website',
    template: '%s | Dunia Digitalia',
  },
  description: 'Pusat jual beli template Blogger premium, source code website, ebook pemrograman, AI prompt, dan jasa pembuatan web profesional di Pancoran, Jakarta Selatan.',
  keywords: [
    'template blogger premium',
    'source code website',
    'jasa pembuatan web',
    'script toko online',
    'ai prompt',
    'ebook pemrograman',
    'marketplace produk digital',
    'dunia digitalia',
    'web development jakarta',
  ],
  authors: [{ name: 'Dunia Digitalia Team', url: siteUrl }],
  creator: 'Dunia Digitalia',
  publisher: 'Dunia Digitalia',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: siteUrl,
    title: 'Dunia Digitalia — Marketplace Produk Digital & Jasa Web',
    description: 'Beli template Blogger SEO, source code fullstack, ebook & jasa pembuatan website profesional terbaik.',
    siteName: 'Dunia Digitalia',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Dunia Digitalia — Marketplace Produk Digital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dunia Digitalia — Marketplace Produk Digital & Jasa Web',
    description: 'Beli template Blogger SEO, source code fullstack, ebook & jasa pembuatan website profesional terbaik.',
    creator: '@duniadigitalia',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Dunia Digitalia',
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      sameAs: [
        'https://facebook.com/duniadigitalia',
        'https://instagram.com/duniadigitalia',
        'https://github.com/ardiansyah-23/dunia-digitalia',
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Pancoran',
        addressLocality: 'Jakarta Selatan',
        addressRegion: 'DKI Jakarta',
        postalCode: '12780',
        addressCountry: 'ID',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+62-812-3456-7890',
        contactType: 'customer service',
        areaServed: 'ID',
        availableLanguage: ['Indonesian', 'English'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Dunia Digitalia',
      description: 'Marketplace Produk Digital & Agensi Web Development',
      publisher: { '@id': `${siteUrl}/#organization` },
      inLanguage: 'id-ID',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${jakarta.variable} dark scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="bg-[#07111F] text-white antialiased selection:bg-[#1E88FF]/30 selection:text-white">
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#0F1D35',
              color: '#FFFFFF',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '0.75rem',
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
