import type { Metadata } from "next";
import { Space_Grotesk, Cascadia_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
  variable: "--font-space-grotesk",

});

const cascadiaMono = Cascadia_Mono({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
  variable: "--font-cascadia-mono",
});


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
        className={`${cascadiaMono.variable} ${spaceGrotesk.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
