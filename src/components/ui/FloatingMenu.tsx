'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Code, FileText, Plus } from 'lucide-react';
import { usePathname } from 'next/navigation';

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === '/projects' || pathname === '/research' || pathname === '/chatbot' || pathname === '/map') {
    return null;
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div 
        className={`absolute bottom-0 right-0 pb-24 transition-all duration-500 ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className={`space-y-4 transition-all duration-700 ${
          isOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          <Link href="/projects" className={`block group transition-all duration-500 ${
            isOpen ? 'translate-x-0' : 'translate-x-8'
          }`} style={{ transitionDelay: isOpen ? '200ms' : '0ms' }}>
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 blur-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/20 to-purple-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              <div className="relative flex items-center gap-3 px-4 py-3 bg-black/50 backdrop-blur-3xl rounded-2xl border border-purple-500/20 group-hover:border-purple-400/40 transition-all duration-300 min-w-[200px]">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative w-12 h-12 bg-black rounded-xl border border-purple-500/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-blue-600/30 rounded-xl"></div>
                    <Code className="w-6 h-6 text-purple-300 relative z-10" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="font-bold text-base bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent whitespace-nowrap">
                    My Projects
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </Link>

          <Link href="/research" className={`block group transition-all duration-500 ${
            isOpen ? 'translate-x-0' : 'translate-x-8'
          }`} style={{ transitionDelay: isOpen ? '100ms' : '0ms' }}>
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10 blur-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/0 via-green-600/20 to-green-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              <div className="relative flex items-center gap-3 px-4 py-3 bg-black/50 backdrop-blur-3xl rounded-2xl border border-green-500/20 group-hover:border-green-400/40 transition-all duration-300 min-w-[200px]">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-600 blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative w-12 h-12 bg-black rounded-xl border border-green-500/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-600/30 to-emerald-600/30 rounded-xl"></div>
                    <FileText className="w-6 h-6 text-green-300 relative z-10" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="font-bold text-base bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent whitespace-nowrap">
                    My Research
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </Link>
        </div>
      </div>

      <button 
        className="relative group"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
      >
        <div className="absolute -inset-4">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full opacity-20 blur-3xl scale-150 animate-pulse"></div>
        </div>
        
        <div className="relative">
          <div className="w-16 h-16 bg-black rounded-full p-[2px] group-hover:p-[3px] transition-all duration-300">
            <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full p-[2px]">
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-pink-600/30"></div>
                
                <Plus 
                  className={`w-7 h-7 text-white relative z-10 transition-all duration-700 ${
                    isOpen ? 'rotate-180 scale-75 opacity-70' : 'rotate-0 scale-100 opacity-100'
                  }`} 
                />
                
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rotate-0 group-hover:rotate-180 transition-transform duration-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default FloatingMenu;