import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.siteUrl;
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/search', '/not-found'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
