import { starterGuideSteps } from "@/data/guides";
import StartAquariumClient from "@/components/start-aquarium/StartAquariumClient";
import { constructMetadata, constructBreadcrumbSchema } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export const metadata = constructMetadata({
  title: 'How to Start an Aquarium: Beginner 5-Step Setup Guide',
  description: 'Step-by-step guide to setting up your first freshwater or saltwater tank: tank sizing, equipment installation, nitrogen cycling, stocking, and maintenance.',
  path: '/start-aquarium',
});

export default function StartAquariumPage() {
  const breadcrumbSchema = constructBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'How to Start an Aquarium', url: '/start-aquarium' },
  ]);

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Set Up Your First Aquarium',
    description: 'A 5-step beginner progression for setting up a freshwater or marine aquarium safely.',
    step: starterGuideSteps.map((step, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: step.title,
      text: step.description,
      url: `${siteConfig.url}/start-aquarium#step-${idx + 1}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <StartAquariumClient starterGuideSteps={starterGuideSteps} />
    </>
  );
}
