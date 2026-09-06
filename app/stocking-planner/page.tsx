import { Metadata } from 'next';
import StockingPlannerClient from './StockingPlannerClient';
import { constructMetadata, constructBreadcrumbSchema, constructToolSchema } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Aquarium Stocking Calculator: Community Tank Bio-Load Planner',
  description: 'Plan community aquarium stocking levels. Calculate biological load, minimum tank volume requirements, filter flow rates, and swimming layer distribution.',
  pathname: '/stocking-planner',
});

export default function StockingPlannerPage() {
  const breadcrumbSchema = constructBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/#tools' },
    { name: 'Stocking Planner', path: '/stocking-planner' },
  ]);

  const toolSchema = constructToolSchema({
    name: 'Community Aquarium Stocking Planner',
    description: 'Calculate aquarium bio-load index, schooling requirements, filtration flow rates, and vertical swim zone occupancy.',
    path: '/stocking-planner',
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
      <StockingPlannerClient />
    </>
  );
}
