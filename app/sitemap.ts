import { MetadataRoute } from 'next';
import { fishData } from '@/data/fish';
import { plantData } from '@/data/plants';
import { equipmentData } from '@/data/equipment';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aquaversa.vercel.app';

  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/compatibility',
    '/tank-size',
    '/water-params',
    '/fish',
    '/plants',
    '/equipment',
    '/diseases',
    '/start-aquarium',
    '/food',
    '/privacy',
    '/terms',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const fishCategories = ['freshwater', 'saltwater'].map(cat => ({
    url: `${baseUrl}/fish/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const fishRoutes = fishData
    .filter(fish => fish.slug && fish.category)
    .map(fish => ({
      url: `${baseUrl}/fish/${fish.category!.toLowerCase()}/${fish.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

  const plantRoutes = plantData
    .filter(plant => plant.slug)
    .map(plant => ({
      url: `${baseUrl}/plants/${plant.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

  const equipmentRoutes = equipmentData
    .filter(eq => eq.slug)
    .map(eq => ({
      url: `${baseUrl}/equipment/${eq.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

  return [
    ...staticRoutes,
    ...fishCategories,
    ...fishRoutes,
    ...plantRoutes,
    ...equipmentRoutes,
  ];
}
