/**
 * Centralized Site Configuration for AquaGuide (formerly AquaVersa)
 * Update this file for production settings (such as real address, domain, etc.)
 */
export const siteConfig = {
  name: "AquaGuide",
  fullName: "AquaGuide - Complete Aquarium & Fish Care Guide",
  alternateNames: ["AquvaGuide", "aquaguide", "aquva guide", "AquaVersa"],
  description: "Your complete aquarium & fish care guide. Discover species parameters, tank compatibility, aquatic plants, and equipment guides to build a thriving ecosystem.",
  
  // Production site URL (can be overwritten via NEXT_PUBLIC_SITE_URL environment variable)
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://aquaversa.vercel.app",
  
  // Contact details
  contactEmail: "pakhreroshan@gmail.com",
  
  // CENTRALIZED PRODUCTION ADDRESS CONFIGURATION:
  // If there is no confirmed real address, keep this placeholder and modify it before publishing.
  contactAddress: {
    street: "123 Ocean Drive, Suite 400",
    city: "Seaside",
    state: "CA",
    zip: "94000",
    full: "123 Ocean Drive, Suite 400, Seaside, CA 94000"
  },
  
  // Social Media Links (No fake placeholders, only clean routes/configs)
  socialLinks: {
    twitter: "https://twitter.com/aquaguide",
    facebook: "https://facebook.com/aquaguide",
    instagram: "https://instagram.com/aquaguide",
  },
  
  // Analytics
  analyticsId: process.env.NEXT_PUBLIC_GA_ID || ""
};
