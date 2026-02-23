'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ChefHat, Plus, Trash2, Receipt, ArrowRight, DollarSign, ScanLine, Users, CheckCircle2, Factory, Activity, Globe, Server } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<'retail' | 'fnb' | 'erp'>('retail');

  // ==========================================
  // RETAIL STATE (POS Checkout)
  // ==========================================
  const retailProducts = [
    { id: 1, name: 'Quantum Jacket', price: 120.00, color: 'neon-green' },
    { id: 2, name: 'Neural Visor', price: 45.50, color: 'cyber-cyan' },
    { id: 3, name: 'Hover-Boots v2', price: 180.00, color: 'electric-purple' },
    { id: 4, name: 'Energy Cell', price: 15.00, color: 'neon-green' },
  ];
  const [cart, setCart] = useState<{id: number, name: string, price: number, qty: number}[]>([]);
  const [loyaltyActive, setLoyaltyActive] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const addToCart = (product: any) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const simulateScan = () => {
    const randomProduct = retailProducts[Math.floor(Math.random() * retailProducts.length)];
    addToCart(randomProduct);
  };

  const processPayment = () => {
    if (cart.length === 0) return;
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
      setCart([]);
      setLoyaltyActive(false);
    }, 3000);
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discount = loyaltyActive ? cartSubtotal * 0.10 : 0;
  const tax = (cartSubtotal - discount) * 0.08;
  const cartTotal = cartSubtotal - discount + tax;


  // ==========================================
  // F&B STATE (Recipe & KDS Calculator)
  // ==========================================
  const [dishName, setDishName] = useState('Cyber-Burger Matrix');
  const [sellingPrice, setSellingPrice] = useState(15.99);
  const [batchYield, setBatchYield] = useState(1);
  const [ingredients, setIngredients] = useState([
    { id: 1, name: 'Syn-Beef Patty', cost: 2.50 },
    { id: 2, name: 'Neon Brioche Bun', cost: 0.80 },
    { id: 3, name: 'Cheddar Core', cost: 0.50 },
  ]);
  const [kdsTickets, setKdsTickets] = useState<{id: number, name: string, qty: number, time: string}[]>([]);

  const addIngredient = () => setIngredients([...ingredients, { id: Date.now(), name: 'New Ingredient', cost: 1.00 }]);
  const updateIngredient = (id: number, field: string, value: string | number) => setIngredients(ingredients.map(ing => ing.id === id ? { ...ing, [field]: value } : ing));
  const removeIngredient = (id: number) => setIngredients(ingredients.filter(ing => ing.id !== id));

  const fireToKitchen = () => {
    const newTicket = {
      id: Date.now(),
      name: dishName,
      qty: batchYield,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setKdsTickets([newTicket, ...kdsTickets].slice(0, 4)); // Keep max 4 tickets on screen
  };

  const baseCost = ingredients.reduce((sum, ing) => sum + (Number(ing.cost) || 0), 0);
  const totalCost = baseCost * batchYield;
  const totalRevenue = sellingPrice * batchYield;
  const profit = totalRevenue - totalCost;
  const margin = sellingPrice > 0 ? (profit / totalRevenue) * 100 : 0;


  // ==========================================
  // ENTERPRISE ERP STATE (Live Telemetry)
  // ==========================================
  const [liveData, setLiveData] = useState({
    revenue: 145902.50,
    orders: 3402,
    activeTerminals: 142,
    cpuLoad: 24,
  });

  useEffect(() => {
    if (activeTab !== 'erp') return;
    const interval = setInterval(() => {
      setLiveData(prev => ({
        revenue: prev.revenue + (Math.random() * 150),
        orders: prev.orders + Math.floor(Math.random() * 3),
        activeTerminals: 140 + Math.floor(Math.random() * 5),
        cpuLoad: 20 + Math.floor(Math.random() * 15),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, [activeTab]);


  return (
    <main className="min-h-screen bg-deep-black pt-28 pb-20 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-orbitron text-ghost-white mb-4">
            SYSTEM <span className="text-glow-cyan">SIMULATION</span>
          </h1>
          <p className="font-rajdhani text-xl text-ghost-white/60">
            Interact with live Ghostwire calculation modules.
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="flex justify-center mb-12 flex-wrap gap-4">
          <div className="glass p-2 rounded-xl border border-ghost-white/10 flex flex-wrap justify-center gap-2">
            <button onClick={() => setActiveTab('retail')} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-orbitron transition-all ${activeTab === 'retail' ? 'bg-neon-green text-deep-black shadow-neon-green' : 'text-ghost-white hover:bg-white/5'}`}>
              <ShoppingCart className="w-5 h-5" /> Retail Protocol
            </button>
            <button onClick={() => setActiveTab('fnb')} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-orbitron transition-all ${activeTab === 'fnb' ? 'bg-cyber-cyan text-deep-black shadow-neon-cyan' : 'text-ghost-white hover:bg-white/5'}`}>
              <ChefHat className="w-5 h-5" /> Culinary Matrix
            </button>
            <button onClick={() => setActiveTab('erp')} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-orbitron transition-all ${activeTab === 'erp' ? 'bg-electric-purple text-deep-black shadow-neon-purple' : 'text-ghost-white hover:bg-white/5'}`}>
              <Factory className="w-5 h-5" /> Enterprise ERP
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="relative min-h-[600px]">
          <AnimatePresence mode="wait">
            
            {/* ======================= RETAIL MODE ======================= */}
            {activeTab === 'retail' && (
              <motion.div key="retail" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Product Input Grid */}
                <div className="lg:col-span-2 glass p-6 rounded-2xl border border-neon-green/30 flex flex-col">
                  <div className="flex justify-between items-center border-b border-neon-green/20 pb-4 mb-6">
                    <h2 className="text-xl md:text-2xl font-orbitron text-neon-green">Terminal Input</h2>
                    <Button variant="glass" size="sm" onClick={simulateScan} className="flex gap-2 items-center text-neon-green border-neon-green hover:bg-neon-green hover:text-black">
                      <ScanLine className="w-4 h-4" /> Simulate
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 flex-grow">
                    {retailProducts.map(product => (
                      <button key={product.id} onClick={() => addToCart(product)} className="bg-deep-black border border-ghost-white/10 rounded-xl p-4 text-left hover:border-neon-green hover:shadow-neon-green transition-all group">
                        <div className={`w-3 h-3 rounded-full bg-${product.color} mb-3 group-hover:animate-pulse`}></div>
                        <p className="font-orbitron text-ghost-white text-sm mb-1">{product.name}</p>
                        <p className="font-mono text-neon-green">{formatPrice(product.price)}</p>
                      </button>
                    ))}
                  </div>

                  {/* Customer Loyalty Simulator */}
                  <div className="bg-neon-green/5 border border-neon-green/20 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-ghost-white w-full sm:w-auto">
                      <Users className="w-6 h-6 text-neon-green shrink-0" />
                      <div>
                        <p className="font-orbitron text-sm">Customer Profile</p>
                        <p className="font-rajdhani text-xs text-ghost-white/50">Attach member for 10% off</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setLoyaltyActive(!loyaltyActive)}
                      className={`w-full sm:w-auto px-4 py-2 rounded font-mono text-sm transition-all ${loyaltyActive ? 'bg-neon-green text-black shadow-neon-green' : 'bg-dark-grey text-ghost-white border border-white/20 hover:border-neon-green'}`}
                    >
                      {loyaltyActive ? 'Linked (John D.)' : 'Link Member'}
                    </button>
                  </div>
                </div>

                {/* Cart Register */}
                <div className="glass p-6 rounded-2xl border border-ghost-white/10 flex flex-col h-[600px] relative overflow-hidden">
                  <h2 className="text-2xl font-orbitron text-ghost-white mb-6 flex items-center gap-2">
                    <Receipt className="text-neon-green" /> Current Ticket
                  </h2>
                  
                  <div className="flex-grow overflow-y-auto pr-2 space-y-4 mb-6">
                    {cart.length === 0 ? (
                      <p className="text-ghost-white/40 font-mono text-center mt-10">NO ITEMS SCANNED</p>
                    ) : (
                      cart.map(item => (
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={item.id} className="flex justify-between items-center text-sm font-rajdhani border-b border-white/5 pb-2">
                          <div>
                            <p className="text-ghost-white">{item.name}</p>
                            <p className="text-ghost-white/50">Qty: {item.qty} x {formatPrice(item.price)}</p>
                          </div>
                          <p className="font-mono text-neon-green">{formatPrice(item.price * item.qty)}</p>
                        </motion.div>
                      ))
                    )}
                  </div>

                  <div className="border-t border-white/10 pt-4 space-y-2 mb-6">
                    <div className="flex justify-between text-ghost-white/70 font-mono text-sm"><span>Subtotal</span><span>{formatPrice(cartSubtotal)}</span></div>
                    {loyaltyActive && <div className="flex justify-between text-neon-green font-mono text-sm"><span>Loyalty (-10%)</span><span>-{formatPrice(discount)}</span></div>}
                    <div className="flex justify-between text-ghost-white/70 font-mono text-sm"><span>Tax (8%)</span><span>{formatPrice(tax)}</span></div>
                    <div className="flex justify-between text-ghost-white font-orbitron text-2xl mt-2 pt-2 border-t border-white/10">
                      <span>TOTAL</span><span className="text-neon-green">{formatPrice(cartTotal)}</span>
                    </div>
                  </div>

                  <Button variant="neon-green" className="w-full flex justify-center items-center gap-2" onClick={processPayment} disabled={cart.length === 0}>
                    Process Payment <ArrowRight className="w-4 h-4" />
                  </Button>

                  {/* Checkout Success Overlay */}
                  <AnimatePresence>
                    {checkoutSuccess && (
                      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="absolute inset-0 bg-deep-black/95 backdrop-blur-md flex flex-col items-center justify-center p-6 border border-neon-green z-20">
                        <CheckCircle2 className="w-20 h-20 text-neon-green mb-4 shadow-neon-green rounded-full" />
                        <h3 className="text-2xl font-orbitron text-ghost-white mb-2">Transaction Approved</h3>
                        <p className="font-mono text-neon-green text-xl mb-6">{formatPrice(cartTotal)}</p>
                        <div className="w-full border-t border-dashed border-white/20 pt-4 font-mono text-xs text-ghost-white/50 text-center space-y-1">
                          <p>GHOSTWIRE POS SYSTEMS</p>
                          <p>AUTH CODE: GW-{Math.floor(Math.random() * 100000)}</p>
                          <p>Thank you for your business.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* ======================= F&B CULINARY MODE ======================= */}
            {activeTab === 'fnb' && (
              <motion.div key="fnb" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Recipe Builder */}
                <div className="glass p-8 rounded-2xl border border-cyber-cyan/30 flex flex-col">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-cyber-cyan/20 pb-6 gap-4">
                    <div className="w-full sm:w-1/2">
                      <label className="text-cyber-cyan font-mono text-xs mb-1 block">MENU ITEM</label>
                      <input type="text" value={dishName} onChange={(e) => setDishName(e.target.value)} className="w-full bg-transparent border-b border-ghost-white/20 text-xl md:text-2xl font-orbitron text-ghost-white focus:outline-none focus:border-cyber-cyan pb-1" />
                    </div>
                    <div className="w-full sm:w-1/4 flex gap-4 sm:block">
                      <div className="w-1/2 sm:w-full">
                        <label className="text-cyber-cyan font-mono text-xs mb-1 block">SALE PRICE</label>
                        <div className="relative">
                          <DollarSign className="absolute left-0 top-1 w-5 h-5 text-ghost-white/50" />
                          <input type="number" value={sellingPrice} onChange={(e) => setSellingPrice(Number(e.target.value))} className="w-full bg-transparent border-b border-ghost-white/20 text-xl md:text-2xl font-mono text-cyber-cyan focus:outline-none focus:border-cyber-cyan pl-6 pb-1" />
                        </div>
                      </div>
                      <div className="w-1/2 sm:w-full sm:mt-4">
                        <label className="text-cyber-cyan font-mono text-xs mb-1 block">YIELD</label>
                        <input type="number" value={batchYield} min="1" onChange={(e) => setBatchYield(Number(e.target.value))} className="w-full bg-transparent border-b border-ghost-white/20 text-xl md:text-2xl font-mono text-ghost-white focus:outline-none focus:border-cyber-cyan pb-1" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-grow space-y-4 mb-6 overflow-y-auto pr-2 max-h-[250px]">
                    <div className="flex justify-between text-ghost-white/50 font-mono text-xs px-2">
                      <span>INGREDIENT</span>
                      <span>UNIT COST</span>
                    </div>
                    {ingredients.map((ing) => (
                      <div key={ing.id} className="flex gap-4 items-center bg-deep-black/50 p-2 rounded border border-white/5 focus-within:border-cyber-cyan/50 transition-colors">
                        <input type="text" value={ing.name} onChange={(e) => updateIngredient(ing.id, 'name', e.target.value)} className="flex-grow bg-transparent text-ghost-white font-rajdhani focus:outline-none text-sm sm:text-base" />
                        <div className="relative w-20 sm:w-24 shrink-0">
                          <DollarSign className="absolute left-1 top-1 w-4 h-4 text-ghost-white/50" />
                          <input type="number" step="0.01" value={ing.cost} onChange={(e) => updateIngredient(ing.id, 'cost', parseFloat(e.target.value) || 0)} className="w-full bg-transparent text-cyber-cyan font-mono focus:outline-none pl-6 text-sm sm:text-base" />
                        </div>
                        <button onClick={() => removeIngredient(ing.id)} className="text-alert-red hover:text-red-400 p-1 shrink-0"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    ))}
                    <Button variant="glass" size="sm" onClick={addIngredient} className="w-full flex justify-center items-center gap-2 border-dashed border-cyber-cyan/30 text-cyber-cyan hover:border-cyber-cyan mt-4">
                      <Plus className="w-4 h-4" /> Add Ingredient
                    </Button>
                  </div>
                  
                  {/* Action Button */}
                  <Button variant="neon-cyan" className="w-full mt-auto" onClick={fireToKitchen}>
                    Fire to KDS Display
                  </Button>
                </div>

                {/* Dashboard & KDS View */}
                <div className="flex flex-col gap-6">
                  {/* Margin Dashboard */}
                  <div className="glass p-6 rounded-2xl border border-ghost-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-cyan/10 blur-[50px] rounded-full"></div>
                    <h2 className="text-xl font-orbitron text-ghost-white mb-4">Batch Analysis</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-deep-black/60 p-4 rounded-xl border border-white/5 flex justify-between sm:block">
                        <p className="text-ghost-white/50 font-mono text-xs mb-1">TOTAL COST</p>
                        <p className="text-xl sm:text-2xl font-mono text-alert-red">{formatPrice(totalCost)}</p>
                      </div>
                      <div className="bg-deep-black/60 p-4 rounded-xl border border-white/5 flex justify-between sm:block">
                        <p className="text-ghost-white/50 font-mono text-xs mb-1">TOTAL REVENUE</p>
                        <p className="text-xl sm:text-2xl font-mono text-neon-green">{formatPrice(totalRevenue)}</p>
                      </div>
                      <div className="bg-deep-black/60 p-4 rounded-xl border border-white/5 flex justify-between sm:block">
                        <p className="text-ghost-white/50 font-mono text-xs mb-1">GROSS PROFIT</p>
                        <p className="text-xl sm:text-2xl font-mono text-cyber-cyan">{formatPrice(profit)}</p>
                      </div>
                      <div className={`p-4 rounded-xl border flex justify-between sm:block ${margin >= 70 ? 'bg-neon-green/10 border-neon-green/30' : margin >= 30 ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-alert-red/10 border-alert-red/30'}`}>
                        <p className="text-ghost-white/70 font-mono text-xs mb-1">MARGIN %</p>
                        <p className={`text-xl sm:text-2xl font-orbitron font-bold ${margin >= 70 ? 'text-neon-green' : margin >= 30 ? 'text-yellow-500' : 'text-alert-red'}`}>{margin.toFixed(1)}%</p>
                      </div>
                    </div>
                  </div>

                  {/* KDS Simulator */}
                  <div className="glass p-6 rounded-2xl border border-cyber-cyan/20 flex-grow flex flex-col">
                    <h2 className="text-xl font-orbitron text-cyber-cyan mb-4 flex items-center gap-2"><ChefHat className="w-5 h-5" /> Live KDS Screen</h2>
                    <div className="flex-grow bg-deep-black/50 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-hidden border border-white/5">
                      {kdsTickets.length === 0 ? (
                         <div className="col-span-1 sm:col-span-2 flex items-center justify-center text-ghost-white/30 font-mono text-sm">NO ACTIVE TICKETS</div>
                      ) : (
                        <AnimatePresence>
                          {kdsTickets.map((ticket) => (
                            <motion.div key={ticket.id} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white/5 border-l-4 border-cyber-cyan rounded p-3 shadow-neon-cyan flex flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-start mb-2 border-b border-white/10 pb-2">
                                  <span className="font-orbitron font-bold text-ghost-white">#{ticket.id.toString().slice(-4)}</span>
                                  <span className="font-mono text-xs text-cyber-cyan">{ticket.time}</span>
                                </div>
                                <p className="font-rajdhani text-lg text-ghost-white leading-tight">{ticket.qty}x {ticket.name}</p>
                              </div>
                              <button onClick={() => setKdsTickets(kdsTickets.filter(t => t.id !== ticket.id))} className="mt-4 text-xs font-mono bg-cyber-cyan/20 text-cyber-cyan py-1 rounded hover:bg-cyber-cyan hover:text-black transition-colors">Mark Complete</button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ======================= ENTERPRISE ERP MODE ======================= */}
            {activeTab === 'erp' && (
              <motion.div key="erp" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full">
                
                <div className="glass p-6 md:p-8 rounded-2xl border border-electric-purple/40 relative overflow-hidden h-auto min-h-[600px] flex flex-col">
                  {/* Decorative Radars/Grids */}
                  <div className="absolute top-0 right-0 w-[150vw] h-[150vw] md:w-[500px] md:h-[500px] bg-electric-purple/5 rounded-full blur-[80px] pointer-events-none"></div>
                  <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none"></div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 relative z-10 border-b border-electric-purple/20 pb-4 gap-4">
                    <h2 className="text-2xl md:text-3xl font-orbitron text-electric-purple flex items-center gap-3">
                      <Globe className="w-8 h-8 shrink-0" /> Global Control Center
                    </h2>
                    <div className="flex items-center gap-2 bg-neon-green/10 text-neon-green px-3 py-1 rounded-full border border-neon-green/30 self-start sm:self-auto">
                      <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></div>
                      <span className="font-mono text-xs whitespace-nowrap">ALL SYSTEMS NOMINAL</span>
                    </div>
                  </div>

                  {/* Live Stat Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10 mb-10">
                    <div className="bg-deep-black/80 border border-electric-purple/30 rounded-xl p-4 md:p-6 shadow-[0_0_15px_rgba(191,0,255,0.1)]">
                       <p className="text-ghost-white/50 font-mono text-xs md:text-sm mb-2 flex items-center gap-2"><DollarSign className="w-4 h-4 text-neon-green" /> GROSS VOLUME</p>
                       <p className="text-2xl md:text-3xl lg:text-4xl font-mono text-ghost-white break-all">{formatPrice(liveData.revenue)}</p>
                    </div>
                    <div className="bg-deep-black/80 border border-electric-purple/30 rounded-xl p-4 md:p-6 shadow-[0_0_15px_rgba(191,0,255,0.1)]">
                       <p className="text-ghost-white/50 font-mono text-xs md:text-sm mb-2 flex items-center gap-2"><Activity className="w-4 h-4 text-cyber-cyan" /> TRANSACTIONS</p>
                       <p className="text-2xl md:text-3xl lg:text-4xl font-mono text-ghost-white">{liveData.orders.toLocaleString()}</p>
                    </div>
                    <div className="bg-deep-black/80 border border-electric-purple/30 rounded-xl p-4 md:p-6 shadow-[0_0_15px_rgba(191,0,255,0.1)]">
                       <p className="text-ghost-white/50 font-mono text-xs md:text-sm mb-2 flex items-center gap-2"><Server className="w-4 h-4 text-electric-purple" /> ACTIVE NODES</p>
                       <p className="text-2xl md:text-3xl lg:text-4xl font-mono text-ghost-white">{liveData.activeTerminals}</p>
                    </div>
                    <div className="bg-deep-black/80 border border-electric-purple/30 rounded-xl p-4 md:p-6 shadow-[0_0_15px_rgba(191,0,255,0.1)]">
                       <p className="text-ghost-white/50 font-mono text-xs md:text-sm mb-2 flex items-center gap-2"><Factory className="w-4 h-4 text-alert-red" /> CLOUD LOAD</p>
                       <p className="text-2xl md:text-3xl lg:text-4xl font-mono text-ghost-white">{liveData.cpuLoad}%</p>
                    </div>
                  </div>

                  {/* Faux Terminal Log */}
                  <div className="flex-grow bg-deep-black/90 border border-white/10 rounded-xl p-4 font-mono text-[10px] md:text-xs text-ghost-white/60 relative z-10 overflow-hidden flex flex-col justify-end h-48 md:h-auto">
                     <p className="text-neon-green mb-2">Ghostwire ERP Terminal v2.4.1 connected.</p>
                     <p> &gt; [SYS] Syncing inventory from Node-A4...</p>
                     <p> &gt; [LOG] Purchase order #PO-992 auto-generated (Low stock: Syn-Beef).</p>
                     <p> &gt; [NET] Secure connection established with Payment Gateway.</p>
                     <p> &gt; [DATA] Polling 142 active registers for live transaction telemetry...</p>
                     <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, duration: 2 }} className="text-electric-purple mt-2">
                       Awaiting operator command_ <span className="animate-pulse">|</span>
                     </motion.p>
                  </div>

                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </main>
  );
}