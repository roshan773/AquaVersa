import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: siteConfig.fullName,
  description: siteConfig.description,
  keywords: [
    "Roshan Aquva World",
    "roshan aquva world",
    "Roshan Aqua World",
    "roshan aqua world",
    "Aquva World",
    "aquva world",
    "AquaGuide",
    "aquaguide",
    "AquvaGuide",
    "AquaVersa",
    "Aquarium Planner",
    "Fish Compatibility Builder",
    "Stocking Calculator",
    "Aquascape Canvas Builder",
    "Water parameter analyzer"
  ],
  authors: [{ name: "Roshan Aquva World Team" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: siteConfig.fullName,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteConfig.siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Roshan Aquva World - Aquarium & Fish Care Guide",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.fullName,
    description: siteConfig.description,
    images: [`${siteConfig.siteUrl}/og-image.png`],
  },
  alternates: {
    canonical: siteConfig.siteUrl,
  }
};

import Navbar from "@/components/navbar/Navbar";
import { StatsProvider } from '@/components/home/StatsContext';
import Footer from "@/components/footer/Footer";
import SitePreloader from "@/components/ui/SitePreloader";
import CookieBanner from "@/components/ui/CookieBanner";
import StickyMobileCTA from "@/components/ui/StickyMobileCTA";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1b4d3e" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
              }
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function(err) {
                    console.log('Service worker registration failed:', err);
                  });
                });
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": siteConfig.name,
              "alternateName": siteConfig.alternateNames,
              "url": `${siteConfig.siteUrl}/`,
              "description": siteConfig.description,
              "potentialAction": {
                "@type": "SearchAction",
                "target": `${siteConfig.siteUrl}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased min-h-screen flex flex-col`}>
          <SitePreloader />
          <Navbar />
          <StatsProvider>
            <main className="flex-grow">
              {children}
            </main>
          </StatsProvider>
          <CookieBanner />
          <StickyMobileCTA />
          <Footer />
        </body>
      </html>
  );
}
