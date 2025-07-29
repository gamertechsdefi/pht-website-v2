import type { Metadata } from "next";
import { Space_Grotesk, Orbitron, Fuzzy_Bubbles } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
  variable: "--font-space-grotesk",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-orbitron",
})

const fuzzyBubbles = Fuzzy_Bubbles({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-fuzzy-bubbles",   
})


export const metadata: Metadata = {
  title: "Phoenix Token",
  description: "THE ORDINARY MAN'S TOKEN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${orbitron.variable} ${fuzzyBubbles.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
