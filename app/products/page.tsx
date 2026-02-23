'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Store, Utensils, Factory, LineChart, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-deep-black pt-28 pb-20">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-orbitron text-ghost-white mb-6"
        >
          THE <span className="text-glow-cyan">GHOSTWIRE</span> SUITE
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl font-rajdhani text-ghost-white/70 max-w-3xl mx-auto"
        >
          A fully integrated ecosystem of Point of Sale and Enterprise Resource Planning modules, 
          designed to scale from a single pop-up shop to a global franchise grid.
        </motion.p>
      </div>

      {/* Product Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        
        {/* RETAIL POS */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <div className="p-4 rounded-xl bg-neon-green/10 text-neon-green w-16 h-16 flex items-center justify-center mb-6">
              <Store className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-orbitron text-ghost-white mb-4">Retail <span className="text-neon-green">POS</span></h2>
            <p className="font-rajdhani text-lg text-ghost-white/70 mb-6 leading-relaxed">
              Designed for high-traffic environments. Scan barcodes in milliseconds, manage complex product variations (size/color matrix), and seamlessly process returns or exchanges.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-ghost-white/80 font-rajdhani"><ChevronRight className="w-5 h-5 text-neon-green mr-2" /> Unlimited SKU Management</li>
              <li className="flex items-center text-ghost-white/80 font-rajdhani"><ChevronRight className="w-5 h-5 text-neon-green mr-2" /> Custom Label & Barcode Printing</li>
              <li className="flex items-center text-ghost-white/80 font-rajdhani"><ChevronRight className="w-5 h-5 text-neon-green mr-2" /> Built-in Customer Loyalty Engine</li>
            </ul>
            <Button variant="neon-green">Explore Retail</Button>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2 h-80 glass rounded-2xl border border-neon-green/30 flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80')] bg-cover bg-center overflow-hidden relative">
             <div className="absolute inset-0 bg-deep-black/60 backdrop-blur-sm"></div>
             {/* Abstract UI representation */}
             <div className="relative z-10 w-3/4 h-3/4 border border-neon-green/40 rounded bg-deep-black/80 p-4 shadow-neon-green flex flex-col">
                <div className="w-full h-8 border-b border-neon-green/30 mb-4 flex gap-2"><div className="w-20 h-full bg-neon-green/20"></div></div>
                <div className="flex-grow grid grid-cols-3 gap-2"><div className="col-span-2 bg-ghost-white/5 rounded"></div><div className="bg-neon-green/10 rounded"></div></div>
             </div>
          </motion.div>
        </div>

        {/* RESTAURANT & KDS */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <div className="p-4 rounded-xl bg-cyber-cyan/10 text-cyber-cyan w-16 h-16 flex items-center justify-center mb-6">
              <Utensils className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-orbitron text-ghost-white mb-4">Hospitality <span className="text-cyber-cyan">KDS</span></h2>
            <p className="font-rajdhani text-lg text-ghost-white/70 mb-6 leading-relaxed">
              Ditch the paper tickets. Ghostwire instantly routes orders from the front-of-house directly to the correct prep stations via our interactive Kitchen Display System.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-ghost-white/80 font-rajdhani"><ChevronRight className="w-5 h-5 text-cyber-cyan mr-2" /> Drag-and-Drop Floor Plans</li>
              <li className="flex items-center text-ghost-white/80 font-rajdhani"><ChevronRight className="w-5 h-5 text-cyber-cyan mr-2" /> Split Checks & Seat Tracking</li>
              <li className="flex items-center text-ghost-white/80 font-rajdhani"><ChevronRight className="w-5 h-5 text-cyber-cyan mr-2" /> 3rd-Party Delivery Integrations</li>
            </ul>
            <Button variant="neon-cyan">Explore Hospitality</Button>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2 h-80 glass rounded-2xl border border-cyber-cyan/30 flex items-center justify-center relative overflow-hidden">
             {/* Abstract KDS UI representation */}
             <div className="absolute inset-0 bg-cyber-cyan/5"></div>
             <div className="relative z-10 w-full h-full p-6 grid grid-cols-3 gap-4">
                <div className="bg-deep-black/80 border border-cyber-cyan/40 rounded p-3 flex flex-col"><div className="h-4 w-1/2 bg-cyber-cyan mb-2"></div><div className="h-2 w-full bg-ghost-white/20 mb-1"></div><div className="h-2 w-3/4 bg-ghost-white/20 mb-4"></div><div className="mt-auto h-8 w-full bg-cyber-cyan/20 rounded"></div></div>
                <div className="bg-deep-black/80 border border-cyber-cyan/40 rounded p-3 flex flex-col"><div className="h-4 w-1/2 bg-cyber-cyan mb-2"></div><div className="h-2 w-full bg-ghost-white/20 mb-1"></div><div className="h-2 w-3/4 bg-ghost-white/20 mb-4"></div><div className="mt-auto h-8 w-full bg-cyber-cyan/20 rounded"></div></div>
                <div className="bg-deep-black/80 border border-neon-green/40 rounded p-3 flex flex-col opacity-50"><div className="h-4 w-1/2 bg-neon-green mb-2"></div><div className="h-2 w-full bg-ghost-white/20 mb-1"></div></div>
             </div>
          </motion.div>
        </div>

        {/* ENTERPRISE ERP */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2">
            <div className="p-4 rounded-xl bg-electric-purple/10 text-electric-purple w-16 h-16 flex items-center justify-center mb-6">
              <Factory className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-orbitron text-ghost-white mb-4">Enterprise <span className="text-electric-purple">ERP</span></h2>
            <p className="font-rajdhani text-lg text-ghost-white/70 mb-6 leading-relaxed">
              For operations that require more than just ringing up sales. Manage vendors, track raw ingredients, calculate labor costs, and monitor multi-warehouse logistics.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-ghost-white/80 font-rajdhani"><ChevronRight className="w-5 h-5 text-electric-purple mr-2" /> Automated Purchase Orders</li>
              <li className="flex items-center text-ghost-white/80 font-rajdhani"><ChevronRight className="w-5 h-5 text-electric-purple mr-2" /> Employee Time & Attendance</li>
              <li className="flex items-center text-ghost-white/80 font-rajdhani"><ChevronRight className="w-5 h-5 text-electric-purple mr-2" /> Franchise Royalty Calculations</li>
            </ul>
            <Button variant="neon-purple">Explore Enterprise</Button>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full lg:w-1/2 h-80 glass rounded-2xl border border-electric-purple/30 flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-electric-purple/5"></div>
             <LineChart className="w-32 h-32 text-electric-purple/40" />
          </motion.div>
        </div>

      </div>
    </main>
  );
}