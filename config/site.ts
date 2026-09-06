/**
 * Centralized Site Configuration for Roshan Aquva World
 */
export const siteConfig = {
  name: "Roshan Aquva World",
  fullName: "Roshan Aquva World — The Aquarium Atlas",
  alternateNames: ["Roshan Aquva World", "The Aquarium Atlas", "Roshan Aqua World", "Aquva World"],
  description: "An educational aquarium platform. Discover fish species profiles, plant care, community compatibility, equipment guides, water chemistry, and tank maintenance routines.",
  
  // Production site URL (both siteUrl and url for compatibility)
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://aquaversa.vercel.app",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://aquaversa.vercel.app",
  
  // Direct contact details
  contactEmail: "pakhreroshan@gmail.com",
  
  // Social Media
  socialLinks: {
    twitter: "https://twitter.com/roshanaquvaworld",
    facebook: "https://facebook.com/roshanaquvaworld",
    instagram: "https://instagram.com/roshanaquvaworld",
  },
  
  // Analytics
  analyticsId: process.env.NEXT_PUBLIC_GA_ID || ""
};
