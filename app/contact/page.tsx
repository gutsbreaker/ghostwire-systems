// FILE: app/contact/page.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Terminal, Mail, MapPin, Phone, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'hardware',
    message: ''
  });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmitSuccess, setTransmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
      setIsTransmitting(false);
      setTransmitSuccess(true);
      setFormState({ name: '', email: '', subject: 'hardware', message: '' });
      
      setTimeout(() => setTransmitSuccess(false), 5000);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-deep-black pt-28 pb-20 relative z-10 overflow-hidden">
      
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-electric-purple/5 blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-orbitron text-ghost-white mb-6">
            SECURE <span className="text-glow-purple">COMM-LINK</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl font-rajdhani text-ghost-white/70 max-w-2xl mx-auto">
            Open a direct channel to our deployment architects. We respond to all encrypted transmissions within 24 hours.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
          
          {/* Contact Info / Terminal */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1 space-y-8">
            <div className="glass p-8 rounded-2xl border border-ghost-white/10">
              <h3 className="text-xl font-orbitron text-cyber-cyan mb-6 border-b border-cyber-cyan/20 pb-4">NETWORK NODES</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-neon-green/10 rounded text-neon-green"><Mail className="w-5 h-5" /></div>
                  <div>
                    <p className="font-mono text-sm text-ghost-white/50">ENCRYPTED COMM</p>
                    <p className="font-rajdhani text-lg text-ghost-white break-all">abelidoguts@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cyber-cyan/10 rounded text-cyber-cyan"><Phone className="w-5 h-5" /></div>
                  <div>
                    <p className="font-mono text-sm text-ghost-white/50">VOICE PROTOCOL</p>
                    <p className="font-rajdhani text-lg text-ghost-white">+639533259975</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-electric-purple/10 rounded text-electric-purple"><MapPin className="w-5 h-5" /></div>
                  <div>
                    <p className="font-mono text-sm text-ghost-white/50">HQ SERVER LOCATION</p>
                    <p className="font-rajdhani text-lg text-ghost-white leading-tight">215 Binangonan Rizal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Faux Security Readout */}
            <div className="glass p-6 rounded-2xl border border-alert-red/30 bg-alert-red/5 font-mono text-xs">
              <div className="flex items-center gap-2 text-alert-red mb-4">
                <ShieldAlert className="w-4 h-4" /> <span className="tracking-widest">SYSTEM SECURITY</span>
              </div>
              <p className="text-ghost-white/50 mb-1">&gt; Connection: AES-256 Secured</p>
              <p className="text-ghost-white/50 mb-1">&gt; IP Trace: Masked</p>
              <p className="text-ghost-white/50 mb-1">&gt; Form Integrity: Verified</p>
              <p className="text-neon-green mt-4 animate-pulse">Awaiting transmission...</p>
            </div>
          </motion.div>

          {/* The Form */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 glass p-8 md:p-12 rounded-2xl border border-electric-purple/40 relative">
            
            {transmitSuccess ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-deep-black/90 rounded-2xl border border-neon-green z-20">
                <Terminal className="w-16 h-16 text-neon-green mb-4" />
                <h3 className="text-3xl font-orbitron text-neon-green mb-2">TRANSMISSION SENT</h3>
                <p className="font-mono text-ghost-white/70">Our architects will contact you shortly.</p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-mono text-xs text-electric-purple tracking-wider">OPERATOR NAME</label>
                  <input 
                    type="text" required
                    value={formState.name} onChange={e => setFormState({...formState, name: e.target.value})}
                    className="w-full bg-deep-black/50 border border-white/10 rounded-lg px-4 py-3 font-rajdhani text-ghost-white focus:outline-none focus:border-electric-purple focus:shadow-[0_0_10px_rgba(191,0,255,0.3)] transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono text-xs text-electric-purple tracking-wider">RETURN COMM-LINK (EMAIL)</label>
                  <input 
                    type="email" required
                    value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})}
                    className="w-full bg-deep-black/50 border border-white/10 rounded-lg px-4 py-3 font-rajdhani text-ghost-white focus:outline-none focus:border-electric-purple focus:shadow-[0_0_10px_rgba(191,0,255,0.3)] transition-all"
                    placeholder="name@company.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-xs text-electric-purple tracking-wider">INQUIRY TYPE</label>
                <select 
                  value={formState.subject} onChange={e => setFormState({...formState, subject: e.target.value})}
                  className="w-full bg-deep-black/50 border border-white/10 rounded-lg px-4 py-3 font-rajdhani text-ghost-white focus:outline-none focus:border-electric-purple appearance-none"
                >
                  <option value="hardware">Hardware Bundle Pricing</option>
                  <option value="enterprise">Enterprise Deployment</option>
                  <option value="support">Technical Support</option>
                  <option value="other">Other Transmission</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-xs text-electric-purple tracking-wider">ENCRYPTED MESSAGE</label>
                <textarea 
                  required rows={6}
                  value={formState.message} onChange={e => setFormState({...formState, message: e.target.value})}
                  className="w-full bg-deep-black/50 border border-white/10 rounded-lg px-4 py-3 font-rajdhani text-ghost-white focus:outline-none focus:border-electric-purple focus:shadow-[0_0_10px_rgba(191,0,255,0.3)] transition-all resize-none"
                  placeholder="Detail your operational requirements..."
                ></textarea>
              </div>

              <Button 
                type="submit" 
                variant="neon-purple" 
                size="lg" 
                className="w-full flex justify-center items-center gap-3"
                disabled={isTransmitting}
              >
                {isTransmitting ? (
                  <span className="animate-pulse">UPLOADING DATA PACKETS...</span>
                ) : (
                  <>INITIATE TRANSMISSION <Send className="w-5 h-5" /></>
                )}
              </Button>
            </form>
          </motion.div>

        </div>
      </div>
    </main>
  );
}