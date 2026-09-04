import HeroSection from "@/components/home/HeroSection";
import EverythingYouNeed from "@/components/home/EverythingYouNeed";
import PopularFish from "@/components/home/PopularFish";
import FishCompatibility from "@/components/home/FishCompatibility";
import EquipmentOverview from "@/components/home/EquipmentOverview";
import EquipmentRecommender from "@/components/home/EquipmentRecommender";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[#f7f7ff] text-[#27187e]">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Everything You Need (2x2 Resource Grid) */}
      <EverythingYouNeed />

      {/* 3. Popular Fish (4-Column Grid) */}
      <PopularFish />

      {/* 4. Fish Compatibility Checker (Dark Indigo Section) */}
      <FishCompatibility />

      {/* 5. Equipment Overview (3-Column Grid) */}
      <EquipmentOverview />

      {/* 6. Equipment Recommender (Centered Recommendation Tool) */}
      <EquipmentRecommender />
    </div>
  );
}
