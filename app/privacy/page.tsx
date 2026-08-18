import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="w-full">
      <section className="py-24 bg-slate-900 text-slate-100 border-b border-slate-800">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 mb-6 border border-cyan-500/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-slate-300">
            How we handle and protect your data at AquaVersa.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl prose dark:prose-invert">
          <h2>1. Information We Collect</h2>
          <p>
            At AquaVersa, we prioritize your privacy. We only collect the minimal amount of data necessary to provide you with the best aquarium guidance. This may include your IP address for analytics purposes and any information you voluntarily submit through our contact forms.
          </p>
          
          <h2>2. How We Use Your Data</h2>
          <p>
            The information we collect is strictly used to improve the content and functionality of our website. We do not sell, trade, or rent your personal identification information to others.
          </p>

          <h2>3. Cookies</h2>
          <p>
            We use "cookies" to enhance your user experience. Your web browser places cookies on your hard drive for record-keeping purposes and sometimes to track information about them. You may choose to set your web browser to refuse cookies, or to alert you when cookies are being sent.
          </p>

          <h2>4. Third-Party Websites</h2>
          <p>
            Users may find content on our site that links to the sites and services of our partners, suppliers, advertisers, sponsors, licensors, and other third parties. We do not control the content or links that appear on these sites and are not responsible for the practices employed by websites linked to or from our Site.
          </p>
          
          <h2>5. Contacting Us</h2>
          <p>
            If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us.
          </p>
          <p className="text-sm text-muted-foreground mt-8">Last updated: August 2026</p>
        </div>
      </section>
    </div>
  );
}
