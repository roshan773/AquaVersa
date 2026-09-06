import { fishData } from "@/data/fish";
import FishLibraryClient from "./FishLibraryClient";
import { constructMetadata, constructBreadcrumbSchema } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Aquarium Fish Species Index & Care Guide Library',
  description: 'Browse complete profiles for freshwater and marine aquarium species. View minimum tank sizes, pH, temperature, diets, and temperament requirements.',
  path: '/fish',
});

export default function FishPage() {
  const breadcrumbSchema = constructBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Species Atlas', url: '/fish' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FishLibraryClient initialFish={fishData} />
    </>
  );
}
