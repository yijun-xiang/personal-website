'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, Star, Code, Zap, Shield, Gauge, Search, Database, Server, CloudOff, DollarSign } from 'lucide-react';

const ProjectsPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 text-white transition-all duration-700 ${
      isLoaded ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>

      <header className={`relative z-20 transition-all duration-700 ${
        isLoaded ? 'translate-y-0' : '-translate-y-4'
      }`} style={{ transitionDelay: '100ms' }}>
        <div className="max-w-7xl mx-auto px-6 pt-8 pb-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="group inline-flex items-center gap-3 text-gray-400 hover:text-white transition-all duration-300">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-all duration-300">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-300" />
                </div>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-sm font-medium">Back</span>
                <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">Home</span>
              </div>
            </Link>

            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Projects
            </h1>

            <div className="w-10 sm:w-[100px]"></div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent to-purple-400/50 w-16 sm:w-20"></div>
            <p className="text-purple-400 font-semibold tracking-wide uppercase text-sm">Featured Work</p>
            <div className="h-px bg-gradient-to-l from-transparent to-purple-400/50 w-16 sm:w-20"></div>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            Building production-ready ML systems and AI-powered developer tools.
            Each project showcases real-world applications of cutting-edge technologies.
          </p>
          <div className="flex items-center justify-center gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-purple-400">2+</div>
              <div className="text-xs sm:text-sm text-gray-500">Live Projects</div>
            </motion.div>
            <div className="w-px h-10 sm:h-12 bg-gray-700"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-blue-400">10+</div>
              <div className="text-xs sm:text-sm text-gray-500">Technologies</div>
            </motion.div>
            <div className="w-px h-10 sm:h-12 bg-gray-700"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="text-2xl sm:text-3xl font-bold text-green-400">100%</div>
              <div className="text-xs sm:text-sm text-gray-500">Open Source</div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-8"
        >
          {/* Project 1: Image Similarity Search Engine */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="bg-gray-800/60 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/50 shadow-lg shadow-blue-500/20"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-xs px-4 py-1 rounded-full font-semibold flex items-center gap-1">
                <Star className="w-3 h-3" />
                ML/SYSTEMS PROJECT
              </span>
              <span className="bg-amber-500/20 text-amber-400 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
                <CloudOff className="w-3 h-3" />
                HIBERNATING
              </span>
            </div>

            <h2 className="text-3xl font-bold mb-4 text-center">Scalable Image Similarity Search Engine</h2>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6 flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="text-amber-200/90 text-sm">
                <span className="font-semibold">Demo temporarily offline</span> — Turns out AWS bills don&apos;t hibernate,
                but my servers do now. Check out the GitHub repo to run it locally, or wait until I win the lottery.
              </p>
            </div>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              A high-performance system that processes images and searches through millions of images to find
              visually similar matches in real-time. Built with state-of-the-art ML models and distributed
              infrastructure for production-scale deployment.
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
            >
              <motion.div variants={featureVariants} className="flex items-start gap-3">
                <Search className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Visual Search</h3>
                  <p className="text-sm text-gray-400">CLIP-based feature extraction for semantic similarity</p>
                </div>
              </motion.div>

              <motion.div variants={featureVariants} className="flex items-start gap-3">
                <Database className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Vector Database</h3>
                  <p className="text-sm text-gray-400">Qdrant for efficient similarity search at scale</p>
                </div>
              </motion.div>

              <motion.div variants={featureVariants} className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Low Latency</h3>
                  <p className="text-sm text-gray-400">Redis caching layer for sub-second responses</p>
                </div>
              </motion.div>

              <motion.div variants={featureVariants} className="flex items-start gap-3">
                <Server className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Cloud Infrastructure</h3>
                  <p className="text-sm text-gray-400">Auto-scaling on AWS ECS with load balancing</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 mb-8 justify-center"
            >
              {['CLIP', 'React', 'TypeScript', 'Python', 'FastAPI', 'Qdrant', 'Redis', 'AWS ECS', 'Docker'].map((tag) => (
                <motion.span
                  key={tag}
                  variants={tagVariants}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.3)' }}
                  className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                disabled
                className="bg-gray-600/50 px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center gap-2 cursor-not-allowed opacity-60"
              >
                Demo Offline
                <CloudOff className="w-4 h-4" />
              </button>

              <motion.a
                href="https://github.com/yijun-xiang/image-similarity-engine"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center gap-2"
              >
                View on GitHub
                <Github className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>

          {/* Project 2: AI Code Review Assistant */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            className="bg-gray-800/60 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/50 shadow-lg shadow-blue-500/20"
          >
            <div className="flex items-center gap-2 mb-6 justify-center">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-xs px-4 py-1 rounded-full font-semibold flex items-center gap-1">
                <Star className="w-3 h-3" />
                AI/DEVTOOLS PROJECT
              </span>
              <span className="bg-amber-500/20 text-amber-400 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
                <CloudOff className="w-3 h-3" />
                HIBERNATING
              </span>
            </div>

            <h2 className="text-3xl font-bold mb-4 text-center">AI Code Review Assistant</h2>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6 flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="text-amber-200/90 text-sm">
                <span className="font-semibold">Demo temporarily offline</span> — My wallet had a meeting with my AWS bill.
                The wallet lost. Clone the repo and run it locally — it&apos;s free (ish)!
              </p>
            </div>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              An intelligent web application that leverages OpenAI&apos;s GPT models to provide instant,
              comprehensive code reviews. Simply paste your code snippet and receive AI-powered insights
              on bugs, security vulnerabilities, performance optimizations, and best practices.
            </p>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
            >
              <motion.div variants={featureVariants} className="flex items-start gap-3">
                <Code className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Multi-Language Support</h3>
                  <p className="text-sm text-gray-400">Python, JavaScript, TypeScript, Java, Go, Rust, C++</p>
                </div>
              </motion.div>

              <motion.div variants={featureVariants} className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Real-time Analysis</h3>
                  <p className="text-sm text-gray-400">Instant feedback powered by GPT-3.5/4</p>
                </div>
              </motion.div>

              <motion.div variants={featureVariants} className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Security Analysis</h3>
                  <p className="text-sm text-gray-400">Detect vulnerabilities and security issues</p>
                </div>
              </motion.div>

              <motion.div variants={featureVariants} className="flex items-start gap-3">
                <Gauge className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Performance Optimization</h3>
                  <p className="text-sm text-gray-400">Suggestions for better performance</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 mb-8 justify-center"
            >
              {['FastAPI', 'Next.js', 'TypeScript', 'OpenAI', 'AWS ECS', 'Docker'].map((tag) => (
                <motion.span
                  key={tag}
                  variants={tagVariants}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.3)' }}
                  className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                disabled
                className="bg-gray-600/50 px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center gap-2 cursor-not-allowed opacity-60"
              >
                Demo Offline
                <CloudOff className="w-4 h-4" />
              </button>

              <motion.a
                href="https://github.com/yijun-xiang/ai-code-review-assistant"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center gap-2"
              >
                View on GitHub
                <Github className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400">
            More projects coming soon! Follow me on{' '}
            <a
              href="https://github.com/yijun-xiang"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              GitHub
            </a>
            {' '}for updates.
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default ProjectsPage;
