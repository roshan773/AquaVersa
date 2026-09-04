import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import Navbar from "@/components/navbar/Navbar";
import { StatsProvider } from "@/components/home/StatsContext";
import Footer from "@/components/footer/Footer";
import SitePreloader from "@/components/ui/SitePreloader";
import CookieBanner from "@/components/ui/CookieBanner";
import StickyMobileCTA from "@/components/ui/StickyMobileCTA";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.fullName,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Roshan Aquva World",
    "Aquarium Care Guide",
    "Fish Compatibility",
    "Aquarium Plants",
    "Freshwater Fish Care",
    "Saltwater Fish Care",
    "Aquarium Nitrogen Cycle",
    "Aquarium Maintenance",
    "Fish Species Database",
    "Tank Size Guide",
    "Water Chemistry"
  ],
  authors: [{ name: "Roshan Aquva World" }],
  creator: "Roshan Aquva World",
  publisher: "Roshan Aquva World",
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
        alt: "Roshan Aquva World — Aquarium & Fish Care Guide",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#030712" />
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
      <body className={`${plusJakarta.variable} ${outfit.variable} font-sans antialiased min-h-screen flex flex-col bg-[#030712] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200`}>
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
