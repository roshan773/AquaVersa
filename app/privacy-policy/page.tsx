import { siteConfig } from "@/config/site";
import SubpageHero from "@/components/ui/SubpageHero";
import { constructMetadata, constructBreadcrumbSchema } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Privacy Policy & Data Protection',
  description: `Privacy policy, cookie management, and data protection practices for ${siteConfig.name}.`,
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  const breadcrumbSchema = constructBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Privacy Policy', url: '/privacy-policy' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="w-full bg-[#F7F7FF] text-[#27187E] min-h-screen font-readable">
        <SubpageHero
          badge="LEGAL & DATA GOVERNANCE"
          title="PRIVACY POLICY"
          description={`Learn how we collect, use, and protect information when you visit and use ${siteConfig.name}.`}
        />

        <section className="py-12 md:py-16 px-4 md:px-8">
          <div className="container mx-auto max-w-4xl space-y-8 text-left">
            
            <div className="p-6 rounded-3xl bg-white border-2 border-[#27187E]/15 text-sm md:text-base shadow-sm">
              <p className="text-[#27187E]/80">
                <strong className="text-[#27187E] block mb-1 font-bold">Effective & Last Updated:</strong>
                September 2026
              </p>
            </div>

            <div className="bg-white border-2 border-[#27187E]/15 rounded-3xl p-6 md:p-10 shadow-sm space-y-8">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[#27187E] mb-3">1. Overview & Commitment</h2>
                <p className="text-sm md:text-base text-[#27187E]/80 leading-relaxed font-normal">
                  {siteConfig.name} is an educational knowledge platform and digital field guide built to help aquarium keepers make informed choices about aquatic care. We believe in data minimization: we only collect information necessary to respond to your inquiries and ensure the website operates smoothly.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[#27187E] mb-3">2. Information We Collect</h2>
                <ul className="list-disc pl-6 space-y-3 text-sm md:text-base text-[#27187E]/80 leading-relaxed">
                  <li>
                    <strong className="text-[#27187E]">Contact Form Submissions:</strong> When you submit a message through our Contact page, you voluntarily provide your name, email address, message, and optional phone number. These messages are securely transmitted via our form-processing service to our email inbox.
                  </li>
                  <li>
                    <strong className="text-[#27187E]">Local Browser Storage:</strong> We use client-side local storage (<code className="px-2 py-0.5 rounded bg-[#EDEAFC] text-[#27187E] font-bold">localStorage</code>) to store your preferences, such as achievement unlocks, quiz scores, or setup checklist progress. This data remains on your device and is never transmitted to external servers.
                  </li>
                  <li>
                    <strong className="text-[#27187E]">Website Analytics (Opt-In):</strong> If you choose to accept analytics cookies on our cookie banner, anonymized aggregate telemetry may be processed through Google Analytics to understand popular care topics. If you decline, tracking is disabled.
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[#27187E] mb-3">3. How We Use Information</h2>
                <p className="text-sm md:text-base text-[#27187E]/80 leading-relaxed font-normal mb-3">
                  Information provided to {siteConfig.name} is used strictly to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-[#27187E]/80 leading-relaxed">
                  <li>Respond to support questions, feedback, and data correction requests.</li>
                  <li>Maintain site uptime, security, and performance.</li>
                  <li>Analyze aggregated reader trends to improve species care documentation.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[#27187E] mb-3">4. Third-Party Services</h2>
                <p className="text-sm md:text-base text-[#27187E]/80 leading-relaxed font-normal">
                  We do not sell, rent, or monetize your personal information. Third-party providers (such as hosting and contact dispatch services) only process data strictly as required to deliver platform functionality.
                </p>
              </div>

              <div>
                <h2 className="text-xl md:text-2xl font-bold text-[#27187E] mb-3">5. Contact Information</h2>
                <p className="text-sm md:text-base text-[#27187E]/80 leading-relaxed font-normal">
                  If you have questions regarding this Privacy Policy or wish to request removal of prior email correspondence, contact us directly at: <a href={`mailto:${siteConfig.contactEmail}`} className="text-[#27187E] font-bold underline">{siteConfig.contactEmail}</a>.
                </p>
              </div>
            </div>

          </div>
        </section>
      </div>
    </>
  );
}
