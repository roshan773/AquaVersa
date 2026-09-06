import { Metadata } from 'next';
import EquipmentWizardClient from './EquipmentWizardClient';
import { constructMetadata, constructBreadcrumbSchema, constructToolSchema } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Aquarium Equipment Wizard: Sizing Filters & Heaters for Your Tank',
  description: 'Size aquarium filters, heaters, lighting, and substrate for your tank. Generate hardware recommendations based on tank volume and inhabitants.',
  pathname: '/equipment-wizard',
});

export default function EquipmentWizardPage() {
  const breadcrumbSchema = constructBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/#tools' },
    { name: 'Equipment Wizard', path: '/equipment-wizard' },
  ]);

  const toolSchema = constructToolSchema({
    name: 'Aquarium Equipment Selection Wizard',
    description: 'Hardware sizing calculator matching filtration turnover, heater wattage, and lighting spectrum to aquarium volume and flora.',
    path: '/equipment-wizard',
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
      <EquipmentWizardClient />
    </>
  );
}
