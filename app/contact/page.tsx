import { constructMetadata, constructBreadcrumbSchema } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import ContactClient from './ContactClient';

export const metadata = constructMetadata({
  title: 'Contact Roshan Aquva World: Support & Questions',
  description: 'Get in touch with the Roshan Aquva World team for questions about fish care sheets, plant guides, water chemistry diagnostics, or atlas feedback.',
  path: '/contact',
});

export default function ContactPage() {
  const breadcrumbSchema = constructBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact Support', url: '/contact' },
  ]);

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Roshan Aquva World',
    description: 'Direct inquiry channel for aquarium hobbyists, fish keepers, and planted tank enthusiasts.',
    url: `${siteConfig.url}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: siteConfig.name,
      email: siteConfig.contactEmail,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <ContactClient />
    </>
  );
}
