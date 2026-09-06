import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

interface MetadataProps {
  title: string;
  description: string;
  pathname?: string;
  image?: string;
  noIndex?: boolean;
  type?: 'website' | 'article';
}

/**
 * Builds standard, production-ready SEO metadata for Next.js App Router.
 * Ensures clean titles, descriptions, canonical URLs, Open Graph, and Twitter tags.
 * Explicitly DOES NOT include meta keywords.
 */
export function constructMetadata({
  title,
  description,
  pathname = '',
  image = '/og-image.png',
  noIndex = false,
  type = 'website',
}: MetadataProps): Metadata {
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const canonicalUrl = `${siteConfig.siteUrl}${cleanPath === '/' ? '' : cleanPath}`;
  const imageUrl = image.startsWith('http') ? image : `${siteConfig.siteUrl}${image}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: 'en_US',
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
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
}

/**
 * Helper to build BreadcrumbList structured data (JSON-LD)
 */
export function constructBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.siteUrl}${item.path.startsWith('/') ? item.path : `/${item.path}`}`,
    })),
  };
}

/**
 * Helper to build WebApplication structured data (JSON-LD) for interactive tools
 */
export function constructToolSchema({
  name,
  description,
  path,
  applicationCategory = 'EducationalApplication',
}: {
  name: string;
  description: string;
  path: string;
  applicationCategory?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url: `${siteConfig.siteUrl}${path.startsWith('/') ? path : `/${path}`}`,
    applicationCategory,
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
  };
}
