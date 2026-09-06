import { Metadata } from 'next';
import BudgetCalculatorClient from './BudgetCalculatorClient';
import { constructMetadata, constructBreadcrumbSchema, constructToolSchema } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Aquarium Cost Calculator: Tank Setup & Maintenance Budget',
  description: 'Estimate startup and maintenance costs for an aquarium. Allocate budget across glass tanks, filtration, heaters, lights, substrate, plants, and testing supplies.',
  pathname: '/budget-calculator',
});

export default function BudgetCalculatorPage() {
  const breadcrumbSchema = constructBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/#tools' },
    { name: 'Budget Calculator', path: '/budget-calculator' },
  ]);

  const toolSchema = constructToolSchema({
    name: 'Aquarium Setup Budget Calculator',
    description: 'Financial planning tool to allocate setup capital across glass aquariums, filtration hardware, lighting, substrates, and test kits.',
    path: '/budget-calculator',
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
      <BudgetCalculatorClient />
    </>
  );
}
