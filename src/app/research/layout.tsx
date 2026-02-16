import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Research | Yijun Xiang',
  description: 'Academic publications by Yijun Xiang. Research focus on NLP, Imbalanced Learning, Data Augmentation, Large Language Models, and Algorithmic Fairness.',
  keywords: ['NLP Research', 'Machine Learning', 'Data Augmentation', 'LLM', 'Algorithmic Fairness', 'Educational Measurement'],
  openGraph: {
    title: 'Research | Yijun Xiang',
    description: 'Academic publications by Yijun Xiang on data augmentation, imbalanced learning, and educational measurement.',
    url: 'https://yijunxiang.com/research',
    siteName: 'Yijun Xiang',
    type: 'website',
  },
};

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
