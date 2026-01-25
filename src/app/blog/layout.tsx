import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phoenix Token Blog",
  description: "Read about our latest news and information: Updates, insights, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
          {children}
      </body>
    </html>
  );
}
