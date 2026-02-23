'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Shield, Cpu, X, Server, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlowingBorder } from '@/components/ui/GlowingBorder';
import { useRouter } from 'next/navigation';
import { useRobotStore } from '@/lib/store';

export default function PricingPage() {
  const router = useRouter();
  const { flyTo } = useRobotStore();
  const [annual, setAnnual] = useState(true);

  const handleAction = (path: string, x: number, y: number) => {
    flyTo(path, { x, y }, () => router.push(path));
  };

  const tiers = [
    {
      name: 'LITE NODE',
      color: 'neon-green',
      hex: '#39FF14',
      priceMonthly: 49,
      priceAnnual: 39,
      desc: 'Perfect for pop-ups, food trucks, and single-location retail.',
      features: [
        '1 Terminal License',
        'Standard Retail POS',
        'Cloud Inventory Sync',
        'Basic Analytics',
        'Email Support'
      ],
      missing: ['Kitchen Display System (KDS)', 'Multi-Location Management', 'Custom API Access'],
      buttonVariant: 'neon-green' as const
    },
    {
      name: 'PRO GRID',
      color: 'cyber-cyan',
      hex: '#00F0FF',
      priceMonthly: 129,
      priceAnnual: 99,
      desc: 'Advanced telemetry for high-volume restaurants and busy stores.',
      features: [
        'Up to 5 Terminal Licenses',
        'Advanced F&B & Retail POS',
        'Kitchen Display System (KDS)',
        'Table & Seat Management',
        'AI-Driven Inventory Restocking',
        '24/7 Priority Support'
      ],
      missing: ['Custom API Access'],
      buttonVariant: 'neon-cyan' as const,
      highlight: true
    },
    {
      name: 'ENTERPRISE MATRIX',
      color: 'electric-purple',
      hex: '#BF00FF',
      priceMonthly: 'CUSTOM',
      priceAnnual: 'CUSTOM',
      desc: 'Full ERP capabilities for multi-location franchises and massive operations.',
      features: [
        'Unlimited Terminal Licenses',
        'Full ERP Capabilities',
        'Multi-Warehouse Logistics',
        'Franchise Royalty Engine',
        'Dedicated Server Nodes',
        'Custom API & Integrations',
        'White-Glove Onboarding'
      ],
      missing: [],
      buttonVariant: 'neon-purple' as const
    }
  ];

  const faqs = [
    { q: 'Do I need to buy proprietary hardware?', a: 'No. Ghostwire is completely hardware-agnostic. It runs flawlessly on iPads, Android tablets, legacy Windows registers, and any modern web browser.' },
    { q: 'What happens if the internet goes down?', a: 'Ghostwire features Absolute Offline Resilience. Terminals continue to process cash and queued credit card transactions locally, auto-syncing to the cloud the moment the connection returns.' },
    { q: 'Are there hidden transaction fees?', a: 'Ghostwire integrates with your existing merchant processor (Stripe, Square, etc.). We do not take a percentage of your sales. You only pay your software subscription.' },
    { q: 'Can I switch from my current POS easily?', a: 'Yes. Our Pro and Enterprise tiers include automated data migration tools to pull your existing inventory, menus, and customer data from legacy systems.' },
  ];

  return (
    <main className="min-h-screen bg-deep-black pt-28 pb-20 relative z-10 overflow-hidden">
      
      {/* Background Decor - Responsive Sizes */}
      <div className="absolute top-[-10%] left-[-10%] w-[150vw] h-[150vw] md:w-[500px] md:h-[500px] bg-cyber-cyan/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[150vw] h-[150vw] md:w-[500px] md:h-[500px] bg-electric-purple/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-orbitron text-ghost-white mb-6"
          >
            SYSTEM <span className="text-glow-cyan">LICENSING</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-lg md:text-xl font-rajdhani text-ghost-white/70 max-w-2xl mx-auto mb-10"
          >
            Transparent pricing for the most advanced operational software on the grid. No hidden fees. No forced hardware.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex justify-center items-center gap-4 font-orbitron">
            <span className={`text-xs md:text-sm ${!annual ? 'text-cyber-cyan text-glow-cyan' : 'text-ghost-white/50'}`}>MONTHLY</span>
            <button 
              onClick={() => setAnnual(!annual)}
              className="w-16 h-8 glass rounded-full border border-cyber-cyan/30 relative flex items-center px-1 cursor-pointer transition-colors shrink-0"
            >
              <div className={`w-6 h-6 rounded-full bg-cyber-cyan shadow-neon-cyan transition-transform duration-300 ${annual ? 'translate-x-8' : 'translate-x-0'}`}></div>
            </button>
            <span className={`text-xs md:text-sm flex flex-col md:flex-row items-center ${annual ? 'text-cyber-cyan text-glow-cyan' : 'text-ghost-white/50'}`}>
              ANNUAL <span className="text-neon-green text-[10px] md:text-xs md:ml-1">(SAVE 20%)</span>
            </span>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 relative z-10">
          {tiers.map((tier, idx) => {
            const isHighlighted = tier.highlight;
            const price = annual ? tier.priceAnnual : tier.priceMonthly;
            
            const CardWrapper = isHighlighted ? GlowingBorder : React.Fragment;
            const wrapperProps = isHighlighted ? { color: 'cyan' as const, className: 'h-full md:scale-105 z-20 mt-8 md:mt-0' } : {};

            return (
              <motion.div 
                key={tier.name}
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * idx }}
                className={isHighlighted ? 'relative' : 'mt-8 md:mt-8'}
              >
                {/* @ts-ignore - Dynamic wrapper handling */}
                <CardWrapper {...wrapperProps}>
                  <div className={`glass p-6 md:p-8 rounded-2xl h-full flex flex-col border ${isHighlighted ? 'border-cyber-cyan/50 bg-deep-black' : 'border-ghost-white/10'}`}>
                    
                    {isHighlighted && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyber-cyan text-deep-black px-4 py-1 rounded-full font-orbitron text-xs font-bold tracking-wider">
                        MOST DEPLOYED
                      </div>
                    )}

                    <h3 className={`text-xl md:text-2xl font-orbitron text-${tier.color} mb-2 mt-4 md:mt-0`}>{tier.name}</h3>
                    <p className="font-rajdhani text-ghost-white/60 mb-6 min-h-[48px]">{tier.desc}</p>
                    
                    <div className="mb-8 border-b border-white/10 pb-8">
                      {typeof price === 'number' ? (
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl md:text-3xl font-mono text-ghost-white/50">$</span>
                          <span className="text-5xl md:text-6xl font-orbitron font-bold text-ghost-white">{price}</span>
                          <span className="text-ghost-white/50 font-rajdhani">/mo</span>
                        </div>
                      ) : (
                        <div className="text-3xl md:text-4xl font-orbitron font-bold text-ghost-white py-2">{price}</div>
                      )}
                    </div>

                    <div className="flex-grow space-y-4 mb-8">
                      {tier.features.map(feat => (
                        <div key={feat} className="flex items-start gap-3">
                          <Check className={`w-4 h-4 md:w-5 md:h-5 text-${tier.color} shrink-0 mt-1`} />
                          <span className="font-rajdhani text-sm md:text-base text-ghost-white/90">{feat}</span>
                        </div>
                      ))}
                      {tier.missing.map(feat => (
                        <div key={feat} className="flex items-start gap-3 opacity-40">
                          <X className="w-4 h-4 md:w-5 md:h-5 text-ghost-white shrink-0 mt-1" />
                          <span className="font-rajdhani text-sm md:text-base text-ghost-white line-through">{feat}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      variant={tier.buttonVariant} 
                      className="w-full mt-auto text-sm md:text-base"
                      onClick={() => handleAction('/contact', 0, 50)}
                    >
                      {tier.name === 'ENTERPRISE MATRIX' ? 'Contact Logistics' : 'Deploy Protocol'}
                    </Button>
                  </div>
                </CardWrapper>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Grid Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass border border-electric-purple/30 rounded-2xl p-6 md:p-12 mb-32 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-electric-purple/5"></div>
          <div className="md:w-1/2 relative z-10 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-orbitron text-ghost-white mb-4">NEED DEDICATED <span className="text-electric-purple">HARDWARE?</span></h2>
            <p className="font-rajdhani text-base md:text-lg text-ghost-white/70 mb-6">
              While Ghostwire runs on almost any device, we offer military-grade, pre-configured hardware bundles perfectly optimized for our ecosystem. Touch terminals, kitchen impact printers, and neural-fast barcode scanners.
            </p>
            <Button variant="neon-purple" className="flex gap-2 items-center mx-auto md:mx-0 w-full sm:w-auto justify-center" onClick={() => handleAction('/contact', -80, 50)}>
              View Hardware Bundles <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="md:w-1/2 relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="bg-deep-black/60 border border-white/5 p-4 rounded-xl flex flex-col items-center text-center hover:border-neon-green transition-colors">
              <Cpu className="w-8 h-8 text-neon-green mb-3" />
              <span className="font-orbitron text-sm">Mainframe Terminals</span>
            </div>
            <div className="bg-deep-black/60 border border-white/5 p-4 rounded-xl flex flex-col items-center text-center hover:border-cyber-cyan transition-colors">
              <Server className="w-8 h-8 text-cyber-cyan mb-3" />
              <span className="font-orbitron text-sm">Local Server Nodes</span>
            </div>
            <div className="bg-deep-black/60 border border-white/5 p-4 rounded-xl flex flex-col items-center text-center hover:border-electric-purple transition-colors">
              <Shield className="w-8 h-8 text-electric-purple mb-3" />
              <span className="font-orbitron text-sm">Encrypted Swipers</span>
            </div>
            <div className="bg-deep-black/60 border border-white/5 p-4 rounded-xl flex flex-col items-center text-center hover:border-neon-green transition-colors">
              <Zap className="w-8 h-8 text-neon-green mb-3" />
              <span className="font-orbitron text-sm">Thermal Printers</span>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-orbitron text-center text-ghost-white mb-12">DATA <span className="text-glow-cyan">ARCHIVE</span> (FAQ)</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                className="glass border border-ghost-white/10 rounded-xl p-6 hover:border-cyber-cyan/50 transition-colors"
              >
                <h3 className="text-lg md:text-xl font-orbitron text-cyber-cyan mb-3 flex items-start gap-3">
                  <span className="text-ghost-white/30 font-mono text-sm mt-1">0{idx + 1}</span>
                  {faq.q}
                </h3>
                <p className="font-rajdhani text-sm md:text-base text-ghost-white/70 pl-8 leading-relaxed">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}