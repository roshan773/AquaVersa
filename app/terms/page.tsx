import { AlertCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import SubpageHero from "@/components/ui/SubpageHero";
import { constructMetadata, constructBreadcrumbSchema } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Terms & Conditions: Care Guidance Disclaimer',
  description: `Terms of service, educational usage policies, and animal care disclaimers for ${siteConfig.name}.`,
  path: '/terms',
});

export default function TermsPage() {
  const breadcrumbSchema = constructBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Terms & Conditions', url: '/terms' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="w-full bg-[#F7F7FF] text-[#27187E] min-h-screen font-readable">
        <SubpageHero
          badge="LEGAL & CARE DISCLAIMERS"
          title="TERMS & CONDITIONS"
          description={`Guidelines, educational care disclaimers, and terms of service for using ${siteConfig.name}.`}
        />

        <section className="py-12 md:py-16 px-4 md:px-8">
          <div className="container mx-auto max-w-4xl space-y-8 text-left">
            
            {/* Important Educational Disclaimer Alert */}
            <div className="p-6 rounded-3xl bg-[#EDEAFC] border-2 border-[#27187E]/20 text-[#27187E] text-sm md:text-base flex items-start gap-4 shadow-sm">
              <AlertCircle className="w-6 h-6 shrink-0 text-[#27187E] mt-0.5" />
              <div>
                <strong className="block text-[#27187E] font-black mb-1 text-base md:text-lg">Aquarium Husbandry &amp; Animal Care Disclaimer</strong>
                All guidelines, compatibility checks, water chemistry parameters, and tank sizing calculations on {siteConfig.name} are provided solely for general hobbyist educational guidance. Aquarium keepers are responsible for testing their own source water and monitoring their individual livestock. We do not provide veterinary medicine, chemical engineering, or commercial warranties.
              </div>
            </div>

            <div className="bg-white border-2 border-[#27187E]/15 rounded-3xl p-6 md:p-10 shadow-sm space-y-8">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[#27187E] mb-3">1. Acceptance of Terms</h2>
                <p className="text-sm md:text-base text-[#27187E]/80 leading-relaxed font-normal">
                  By accessing and using {siteConfig.name}, you accept and agree to be bound by these Terms &amp; Conditions. If you do not agree with any portion of these terms, please discontinue using this website.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[#27187E] mb-3">2. Educational Purpose &amp; Accuracy Limitations</h2>
                <p className="text-sm md:text-base text-[#27187E]/80 leading-relaxed font-normal">
                  Aquarium husbandry outcomes depend on numerous biological variables including individual animal temperament, local source water chemistry, bacterial colony stability, and daily feeding routines. While we strive to ensure species care profiles reflect accurate hobby standards, parameters may vary for specific wild or captive-bred strains.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[#27187E] mb-3">3. Limitation of Liability</h2>
                <p className="text-sm md:text-base text-[#27187E]/80 leading-relaxed font-normal">
                  {siteConfig.name} and its contributors are not liable for any livestock losses, aquatic plant mortality, water damage, or equipment malfunctions resulting from the use or interpretation of the articles, tools, or checklists published on this platform.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[#27187E] mb-3">4. Intellectual Property</h2>
                <p className="text-sm md:text-base text-[#27187E]/80 leading-relaxed font-normal">
                  The layout, species guides, custom compatibility algorithms, illustrations, and original editorial content on {siteConfig.name} are protected by copyright. You may view and reference information for personal, non-commercial aquarium keeping.
                </p>
              </div>
            </div>

          </div>
        </section>
      </div>
    </>
  );
}
