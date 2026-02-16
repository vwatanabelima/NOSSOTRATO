import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p"
});

export const metadata: Metadata = {
  title: "NOSSO TRATO",
  description: "Gamified Tasks & Rewards for Families",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${pressStart2P.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
