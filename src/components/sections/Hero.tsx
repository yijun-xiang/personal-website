'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Mail, Github, Linkedin, Bot, Globe, ChevronRight } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import BerkeleyLogo from '@/components/ui/BerkeleyLogo';
import ScrambleText from '@/components/ui/ScrambleText';
import { trackEvent } from '@/lib/analytics';

const Hero = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for glow effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  // Progressive entrance animation
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const getAnimClass = () => 
    `transition-all duration-700 ease-out ${
      isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
    }`;
  
  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="card-glow-effect w-full max-w-4xl bg-gray-800/60 backdrop-blur-lg rounded-2xl p-8 md:p-12 z-10 border border-gray-700/50"
    >
      {/* Header with name and social links */}
      <header 
        className={`flex flex-col md:flex-row items-center justify-between mb-8 ${getAnimClass()}`} 
        style={{transitionDelay: '100ms'}}
      >
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent hover:from-blue-200 hover:to-purple-300 transition-all duration-500">
            {personalInfo.name}
          </h1>
          <div className="h-8 mt-2 text-xl md:text-2xl text-blue-300 font-light transition-all duration-500">
            <ScrambleText phrases={personalInfo.languages} />
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-6 md:mt-0">
          <a 
            href={`mailto:${personalInfo.email}`} 
            title="Email" 
            onClick={() => trackEvent.socialClick('email')}
            className="p-3 rounded-full bg-gray-700/30 hover:bg-blue-500/20 transition-all duration-300 border border-gray-600/50 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <Mail className="w-6 h-6 text-gray-300 hover:text-blue-300" />
          </a>
          <a 
            href={personalInfo.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            title="LinkedIn" 
            onClick={() => trackEvent.socialClick('linkedin')}
            className="p-3 rounded-full bg-gray-700/30 hover:bg-blue-500/20 transition-all duration-300 border border-gray-600/50 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <Linkedin className="w-6 h-6 text-gray-300 hover:text-blue-300" />
          </a>
          <a 
            href={personalInfo.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            title="GitHub" 
            onClick={() => trackEvent.socialClick('github')}
            className="p-3 rounded-full bg-gray-700/30 hover:bg-blue-500/20 transition-all duration-300 border border-gray-600/50 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <Github className="w-6 h-6 text-gray-300 hover:text-blue-300" />
          </a>
        </div>
      </header>
      
      {/* Main content */}
      <main>
        <p 
          className={`text-lg text-gray-300 leading-relaxed max-w-3xl ${getAnimClass()}`} 
          style={{transitionDelay: '200ms'}}
        >
          {personalInfo.mission}
        </p>
        
        <div 
          className={`my-8 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent ${getAnimClass()}`} 
          style={{transitionDelay: '300ms'}}
        />
        
        {/* University section */}
        <div 
          className={`flex items-center bg-gray-900/40 backdrop-blur-sm p-4 rounded-lg border border-gray-700/30 ${getAnimClass()}`} 
          style={{transitionDelay: '400ms'}}
        >
          <BerkeleyLogo />
          <div>
            <p className="font-semibold text-white">{personalInfo.university}</p>
            <p className="text-gray-400 text-sm">{personalInfo.degree}</p>
          </div>
        </div>

        {/* Action buttons */}
        <footer className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/chatbot" 
            onClick={() => trackEvent.navigationClick('chatbot')}
            className={`futuristic-button group ${getAnimClass()}`} 
            style={{transitionDelay: '500ms'}}
          >
            <div className='flex items-center'>
              <Bot className="w-6 h-6 mr-4 text-blue-300"/>
              <span className="font-semibold">Chat with my AI assistant</span>
            </div>
            <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300"/>
          </Link>
          <Link 
            href="/map" 
            onClick={() => trackEvent.navigationClick('travel_map')}
            className={`futuristic-button group ${getAnimClass()}`} 
            style={{transitionDelay: '600ms'}}
          >
            <div className='flex items-center'>
              <Globe className="w-6 h-6 mr-4 text-blue-300"/>
              <span className="font-semibold">Explore my travel map</span>
            </div>
            <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300"/>
          </Link>
        </footer>
      </main>
    </div>
  );
};

export default Hero;