'use client';
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Construction, FileText, Brain, Sparkles } from 'lucide-react';

const ResearchPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900/10 to-gray-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(34,197,94,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(147,51,234,0.1),transparent_50%)]"></div>
      </div>

      <header className="relative z-20 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Link href="/" className="group inline-flex items-center space-x-3 text-gray-300 hover:text-white transition-all">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>
      </header>

      <main className="relative z-10 min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8 relative inline-flex">
            <Construction className="w-24 h-24 text-green-400 animate-pulse" />
            <Sparkles className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-green-300 to-blue-300 bg-clip-text text-transparent mb-6">
            Research Page Coming Soon
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            I&apos;m currently working on documenting my research in AI, machine learning, 
            and optimization. Check back soon for papers, projects, and insights!
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur rounded-lg border border-gray-700/50">
              <Brain className="w-5 h-5 text-purple-400" />
              <span className="text-gray-300">Neural Networks</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur rounded-lg border border-gray-700/50">
              <FileText className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">LLM Optimization</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur rounded-lg border border-gray-700/50">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-300">AI Applications</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-gray-700/50 backdrop-blur rounded-lg border border-gray-600/50 hover:bg-gray-700/70 transition-all inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Link>
            
            <a
              href="https://scholar.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg hover:scale-105 transition-all inline-flex items-center justify-center gap-2"
            >
              Visit Google Scholar
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResearchPage;