'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { Button } from '@/components/ui/Button';
import { 
  Terminal, Zap, ShieldCheck, WifiOff, Cpu, Layers, Activity, 
  Globe, Monitor, Smartphone, Printer, ScanLine, ServerCrash,
  Lock, Fingerprint, Webhook, Database, Blocks, Link2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRobotStore } from '@/lib/store';

// --- 3D TILT CARD COMPONENT FOR TESTIMONIALS ---
function TiltTestimonialCard({ review }: { review: any }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full glass p-8 rounded-2xl border border-white/10 shadow-2xl cursor-pointer group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-neon-green/0 to-cyber-cyan/0 group-hover:from-neon-green/10 group-hover:to-cyber-cyan/10 rounded-2xl transition-colors duration-500 pointer-events-none"></div>
      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-14 h-14 rounded-full border-2 border-${review.color} bg-deep-black overflow-hidden flex items-center justify-center shadow-[0_0_15px_${review.hex}40] shrink-0`}>
            <img src={review.img} alt={review.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
          </div>
          <div>
            <h4 className={`font-orbitron text-lg text-${review.color}`}>{review.name}</h4>
            <p className="font-mono text-xs text-ghost-white/50">{review.role}</p>
          </div>
        </div>
        <p className="font-rajdhani text-ghost-white/80 leading-relaxed text-base md:text-lg">"{review.quote}"</p>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const router = useRouter();
  const { flyTo } = useRobotStore();
  
  // --- SPLASH SCREEN STATE ---
  const [bootSequence, setBootSequence] = useState(true);
  const [bootLogs, setBootLogs] = useState<string[]>([]);

  useEffect(() => {
    // Lock scrolling while booting
    document.body.style.overflow = bootSequence ? 'hidden' : 'unset';
  }, [bootSequence]);

  useEffect(() => {
    const logs = [
      "INITIALIZING GHOSTWIRE KERNEL v2.0.4...",
      "LOADING OFFLINE RESILIENCE PROTOCOLS...",
      "ESTABLISHING ENCRYPTED COMM-LINK...",
      "BYPASSING LEGACY MAINFRAMES...",
      "SYSTEM ONLINE. WELCOME OPERATOR."
    ];
    
    const interval = setInterval(() => {
      setBootLogs(prev => {
        if (prev.length < logs.length) {
          return [...prev, logs[prev.length]];
        }
        clearInterval(interval);
        return prev;
      });
    }, 350);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (bootLogs.length === 5) {
      const t = setTimeout(() => setBootSequence(false), 1200);
      return () => clearTimeout(t);
    }
  }, [bootLogs]);

  useEffect(() => {
    if (bootSequence) return; // Wait until splash is done to start Lenis
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [bootSequence]);

  const handleRobotNavigation = (path: string, x: number, y: number) => {
    flyTo(path, { x, y }, () => router.push(path));
  };

  const reviews = [
    { name: 'Sarah J.', role: 'Owner, Cyber Cafe Neo', quote: 'Before Ghostwire, our servers crashed every Friday rush. Now? I literally sit back and watch the telemetry flow. It is flawless.', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', color: 'neon-green', hex: '#39FF14' },
    { name: 'Marcus T.', role: 'Director of Retail, Vanguard', quote: 'The offline resilience isn’t a gimmick. Our ISP went down for 4 hours; Ghostwire didn’t drop a single transaction. Military-grade indeed.', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80', color: 'cyber-cyan', hex: '#00F0FF' },
    { name: 'Elena R.', role: 'Franchise Operator', quote: 'The AI inventory restocking feels like magic. It knew we were running out of core supplies before my managers did. Saved our weekend.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', color: 'electric-purple', hex: '#BF00FF' },
  ];

  return (
    <>
      {/* 0. CYBERPUNK SPLASH SCREEN */}
      <AnimatePresence>
        {bootSequence && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[999999] bg-deep-black flex flex-col items-center justify-center p-6 font-mono"
          >
            <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none"></div>
            <div className="w-full max-w-2xl relative z-10">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-10 border-b border-neon-green/30 pb-6">
                <Zap className="w-12 h-12 text-neon-green animate-pulse shadow-neon-green rounded-full shrink-0" />
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-orbitron text-ghost-white tracking-widest text-glow-green">GHOSTWIRE.SYS</h1>
                  <p className="text-neon-green/50 text-[10px] md:text-xs mt-1">TERMINAL UPLINK // AWAITING SECURE HANDSHAKE</p>
                </div>
              </div>
              <div className="space-y-3 min-h-[200px]">
                {bootLogs.map((log, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-neon-green text-xs md:text-base flex gap-2 md:gap-3">
                    <span className="text-ghost-white/40 shrink-0">{`[${new Date().toISOString().split('T')[1].slice(0, 8)}]`}</span>
                    <span className="break-words">{`> ${log}`}</span>
                  </motion.div>
                ))}
                <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-2 h-4 md:w-3 md:h-5 bg-neon-green inline-block mt-2 ml-8 md:ml-24" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative min-h-screen bg-deep-black cyber-grid overflow-hidden pt-20">
        
        {/* 1. TEXT HERO SECTION */}
        <section className="relative min-h-[80vh] w-full flex flex-col items-center justify-center px-4 z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: bootSequence ? 0 : 0.5 }} className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full border border-cyber-cyan/30 mb-8 shadow-neon-cyan">
              <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse"></span>
              <span className="text-cyber-cyan font-mono text-xs md:text-sm uppercase tracking-wider">System Online v2.0</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-orbitron font-bold text-ghost-white mb-6 tracking-tight drop-shadow-2xl leading-tight">
              THE FUTURE OF <br /> <span className="text-glow-cyan">ENTERPRISE</span> POS
            </h1>
            <p className="mt-6 text-lg sm:text-xl md:text-2xl font-rajdhani text-ghost-white max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow-lg">
              Ghostwire Systems merges hyper-fast transaction processing with intelligent ERP capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full sm:w-auto px-4 sm:px-0">
              <Button variant="neon-cyan" size="lg" className="text-base sm:text-lg group w-full sm:w-auto" onClick={() => handleRobotNavigation('/demo', 80, -20)}>
                <Terminal className="w-5 h-5 inline-block mr-2 group-hover:animate-pulse" /> Initialize Demo
              </Button>
              <Button variant="glass" size="lg" className="text-base sm:text-lg w-full sm:w-auto" onClick={() => handleRobotNavigation('/products', 0, 50)}>
                View Capabilities
              </Button>
            </div>
          </motion.div>
        </section>

        {/* 2. CORE POS ARCHITECTURE (Bento Grid) */}
        <section className="py-24 relative z-10 bg-deep-black border-y border-white/10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[800px] md:h-[800px] bg-cyber-cyan/5 blur-[150px] pointer-events-none rounded-full"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
              <h2 className="text-3xl md:text-5xl font-orbitron text-ghost-white mb-4">GHOSTWIRE <span className="text-glow-cyan">MATRIX</span></h2>
              <p className="text-lg md:text-xl font-rajdhani text-ghost-white/60 max-w-2xl">Built from the ground up to solve the real-world operational bottlenecks of legacy point of sale systems.</p>
            </motion.div>

            {/* BENTO BOX GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Box 1: Offline Resilience */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} 
                className="md:col-span-2 glass p-6 md:p-8 rounded-2xl border border-neon-green/30 hover:border-neon-green hover:shadow-neon-green transition-all duration-300 group overflow-hidden relative"
              >
                <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:opacity-20 transition-opacity duration-500 hidden sm:block">
                  <WifiOff className="w-64 h-64 text-neon-green" />
                </div>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-neon-green/10 rounded-xl flex items-center justify-center mb-6 border border-neon-green/50">
                  <WifiOff className="w-6 h-6 md:w-7 md:h-7 text-neon-green" />
                </div>
                <h3 className="text-2xl md:text-3xl font-orbitron text-ghost-white mb-3">Absolute Offline Resilience</h3>
                <p className="text-base md:text-lg font-rajdhani text-ghost-white/70 max-w-md">
                  Internet outages shouldn't stop your business. If the cloud drops, Ghostwire terminals instantly create a local mesh network, syncing orders, KDS tickets, and payments locally until the grid returns.
                </p>
              </motion.div>

              {/* Box 2: Speed */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="glass p-6 md:p-8 rounded-2xl border border-cyber-cyan/30 hover:border-cyber-cyan hover:shadow-neon-cyan transition-all duration-300 group"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-cyber-cyan/10 rounded-xl flex items-center justify-center mb-6 border border-cyber-cyan/50 group-hover:animate-pulse">
                  <Activity className="w-6 h-6 md:w-7 md:h-7 text-cyber-cyan" />
                </div>
                <h3 className="text-xl md:text-2xl font-orbitron text-ghost-white mb-3">Sub-12ms Latency</h3>
                <p className="text-base md:text-lg font-rajdhani text-ghost-white/70">
                  Built on a custom Rust backend, eliminating the bloat of web-wrapper POS systems. Barcode scans register instantly.
                </p>
              </motion.div>

              {/* Box 3: Hardware Agnostic */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                className="glass p-6 md:p-8 rounded-2xl border border-electric-purple/30 hover:border-electric-purple hover:shadow-neon-purple transition-all duration-300 group"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-electric-purple/10 rounded-xl flex items-center justify-center mb-6 border border-electric-purple/50">
                  <Cpu className="w-6 h-6 md:w-7 md:h-7 text-electric-purple" />
                </div>
                <h3 className="text-xl md:text-2xl font-orbitron text-ghost-white mb-3">Hardware Agnostic</h3>
                <p className="text-base md:text-lg font-rajdhani text-ghost-white/70">
                  Run on iOS, Android, or Windows. Bring your own devices or upgrade to our military-grade encrypted terminals.
                </p>
              </motion.div>

              {/* Box 4: ERP Integration */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                className="md:col-span-2 glass p-6 md:p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 group relative overflow-hidden"
              >
                 <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
                 <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 border border-white/20">
                  <Layers className="w-6 h-6 md:w-7 md:h-7 text-ghost-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-orbitron text-ghost-white mb-3">Native ERP Ecosystem</h3>
                <p className="text-base md:text-lg font-rajdhani text-ghost-white/70 max-w-lg">
                  Stop duct-taping third-party apps together. Inventory management, employee scheduling, franchise royalties, and vendor purchasing are deeply integrated natively into the core POS matrix.
                </p>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 3. NEW SECTION: GLOBAL TELEMETRY (Data & Scale) */}
        <section className="py-20 relative z-10 bg-[#070707] border-b border-white/5 overflow-hidden">
          <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-x divide-white/10">
              
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-center justify-center">
                <Globe className="w-6 h-6 md:w-8 md:h-8 text-cyber-cyan mb-4 opacity-50" />
                <h4 className="text-2xl sm:text-3xl md:text-5xl font-orbitron text-glow-cyan text-cyber-cyan mb-2">12,450</h4>
                <p className="font-mono text-[10px] md:text-sm text-ghost-white/50 uppercase tracking-widest">Active Nodes</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex flex-col items-center justify-center">
                <Activity className="w-6 h-6 md:w-8 md:h-8 text-neon-green mb-4 opacity-50" />
                <h4 className="text-2xl sm:text-3xl md:text-5xl font-orbitron text-glow-green text-neon-green mb-2">$4.2B+</h4>
                <p className="font-mono text-[10px] md:text-sm text-ghost-white/50 uppercase tracking-widest">Annual Vol.</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col items-center justify-center">
                <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-electric-purple mb-4 opacity-50" />
                <h4 className="text-2xl sm:text-3xl md:text-5xl font-orbitron text-glow-purple text-electric-purple mb-2">99.999%</h4>
                <p className="font-mono text-[10px] md:text-sm text-ghost-white/50 uppercase tracking-widest">Grid Uptime</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex flex-col items-center justify-center">
                <ServerCrash className="w-6 h-6 md:w-8 md:h-8 text-ghost-white mb-4 opacity-20" />
                <h4 className="text-2xl sm:text-3xl md:text-5xl font-orbitron text-ghost-white mb-2">ZERO</h4>
                <p className="font-mono text-[10px] md:text-sm text-ghost-white/50 uppercase tracking-widest">Data Breaches</p>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 4. FORTRESS PROTOCOL (Security Add-on) */}
        <section className="py-24 relative z-10 bg-[#050505] overflow-hidden border-b border-white/5">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[500px] md:h-[500px] bg-alert-red/5 blur-[120px] pointer-events-none rounded-full"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:w-1/2">
                <h2 className="text-3xl md:text-5xl font-orbitron text-ghost-white mb-6">FORTRESS <span className="text-glow-red text-alert-red">PROTOCOL</span></h2>
                <p className="text-lg md:text-xl font-rajdhani text-ghost-white/60 mb-8 leading-relaxed">
                  Enterprise-grade security embedded into the silicon level. We treat every single transaction as a high-value data packet. 
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 glass rounded-lg border border-alert-red/30 text-alert-red shrink-0"><Lock className="w-5 h-5 md:w-6 md:h-6" /></div>
                    <div>
                      <h4 className="text-base md:text-lg font-orbitron text-ghost-white">AES-256 Core Encryption</h4>
                      <p className="font-rajdhani text-ghost-white/50 text-sm mt-1">Data is scrambled before it ever hits the transmission layer, completely neutralizing middle-man intercepts.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 glass rounded-lg border border-neon-green/30 text-neon-green shrink-0"><Fingerprint className="w-5 h-5 md:w-6 md:h-6" /></div>
                    <div>
                      <h4 className="text-base md:text-lg font-orbitron text-ghost-white">Biometric Auth Module</h4>
                      <p className="font-rajdhani text-ghost-white/50 text-sm mt-1">Lock down manager overrides and void limits to exact fingerprints. PIN codes belong in the past.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 glass rounded-lg border border-electric-purple/30 text-electric-purple shrink-0"><ShieldCheck className="w-5 h-5 md:w-6 md:h-6" /></div>
                    <div>
                      <h4 className="text-base md:text-lg font-orbitron text-ghost-white">PCI-DSS Level 1 Compliance</h4>
                      <p className="font-rajdhani text-ghost-white/50 text-sm mt-1">The highest tier of payment card security. Ghostwire shoulders the compliance burden so you don't have to.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="lg:w-1/2 relative w-full">
                <div className="w-full aspect-square max-w-[300px] md:max-w-[500px] mx-auto relative glass rounded-full border-2 border-alert-red/20 flex items-center justify-center p-4 md:p-8">
                  <div className="absolute inset-0 rounded-full border border-alert-red/10 animate-[spin_10s_linear_infinite]"></div>
                  <div className="absolute inset-8 rounded-full border border-dashed border-alert-red/20 animate-[spin_15s_linear_infinite_reverse]"></div>
                  <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 bg-deep-black rounded-full border-2 border-alert-red shadow-[0_0_50px_rgba(255,0,60,0.5)] flex items-center justify-center">
                    <Lock className="w-8 h-8 md:w-12 md:h-12 text-alert-red" />
                  </div>
                  <div className="absolute w-full h-1 bg-alert-red/50 shadow-neon-red top-1/2 -translate-y-1/2 animate-[pulse_2s_ease-in-out_infinite]"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 5. LUSION-STYLE 3D TESTIMONIALS */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 relative z-10 bg-deep-black overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150vw] h-[150vw] md:w-[800px] md:h-[400px] bg-electric-purple/10 blur-[150px] pointer-events-none rounded-full"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12 md:mb-20">
              <h2 className="text-3xl md:text-6xl font-orbitron text-ghost-white mb-4">OPERATOR <span className="text-electric-purple text-glow-purple">LOGS</span></h2>
              <p className="text-lg md:text-xl font-rajdhani text-ghost-white/60 max-w-2xl mx-auto">Transmissions from merchants who survived the upgrade.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-[1000px]">
              {reviews.map((review, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.2 }}>
                  <TiltTestimonialCard review={review} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. NEURAL INTEGRATIONS (API / Extensibility Add-on) */}
        <section className="py-24 md:py-32 relative z-10 bg-[#0A0A0A] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-3xl md:text-6xl font-orbitron text-ghost-white mb-4">NEURAL <span className="text-glow-purple text-electric-purple">INTEGRATIONS</span></h2>
              <p className="text-lg md:text-xl font-rajdhani text-ghost-white/60 max-w-2xl mx-auto">
                Your data is yours. Plug into the Ghostwire Matrix with open GraphQL APIs, instant webhooks, and native third-party ecosystem syncing.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Database, label: "Accounting Sync", desc: "QBO & Xero Auto-Push", color: "neon-green" },
                { icon: Webhook, label: "Delivery Apps", desc: "UberEats, DoorDash API", color: "cyber-cyan" },
                { icon: Blocks, label: "Loyalty Engines", desc: "Native CRM Integration", color: "electric-purple" },
                { icon: Link2, label: "Custom Endpoints", desc: "Open GraphQL Matrix", color: "ghost-white" }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                  className={`glass p-6 rounded-2xl border border-${item.color}/30 hover:border-${item.color} hover:bg-${item.color}/5 transition-all group flex flex-col items-center text-center`}
                >
                  <item.icon className={`w-8 h-8 md:w-10 md:h-10 text-${item.color} mb-4 opacity-70 group-hover:opacity-100 transition-opacity`} />
                  <h4 className="font-orbitron text-base md:text-lg text-ghost-white mb-1">{item.label}</h4>
                  <p className="font-mono text-[10px] md:text-xs text-ghost-white/50">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. HARDWARE ECOSYSTEM */}
        <section className="py-24 md:py-32 relative z-10 bg-deep-black overflow-hidden">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[600px] md:h-[600px] bg-cyber-cyan/5 blur-[120px] pointer-events-none rounded-full"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 md:mb-16 text-center">
              <h2 className="text-3xl md:text-6xl font-orbitron text-ghost-white mb-4">DEPLOYMENT <span className="text-glow-cyan text-cyber-cyan">HARDWARE</span></h2>
              <p className="text-lg md:text-xl font-rajdhani text-ghost-white/60 max-w-2xl mx-auto">Use your own devices, or upgrade to our encrypted, military-grade physical nodes designed to interface flawlessly with the Ghostwire Matrix.</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {/* Hardware 1 */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass rounded-2xl border border-white/5 hover:border-cyber-cyan/40 transition-all p-6 flex flex-col items-center text-center group">
                <div className="w-24 h-24 md:w-32 md:h-32 mb-6 md:mb-8 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-cyber-cyan/10 rounded-full blur-xl group-hover:bg-cyber-cyan/20 transition-all"></div>
                  <Monitor className="w-12 h-12 md:w-16 md:h-16 text-cyber-cyan relative z-10" />
                </div>
                <h3 className="text-xl md:text-2xl font-orbitron text-ghost-white mb-2">The Mainframe</h3>
                <p className="font-rajdhani text-sm md:text-base text-ghost-white/60">Sleek 15" dual-screen customer-facing registers with built-in NFC tap-to-pay and biometric operator login.</p>
              </motion.div>

              {/* Hardware 2 */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="glass rounded-2xl border border-white/5 hover:border-electric-purple/40 transition-all p-6 flex flex-col items-center text-center group">
                <div className="w-24 h-24 md:w-32 md:h-32 mb-6 md:mb-8 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-electric-purple/10 rounded-full blur-xl group-hover:bg-electric-purple/20 transition-all"></div>
                  <Smartphone className="w-12 h-12 md:w-16 md:h-16 text-electric-purple relative z-10" />
                </div>
                <h3 className="text-xl md:text-2xl font-orbitron text-ghost-white mb-2">Mobile Matrix</h3>
                <p className="font-rajdhani text-sm md:text-base text-ghost-white/60">Ruggedized handheld terminals for line-busting, tableside ordering, and warehouse inventory scanning.</p>
              </motion.div>

              {/* Hardware 3 */}
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="sm:col-span-2 md:col-span-1 glass rounded-2xl border border-white/5 hover:border-neon-green/40 transition-all p-6 flex flex-col items-center text-center group">
                <div className="w-24 h-24 md:w-32 md:h-32 mb-6 md:mb-8 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-neon-green/10 rounded-full blur-xl group-hover:bg-neon-green/20 transition-all"></div>
                  <Printer className="w-12 h-12 md:w-16 md:h-16 text-neon-green relative z-10" />
                </div>
                <h3 className="text-xl md:text-2xl font-orbitron text-ghost-white mb-2">KDS & Printers</h3>
                <p className="font-rajdhani text-sm md:text-base text-ghost-white/60">Impact-resistant bump screens for chaotic kitchens, alongside thermal receipt nodes that never jam.</p>
              </motion.div>
            </div>
            
            <div className="mt-12 text-center w-full">
               <Button variant="glass" size="lg" className="w-full sm:w-auto border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/10" onClick={() => handleRobotNavigation('/contact', 0, 50)}>
                  Request Hardware Specs
               </Button>
            </div>
          </div>
        </section>

        {/* 8. INFINITE CYBER MARQUEE */}
        <div className="py-4 md:py-6 bg-neon-green border-y border-neon-green/50 overflow-hidden relative z-20 flex whitespace-nowrap">
          <div className="animate-[marquee_20s_linear_infinite] flex gap-8 md:gap-16 text-deep-black font-orbitron font-bold text-lg md:text-2xl tracking-widest items-center">
            <span>ZERO DOWNTIME</span> <Zap className="w-5 h-5 md:w-6 md:h-6" />
            <span>MILITARY ENCRYPTION</span> <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
            <span>&lt; 12MS LATENCY</span> <Activity className="w-5 h-5 md:w-6 md:h-6" />
            <span>OFFLINE RESILIENCE</span> <WifiOff className="w-5 h-5 md:w-6 md:h-6" />
            <span>ZERO DOWNTIME</span> <Zap className="w-5 h-5 md:w-6 md:h-6" />
            <span>MILITARY ENCRYPTION</span> <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
            <span>&lt; 12MS LATENCY</span> <Activity className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        </div>

        {/* 9. MEGA CTA SECTION */}
        <section className="py-32 md:py-40 relative z-10 flex flex-col items-center justify-center text-center px-4 bg-deep-black overflow-hidden">
          <div className="absolute inset-0 bg-cyber-cyan/5 blur-[100px] md:blur-[150px] rounded-full w-[150vw] h-[150vw] md:w-full md:max-w-4xl mx-auto pointer-events-none"></div>
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-10 w-full max-w-2xl mx-auto">
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-orbitron text-ghost-white mb-6 md:mb-8">READY TO <br className="md:hidden" /><span className="text-glow-cyan">UPSCALE?</span></h2>
            <p className="text-lg md:text-2xl font-rajdhani text-ghost-white/60 mb-10 md:mb-12">Join thousands of high-volume merchants who have already escaped legacy POS systems.</p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full">
              <Button variant="neon-cyan" size="lg" className="text-base sm:text-xl px-8 md:px-12 w-full sm:w-auto" onClick={() => handleRobotNavigation('/contact', 0, 0)}>Deploy System Now</Button>
              <Button variant="glass" size="lg" className="text-base sm:text-xl px-8 md:px-12 w-full sm:w-auto" onClick={() => handleRobotNavigation('/demo', 80, -20)}>Access Live Demo</Button>
            </div>
          </motion.div>
        </section>

      </main>
    </>
  );
}