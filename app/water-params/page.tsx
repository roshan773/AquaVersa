import { Droplets } from "lucide-react";
import WaterParams from "@/components/home/WaterParams";
import MaintenanceSection from "@/components/home/MaintenanceSection";
import SubpageHero from "@/components/ui/SubpageHero";
import GlobalCTA from "@/components/ui/GlobalCTA";
import CareDisclaimer from "@/components/ui/CareDisclaimer";

export default function WaterChemistryPage() {
  return (
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
  );
}
