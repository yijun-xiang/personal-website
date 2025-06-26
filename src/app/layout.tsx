import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { GA_TRACKING_ID } from "@/lib/analytics";
import FloatingMenu from "@/components/ui/FloatingMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yijun Xiang's Portfolio",
  description: "AI Developer & Researcher - Building intelligent systems to solve human-centric problems",
  keywords: ["AI", "Machine Learning", "Software Engineer", "UC Berkeley", "Computer Science"],
  authors: [{ name: "Yijun Xiang" }],
  openGraph: {
    title: "Yijun Xiang's Portfolio",
    description: "AI Developer & Researcher specializing in intelligent systems and human-centric AI solutions",
    url: "https://yijunxiang.com",
    siteName: "Yijun Xiang Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yijun Xiang's Portfolio",
    description: "AI Developer & Researcher - Building intelligent systems to solve human-centric problems",
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