import { Metadata } from 'next';
import CompatibilityClient from './CompatibilityClient';
import { constructMetadata, constructBreadcrumbSchema, constructToolSchema } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Aquarium Fish Compatibility Checker: Community Tank Mates',
  description: 'Check aquarium fish and plant compatibility. Evaluate water parameters, temperament, minimum tank sizes, and schooling dynamics before adding tank mates.',
  pathname: '/compatibility',
});

export default function CompatibilityPage() {
  const breadcrumbSchema = constructBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/#tools' },
    { name: 'Fish Compatibility', path: '/compatibility' },
  ]);

  const toolSchema = constructToolSchema({
    name: 'Aquarium Fish Compatibility Checker',
    description: 'Interactive tool evaluating species behavior, water parameter overlap, minimum tank sizes, and community tank mate compatibility.',
    path: '/compatibility',
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
      <CompatibilityClient />
    </>
  );
}
