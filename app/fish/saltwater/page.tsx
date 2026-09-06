import { fishData } from "@/data/fish";
import SaltwaterClient from "./SaltwaterClient";
import { constructMetadata, constructBreadcrumbSchema } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Saltwater Marine Fish Species & Care Profiles',
  description: 'Care guides for marine aquarium fish including clownfish, tangs, gobies, and cardinalfish. Learn salinity, tank size, and reef compatibility.',
  path: '/fish/saltwater',
});

export default function SaltwaterPage() {
  const saltwaterFish = fishData.filter(f => f.category?.toLowerCase() === "saltwater");
  const breadcrumbSchema = constructBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Species Atlas', url: '/fish' },
    { name: 'Saltwater Fish', url: '/fish/saltwater' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SaltwaterClient saltwaterFish={saltwaterFish} />
    </>
  );
}
