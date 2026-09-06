import { fishData } from "@/data/fish";
import FreshwaterClient from "./FreshwaterClient";
import { constructMetadata, constructBreadcrumbSchema } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Freshwater Fish Species & Care Profiles',
  description: 'Care guides and compatibility profiles for freshwater aquarium fish including tetras, bettas, cichlids, guppies, rasboras, and catfish.',
  path: '/fish/freshwater',
});

export default function FreshwaterPage() {
  const freshwaterFish = fishData.filter(f => f.category?.toLowerCase() === "freshwater");
  const breadcrumbSchema = constructBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Species Atlas', url: '/fish' },
    { name: 'Freshwater Fish', url: '/fish/freshwater' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FreshwaterClient freshwaterFish={freshwaterFish} />
    </>
  );
}
