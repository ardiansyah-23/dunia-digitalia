import { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://duniadigitalia.com';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
}

export function generateMetadata({
  title,
  description,
  image = '/images/og-default.jpg',
  url = '',
  type = 'website',
  publishedTime,
  modifiedTime,
  keywords = [],
}: SEOProps): Metadata {
  const fullTitle = title === 'Dunia Digitalia'
    ? 'Dunia Digitalia — Digital Agency & Technology Education'
    : `${title} | Dunia Digitalia`;

  const ogImage = image.startsWith('http') ? image : `${BASE_URL}${image}`;
  const canonical = `${BASE_URL}${url}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      'dunia digitalia',
      'digital agency jakarta',
      'web development indonesia',
      'artificial intelligence',
      'teknologi digital',
      ...keywords,
    ],
    authors: [{ name: 'Dunia Digitalia', url: BASE_URL }],
    creator: 'Dunia Digitalia',
    publisher: 'Dunia Digitalia',
    formatDetection: { email: false, address: false, telephone: false },
    metadataBase: new URL(BASE_URL),
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: 'Dunia Digitalia',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: 'id_ID',
      type,
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@duniadigitalia',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  };
}
