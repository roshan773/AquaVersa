import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Oswald, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import Navbar from "@/components/navbar/Navbar";
import { StatsProvider } from "@/components/home/StatsContext";
import Footer from "@/components/footer/Footer";
import SitePreloader from "@/components/ui/SitePreloader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
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
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", sizes: "64x64", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
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
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/icon.svg?v=4" />
        <link rel="icon" type="image/png" sizes="64x64" href="/icon.png?v=4" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=4" />
        <link rel="shortcut icon" href="/favicon.ico?v=4" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=4" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#27187E" />
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
      <body className={`${inter.variable} ${plusJakarta.variable} ${oswald.variable} ${bebasNeue.variable} font-sans antialiased min-h-screen flex flex-col bg-[#F7F7FF] text-[#27187E] selection:bg-[#27187E] selection:text-[#F7F7FF]`}>
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
