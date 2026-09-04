'use client';

import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  variant?: 'full' | 'icon' | 'horizontal' | 'compact';
  theme?: 'dark' | 'light'; // dark = indigo bg / white logo; light = light bg / indigo logo
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
}

export const BrandMark = ({
  size = 40,
  theme = 'light',
  className = '',
}: {
  size?: number;
  theme?: 'dark' | 'light';
  className?: string;
}) => {
  const isDark = theme === 'dark';
  const primaryColor = isDark ? '#F7F7FF' : '#27187E';
  const secondaryColor = isDark ? '#CFCAF5' : '#27187E';
  const accentGlow = isDark ? 'rgba(247, 247, 255, 0.15)' : 'rgba(39, 24, 126, 0.1)';

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          <linearGradient id={`brandGrad-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
          <filter id={`brandShadow-${theme}`} x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={primaryColor} floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Outer Hex-Circular Precision Ring (Atlas Meridian) */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke={isDark ? '#3B28AB' : '#CFCAF5'}
          strokeWidth="2.5"
          strokeDasharray="4 4"
          className="opacity-70"
        />

        {/* Outer Solid Rounded Shield / Badge */}
        <rect
          x="12"
          y="12"
          width="76"
          height="76"
          rx="22"
          fill={isDark ? '#1F1366' : '#EDEAFC'}
          stroke={isDark ? '#3B28AB' : '#CFCAF5'}
          strokeWidth="2"
        />

        {/* Dynamic Dual Aquatic Waves forming an Stylized "A" + "R" Fish Silhouette */}
        {/* Upper Wave & Dorsal Fin */}
        <path
          d="M26 42C33 34 42 32 50 36C58 40 67 36 74 30C70 42 61 47 53 45C45 43 35 47 26 42Z"
          fill={`url(#brandGrad-${theme})`}
        />

        {/* Main Flowing Marine Ribbon (Intertwining Swell) */}
        <path
          d="M24 54C32 46 44 48 51 54C58 60 68 58 76 50C72 63 60 68 50 63C40 58 32 61 24 54Z"
          fill={`url(#brandGrad-${theme})`}
        />

        {/* Lower Keel / Ripple Accent */}
        <path
          d="M32 66C40 62 48 64 54 69C60 74 68 71 72 67C68 74 58 76 52 72C46 68 38 70 32 66Z"
          fill={isDark ? '#CFCAF5' : '#27187E'}
          opacity="0.85"
        />

        {/* Atlas Polaris / Compass Star Node (Signifies Guidance & Precision) */}
        <circle
          cx="70"
          cy="28"
          r="3.5"
          fill={isDark ? '#F7F7FF' : '#27187E'}
        />
        <circle
          cx="70"
          cy="28"
          r="6"
          stroke={isDark ? '#F7F7FF' : '#27187E'}
          strokeWidth="1"
          opacity="0.4"
        />
      </svg>
    </div>
  );
};

export default function BrandLogo({
  variant = 'full',
  theme = 'light',
  size = 'md',
  className = '',
  onClick,
}: BrandLogoProps) {
  const isDark = theme === 'dark';

  const markSizes = {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 56,
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  const subSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
    xl: 'text-sm',
  };

  if (variant === 'icon') {
    return <BrandMark size={markSizes[size]} theme={theme} className={className} />;
  }

  return (
    <Link
      href="/"
      onClick={onClick}
      className={`inline-flex items-center gap-3 group focus:outline-none select-none ${className}`}
      aria-label="Roshan Aquva World — The Aquarium Atlas"
    >
      <BrandMark size={markSizes[size]} theme={theme} />
      
      <div className="flex flex-col text-left">
        <span
          className={`font-display ${titleSizes[size]} tracking-wider leading-none transition-colors ${
            isDark ? 'text-[#F7F7FF] group-hover:text-[#CFCAF5]' : 'text-[#27187E] group-hover:text-[#1B1059]'
          }`}
        >
          ROSHAN AQUVA WORLD
        </span>
        <span
          className={`font-sans font-semibold uppercase tracking-[0.22em] mt-0.5 ${subSizes[size]} ${
            isDark ? 'text-[#CFCAF5]/80' : 'text-[#27187E]/70'
          }`}
        >
          The Aquarium Atlas
        </span>
      </div>
    </Link>
  );
}
