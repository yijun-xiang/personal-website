# Personal Portfolio Website

A modern, high-performance personal portfolio website built with Next.js 15, featuring AI integration, interactive 3D graphics, and a comprehensive showcase of projects and skills.

![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=flat-square&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.10-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 🌟 Live Demo

Visit the live website: [yijunxiang.com](https://yijunxiang.com)

## ✨ Key Features

### 🤖 AI-Powered Chatbot
- Custom GPT-3.5 powered assistant with personality
- Real-time conversation with rate limiting
- Context-aware responses about the portfolio owner
- Elegant chat interface with message history

### 🗺️ Interactive Travel Map
- Visual representation of visited countries (23+ countries)
- Interactive globe visualization using React Simple Maps
- Responsive design with mobile-optimized controls
- Country highlighting and selection features

### 🚀 Project Showcase
- Live demo links for featured projects
- Detailed technical specifications
- Technology stack visualization
- GitHub integration

### 🎨 3D Graphics & Animations
- Three.js powered animated background
- Particle wave effects and shooting stars
- Performance-optimized WebGL rendering
- Smooth transitions and micro-interactions

### 📊 Analytics & Performance
- Google Analytics integration
- Core Web Vitals optimization
- Lazy loading for images and components
- Code splitting and dynamic imports

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15.3.4 (App Router)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 4.1.10
- **3D Graphics:** Three.js + React Three Fiber
- **State Management:** React Hooks
- **Animation:** Custom CSS animations + Framer Motion concepts

### Backend & Services
- **AI Integration:** OpenAI API (GPT-3.5)
- **Database:** Supabase (ready for integration)
- **Analytics:** Google Analytics 4
- **Deployment:** Vercel
- **CDN:** Cloudflare

### Development Tools
- **Package Manager:** npm/yarn/pnpm
- **Linting:** ESLint with Next.js config
- **Build Tool:** Turbopack (development)
- **Version Control:** Git

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- npm/yarn/pnpm package manager
- OpenAI API key (for chatbot functionality)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yijun-xiang/personal-website.git
cd personal-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory:
```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=your_ga_measurement_id

# Supabase Configuration (optional)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
personal-website/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── api/               # API routes
│   │   │   └── chat/          # OpenAI chat endpoint
│   │   ├── chatbot/           # AI chatbot page
│   │   ├── map/               # Interactive travel map
│   │   ├── projects/          # Projects showcase
│   │   ├── research/          # Research page (WIP)
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── analytics/         # Google Analytics
│   │   ├── canvas/            # Three.js 3D components
│   │   ├── sections/          # Page sections
│   │   └── ui/                # UI components
│   └── lib/                   # Utility functions
│       ├── analytics.ts       # Analytics helpers
│       ├── data.ts           # Static data
│       └── performance.ts     # Performance hooks
├── public/                    # Static assets
├── .env.local                # Environment variables
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── package.json              # Project dependencies
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for chatbot | Yes (for chatbot) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics Measurement ID | No |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | No |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | No |

### Customization

1. **Personal Information**: Edit `src/lib/data.ts` to update personal details
2. **Styling**: Modify Tailwind configuration in `tailwind.config.ts`
3. **3D Effects**: Customize Three.js components in `src/components/canvas/`
4. **Analytics**: Configure tracking events in `src/lib/analytics.ts`

## 📈 Performance Optimization

- **Image Optimization**: Using Next.js Image component with lazy loading
- **Code Splitting**: Dynamic imports for heavy components
- **Caching**: Implemented browser caching strategies
- **Bundle Size**: Optimized with tree shaking and minification
- **3D Performance**: GPU-accelerated rendering with LOD optimization

### Performance Metrics
- Lighthouse Score: 95+ (Performance)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Configure environment variables in Vercel dashboard
4. Deploy with one click

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Docker Deployment

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Run build test
npm run build
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style Guidelines

- Follow the existing code style
- Use TypeScript for all new components
- Write meaningful commit messages
- Add appropriate comments for complex logic
- Ensure no TypeScript errors before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Vercel](https://vercel.com/) - Hosting and deployment
- [Three.js](https://threejs.org/) - 3D graphics library
- [OpenAI](https://openai.com/) - AI integration
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## 📞 Contact

Yijun Xiang - [yijun.x@berkeley.edu](mailto:yijun.x@berkeley.edu)

Project Link: [https://github.com/yijun-xiang/personal-website](https://github.com/yijun-xiang/personal-website)

---

<p align="center">Made with ❤️ by Yijun Xiang</p>