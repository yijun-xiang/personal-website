'use client';
import React, { useState, useRef, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Bot, User, RefreshCw, Trash2, Sparkles, MessageCircle, Zap, Menu, X, AlertCircle } from 'lucide-react';

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
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-500/30 shadow-lg shadow-blue-500/20'
            : 'bg-gray-800/60 text-gray-100 border-gray-700/50 hover:border-gray-600/50'
        }`}
      >
        {message.isUser && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity"></div>
        )}
        
        <div className="flex items-start space-x-2 sm:space-x-3 relative z-10">
          {!message.isUser && (
            <div className="flex-shrink-0 mt-1">
              {message.isLoading ? (
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1.5 sm:p-2 animate-pulse">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              ) : (
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1.5 sm:p-2">
                  <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              )}
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            {message.isLoading ? (
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                </div>
                <span className="text-xs sm:text-sm text-gray-400">AI is thinking...</span>
              </div>
            ) : (
              <div>
                <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">{message.text}</p>
                <p className="text-xs opacity-60 mt-2 flex items-center space-x-1">
                  <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  {message.isUser && <span className="ml-2">✓</span>}
                </p>
              </div>
            )}
          </div>
          
          {message.isUser && (
            <div className="flex-shrink-0 mt-1">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-gray-600 to-gray-700 p-1.5 sm:p-2">
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [messageCount, setMessageCount] = useState<MessageCount>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('messageCount');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Date.now() > parsed.resetTime) {
          const newCount = { count: 0, resetTime: Date.now() + 86400000 };
          localStorage.setItem('messageCount', JSON.stringify(newCount));
          return newCount;
        }
        return parsed;
      }
    }
    return { count: 0, resetTime: Date.now() + 86400000 };
  });
  const [serverRemaining, setServerRemaining] = useState<number | null>(null);
  
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
      return "You've exhausted your daily Yijun wisdom! Come back tomorrow! 🌅";
    } else if (remainingToday <= 5) {
      return `Only ${remainingToday} questions left today! Use them wisely to learn about the legend! 🎯`;
    } else if (remainingToday <= 10) {
      return `${remainingToday} Yijun insights remaining today. Better make them count! 💎`;
    } else {
      return `${remainingToday} questions left today to discover Yijun's greatness! 🚀`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/10 to-gray-900 text-white flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <header className="relative z-20 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/30 shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="group flex items-center space-x-2 sm:space-x-3 text-gray-300 hover:text-white transition-all duration-300">
              <div className="p-1.5 sm:p-2 rounded-lg bg-gray-800/50 group-hover:bg-blue-500/20 transition-all duration-300">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="font-medium text-sm sm:text-base hidden sm:block">Back to Portfolio</span>
              <span className="font-medium text-sm sm:text-base sm:hidden">Back</span>
            </Link>
            
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 justify-center">
              <div className="relative">
                <Bot className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="text-center">
                <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                  AI Assistant
                </h1>
                <p className="text-xs text-gray-400 hidden sm:block">Powered by GPT • Online</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={clearChat}
                className="p-1.5 sm:p-2 text-gray-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-all duration-300 group"
                title="Clear chat"
              >
                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
              </button>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="sm:hidden p-1.5 text-gray-400 hover:text-white hover:bg-gray-500/20 rounded-lg transition-all duration-300"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 sm:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="absolute top-16 right-4 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-700/50 p-4 min-w-[200px] shadow-2xl">
            <div className="space-y-3">
              <button
                onClick={() => {
                  clearChat();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full p-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all"
              >
                <Trash2 className="w-4 h-4" />
                <span className="text-sm">Clear Chat</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-grow max-w-6xl mx-auto w-full px-4 sm:px-6 py-4 sm:py-6 flex flex-col relative z-10">
        <div className={`mb-3 bg-gradient-to-r ${remainingToday <= 5 ? 'from-red-900/30 to-orange-900/30' : remainingToday <= 10 ? 'from-yellow-900/30 to-orange-900/30' : 'from-blue-900/30 to-purple-900/30'} backdrop-blur-sm rounded-lg p-3 border ${remainingToday <= 5 ? 'border-red-700/50' : remainingToday <= 10 ? 'border-yellow-700/50' : 'border-blue-700/50'} flex items-center justify-between`}>
          <div className="flex items-center space-x-2">
            <AlertCircle className={`w-4 h-4 ${remainingToday <= 5 ? 'text-red-400' : remainingToday <= 10 ? 'text-yellow-400' : 'text-blue-400'}`} />
            <span className="text-sm">{getLimitMessage()}</span>
          </div>
          {serverRemaining !== null && (
            <span className="text-xs text-gray-400">({serverRemaining}/hr server limit)</span>
          )}
        </div>

        <div 
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto space-y-4 sm:space-y-6 mb-4 sm:mb-6 min-h-0 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
        >
          {hasMoreAbove && (
            <div className="text-center py-2">
              <span className="text-xs text-gray-500">Showing recent messages</span>
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
          <div className="mb-4 sm:mb-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-500">
            <div className="text-center mb-3 sm:mb-4">
              <p className="text-xs sm:text-sm text-gray-400 mb-3 flex items-center justify-center space-x-2">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Try asking:</span>
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={question.text}
                  onClick={() => handleSuggestionClick(question.text)}
                  className="group p-3 sm:p-4 bg-gray-800/40 hover:bg-gray-700/60 border border-gray-700/50 hover:border-blue-500/50 rounded-xl transition-all duration-300 text-left hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10"
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

        <div className="relative">
          <div className="flex space-x-2 sm:space-x-4 bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={remainingToday > 0 ? "Ask me anything about Yijun..." : "Daily limit reached! Come back tomorrow!"}
                className="w-full bg-transparent border-none outline-none text-white placeholder-gray-400 text-sm resize-none pr-12"
                disabled={isLoading || remainingToday <= 0}
                maxLength={500}
              />
              {characterCount > 0 && (
                <div className="absolute right-1 top-1/2 -translate-y-1/2">
                  <div className={`text-xs ${isOverLimit ? 'text-red-400' : 'text-gray-500'}`}>
                    {characterCount}/500
                  </div>
                </div>
              )}
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading || isOverLimit || remainingToday <= 0}
              className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg disabled:shadow-none hover:shadow-blue-500/25 hover:scale-105 disabled:scale-100"
            >
              <div className="flex items-center space-x-1 sm:space-x-2">
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
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
              <span>Powered by OpenAI GPT</span>
              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ChatbotPage.displayName = 'ChatbotPage';

export default ChatbotPage;