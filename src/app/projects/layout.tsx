import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Yijun Xiang',
  description: 'Explore ML systems and AI-powered developer tools built by Yijun Xiang. Featured projects include Image Similarity Search Engine and AI Code Review Assistant.',
  keywords: ['ML Projects', 'AI Projects', 'Image Similarity', 'Code Review', 'FastAPI', 'React', 'TypeScript'],
  openGraph: {
    title: 'Projects | Yijun Xiang',
    description: 'Building production-ready ML systems and AI-powered developer tools.',
    url: 'https://yijunxiang.com/projects',
    siteName: 'Yijun Xiang',
    type: 'website',
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
