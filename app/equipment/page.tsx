import { equipmentData } from "@/data/equipment";
import EquipmentClient from "./EquipmentClient";
import { constructMetadata, constructBreadcrumbSchema } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Aquarium Equipment & Hardware Specifications',
  description: 'Technical guides and maintenance protocols for aquarium filtration, canister filters, LED lighting, heaters, and water test kits.',
  path: '/equipment',
});

export default function EquipmentPage() {
  const breadcrumbSchema = constructBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Equipment Guide', url: '/equipment' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <EquipmentClient eqList={equipmentData} />
    </>
  );
}
