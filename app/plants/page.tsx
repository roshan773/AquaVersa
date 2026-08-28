import { Metadata } from "next";
import { plantData } from "@/data/plants";
import PlantsClient from "./PlantsClient";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Aquarium Plants Care Guide & Planting Library | AquaGuide",
  description: "Detailed care profiles for live aquatic plants. Learn about low-light options, CO2 dosing, planting layouts, and fish compatibility on AquaGuide / AquvaGuide.",
  keywords: [
    "aquaguide plants",
    "live aquarium plants guide",
    "aquvaGuide plants",
    "aquaguide",
    "aquvaGuide",
    "aquascaping plants low light"
  ],
  alternates: {
    canonical: `${siteConfig.siteUrl}/plants`,
  }
};

export default function PlantsPage() {
  return <PlantsClient plantList={plantData} />;
}
