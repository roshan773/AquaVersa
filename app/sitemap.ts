import { MetadataRoute } from 'next';
import { fishData } from '@/data/fish';
import { plantData } from '@/data/plants';
import { equipmentData } from '@/data/equipment';
import { diseasesData } from '@/data/diseases';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl;
  const now = new Date();

  // Core Pillars & High-Intent Index Pages
  const pillarRoutes = [
    { url: '', priority: 1.0, changeFrequency: 'daily' as const },
    { url: '/fish', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/plants', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/equipment', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/diseases', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/guides', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/food', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/start-aquarium', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/water-params', priority: 0.9, changeFrequency: 'weekly' as const },
  ];

  // Interactive Keeper Tools & Utilities
  const toolRoutes = [
    { url: '/compatibility', priority: 0.85, changeFrequency: 'weekly' as const },
    { url: '/tank-size', priority: 0.85, changeFrequency: 'weekly' as const },
    { url: '/water-analyzer', priority: 0.85, changeFrequency: 'weekly' as const },
    { url: '/stocking-planner', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/fish-finder', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/equipment-wizard', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/budget-calculator', priority: 0.75, changeFrequency: 'weekly' as const },
    { url: '/aquascape-planner', priority: 0.75, changeFrequency: 'weekly' as const },
    { url: '/symptom-checker', priority: 0.85, changeFrequency: 'weekly' as const },
    { url: '/quiz', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/achievements', priority: 0.6, changeFrequency: 'monthly' as const },
  ];

  // Informational & Institutional
  const staticInstitutional = [
    { url: '/about', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  const staticEntries = [...pillarRoutes, ...toolRoutes, ...staticInstitutional].map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Fish Taxonomy Categories
  const fishCategories = ['freshwater', 'saltwater'].map((cat) => ({
    url: `${baseUrl}/fish/${cat}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // Dynamic Species Profiles (27 species)
  const fishRoutes = fishData
    .filter((fish) => fish.slug && fish.category)
    .map((fish) => ({
      url: `${baseUrl}/fish/${fish.category!.toLowerCase()}/${fish.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  // Dynamic Plant Profiles (20 plants)
  const plantRoutes = plantData
    .filter((plant) => plant.slug)
    .map((plant) => ({
      url: `${baseUrl}/plants/${plant.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  // Dynamic Equipment Guides (20 items)
  const equipmentRoutes = equipmentData
    .filter((eq) => eq.slug)
    .map((eq) => ({
      url: `${baseUrl}/equipment/${eq.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    }));

  // Dynamic Disease & Treatment Guides (6 conditions)
  const diseaseRoutes = diseasesData
    .filter((dis) => dis.slug)
    .map((dis) => ({
      url: `${baseUrl}/diseases/${dis.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  return [
    ...staticEntries,
    ...fishCategories,
    ...fishRoutes,
    ...plantRoutes,
    ...equipmentRoutes,
    ...diseaseRoutes,
  ];
}
