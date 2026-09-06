import { Metadata } from 'next';
import TankSizeClient from './TankSizeClient';
import { constructMetadata, constructBreadcrumbSchema, constructToolSchema } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Aquarium Tank Size & Volume Calculator: Gallons & Dimensions',
  description: 'Calculate aquarium water volume in gallons and liters from tank dimensions. Estimate filled tank weight, substrate requirements, and heater flow rates.',
  pathname: '/tank-size',
});

export default function TankSizePage() {
  const breadcrumbSchema = constructBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/#tools' },
    { name: 'Tank Size Calculator', path: '/tank-size' },
  ]);

  const toolSchema = constructToolSchema({
    name: 'Aquarium Tank Size & Volume Calculator',
    description: 'Calculate aquarium water volume, glass filled weight, substrate volume, and filtration flow rates from custom dimensions.',
    path: '/tank-size',
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
      <TankSizeClient />
    </>
  );
}
