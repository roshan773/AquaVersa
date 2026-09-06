import { Metadata } from 'next';
import AquascapePlannerClient from './AquascapePlannerClient';
import { constructMetadata, constructBreadcrumbSchema, constructToolSchema } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Aquascape Visual Planner: Layout & Plant Placement Tool',
  description: 'Plan your aquarium aquascape layout visually. Experiment with hardscape driftwood, rocks, foreground carpets, stem plants, and fish placement.',
  pathname: '/aquascape-planner',
});

export default function AquascapePlannerPage() {
  const breadcrumbSchema = constructBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/#tools' },
    { name: 'Aquascape Planner', path: '/aquascape-planner' },
  ]);

  const toolSchema = constructToolSchema({
    name: 'Aquascape Visual Planner Tool',
    description: 'Visual hardscape and botanical layout designer for planted aquariums and biotope simulations.',
    path: '/aquascape-planner',
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
      <AquascapePlannerClient />
    </>
  );
}
