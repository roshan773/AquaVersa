import { plantData } from "@/data/plants";
import PlantsClient from "./PlantsClient";
import { constructMetadata, constructBreadcrumbSchema } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Aquatic Plants Catalog & Aquascaping Guide',
  description: 'Care guides and growth profiles for live freshwater aquarium plants: low-light species, epiphytes, stem plants, and CO2 requirements.',
  path: '/plants',
});

export default function PlantsPage() {
  const breadcrumbSchema = constructBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Botanical Index', url: '/plants' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PlantsClient plantList={plantData} />
    </>
  );
}
