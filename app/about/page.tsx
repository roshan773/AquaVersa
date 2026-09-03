import { Metadata } from "next";
import AboutUsClient from "./AboutUsClient";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `About Us | Aquarium Science Mission | ${siteConfig.name}`,
  description: `Learn about the mission of ${siteConfig.name}. We aim to clarify aquarium biology and water chemistry for keepers worldwide.`,
  keywords: [
    "about roshan aquva world",
    "roshan aquva world mission",
    "roshan aquva world story",
    "roshan aquva world",
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
