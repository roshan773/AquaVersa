import { Scale } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="w-full">
      <section className="py-24 bg-slate-900 text-slate-100 border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 mb-6 border border-cyan-500/30">
            <Scale className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">Terms of Service</h1>
          <p className="text-lg text-slate-300">
            The rules and guidelines for using the AquaGuide platform.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl prose dark:prose-invert">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using AquaGuide, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
          
          <h2>2. Educational Purposes Only</h2>
          <p>
            All information provided on AquaGuide is for educational and informational purposes only. While we strive to provide accurate, up-to-date guidance on aquarium keeping, variables such as local water chemistry and individual fish temperament mean we cannot guarantee specific outcomes.
          </p>

          <h2>3. User Conduct</h2>
          <p>
            You agree to use our site only for lawful purposes. You agree not to take any action that might compromise the security of the site, render the site inaccessible to others or otherwise cause damage to the site or the content.
          </p>

          <h2>4. Intellectual Property</h2>
          <p>
            The content, organization, graphics, design, compilation, and other matters related to the Site are protected under applicable copyrights, trademarks, and other proprietary rights. The copying, redistribution, use, or publication by you of any such matters or any part of the Site is strictly prohibited.
          </p>
          
          <h2>5. Modification of Terms</h2>
          <p>
            We reserve the right to change these conditions from time to time as we see fit and your continued use of the site will signify your acceptance of any adjustment to these terms.
          </p>
          <p className="text-sm text-muted-foreground mt-8">Last updated: August 2026</p>
        </div>
      </section>
    </div>
  );
}
