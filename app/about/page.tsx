// FILE: app/about/page.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Cpu, Code2, Users2, Building2 } from 'lucide-react';
import { GlowingBorder } from '@/components/ui/GlowingBorder';

export default function AboutPage() {
  const stats = [
    { label: 'Lines of Code', value: '4.2M+', color: 'neon-green' },
    { label: 'Global Nodes', value: '12,450', color: 'cyber-cyan' },
    { label: 'Uptime', value: '99.999%', color: 'electric-purple' },
    { label: 'Latency', value: '< 12ms', color: 'neon-green' },
  ];

  const architects = [
    { 
      name: 'Henry Yu', 
      role: 'CEO', 
      // Replace this URL with '/your-image.jpg' once you place the file in your public folder
      image: 'https://ui-avatars.com/api/?name=Henry+Yu&background=0A0A0A&color=39FF14&size=256', 
      color: 'neon-green' 
    },
    { 
      name: 'Miguel Abelido', 
      role: 'Lead System Architect', 
      // Replace this URL with '/miguel.jpg' once you place the file in your public folder
      image: '/miguel.jpg', 
      color: 'cyber-cyan' 
    },
    { 
      name: 'Jax "Zero" Riven', 
      role: 'Cryptographic Lead', 
      image: "" ,
      color: 'electric-purple' 
    },
  ];

  return (
    <main className="min-h-screen bg-deep-black pt-28 pb-20 relative z-10 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-cyber-cyan/5 blur-[150px] pointer-events-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-24 relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full border border-cyber-cyan/30 mb-8">
            <Code2 className="w-4 h-4 text-cyber-cyan" />
            <span className="text-cyber-cyan font-mono text-sm uppercase tracking-wider">FILE: ORIGIN_STORY.SYS</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-orbitron text-ghost-white mb-6">
            THE <span className="text-glow-cyan">ARCHITECTS</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl font-rajdhani text-ghost-white/70 max-w-3xl mx-auto leading-relaxed">
            Ghostwire Systems was born from a singular frustration: legacy point-of-sale systems were slow, bloated, and crashed when you needed them most. We decided to rewrite the grid.
          </motion.p>
        </div>

        {/* The Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center relative z-10">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-orbitron text-neon-green mb-6 border-l-4 border-neon-green pl-4">CORE DIRECTIVES</h2>
            <div className="space-y-6 font-rajdhani text-lg text-ghost-white/80">
              <p>
                In 2026, our founders were running high-volume hospitality venues. Every Friday night, the legacy cloud POS would buckle under the weight of a thousand concurrent transactions. Receipts wouldn't print. KDS screens froze.
              </p>
              <p>
                <strong className="text-cyber-cyan">Directive Alpha:</strong> A system must never go down. We built Ghostwire with an edge-computing first approach. Your local terminals talk to each other directly, bypassing the cloud until the internet stabilizes.
              </p>
              <p>
                <strong className="text-electric-purple">Directive Beta:</strong> Speed is survival. We stripped out the bloat of web-wrappers and built Ghostwire on a custom, high-performance rendering engine. Scans register in milliseconds. Screens swap instantly.
              </p>
            </div>
          </motion.div>
          
          {/* Stats Grid */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className={`glass p-6 rounded-2xl border border-${stat.color}/30 text-center hover:bg-${stat.color}/5 transition-colors`}>
                <p className={`text-4xl font-orbitron font-bold text-${stat.color} mb-2`}>{stat.value}</p>
                <p className="font-mono text-sm text-ghost-white/60 uppercase">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* The Team */}
        <div className="mb-32 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-orbitron text-ghost-white mb-4">SYSTEM <span className="text-glow-purple">OPERATORS</span></h2>
            <p className="text-xl font-rajdhani text-ghost-white/60">The minds behind the matrix.</p>
          </motion.div>

          {/* This grid-cols-1 md:grid-cols-3 makes it fully responsive automatically */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {architects.map((person, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <GlowingBorder color={person.color as 'green' | 'cyan' | 'purple'}>
                  <div className="glass p-6 rounded-xl border border-white/5 text-center flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-2 border-white/10 group">
                      <div className={`absolute inset-0 bg-${person.color}/20 z-10 group-hover:opacity-0 transition-opacity duration-300`}></div>
                      <img src={person.image} alt={person.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <h3 className={`text-2xl font-orbitron text-${person.color} mb-1`}>{person.name}</h3>
                    <p className="font-mono text-sm text-ghost-white/50">{person.role}</p>
                  </div>
                </GlowingBorder>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Global Reach */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass border border-ghost-white/10 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden z-10">
          <div className="absolute inset-0 cyber-grid opacity-20"></div>
          <Building2 className="w-16 h-16 text-cyber-cyan mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-orbitron text-ghost-white mb-4 relative z-10">OPERATING IN 42 COUNTRIES</h2>
          <p className="font-rajdhani text-lg text-ghost-white/70 max-w-2xl mx-auto relative z-10">
            From underground cyber-cafes in Neo-Tokyo to massive warehouse distribution centers in Berlin, Ghostwire is scaling globally to meet the demands of modern enterprise.
          </p>
        </motion.div>

      </div>
    </main>
  );
}