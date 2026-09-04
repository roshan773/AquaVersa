import { Droplets } from "lucide-react";
import WaterParams from "@/components/home/WaterParams";
import MaintenanceSection from "@/components/home/MaintenanceSection";
import SubpageHero from "@/components/ui/SubpageHero";
import GlobalCTA from "@/components/ui/GlobalCTA";

export default function WaterChemistryPage() {
  return (
    <div className="w-full">
      <SubpageHero 
        title="Water Chemistry Guide" 
        description="Master the science of water quality. Learn how to test, balance, and maintain the perfect environment for your aquatic life."
        icon={<Droplets className="w-8 h-8" />}
      />

      <WaterParams showCTA={false} />
      <MaintenanceSection />

      <GlobalCTA
        badge="WATER CHEMISTRY & NITROGEN CYCLE"
        title={
          <>
            Diagnose your test strip <br className="hidden sm:inline" />
            and liquid kit readings now.
          </>
        }
        description="Enter your exact ammonia, nitrite, nitrate, pH, and hardness values to receive instant bio-remediation guidance."
        primaryAction={{
          label: 'Launch Water Analyzer',
          href: '/water-analyzer',
        }}
        secondaryAction={{
          label: 'Species Parameter Database',
          href: '/fish',
        }}
      />
    </div>
  );
}
