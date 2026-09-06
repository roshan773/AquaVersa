import { Metadata } from 'next';
import WaterAnalyzerClient from './WaterAnalyzerClient';
import { constructMetadata, constructBreadcrumbSchema, constructToolSchema } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Aquarium Water Chemistry Analyzer: Parameter Safety Check',
  description: 'Analyze aquarium water parameters. Check ammonia, nitrite, nitrate, pH, and hardness against safe community or species-specific thresholds.',
  pathname: '/water-analyzer',
});

export default function WaterAnalyzerPage() {
  const breadcrumbSchema = constructBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/#tools' },
    { name: 'Water Chemistry Analyzer', path: '/water-analyzer' },
  ]);

  const toolSchema = constructToolSchema({
    name: 'Aquarium Water Chemistry Analyzer',
    description: 'Diagnose liquid reagent test measurements for ammonia, nitrite, nitrate, pH, GH, and KH with action protocols.',
    path: '/water-analyzer',
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
      <WaterAnalyzerClient />
    </>
  );
}
