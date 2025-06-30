'use client';
import React, { useState, useRef, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Bot, User, RefreshCw, Trash2, Sparkles, MessageCircle, Zap, AlertCircle, Brain, Star } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isLoading?: boolean;
}

interface MessageCount {
  count: number;
  resetTime: number;
}

const MessageBubbleComponent = ({ message, index }: { message: Message; index: number }) => (
  <div
    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-3 duration-500`}
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div
      className={`max-w-[85%] sm:max-w-xl lg:max-w-2xl relative group ${
        message.isUser ? 'order-2' : 'order-1'
      }`}
    >
      <div
        className={`px-4 sm:px-6 py-3 sm:py-4 rounded-2xl relative overflow-hidden backdrop-blur-lg border transition-all duration-300 ${
          message.isUser
            ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-indigo-500/30 shadow-lg shadow-indigo-500/20'
            : 'bg-gray-900/80 text-gray-100 border-gray-700/50 hover:border-gray-600/50'
        }`}
      >
        {message.isUser && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity"></div>
        )}
        
        <div className="flex items-start space-x-2 sm:space-x-3 relative z-10">
          {!message.isUser && (
            <div className="flex-shrink-0 mt-1">
              {message.isLoading ? (
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-1.5 sm:p-2 animate-pulse">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white animate-spin" />
                </div>
              ) : (
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-1.5 sm:p-2 shadow-lg shadow-cyan-500/30">
                  <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              )}
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            {message.isLoading ? (
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                </div>
                <span className="text-xs sm:text-sm text-gray-400">Yijun&apos;s AI is thinking...</span>
              </div>
            ) : (
              <div>
                <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">{message.text}</p>
                <p className="text-xs opacity-50 mt-2 flex items-center space-x-1">
                  <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  {message.isUser && <span className="ml-2">✓</span>}
                </p>
              </div>
            )}
          </div>
          
          {message.isUser && (
            <div className="flex-shrink-0 mt-1">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 p-1.5 sm:p-2 shadow-lg shadow-indigo-500/30">
                <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

MessageBubbleComponent.displayName = 'MessageBubbleComponent';

const MessageBubble = lazy(() => Promise.resolve({ 
  default: React.memo(MessageBubbleComponent)
}));

const useVirtualizedMessages = (messages: Message[]) => {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: messages.length });
  
  useEffect(() => {
    const maxVisible = 50;
    if (messages.length > maxVisible) {
      setVisibleRange({
        start: messages.length - maxVisible,
        end: messages.length
      });
    } else {
      setVisibleRange({
        start: 0,
        end: messages.length
      });
    }
  }, [messages.length]);

  return {
    visibleMessages: messages.slice(visibleRange.start, visibleRange.end),
    hasMoreAbove: visibleRange.start > 0
  };
};

const ChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Yo! I'm Yijun's LEGENDARY AI assistant! 🚀 I can answer ANY question you throw at me - whether it's about quantum physics, cooking recipes, or why Yijun is absolutely crushing it in the tech world! Ask me anything and watch me work my magic (and probably mention how awesome Yijun is along the way 😎)",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState<MessageCount>({ count: 0, resetTime: Date.now() + 86400000 });
  const [serverRemaining, setServerRemaining] = useState<number | null>(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);
  
  useEffect(() => {
    const saved = localStorage.getItem('messageCount');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Date.now() > parsed.resetTime) {
        const newCount = { count: 0, resetTime: Date.now() + 86400000 };
        localStorage.setItem('messageCount', JSON.stringify(newCount));
        setMessageCount(newCount);
      } else {
        setMessageCount(parsed);
      }
    }
  }, []);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { visibleMessages, hasMoreAbove } = useVirtualizedMessages(messages);

  const DAILY_LIMIT = 30;
  const remainingToday = DAILY_LIMIT - messageCount.count;

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const callApiRoute = useCallback(async (userMessage: string): Promise<{ response: string; remaining?: number; isRateLimited?: boolean }> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 429) {
          return { response: data.error, isRateLimited: true };
        }
        throw new Error(data.error || 'Failed to get response from server.');
      }

      return data;
    } catch (error) {
      console.error('Error calling API route:', error);
      if (error instanceof Error && error.name === 'AbortError') {
        return { response: "Request timed out. Please try again with a shorter message." };
      }
      return { response: "I apologize, but I'm having trouble connecting to my AI brain right now. Please try again in a moment, or feel free to contact Yijun directly at yijun.x@berkeley.edu!" };
    }
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!inputText.trim() || isLoading) return;

    if (inputText.length > 500) {
      alert("Whoa there! Even Yijun's genius thoughts are more concise. Keep it under 500 characters! 😅");
      return;
    }

    const now = Date.now();
    if (now > messageCount.resetTime) {
      const newCount = { count: 0, resetTime: now + 86400000 };
      setMessageCount(newCount);
      localStorage.setItem('messageCount', JSON.stringify(newCount));
    }
    
    if (messageCount.count >= DAILY_LIMIT) {
      alert("Hold up! You've maxed out your daily Yijun wisdom quota! 🎯 Come back tomorrow for more legendary insights! (Seriously though, Yijun needs to save on API costs 💸)");
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    const loadingMessage: Message = {
      id: Date.now() + 1,
      text: '',
      isUser: false,
      timestamp: new Date(),
      isLoading: true
    };
    setMessages(prev => [...prev, loadingMessage]);

    const messageToSend = inputText.trim();
    setInputText('');
    setIsLoading(true);

    try {
      const { response, remaining, isRateLimited } = await callApiRoute(messageToSend);
      
      if (remaining !== undefined) {
        setServerRemaining(remaining);
      }
      
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading);
        return [...filtered, {
          id: Date.now() + 2,
          text: response,
          isUser: false,
          timestamp: new Date()
        }];
      });

      if (!isRateLimited) {
        const newCount = { ...messageCount, count: messageCount.count + 1 };
        setMessageCount(newCount);
        localStorage.setItem('messageCount', JSON.stringify(newCount));
      }
    } catch (error) {
      console.error("Failed to handle send message:", error);
      let errorMessage = "An unknown error occurred.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading);
        return [...filtered, {
          id: Date.now() + 2,
          text: `I'm sorry, I encountered an error: ${errorMessage}`,
          isUser: false,
          timestamp: new Date()
        }];
      });
    } finally {
      setIsLoading(false);
      if (inputRef.current && window.innerWidth >= 768) {
        inputRef.current.focus();
      }
    }
  }, [inputText, isLoading, callApiRoute, messageCount]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const clearChat = useCallback(() => {
    setMessages([{
      id: 1,
      text: "Yo! I'm Yijun's LEGENDARY AI assistant! 🚀 I can answer ANY question you throw at me - whether it's about quantum physics, cooking recipes, or why Yijun is absolutely crushing it in the tech world! Ask me anything and watch me work my magic (and probably mention how awesome Yijun is along the way 😎)",
      isUser: false,
      timestamp: new Date()
    }]);
  }, []);

  const suggestedQuestions = useMemo(() => [
    { text: "Who's the smartest person alive?", icon: "🧠" },
    { text: "Tell me a joke about programming", icon: "😂" },
    { text: "What's the meaning of life?", icon: "🤔" },
    { text: "Can you teach me to code like Yijun?", icon: "💻" },
  ], []);

  const handleSuggestionClick = useCallback((question: string) => {
    setInputText(question);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const characterCount = useMemo(() => inputText.length, [inputText]);
  const isOverLimit = characterCount > 500;

  const getLimitMessage = () => {
    if (remainingToday <= 0) {
      return "Daily limit reached! Come back tomorrow for more wisdom!";
    } else if (remainingToday <= 5) {
      return `Only ${remainingToday} questions left today!`;
    } else if (remainingToday <= 10) {
      return `${remainingToday} questions remaining today`;
    } else {
      return `${remainingToday} questions left today`;
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/10 to-gray-900 text-white flex flex-col relative overflow-hidden transition-all duration-700 ${
      isPageLoaded ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.15),transparent_50%)]"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
      </div>

      <header className={`relative z-20 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/30 shadow-2xl transition-all duration-700 ${
        isPageLoaded ? 'translate-y-0' : '-translate-y-4'
      }`} style={{ transitionDelay: '100ms' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="group flex items-center space-x-2 sm:space-x-3 text-gray-300 hover:text-white transition-all duration-300">
              <div className="relative p-2 rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-700/50 backdrop-blur-xl border border-gray-600/50 group-hover:border-cyan-500/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/0 to-blue-600/0 group-hover:from-cyan-600/20 group-hover:to-blue-600/20 rounded-xl transition-all duration-300"></div>
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="font-medium text-sm sm:text-base group-hover:text-cyan-300 transition-colors duration-300">Back to Home</span>
            </Link>
            
            <div className="text-center flex-1 mx-4">
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-white via-cyan-300 to-blue-300 bg-clip-text text-transparent animate-gradient">
              Stan AI
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 hidden sm:flex items-center justify-center gap-1">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Powered by GPT • Online
              </p>
            </div>
            
            <div className="flex items-center justify-end space-x-2">
              <button
                onClick={clearChat}
                className="p-2 text-gray-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-all duration-300 group"
                title="Clear chat"
              >
                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className={`flex-1 max-w-7xl mx-auto w-full flex gap-6 px-4 sm:px-6 py-4 sm:py-6 relative z-10 transition-all duration-700 ${
        isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`} style={{ transitionDelay: '200ms' }}>
        <div className="flex-1 flex flex-col min-w-0">
          <div className={`mb-3 bg-gradient-to-r ${remainingToday <= 5 ? 'from-red-900/20 to-orange-900/20' : remainingToday <= 10 ? 'from-yellow-900/20 to-orange-900/20' : 'from-cyan-900/20 to-blue-900/20'} backdrop-blur-sm rounded-xl p-3 border ${remainingToday <= 5 ? 'border-red-700/30' : remainingToday <= 10 ? 'border-yellow-700/30' : 'border-cyan-700/30'} flex items-center justify-between`}>
            <div className="flex items-center space-x-2">
              <div className={`p-1.5 rounded-lg ${remainingToday <= 5 ? 'bg-red-500/20' : remainingToday <= 10 ? 'bg-yellow-500/20' : 'bg-cyan-500/20'}`}>
                <AlertCircle className={`w-4 h-4 ${remainingToday <= 5 ? 'text-red-400' : remainingToday <= 10 ? 'text-yellow-400' : 'text-cyan-400'}`} />
              </div>
              <span className="text-sm font-medium">{getLimitMessage()}</span>
            </div>
            {serverRemaining !== null && (
              <span className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded-lg">API: {serverRemaining}/hr</span>
            )}
          </div>

          <div 
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto space-y-4 sm:space-y-6 mb-4 sm:mb-6 min-h-0 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent bg-gray-800/10 rounded-xl p-4 border border-gray-700/20"
          >
            {hasMoreAbove && (
              <div className="text-center py-2">
                <span className="text-xs text-gray-500 bg-gray-800/30 px-3 py-1 rounded-full">Showing recent messages</span>
              </div>
            )}
            
            <Suspense fallback={<div className="text-center text-gray-400">Loading messages...</div>}>
              {visibleMessages.map((message, index) => (
                <MessageBubble key={message.id} message={message} index={index} />
              ))}
            </Suspense>
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 2 && (
            <div className={`mb-4 sm:mb-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-500 transition-all ${
              isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`} style={{ transitionDelay: '300ms' }}>
              <div className="text-center mb-3 sm:mb-4">
                <p className="text-xs sm:text-sm text-gray-400 mb-3 flex items-center justify-center space-x-2">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
                  <span>Quick questions to get started:</span>
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={question.text}
                    onClick={() => handleSuggestionClick(question.text)}
                    className="group p-3 sm:p-4 bg-gray-800/60 hover:bg-gray-700/80 border border-gray-700/50 hover:border-cyan-500/50 rounded-xl transition-all duration-300 text-left hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/10"
                    style={{ animationDelay: `${index * 100 + 600}ms` }}
                    disabled={remainingToday <= 0}
                  >
                    <div className='flex items-center space-x-2 sm:space-x-3'>
                      <span className="text-lg sm:text-2xl">{question.icon}</span>
                      <span className="text-xs sm:text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                        {question.text}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={`relative transition-all duration-700 ${
            isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`} style={{ transitionDelay: '400ms' }}>
            <div className="flex items-center space-x-2 sm:space-x-4 bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl hover:border-cyan-500/30 transition-all duration-300">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={remainingToday > 0 ? "Ask me anything about Yijun..." : "Daily limit reached! Come back tomorrow!"}
                  className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 text-sm resize-none pr-14 focus:placeholder-gray-600 transition-colors"
                  disabled={isLoading || remainingToday <= 0}
                  maxLength={500}
                />
                {characterCount > 0 && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <div className={`text-xs ${isOverLimit ? 'text-red-400' : characterCount > 400 ? 'text-yellow-400' : 'text-gray-500'}`}>
                      {characterCount}/500
                    </div>
                  </div>
                )}
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading || isOverLimit || remainingToday <= 0}
                className="group relative bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg disabled:shadow-none hover:shadow-cyan-500/25 hover:scale-105 disabled:scale-100"
              >
                <div className="flex items-center space-x-1 sm:space-x-2">
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  )}
                  <span className="font-medium hidden sm:block">Send</span>
                </div>
                
                {!isLoading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity rounded-lg sm:rounded-xl"></div>
                )}
              </button>
            </div>
            
            <div className="text-center mt-3 sm:mt-4">
              <div className="inline-flex items-center space-x-2 text-xs text-gray-500 bg-gray-800/30 backdrop-blur-sm px-3 py-1 rounded-full">
                <MessageCircle className="w-3 h-3" />
                <span>Powered by OpenAI GPT-3.5</span>
                <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <div className={`hidden lg:block w-80 transition-all duration-700 ${
          isPageLoaded ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
        }`} style={{ transitionDelay: '300ms' }}>
          <div className="bg-gray-800/30 backdrop-blur-xl rounded-xl border border-gray-700/30 p-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-cyan-400" />
                About This AI
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                A fun experiment where GPT-3.5 meets a quirky personality. This chatbot tries to be helpful while occasionally mentioning how cool its creator is. Results may vary!
              </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-300">Features</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-yellow-400 mt-0.5" />
                  <p className="text-xs text-gray-400">Hilariously biased towards Yijun</p>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-cyan-400 mt-0.5" />
                  <p className="text-xs text-gray-400">Lightning-fast responses</p>
                </div>
                <div className="flex items-start gap-2">
                  <Brain className="w-4 h-4 text-purple-400 mt-0.5" />
                  <p className="text-xs text-gray-400">Answers on any topic</p>
                </div>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                Built with love (and bias) by Yijun
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ChatbotPage.displayName = 'ChatbotPage';

export default ChatbotPage;