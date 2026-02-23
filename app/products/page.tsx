'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, Utensils, Monitor, Server, Cpu, Smartphone, Box, Layers, ArrowRight } from 'lucide-react';
import { HardwareShowcase } from '@/components/3d/HardwareShowcase';

export default function ProductsPage() {
  const [industry, setIndustry] = useState<'fnb' | 'retail'>('fnb');
  const [activePackage, setActivePackage] = useState<string>('fnb-tablet');

  const fnbPackages = [
    { id: 'software', name: 'Software Only', desc: 'Bring your own hardware. iPad, Android, or Web.', icon: Layers },
    { id: 'fnb-tablet', name: 'Complete Tablet Pkg', desc: '10" Tablet, Stand, Cash Drawer, Thermal Printer.', icon: Smartphone },
    { id: 'fnb-kds', name: 'Kitchen Display (KDS)', desc: 'Impact-resistant Kitchen Screen for hot-line routing.', icon: Monitor },
    { id: 'fnb-cfd', name: 'Customer Display (CFD)', desc: 'Forward-facing screen for digital tips and totals.', icon: Monitor },
    { id: 'fnb-whole', name: 'The Whole Matrix', desc: 'Register, CFD, Printer, Drawer, and dedicated KDS.', icon: Server },
  ];

  const retailPackages = [
    { id: 'software', name: 'Software Only', desc: 'Bring your own hardware. Runs on any browser.', icon: Layers },
    { id: 'retail-tablet', name: 'Tablet Retail Set', desc: 'Tablet, Stand, Drawer, Printer & Barcode Scanner.', icon: Smartphone },
    { id: 'retail-pc', name: 'Desktop PC Set', desc: '22" Monitor, CPU, KB/M, Scanner, Printer, Drawer.', icon: Cpu },
    { id: 'fnb-cfd', name: 'Customer Display (CFD)', desc: 'Forward-facing screen for receipt options.', icon: Monitor },
    { id: 'retail-whole', name: 'The Whole Matrix', desc: 'Full PC/Tablet base + CFD + Scanner + Printer + Drawer.', icon: Box },
  ];

  const currentPackages = industry === 'fnb' ? fnbPackages : retailPackages;

  // Auto-switch default package when changing industry
  const handleIndustryChange = (mode: 'fnb' | 'retail') => {
    setIndustry(mode);
    setActivePackage(mode === 'fnb' ? 'fnb-tablet' : 'retail-pc');
  };

  return (
    <main className="min-h-screen bg-deep-black pt-28 pb-20 overflow-hidden">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-orbitron text-ghost-white mb-6"
        >
          DEPLOYMENT <span className={industry === 'fnb' ? 'text-cyber-cyan text-glow-cyan' : 'text-neon-green text-glow-green'}>PACKAGES</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-lg md:text-xl font-rajdhani text-ghost-white/70 max-w-2xl mx-auto"
        >
          Select your industry to view military-grade hardware bundles, entirely rotatable and inspectable in 3D space.
        </motion.p>
      </div>

      {/* Industry Toggle */}
      <div className="flex justify-center mb-16">
        <div className="glass p-2 rounded-full border border-white/10 flex gap-2 relative z-20">
          <button 
            onClick={() => handleIndustryChange('fnb')} 
            className={`px-8 py-3 rounded-full font-orbitron transition-all flex items-center gap-2 ${industry === 'fnb' ? 'bg-cyber-cyan text-black shadow-neon-cyan' : 'text-white/50 hover:text-white'}`}
          >
            <Utensils className="w-5 h-5" /> Culinary / F&B
          </button>
          <button 
            onClick={() => handleIndustryChange('retail')} 
            className={`px-8 py-3 rounded-full font-orbitron transition-all flex items-center gap-2 ${industry === 'retail' ? 'bg-neon-green text-black shadow-neon-green' : 'text-white/50 hover:text-white'}`}
          >
            <Store className="w-5 h-5" /> Retail Systems
          </button>
        </div>
      </div>

      {/* Main Hardware Configurator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: List of Packages */}
          <div className="lg:col-span-4 space-y-4 relative z-20">
            <h3 className="font-orbitron text-xl text-ghost-white mb-6 border-b border-white/10 pb-4">Select Configuration</h3>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={industry}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                {currentPackages.map(pkg => {
                  const isActive = activePackage === pkg.id;
                  const themeColor = industry === 'fnb' ? 'cyber-cyan' : 'neon-green';
                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setActivePackage(pkg.id)}
                      className={`w-full text-left p-5 rounded-xl border transition-all duration-300 flex items-start gap-4 group ${isActive ? `bg-${themeColor}/10 border-${themeColor} shadow-[0_0_15px_rgba(var(--color-${themeColor}),0.3)]` : 'bg-deep-black/50 border-white/10 hover:border-white/30'}`}
                    >
                      <div className={`p-2 rounded-lg ${isActive ? `bg-${themeColor}/20 text-${themeColor}` : 'bg-white/5 text-white/50 group-hover:text-white'}`}>
                        <pkg.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className={`font-orbitron text-lg mb-1 ${isActive ? `text-${themeColor}` : 'text-ghost-white'}`}>{pkg.name}</h4>
                        <p className="font-rajdhani text-sm text-ghost-white/60 leading-relaxed">{pkg.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: 3D Lusion-style Showcase */}
          <div className="lg:col-span-8 relative">
            <div className={`absolute inset-0 bg-${industry === 'fnb' ? 'cyber-cyan' : 'neon-green'}/5 blur-[100px] rounded-full pointer-events-none`}></div>
            
            <div className={`glass w-full h-[500px] lg:h-[700px] rounded-2xl border ${industry === 'fnb' ? 'border-cyber-cyan/30' : 'border-neon-green/30'} relative overflow-hidden flex flex-col`}>
              
              {/* Overlay UI Hints */}
              <div className="absolute top-6 left-6 z-10 pointer-events-none">
                 <div className="flex items-center gap-2 mb-1">
                   <div className={`w-2 h-2 rounded-full animate-pulse ${industry === 'fnb' ? 'bg-cyber-cyan' : 'bg-neon-green'}`}></div>
                   <span className="font-mono text-xs text-white/70">INTERACTIVE 3D VIEW</span>
                 </div>
                 <h2 className={`font-orbitron text-2xl ${industry === 'fnb' ? 'text-cyber-cyan' : 'text-neon-green'}`}>
                   {currentPackages.find(p => p.id === activePackage)?.name}
                 </h2>
              </div>
              
              <div className="absolute bottom-6 right-6 z-10 pointer-events-none bg-deep-black/60 backdrop-blur px-4 py-2 rounded-full border border-white/10">
                 <p className="font-mono text-xs text-white/50 flex items-center gap-2">DRAG TO ROTATE <ArrowRight className="w-3 h-3" /></p>
              </div>

              {/* The 3D Canvas component */}
              <HardwareShowcase activePackage={activePackage} />

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}