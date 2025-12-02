import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm Kunal's AI Assistant. Ask me anything about his skills, projects, or experience!" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    if (isOpen) {
        setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      // Optimistic update for bot message
      setMessages(prev => [...prev, { role: 'model', text: '', isLoading: true }]);

      const stream = await sendMessageToGemini(userMsg);
      
      let fullText = '';
      
      for await (const chunk of stream) {
        fullText += chunk;
        setMessages(prev => {
           const newArr = [...prev];
           const lastMsg = newArr[newArr.length - 1];
           if (lastMsg.role === 'model') {
               lastMsg.text = fullText;
               lastMsg.isLoading = false;
           }
           return newArr;
        });
      }

    } catch (error) {
      setMessages(prev => {
          // Remove the loading message and add error
          const filtered = prev.filter(m => !m.isLoading);
          return [...filtered, { role: 'model', text: "I'm having trouble connecting to the AI brain right now. Please try again later." }];
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-[90vw] md:w-96 h-[500px] rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden mb-4 animate-in slide-in-from-bottom-5 fade-in duration-300">
          
          {/* Header */}
          <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-500 rounded-full">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Kunal's Agent</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Powered by Gemini 2.5
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4 scrollbar-hide">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-slate-800 text-white rounded-br-none' 
                      : 'bg-white border border-gray-200 text-slate-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.isLoading ? (
                      <div className="flex items-center gap-2 text-slate-500">
                          <Loader2 size={14} className="animate-spin" /> Thinking...
                      </div>
                  ) : (
                      msg.text
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask about my projects..."
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-3 px-4 pr-12 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isTyping}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-2 p-1.5 bg-teal-500 text-white rounded-full hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'bg-slate-700' : 'bg-teal-600'} hover:opacity-90 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && <span className="text-sm font-semibold hidden md:block">Ask AI about Kunal</span>}
      </button>
    </div>
  );
};

export default ChatWidget;
