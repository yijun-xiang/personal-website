import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.yijunxiang.com';

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/research`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/map`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/chatbot`, lastModified: new Date(), priority: 0.5 },
  ];
}
