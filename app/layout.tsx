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
  title: "AquaVersa - Build an Aquarium That Thrives",
  description: "Discover the right fish, equipment, and plants to create a healthy aquarium.",
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
