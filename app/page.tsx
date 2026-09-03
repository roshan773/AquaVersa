import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Droplets, Waves, CheckCircle2, AlertTriangle, Leaf, Settings } from "lucide-react";
import BuildEcosystem from "@/components/home/BuildEcosystem";

import HeroSection from "@/components/home/HeroSection";
import MarqueeTicker from "@/components/home/MarqueeTicker";
import StatsStrip from "@/components/home/StatsStrip";
import JourneySelector from "@/components/home/JourneySelector";
import FirstAquariumTimeline from "@/components/home/FirstAquariumTimeline";
import AquariumTypes from "@/components/home/AquariumTypes";
import ExploreFishSection from "@/components/home/ExploreFishSection";
import FeaturedFish from "@/components/home/FeaturedFish";
import FishCompatibility from "@/components/home/FishCompatibility";
import EquipmentSection from "@/components/home/EquipmentSection";
import EquipmentGuide from "@/components/home/EquipmentGuide";
import PlantsSection from "@/components/home/PlantsSection";
import FishPlantCompatibility from "@/components/home/FishPlantCompatibility";
import TankSizeGuide from "@/components/home/TankSizeGuide";
import WaterParams from "@/components/home/WaterParams";
import ChecklistSection from "@/components/home/ChecklistSection";
import MaintenanceSection from "@/components/home/MaintenanceSection";
import MistakesSection from "@/components/home/MistakesSection";
import MythsSection from "@/components/home/MythsSection";
import QuickQuestions from "@/components/home/QuickQuestions";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <MarqueeTicker />
      <StatsStrip />
      
      <JourneySelector />
      <FirstAquariumTimeline />
      <AquariumTypes />
      
      <ExploreFishSection />
      <FeaturedFish />
      <FishCompatibility />
      
      <EquipmentSection />
      <EquipmentGuide />

      <PlantsSection />
      <FishPlantCompatibility />

      <TankSizeGuide />
      <WaterParams />
      
      <ChecklistSection />
      <MaintenanceSection />
      <MistakesSection />
      <MythsSection />

      <QuickQuestions />
      <FinalCTA />
    </div>
  );
}
