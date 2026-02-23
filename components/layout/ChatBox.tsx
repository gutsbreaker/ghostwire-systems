'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { useRobotStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';

export function ChatBox() {
  const { isChatting, setChatting, setChatMessage } = useRobotStore();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    
    const newMessages = [...messages, { role: 'user' as const, content: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);
    setChatMessage('Transmitting to mainframe...');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      
      const data = await res.json();
      
      if (res.ok && data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
        setChatMessage(data.reply.length > 50 ? "Transmission received." : data.reply);
      } else {
        throw new Error("API failed or API key missing.");
      }
    } catch (err) {
      setTimeout(() => {
        const simulatedResponses = [
          "I am operating in local matrix mode. Ghostwire guarantees 100% uptime even when the cloud API is offline.",
          "Connection to the Groq mainframe is severed. However, my local systems confirm Ghostwire POS is the fastest on the grid.",
          "API Key missing. But don't worry, Ghostwire hardware functions perfectly in offline environments."
        ];
        const randomReply = simulatedResponses[Math.floor(Math.random() * simulatedResponses.length)];
        
        setMessages(prev => [...prev, { role: 'assistant', content: randomReply }]);
        setChatMessage("Offline Mode Active.");
        setIsLoading(false);
      }, 1000);
      return; 
    } 
    
    setIsLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setChatting(!isChatting)}
        style={{ zIndex: 999999 }}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${isChatting ? 'bg-alert-red shadow-neon-red rotate-90' : 'bg-electric-purple shadow-neon-purple hover:scale-110'}`}
      >
        {isChatting ? <X className="w-6 h-6 text-white" /> : <MessageSquare className="w-6 h-6 text-white" />}
      </button>

      <AnimatePresence>
        {isChatting && (
          <motion.div 
            key="chatbox-modal"
            initial={{ opacity: 0, y: 50, scale: 0.9 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-4 left-4 w-auto sm:left-auto sm:right-6 sm:w-96 glass border border-electric-purple/40 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            style={{ zIndex: 999999, height: '500px', pointerEvents: 'auto' }}
          >
            <div className="bg-deep-black/90 border-b border-electric-purple/20 p-4 flex items-center gap-3">
              <div className="p-2 bg-electric-purple/20 rounded-full"><Bot className="w-5 h-5 text-electric-purple" /></div>
              <div>
                <h3 className="font-orbitron text-ghost-white text-sm">Ghostwire Assistant</h3>
                <p className="font-mono text-xs text-neon-green flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></span> Uplink Established</p>
              </div>
            </div>

            <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-deep-black/60">
              {messages.length === 0 && (
                <div className="text-center text-ghost-white/50 font-rajdhani mt-10">Ask me about Ghostwire's features, pricing, or hardware compatibility!</div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] md:max-w-[85%] p-3 rounded-xl font-rajdhani text-sm ${msg.role === 'user' ? 'bg-electric-purple text-white rounded-br-none' : 'glass border border-white/10 text-ghost-white rounded-bl-none'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                   <div className="glass border border-white/10 text-ghost-white p-3 rounded-xl rounded-bl-none flex items-center gap-2">
                     <Loader2 className="w-4 h-4 animate-spin text-electric-purple" />
                     <span className="font-mono text-xs">Processing...</span>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 bg-deep-black/90 border-t border-electric-purple/20">
              <form onSubmit={handleSend} className="flex gap-2">
                <input 
                  type="text" value={input} onChange={(e) => setInput(e.target.value)} disabled={isLoading}
                  placeholder="Transmit message..."
                  className="flex-grow bg-dark-grey border border-white/10 rounded-lg px-3 py-2 text-sm font-rajdhani text-ghost-white focus:outline-none focus:border-electric-purple disabled:opacity-50"
                />
                <button type="submit" disabled={isLoading || !input.trim()} className="p-2 bg-electric-purple text-white rounded-lg hover:bg-electric-purple/80 transition-colors disabled:opacity-50">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}