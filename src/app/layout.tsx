import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { GA_TRACKING_ID } from "@/lib/analytics";
import FloatingMenu from "@/components/ui/FloatingMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yijun Xiang",
  description: "AI Developer & Researcher - Building intelligent systems to solve human-centric problems",
  keywords: ["AI", "Machine Learning", "Software Engineer", "UC Berkeley", "Computer Science"],
  authors: [{ name: "Yijun Xiang" }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: "Yijun Xiang",
    description: "AI Developer & Researcher specializing in intelligent systems and human-centric AI solutions",
    url: "https://yijunxiang.com",
    siteName: "Yijun Xiang",
    type: "website",
    images: [
      {
        url: '/og-avatar.png',
        width: 512,
        height: 512,
        alt: 'Yijun Xiang',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {GA_TRACKING_ID && <GoogleAnalytics gaId={GA_TRACKING_ID} />}
        
        {children}
        
        <FloatingMenu />
      </body>
    </html>
  );
}