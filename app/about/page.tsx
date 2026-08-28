import { Metadata } from "next";
import AboutUsClient from "./AboutUsClient";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About Us | Aquarium Science Mission | AquaGuide",
  description: "Learn about the mission of AquaGuide / AquvaGuide. We aim to clarify aquarium biology and water chemistry for keepers worldwide.",
  keywords: [
    "about aquaguide",
    "aquaguide mission",
    "aquvaGuide story",
    "aquaguide",
    "aquvaGuide"
  ],
  alternates: {
    canonical: `${siteConfig.siteUrl}/about`,
  }
};

export default function AboutPage() {
  return <AboutUsClient />;
}
