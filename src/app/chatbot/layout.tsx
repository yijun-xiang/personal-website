import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stan AI | Yijun Xiang',
  description: 'Chat with Stan AI - Yijun Xiang\'s legendary AI assistant powered by GPT. Ask anything and get hilariously biased answers!',
  keywords: ['AI Chatbot', 'GPT', 'OpenAI', 'Virtual Assistant', 'Yijun Xiang'],
  openGraph: {
    title: 'Stan AI | Yijun Xiang',
    description: 'Chat with Yijun\'s legendary AI assistant powered by GPT.',
    url: 'https://yijunxiang.com/chatbot',
    siteName: 'Yijun Xiang',
    type: 'website',
  },
};

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
