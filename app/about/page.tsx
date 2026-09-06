import { constructMetadata, constructBreadcrumbSchema } from '@/lib/seo';
import AboutUsClient from "./AboutUsClient";

export const metadata = constructMetadata({
  title: 'About Roshan Aquva World: Our Fishkeeping Mission',
  description: 'Learn about the mission and editorial methodology of Roshan Aquva World. We provide structured species care guides, water chemistry tools, and stocking models.',
  path: '/about',
});

export default function AboutPage() {
  const breadcrumbSchema = constructBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About Us', url: '/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutUsClient />
    </>
  );
}
