'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Key, Terminal, Download, LogOut, Loader2, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/lib/store';

export default function PortalPage() {
  const { isAuthenticated, user, licenses, login, logout, addLicense } = useAuthStore();
  
  // Auth Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  // Dashboard State
  const [isGenerating, setIsGenerating] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) login(name, email);
  };

  const handlePurchase = (type: string) => {
    setIsGenerating(true);
    setTimeout(() => {
      addLicense(type);
      setIsGenerating(false);
    }, 2500); // Simulate cryptographic generation
  };

  return (
    <main className="min-h-screen bg-deep-black pt-28 pb-20 relative z-10 overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyber-cyan/5 blur-[150px] pointer-events-none -z-10"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {!isAuthenticated ? (
          // ================= LOGIN VIEW =================
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto mt-20">
            <div className="text-center mb-10">
              <ShieldCheck className="w-16 h-16 text-cyber-cyan mx-auto mb-4" />
              <h1 className="text-4xl font-orbitron text-ghost-white mb-2">SECURE <span className="text-glow-cyan">PORTAL</span></h1>
              <p className="font-mono text-sm text-ghost-white/50">AUTHORIZATION REQUIRED</p>
            </div>

            <form onSubmit={handleLogin} className="glass p-8 rounded-2xl border border-cyber-cyan/30 space-y-6">
              <div>
                <label className="font-mono text-xs text-cyber-cyan mb-2 block">OPERATOR ID (NAME)</label>
                <input 
                  type="text" required value={name} onChange={e => setName(e.target.value)}
                  className="w-full bg-deep-black border border-white/10 rounded px-4 py-3 font-rajdhani focus:border-cyber-cyan focus:outline-none"
                />
              </div>
              <div>
                <label className="font-mono text-xs text-cyber-cyan mb-2 block">CREDENTIAL (EMAIL)</label>
                <input 
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full bg-deep-black border border-white/10 rounded px-4 py-3 font-rajdhani focus:border-cyber-cyan focus:outline-none"
                />
              </div>
              <Button variant="neon-cyan" className="w-full mt-4">AUTHENTICATE</Button>
            </form>
          </motion.div>
        ) : (
          // ================= DASHBOARD VIEW =================
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center glass p-6 rounded-2xl border border-neon-green/30">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <div className="w-12 h-12 rounded-full bg-neon-green/20 flex items-center justify-center border border-neon-green">
                  <Terminal className="w-6 h-6 text-neon-green" />
                </div>
                <div>
                  <h2 className="font-orbitron text-xl text-ghost-white">Welcome, {user?.name}</h2>
                  <p className="font-mono text-xs text-neon-green">STATUS: ACTIVE COMM-LINK</p>
                </div>
              </div>
              <Button variant="glass" size="sm" onClick={logout} className="flex items-center gap-2 border-alert-red/50 text-alert-red hover:bg-alert-red hover:text-black">
                <LogOut className="w-4 h-4" /> Terminate Session
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* License Store */}
              <div className="lg:col-span-1 space-y-6">
                <h3 className="font-orbitron text-2xl text-cyber-cyan border-b border-cyber-cyan/20 pb-4">Acquire Nodes</h3>
                
                <div className="glass p-6 rounded-xl border border-ghost-white/10 hover:border-cyber-cyan/50 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-orbitron text-ghost-white">Pro Grid License</h4>
                      <p className="font-mono text-xs text-ghost-white/50">Monthly Auto-Renew</p>
                    </div>
                    <span className="font-mono text-cyber-cyan">$129</span>
                  </div>
                  <Button variant="neon-cyan" className="w-full text-sm" onClick={() => handlePurchase('PRO GRID')} disabled={isGenerating}>
                    {isGenerating ? <span className="flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Generating...</span> : 'Authorize Payment'}
                  </Button>
                </div>

                <div className="glass p-6 rounded-xl border border-ghost-white/10 hover:border-neon-green/50 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-orbitron text-ghost-white">Lite Node License</h4>
                      <p className="font-mono text-xs text-ghost-white/50">Monthly Auto-Renew</p>
                    </div>
                    <span className="font-mono text-neon-green">$49</span>
                  </div>
                  <Button variant="neon-green" className="w-full text-sm" onClick={() => handlePurchase('LITE NODE')} disabled={isGenerating}>
                    Authorize Payment
                  </Button>
                </div>
              </div>

              {/* Active Keys Inventory */}
              <div className="lg:col-span-2 glass p-8 rounded-2xl border border-electric-purple/30">
                <h3 className="font-orbitron text-2xl text-electric-purple mb-6 flex items-center gap-3">
                  <Key className="w-6 h-6" /> Decrypted License Keys
                </h3>
                
                <div className="space-y-4">
                  {licenses.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
                      <Cpu className="w-12 h-12 text-ghost-white/20 mx-auto mb-3" />
                      <p className="font-mono text-ghost-white/40">NO ACTIVE LICENSES FOUND IN REGISTRY</p>
                    </div>
                  ) : (
                    <AnimatePresence>
                      {licenses.map((lic, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-deep-black/60 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                          <div>
                            <span className="bg-electric-purple/20 text-electric-purple font-mono text-xs px-2 py-1 rounded mr-3">{lic.type}</span>
                            <span className="font-mono text-ghost-white/50 text-xs">Issued: {lic.date}</span>
                            <p className="font-mono text-lg text-neon-green mt-2 tracking-widest">{lic.key}</p>
                          </div>
                          <Button variant="glass" size="sm" className="shrink-0 flex gap-2 border-electric-purple/30 text-electric-purple hover:border-electric-purple">
                            <Download className="w-4 h-4" /> Download Installer
                          </Button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  )}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}