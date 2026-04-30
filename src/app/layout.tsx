import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Topo | Premium Aluminum Windows & Doors",
  description: "Exquisite aluminum window and door solutions for modern living. Established in 2016.",
  metadataBase: new URL("https://topo-ecommerce.vercel.app"),
  openGraph: {
    title: "Topo | Premium Aluminum Windows & Doors",
    description: "Exquisite aluminum window and door solutions for modern living.",
    images: ["/assets/images/topo_logo.png"],
  },
  icons: {
    icon: "/assets/images/topo_logo.png",
    apple: "/assets/images/topo_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-x-hidden`}
    >
      <head>
        <link rel="preload" href="/assets/images/topo_logo.png" as="image" />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
