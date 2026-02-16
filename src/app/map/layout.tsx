import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Travel Map | Yijun Xiang',
  description: 'Explore Yijun Xiang\'s interactive travel map showcasing countries visited around the world.',
  keywords: ['Travel Map', 'World Map', 'Countries Visited', 'Interactive Map'],
  openGraph: {
    title: 'Travel Map | Yijun Xiang',
    description: 'An interactive map of countries Yijun has explored.',
    url: 'https://yijunxiang.com/map',
    siteName: 'Yijun Xiang',
    type: 'website',
  },
};

export default function MapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
