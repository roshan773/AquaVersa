import { Metadata } from 'next';
import DiseasesClient from './DiseasesClient';
import { constructMetadata, constructBreadcrumbSchema } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = constructMetadata({
  title: 'Aquarium Fish Diseases: Identification, Symptoms & Care',
  description: 'Reference archive of freshwater and marine fish diseases. Identify symptoms of Ich, Velvet, Fin Rot, Dropsy, and learn safe medication protocols.',
  pathname: '/diseases',
});

export default function DiseasesPage() {
  const breadcrumbSchema = constructBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Diseases', path: '/diseases' },
  ]);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Aquarium Fish Diseases & Pathology Archive',
    description: 'Educational reference catalog of common freshwater and saltwater fish diseases, symptoms, and treatment guidelines.',
    url: `${siteConfig.siteUrl}/diseases`,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.siteUrl,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <DiseasesClient />
    </>
  );
}
