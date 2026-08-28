import { Droplets } from "lucide-react";
import WaterParams from "@/components/home/WaterParams";
import MaintenanceSection from "@/components/home/MaintenanceSection";
import SubpageHero from "@/components/ui/SubpageHero";

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
    </div>
  );
}
