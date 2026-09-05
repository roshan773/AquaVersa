/**
 * Centralized Site Configuration for Roshan Aquva World
 */
export const siteConfig = {
  name: "Roshan Aquva World",
  fullName: "Roshan Aquva World — Aquarium & Fish Care Guide",
  alternateNames: ["Roshan Aquva World", "Roshan Aqua World", "Aquva World"],
  description: "A comprehensive, educational aquarium platform. Discover fish species requirements, plant care, community compatibility, equipment guides, water chemistry, and tank maintenance routines.",
  
  // Production site URL
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://aquaversa.vercel.app",
  
  // Direct contact details
  contactEmail: "pakhreroshan@gmail.com",
  
  // Web3Forms Access Key for contact form submissions
  web3FormsAccessKey: "2d7e12ea-1240-4d9f-acbe-db75c3fbbae2",
  
  // Social Media
  socialLinks: {
    twitter: "https://twitter.com/roshanaquvaworld",
    facebook: "https://facebook.com/roshanaquvaworld",
    instagram: "https://instagram.com/roshanaquvaworld",
  },
  
  // Analytics
  analyticsId: process.env.NEXT_PUBLIC_GA_ID || ""
};
