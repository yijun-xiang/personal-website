'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Star, Code, Zap, Shield, Gauge, Search, Database, Server } from 'lucide-react';

const ProjectsPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 text-white transition-all duration-700 ${
      isLoaded ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>

      <header className={`relative z-20 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/30 transition-all duration-700 ${
        isLoaded ? 'translate-y-0' : '-translate-y-4'
      }`} style={{ transitionDelay: '100ms' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Link href="/" className="group inline-flex items-center space-x-3 text-gray-300 hover:text-white transition-all">
            <div className="relative p-2 rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-700/50 backdrop-blur-xl border border-gray-600/50 group-hover:border-purple-500/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/20 group-hover:to-blue-600/20 rounded-xl transition-all duration-300"></div>
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="font-medium group-hover:text-purple-300 transition-colors duration-300">Back to Home</span>
          </Link>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`} style={{ transitionDelay: '200ms' }}>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-300 to-blue-300 bg-clip-text text-transparent mb-4 leading-tight pt-2">
            My Projects
          </h1>
          <p className="text-xl text-gray-400">Building ML systems and AI-powered developer tools</p>
        </div>

        <div className="space-y-8">
          <div className={`bg-gray-800/60 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/50 shadow-lg shadow-blue-500/20 transition-all duration-700 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '300ms' }}>
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-xs px-4 py-1 rounded-full font-semibold flex items-center gap-1">
                <Star className="w-3 h-3" />
                ML/SYSTEMS PROJECT
              </span>
              <span className="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full font-medium">
                LIVE
              </span>
            </div>

            <h2 className="text-3xl font-bold mb-4">Scalable Image Similarity Search Engine</h2>
            
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              A high-performance system that processes images and searches through millions of images to find 
              visually similar matches in real-time. Built with state-of-the-art ML models and distributed 
              infrastructure for production-scale deployment.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <Search className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Visual Search</h3>
                  <p className="text-sm text-gray-400">CLIP-based feature extraction for semantic similarity</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Database className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Vector Database</h3>
                  <p className="text-sm text-gray-400">Qdrant for efficient similarity search at scale</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Low Latency</h3>
                  <p className="text-sm text-gray-400">Redis caching layer for sub-second responses</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Server className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Cloud Infrastructure</h3>
                  <p className="text-sm text-gray-400">Auto-scaling on AWS ECS with load balancing</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm">CLIP</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm">React</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm">TypeScript</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm">Python</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm">FastAPI</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm">Qdrant</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm">Redis</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm">AWS ECS</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm">Docker</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://image-search.yijunxiang.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 rounded-lg font-medium hover:scale-105 transition-all inline-flex items-center justify-center gap-2"
              >
                Visit Live Demo
                <ExternalLink className="w-4 h-4" />
              </a>
              
              <a
                href="https://github.com/yijun-xiang/image-similarity-engine"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700/50 border border-gray-600/50 px-6 py-3 rounded-lg font-medium hover:bg-gray-700/70 transition-all inline-flex items-center justify-center gap-2"
              >
                View on GitHub
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className={`bg-gray-800/60 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/50 shadow-lg shadow-blue-500/20 transition-all duration-700 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '400ms' }}>
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-xs px-4 py-1 rounded-full font-semibold flex items-center gap-1">
                <Star className="w-3 h-3" />
                AI/DEVTOOLS PROJECT
              </span>
              <span className="bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full font-medium">
                LIVE
              </span>
            </div>

            <h2 className="text-3xl font-bold mb-4">AI Code Review Assistant</h2>
            
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              An intelligent web application that leverages OpenAI&apos;s GPT models to provide instant, 
              comprehensive code reviews. Simply paste your code snippet and receive AI-powered insights 
              on bugs, security vulnerabilities, performance optimizations, and best practices.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <Code className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Multi-Language Support</h3>
                  <p className="text-sm text-gray-400">Python, JavaScript, TypeScript, Java, Go, Rust, C++</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Real-time Analysis</h3>
                  <p className="text-sm text-gray-400">Instant feedback powered by GPT-3.5/4</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Security Analysis</h3>
                  <p className="text-sm text-gray-400">Detect vulnerabilities and security issues</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Gauge className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Performance Optimization</h3>
                  <p className="text-sm text-gray-400">Suggestions for better performance</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm">FastAPI</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm">Next.js</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm">TypeScript</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm">OpenAI</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm">AWS ECS</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm">Docker</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://code.yijunxiang.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 rounded-lg font-medium hover:scale-105 transition-all inline-flex items-center justify-center gap-2"
              >
                Visit Live Demo
                <ExternalLink className="w-4 h-4" />
              </a>
              
              <a
                href="https://github.com/yijun-xiang/ai-code-review-assistant"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700/50 border border-gray-600/50 px-6 py-3 rounded-lg font-medium hover:bg-gray-700/70 transition-all inline-flex items-center justify-center gap-2"
              >
                View on GitHub
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className={`mt-12 text-center transition-all duration-700 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`} style={{ transitionDelay: '500ms' }}>
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
        </div>
      </main>
    </div>
  );
};

export default ProjectsPage;