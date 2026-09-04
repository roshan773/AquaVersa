'use client';

import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

// 1. HOME: Atlas Horizon & Ocean Swell
export const IconHomeAtlas = ({ className = 'w-5 h-5', size }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z" />
    <path d="M7 16c2-1.5 4-1.5 5 0s3 1.5 5 0" />
    <circle cx="12" cy="9" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

// 2. FISH LIBRARY: Editorial Sculpted Marine Fish
export const IconFishAtlas = ({ className = 'w-5 h-5', size }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    {/* Streamlined Fish Body & Caudal Fin */}
    <path d="M2.5 12c3.5-5.5 10.5-7.5 15.5-3.5 1.5 1.2 2.5 2.5 3.5 3.5-1 1-2 2.3-3.5 3.5-5 4-12 2-15.5-3.5z" />
    <path d="M18 8.5L22 4.5v15l-4-4" />
    {/* Dorsal Fin */}
    <path d="M9 6.5C11.5 4 14 5 15 6" />
    {/* Gill line & Eye */}
    <path d="M14 9.5c.5 1.5.5 3.5 0 5" />
    <circle cx="6.5" cy="11.5" r="1.25" fill="currentColor" stroke="none" />
  </svg>
);

// 3. AQUARIUM PLANTS: Botanical Aquascape Frond & Veins
export const IconPlantsAtlas = ({ className = 'w-5 h-5', size }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    {/* Central Stem */}
    <path d="M12 21V3" />
    {/* Right Upper Leaf */}
    <path d="M12 7c4.5-3 8-1 8 4-4.5 2-7.5 0-8-4z" />
    {/* Left Mid Leaf */}
    <path d="M12 12c-4.5-3-8-1-8 4 4.5 2 7.5 0 8-4z" />
    {/* Right Lower Leaf */}
    <path d="M12 16c3.5-2 6.5-.5 6.5 3-3.5 1.5-6 0-6.5-3z" />
  </svg>
);

// 4. EQUIPMENT ARCHIVE: Hardware Filter, Flow Turbine & Gear
export const IconEquipmentAtlas = ({ className = 'w-5 h-5', size }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <rect x="5" y="3" width="14" height="18" rx="3" />
    <path d="M9 7h6" />
    <path d="M9 11h6" />
    <circle cx="12" cy="16" r="2" />
    <path d="M12 14v-1M12 19v-1M10 16H9M15 16h-1" />
  </svg>
);

// 5. CARE GUIDES: Systematic Dossier Journal & Ribbon
export const IconGuidesAtlas = ({ className = 'w-5 h-5', size }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <path d="M9 6h7" />
    <path d="M9 10h5" />
    <path d="M12 2v6l2.5-1.5L17 8V2" />
  </svg>
);

// 6. AQUARIUM TOOLS: Precision Navigation Compass & Matrix
export const IconToolsAtlas = ({ className = 'w-5 h-5', size }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <circle cx="12" cy="12" r="9" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" fillOpacity="0.15" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

// 7. ABOUT ATLAS: Scientific Discovery Crest
export const IconAboutAtlas = ({ className = 'w-5 h-5', size }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <circle cx="12" cy="12" r="9" />
    <ellipse cx="12" cy="12" rx="4" ry="9" />
    <path d="M3 12h18" />
  </svg>
);

// 8. CONTACT: Editorial Airmail Wave
export const IconContactAtlas = ({ className = 'w-5 h-5', size }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <polyline points="3 7 12 13 21 7" />
  </svg>
);
