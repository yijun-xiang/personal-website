'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Construction, FileText, Brain, Sparkles } from 'lucide-react';

const ResearchPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-green-900/10 to-gray-900 text-white transition-all duration-700 ${
      isLoaded ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(34,197,94,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(147,51,234,0.1),transparent_50%)]"></div>
      </div>

      <header className={`relative z-20 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/30 transition-all duration-700 ${
        isLoaded ? 'translate-y-0' : '-translate-y-4'
      }`} style={{ transitionDelay: '100ms' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="relative flex items-center justify-center">
            <Link href="/" className="absolute left-0 group inline-flex items-center space-x-3 text-gray-300 hover:text-white transition-all">
              <div className="relative p-2 rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-700/50 backdrop-blur-xl border border-gray-600/50 group-hover:border-green-500/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-green-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/0 to-blue-600/0 group-hover:from-green-600/20 group-hover:to-blue-600/20 rounded-xl transition-all duration-300"></div>
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </Link>
            
            <div className="text-center">
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-white via-green-300 to-blue-300 bg-clip-text text-transparent animate-gradient">
                Research
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className={`mb-8 relative inline-flex transition-all duration-700 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`} style={{ transitionDelay: '200ms' }}>
            <Construction className="w-24 h-24 text-green-400 animate-pulse" />
            <Sparkles className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
          </div>
          
          <h1 className={`text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-green-300 to-blue-300 bg-clip-text text-transparent mb-6 transition-all duration-700 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`} style={{ transitionDelay: '300ms' }}>
            Coming Soon
          </h1>
          
          <p className={`text-xl text-gray-300 mb-8 leading-relaxed transition-all duration-700 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`} style={{ transitionDelay: '400ms' }}>
            I&apos;m currently working on documenting my research in AI, machine learning, 
            and optimization. Check back soon for papers, projects, and insights!
          </p>
          
          <div className={`flex flex-wrap gap-4 justify-center mb-12 transition-all duration-700 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`} style={{ transitionDelay: '500ms' }}>
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
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`} style={{ transitionDelay: '600ms' }}>
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