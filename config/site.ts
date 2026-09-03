/**
 * Centralized Site Configuration for Roshan Aquva World
 * Update this file for production settings (such as real address, domain, etc.)
 */
export const siteConfig = {
  name: "Roshan Aquva World",
  fullName: "Roshan Aquva World - Complete Aquarium & Fish Care Guide",
  alternateNames: ["Roshan Aquva World", "Roshan Aqua World", "Aquva World", "AquvaGuide", "AquaGuide", "AquaVersa", "aqva versa"],
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
    twitter: "https://twitter.com/roshanaquvaworld",
    facebook: "https://facebook.com/roshanaquvaworld",
    instagram: "https://instagram.com/roshanaquvaworld",
  },
  
  // Analytics
  analyticsId: process.env.NEXT_PUBLIC_GA_ID || ""
};
