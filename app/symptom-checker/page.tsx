import { Metadata } from 'next';
import SymptomCheckerClient from './SymptomCheckerClient';
import { constructMetadata, constructBreadcrumbSchema, constructToolSchema } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Fish Disease Symptom Checker: Diagnostic & Illness Identifier',
  description: 'Diagnose sick aquarium fish by physical and behavioral symptoms. Identify common diseases like Ich, Velvet, Fin Rot, and Dropsy with treatment protocols.',
  pathname: '/symptom-checker',
});

export default function SymptomCheckerPage() {
  const breadcrumbSchema = constructBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/#tools' },
    { name: 'Symptom Checker', path: '/symptom-checker' },
  ]);

  const toolSchema = constructToolSchema({
    name: 'Aquarium Fish Symptom Checker Tool',
    description: 'Interactive symptom analysis tool matching observed physical indicators and behaviors with educational fish disease profiles and treatments.',
    path: '/symptom-checker',
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
      <SymptomCheckerClient />
    </>
  );
}
