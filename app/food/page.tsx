import { Metadata } from 'next';
import FoodClient from './FoodClient';
import { foodData } from '@/data/food';
import { constructMetadata, constructBreadcrumbSchema } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = constructMetadata({
  title: 'Aquarium Fish Food & Diet Guide: Nutrition, Feeding & Types',
  description: 'Guide to aquarium fish food types, nutritional requirements, and feeding schedules. Learn about flakes, pellets, freeze-dried, and live foods.',
  pathname: '/food',
});

export default function FoodPage() {
  const breadcrumbSchema = constructBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Fish Food & Diet', path: '/food' },
  ]);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Aquarium Fish Food & Diet Guide: Nutrition, Feeding & Types',
    description: 'Comprehensive nutritional guide covering aquarium fish diets, floating vs sinking foods, and feeding frequencies.',
    image: `${siteConfig.siteUrl}/og-image.png`,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.siteUrl}/apple-touch-icon.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.siteUrl}/food`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <FoodClient initialFood={foodData} />
    </>
  );
}
