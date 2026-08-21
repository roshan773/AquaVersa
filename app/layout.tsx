import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "AquaVersa - Build an Aquarium That Thrives | Interactive Aquarium Planner",
  description: "Evolve your hobby with AquaVersa. Plan stocking compatible fish, calculate equipment, design custom planted setups, analyze water chemistry parameters, and unlock progress achievements.",
  keywords: [
    "AquaVersa",
    "aquaversa",
    "aquaVersa",
    "AquaVersa Aquarium",
    "aquaversa.vercel.app",
    "Aquarium Planner",
    "Fish Compatibility Builder",
    "Stocking Calculator",
    "Aquascape Canvas Builder",
    "Water parameter analyzer"
  ],
  authors: [{ name: "AquaVersa Team" }],
  openGraph: {
    title: "AquaVersa - Build an Aquarium That Thrives",
    description: "Discover compatible fish, plants, and equipment specs. Plan your setups visually using the Interactive Aquarium Toolkit.",
    url: "https://aquaversa.vercel.app",
    siteName: "AquaVersa",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AquaVersa - Interactive Aquarium Toolkit",
    description: "Plan your fish, plants, equipment, and water parameter checks on a frontend-only platform.",
  },
  alternates: {
    canonical: "https://aquaversa.vercel.app",
  }
};

import Navbar from "@/components/navbar/Navbar";
import { StatsProvider } from '@/components/home/StatsContext';
import Footer from "@/components/footer/Footer";
import SitePreloader from "@/components/ui/SitePreloader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5e9" />
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
              "name": "AquaVersa",
              "alternateName": ["aquaVersa", "Aqua Versa"],
              "url": "https://aquaversa.vercel.app/",
              "description": "Interactive toolkit for aquarists including compatibility check builders, volume calculators, and water parameters diagnostics.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://aquaversa.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased min-h-screen flex flex-col`}>
          <SitePreloader />
          <Navbar />
          <StatsProvider>
            <main className="flex-grow">
              {children}
            </main>
          </StatsProvider>
          <Footer />
        </body>
      </html>
  );
}
