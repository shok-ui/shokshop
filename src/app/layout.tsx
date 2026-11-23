import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShokShop — Premium Tech & Lifestyle Store",
  description:
    "ShokShop is a modern online store for electronics, fashion and home goods. Free shipping over $50, 30-day returns and secure checkout. Built with Next.js, TypeScript, Tailwind CSS and shadcn/ui.",
  keywords: ["ShokShop", "online store", "e-commerce", "Next.js", "React", "TypeScript", "shop"],
  authors: [{ name: "shok-ui" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "ShokShop — Premium Tech & Lifestyle Store",
    description: "Premium tech, fashion and lifestyle essentials, delivered fast.",
    siteName: "ShokShop",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShokShop",
    description: "Premium tech, fashion and lifestyle essentials, delivered fast.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
