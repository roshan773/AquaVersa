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
  title: "AquaGuide - Build an Aquarium That Thrives",
  description: "Discover the right fish, equipment, and plants to create a healthy aquarium.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased min-h-screen flex flex-col`}>
        {/* Navbar will go here */}
        <main className="flex-grow">
          {children}
        </main>
        {/* Footer will go here */}
      </body>
    </html>
  );
}
