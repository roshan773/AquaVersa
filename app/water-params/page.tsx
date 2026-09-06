import { Droplets } from "lucide-react";
import WaterParams from "@/components/home/WaterParams";
import MaintenanceSection from "@/components/home/MaintenanceSection";
import SubpageHero from "@/components/ui/SubpageHero";
import GlobalCTA from "@/components/ui/GlobalCTA";
import CareDisclaimer from "@/components/ui/CareDisclaimer";
import { constructMetadata, constructBreadcrumbSchema } from '@/lib/seo';
import { siteConfig } from '@/config/site';

export const metadata = constructMetadata({
  title: 'Aquarium Water Chemistry & Nitrogen Cycle Guide',
  description: 'Understand safe parameters for ammonia, nitrite, nitrate, pH, and KH/GH. Learn nitrogen cycle chemistry and water maintenance schedules.',
  path: '/water-params',
});

export default function WaterChemistryPage() {
  const breadcrumbSchema = constructBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Water Parameters Guide', url: '/water-params' },
  ]);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Aquarium Water Chemistry & Nitrogen Cycle Guide',
    description: 'A comprehensive educational guide to understanding ammonia, nitrite, nitrate, pH, and carbonate hardness in home aquariums.',
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/water-params`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="w-full bg-[#f7f7ff]">
        <SubpageHero 
          title="Water Chemistry Guide" 
          description="Understand the fundamental principles of aquatic water quality. Learn how to test, balance, and maintain stable conditions for your aquarium ecosystem."
          icon={<Droplets className="w-8 h-8" />}
        />

        <WaterParams showCTA={false} />
        <MaintenanceSection />

        <div className="site-container pb-12">
          <CareDisclaimer />
        </div>

        <GlobalCTA
          badge="WATER CHEMISTRY & NITROGEN CYCLE"
          title={
            <>
              Diagnose your test strip <br className="hidden sm:inline" />
              and liquid kit readings now.
            </>
          }
          description="Enter your measured ammonia, nitrite, nitrate, pH, and hardness values to receive educational parameter guidance and corrective recommendations."
          primaryAction={{
            label: 'Launch Water Analyzer',
            href: '/water-analyzer',
          }}
          secondaryAction={{
            label: 'Species Care Library',
            href: '/fish',
          }}
        />
      </div>
    </>
  );
}
