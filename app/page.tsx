import HeroSection from "@/components/home/HeroSection";
import EverythingYouNeed from "@/components/home/EverythingYouNeed";
import PopularFish from "@/components/home/PopularFish";
import FishCompatibility from "@/components/home/FishCompatibility";
import EquipmentOverview from "@/components/home/EquipmentOverview";
import EquipmentRecommender from "@/components/home/EquipmentRecommender";
import PlantsSection from "@/components/home/PlantsSection";
import TankSizeGuide from "@/components/home/TankSizeGuide";
import WaterParams from "@/components/home/WaterParams";
import ChecklistSection from "@/components/home/ChecklistSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[#f7f7ff] text-[#27187e]">
      {/* 1. Split Editorial Hero */}
      <HeroSection />

      {/* 2. 2x2 Resource Grid: Everything You Need */}
      <EverythingYouNeed />

      {/* 3. Popular Fish: 4-Column Desktop Grid */}
      <PopularFish />

      {/* 4. Fish Compatibility Checker: Persian Indigo Section */}
      <FishCompatibility />

      {/* 5. Equipment Overview: 3-Card Grid */}
      <EquipmentOverview />

      {/* 6. Equipment Recommender: Interactive 2-Part Setup */}
      <EquipmentRecommender />

      {/* 7. Aquatic Plants Section */}
      <PlantsSection />

      {/* 8. Tank Sizing Guide */}
      <TankSizeGuide />

      {/* 9. Water Chemistry Essentials */}
      <WaterParams />

      {/* 10. Beginner Checklist */}
      <ChecklistSection />
    </div>
  );
}
