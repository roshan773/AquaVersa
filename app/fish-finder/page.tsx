import { Metadata } from 'next';
import FishFinderClient from './FishFinderClient';
import { constructMetadata, constructBreadcrumbSchema, constructToolSchema } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Aquarium Fish Finder: Match Fish to Your Tank Size & Setup',
  description: 'Find suitable aquarium fish for your tank size, experience level, water type, and temperament preferences with our interactive fish recommendation wizard.',
  pathname: '/fish-finder',
});

export default function FishFinderPage() {
  const breadcrumbSchema = constructBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/#tools' },
    { name: 'Fish Finder', path: '/fish-finder' },
  ]);

  const toolSchema = constructToolSchema({
    name: 'Aquarium Fish Recommendation Wizard',
    description: 'Filter fish species based on tank dimensions, water salinity, temperament, plant-safety, and keeper experience level.',
    path: '/fish-finder',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <FishFinderClient />
    </>
  );
}
