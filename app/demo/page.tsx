'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, ChefHat, Plus, Trash2, Receipt, ArrowRight, DollarSign, 
  ScanLine, Users, CheckCircle2, Factory, Activity, Globe, Server, 
  Barcode, Monitor, Coffee, Printer, Touchpad
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<'retail' | 'fnb' | 'erp'>('retail');

  // ==========================================
  // RETAIL STATE (POS Checkout & CFD)
  // ==========================================
  const [retailProducts, setRetailProducts] = useState([
    { id: 1, name: 'Quantum Jacket', price: 120.00, color: 'neon-green' },
    { id: 2, name: 'Neural Visor', price: 45.50, color: 'cyber-cyan' },
    { id: 3, name: 'Hover-Boots v2', price: 180.00, color: 'electric-purple' },
    { id: 4, name: 'Energy Cell', price: 15.00, color: 'neon-green' },
  ]);
  
  const [cart, setCart] = useState<{id: number, name: string, price: number, qty: number}[]>([]);
  const [loyaltyActive, setLoyaltyActive] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  
  // Barcode Generator State
  const [showBarcodeGen, setShowBarcodeGen] = useState(false);
  const [customItem, setCustomItem] = useState({ name: '', price: '' });

  const addToCart = (product: any) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const generateBarcode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customItem.name || !customItem.price) return;
    
    const newItem = {
      id: Date.now(),
      name: customItem.name,
      price: parseFloat(customItem.price),
      color: 'ghost-white'
    };
    
    setRetailProducts([...retailProducts, newItem]);
    setCustomItem({ name: '', price: '' });
    setShowBarcodeGen(false);
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
  // F&B STATE (Kiosk, Recipe & Multi-Route KDS)
  // ==========================================
  const [fnbView, setFnbView] = useState<'staff' | 'kiosk'>('kiosk');
  const [kdsTickets, setKdsTickets] = useState<{id: number, name: string, qty: number, route: 'kitchen' | 'bar', time: string}[]>([]);

  // Staff Recipe Builder State
  const [dishName, setDishName] = useState('Cyber-Burger Matrix');
  const [sellingPrice, setSellingPrice] = useState(15.99);
  const [batchYield, setBatchYield] = useState(1);
  const [dishRoute, setDishRoute] = useState<'kitchen' | 'bar'>('kitchen');

  // Kiosk Menu
  const kioskMenu = [
    { id: 101, name: 'Neon Burger', price: 12.99, route: 'kitchen', icon: ChefHat, color: 'alert-red' },
    { id: 102, name: 'Synth-Fries', price: 4.99, route: 'kitchen', icon: ChefHat, color: 'alert-red' },
    { id: 103, name: 'Quantum Cola', price: 3.50, route: 'bar', icon: Coffee, color: 'cyber-cyan' },
    { id: 104, name: 'Plasma Mojito', price: 8.00, route: 'bar', icon: Coffee, color: 'cyber-cyan' },
  ];

  const fireToKDS = (name: string, qty: number, route: 'kitchen' | 'bar') => {
    const newTicket = {
      id: Date.now() + Math.floor(Math.random() * 100),
      name,
      qty,
      route,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setKdsTickets(prev => [newTicket, ...prev].slice(0, 8)); // Keep max 8 tickets
  };


  // ==========================================
  // ENTERPRISE ERP STATE
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
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-orbitron text-ghost-white mb-4">
            SYSTEM <span className="text-glow-cyan">SIMULATION</span>
          </h1>
          <p className="font-rajdhani text-xl text-ghost-white/60">
            Interact with live Ghostwire calculation modules and UI nodes.
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
              <motion.div key="retail" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 1. Terminal Input & Barcode Gen (Left Column) */}
                <div className="lg:col-span-5 glass p-6 rounded-2xl border border-neon-green/30 flex flex-col relative overflow-hidden">
                  <div className="flex justify-between items-center border-b border-neon-green/20 pb-4 mb-6 relative z-10">
                    <h2 className="text-xl font-orbitron text-neon-green">Terminal Scanner</h2>
                    <Button variant="glass" size="sm" onClick={() => setShowBarcodeGen(!showBarcodeGen)} className="flex gap-2 items-center text-neon-green border-neon-green hover:bg-neon-green hover:text-black">
                      <Barcode className="w-4 h-4" /> Custom Barcode
                    </Button>
                  </div>
                  
                  {/* Barcode Generator Form */}
                  <AnimatePresence>
                    {showBarcodeGen && (
                      <motion.form 
                        initial={{ height: 0, opacity: 0, mb: 0 }} 
                        animate={{ height: 'auto', opacity: 1, mb: 24 }} 
                        exit={{ height: 0, opacity: 0, mb: 0 }}
                        onSubmit={generateBarcode}
                        className="bg-neon-green/5 border border-neon-green/30 rounded-xl p-4 overflow-hidden"
                      >
                        <p className="font-mono text-xs text-neon-green mb-3">GENERATE NON-BARCODED ITEM (e.g., Produce, Loose Items)</p>
                        <div className="flex gap-3">
                          <input type="text" placeholder="Item Name (e.g. Loose Rice)" required value={customItem.name} onChange={e => setCustomItem({...customItem, name: e.target.value})} className="flex-grow bg-deep-black border border-white/10 rounded px-3 py-2 text-sm font-rajdhani focus:outline-none focus:border-neon-green text-white" />
                          <div className="relative w-24">
                            <DollarSign className="absolute left-2 top-2 w-4 h-4 text-white/50" />
                            <input type="number" step="0.01" placeholder="0.00" required value={customItem.price} onChange={e => setCustomItem({...customItem, price: e.target.value})} className="w-full bg-deep-black border border-white/10 rounded pl-7 pr-2 py-2 text-sm font-mono focus:outline-none focus:border-neon-green text-neon-green" />
                          </div>
                          <button type="submit" className="bg-neon-green text-black p-2 rounded hover:brightness-110"><Plus className="w-5 h-5" /></button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>

                  <div className="grid grid-cols-2 gap-4 mb-6 flex-grow overflow-y-auto pr-2 max-h-[400px]">
                    {retailProducts.map(product => (
                      <button key={product.id} onClick={() => addToCart(product)} className="bg-deep-black border border-ghost-white/10 rounded-xl p-4 text-left hover:border-neon-green hover:shadow-neon-green transition-all group flex flex-col justify-between h-24">
                        <div className="flex justify-between items-start w-full">
                          <div className={`w-3 h-3 rounded-full bg-${product.color} group-hover:animate-pulse`}></div>
                          {product.color === 'ghost-white' && <Barcode className="w-4 h-4 text-white/30" />}
                        </div>
                        <div>
                          <p className="font-orbitron text-ghost-white text-sm mb-1 truncate">{product.name}</p>
                          <p className="font-mono text-neon-green">{formatPrice(product.price)}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Cashier Cart Register (Middle Column) */}
                <div className="lg:col-span-4 glass p-6 rounded-2xl border border-ghost-white/10 flex flex-col h-[600px] relative overflow-hidden">
                  <h2 className="text-xl font-orbitron text-ghost-white mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
                    <Receipt className="text-neon-green w-5 h-5" /> Active Register
                  </h2>
                  
                  <div className="flex-grow overflow-y-auto pr-2 space-y-4 mb-4">
                    {cart.length === 0 ? (
                      <p className="text-ghost-white/40 font-mono text-center mt-10 text-sm">SCAN ITEMS TO BEGIN</p>
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

                  <div className="border-t border-white/10 pt-4 space-y-2 mb-4">
                    <div className="flex justify-between text-ghost-white/70 font-mono text-sm"><span>Subtotal</span><span>{formatPrice(cartSubtotal)}</span></div>
                    {loyaltyActive && <div className="flex justify-between text-neon-green font-mono text-sm"><span>Loyalty (-10%)</span><span>-{formatPrice(discount)}</span></div>}
                    <div className="flex justify-between text-ghost-white/70 font-mono text-sm"><span>Tax (8%)</span><span>{formatPrice(tax)}</span></div>
                    <div className="flex justify-between text-ghost-white font-orbitron text-xl mt-2 pt-2 border-t border-white/10">
                      <span>TOTAL</span><span className="text-neon-green">{formatPrice(cartTotal)}</span>
                    </div>
                  </div>

                  <Button variant="neon-green" className="w-full flex justify-center items-center gap-2" onClick={processPayment} disabled={cart.length === 0}>
                    Process Payment <ArrowRight className="w-4 h-4" />
                  </Button>

                  {/* Checkout Overlay */}
                  <AnimatePresence>
                    {checkoutSuccess && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-deep-black/95 backdrop-blur-md flex flex-col items-center justify-center p-6 border border-neon-green z-20">
                        <CheckCircle2 className="w-16 h-16 text-neon-green mb-4 shadow-neon-green rounded-full" />
                        <h3 className="text-xl font-orbitron text-ghost-white mb-2">Payment Approved</h3>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 3. Customer Facing Display (Right Column) */}
                <div className="lg:col-span-3 bg-deep-black border-4 border-dark-grey rounded-2xl flex flex-col overflow-hidden relative shadow-2xl">
                   {/* Tablet Camera Bezel */}
                   <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rounded-full border border-white/10 z-20"></div>
                   
                   <div className="bg-gradient-to-b from-dark-grey to-deep-black p-6 flex flex-col h-full relative z-10">
                      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4 mt-2">
                        <h3 className="font-orbitron text-sm text-white/50 flex items-center gap-2"><Monitor className="w-4 h-4" /> CUSTOMER DISPLAY</h3>
                      </div>
                      
                      <div className="flex-grow flex flex-col justify-center items-center text-center">
                        {cart.length === 0 ? (
                           <div className="space-y-4">
                             <div className="w-20 h-20 mx-auto bg-neon-green/10 rounded-full flex items-center justify-center animate-pulse-glow">
                                <ShoppingCart className="w-10 h-10 text-neon-green" />
                             </div>
                             <h2 className="text-2xl font-orbitron text-ghost-white">Welcome to<br/>Neo-Mart</h2>
                             <p className="text-white/40 font-mono text-xs">Please scan your first item.</p>
                           </div>
                        ) : (
                          <motion.div key={cart.length} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full">
                             <p className="text-white/50 font-rajdhani mb-2 uppercase tracking-widest text-sm">Last Item Scanned</p>
                             <div className="bg-white/5 rounded-lg p-4 mb-8 border border-white/10">
                               <p className="text-xl font-orbitron text-white mb-1 truncate">{cart[cart.length - 1].name}</p>
                               <p className="text-lg font-mono text-neon-green">{formatPrice(cart[cart.length - 1].price)}</p>
                             </div>
                             
                             <p className="text-white/50 font-rajdhani mb-1 uppercase tracking-widest text-sm">Total Amount Due</p>
                             <p className="text-5xl font-mono text-white tracking-tight">{formatPrice(cartTotal)}</p>
                             
                             <div className="mt-8 pt-6 border-t border-white/10 w-full flex justify-center">
                                <button onClick={() => setLoyaltyActive(!loyaltyActive)} className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs transition-colors ${loyaltyActive ? 'bg-neon-green text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                                  <Users className="w-4 h-4" /> {loyaltyActive ? 'MEMBER LINKED' : 'TAP MEMBER CARD'}
                                </button>
                             </div>
                          </motion.div>
                        )}
                      </div>
                   </div>
                </div>

              </motion.div>
            )}

            {/* ======================= F&B CULINARY MODE ======================= */}
            {activeTab === 'fnb' && (
              <motion.div key="fnb" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex flex-col gap-8">
                
                {/* Mode Toggle */}
                <div className="flex justify-center">
                  <div className="bg-deep-black border border-cyber-cyan/30 rounded-full p-1 flex">
                    <button onClick={() => setFnbView('kiosk')} className={`px-6 py-2 rounded-full font-orbitron text-sm transition-all flex items-center gap-2 ${fnbView === 'kiosk' ? 'bg-cyber-cyan text-black shadow-neon-cyan' : 'text-white/50 hover:text-white'}`}>
                      <Touchpad className="w-4 h-4" /> Self-Serve Kiosk
                    </button>
                    <button onClick={() => setFnbView('staff')} className={`px-6 py-2 rounded-full font-orbitron text-sm transition-all flex items-center gap-2 ${fnbView === 'staff' ? 'bg-cyber-cyan text-black shadow-neon-cyan' : 'text-white/50 hover:text-white'}`}>
                      <Monitor className="w-4 h-4" /> Staff Terminal
                    </button>
                  </div>
                </div>

                {/* Input Area (Kiosk vs Staff) */}
                <div className="glass p-8 rounded-2xl border border-cyber-cyan/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-cyber-cyan/5 pointer-events-none"></div>
                  
                  {fnbView === 'kiosk' ? (
                    // KIOSK UI
                    <div className="relative z-10">
                      <h2 className="text-2xl font-orbitron text-ghost-white mb-6 text-center">TAP TO ORDER</h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {kioskMenu.map(item => (
                          <button 
                            key={item.id} 
                            onClick={() => fireToKDS(item.name, 1, item.route as 'kitchen'|'bar')}
                            className={`bg-deep-black/60 border border-${item.color}/30 p-6 rounded-xl flex flex-col items-center justify-center gap-4 hover:border-${item.color} hover:bg-${item.color}/10 transition-all group`}
                          >
                            <item.icon className={`w-12 h-12 text-${item.color} group-hover:scale-110 transition-transform`} />
                            <div className="text-center">
                              <p className="font-orbitron text-white text-sm">{item.name}</p>
                              <p className="font-mono text-white/50 text-xs mt-1">{formatPrice(item.price)}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // STAFF RECIPE UI
                    <div className="relative z-10 flex flex-col md:flex-row gap-6 items-end">
                      <div className="w-full md:w-1/3">
                        <label className="text-cyber-cyan font-mono text-xs mb-1 block">CUSTOM DISH</label>
                        <input type="text" value={dishName} onChange={(e) => setDishName(e.target.value)} className="w-full bg-transparent border-b border-white/20 text-xl font-orbitron text-white focus:outline-none focus:border-cyber-cyan pb-1" />
                      </div>
                      <div className="w-full md:w-1/6">
                        <label className="text-cyber-cyan font-mono text-xs mb-1 block">QTY</label>
                        <input type="number" min="1" value={batchYield} onChange={(e) => setBatchYield(Number(e.target.value))} className="w-full bg-transparent border-b border-white/20 text-xl font-mono text-white focus:outline-none focus:border-cyber-cyan pb-1" />
                      </div>
                      <div className="w-full md:w-1/4">
                        <label className="text-cyber-cyan font-mono text-xs mb-1 block">ROUTING</label>
                        <select value={dishRoute} onChange={(e) => setDishRoute(e.target.value as 'kitchen'|'bar')} className="w-full bg-deep-black border-b border-white/20 text-lg font-rajdhani text-white focus:outline-none focus:border-cyber-cyan pb-1 py-1">
                          <option value="kitchen">Kitchen (Hot Food)</option>
                          <option value="bar">Bar (Drinks)</option>
                        </select>
                      </div>
                      <div className="w-full md:w-1/4">
                        <Button variant="neon-cyan" className="w-full" onClick={() => fireToKDS(dishName, batchYield, dishRoute)}>
                          Fire Order
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Multi-Routing KDS View */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* KITCHEN KDS */}
                  <div className="glass p-6 rounded-2xl border border-alert-red/30 flex flex-col h-[400px]">
                    <h2 className="text-xl font-orbitron text-alert-red mb-4 flex items-center justify-between border-b border-alert-red/20 pb-3">
                      <span className="flex items-center gap-2"><ChefHat className="w-5 h-5" /> Kitchen Display</span>
                      <Printer className="w-4 h-4 opacity-50" />
                    </h2>
                    <div className="flex-grow bg-deep-black/50 rounded-xl p-4 overflow-y-auto space-y-3">
                      {kdsTickets.filter(t => t.route === 'kitchen').length === 0 ? (
                        <div className="h-full flex items-center justify-center text-white/20 font-mono text-sm">NO HOT ORDERS</div>
                      ) : (
                        <AnimatePresence>
                          {kdsTickets.filter(t => t.route === 'kitchen').map(ticket => (
                            <motion.div key={ticket.id} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="bg-alert-red/10 border-l-4 border-alert-red rounded p-3">
                              <div className="flex justify-between items-start mb-1">
                                <span className="font-orbitron font-bold text-white">#{ticket.id.toString().slice(-4)}</span>
                                <span className="font-mono text-xs text-alert-red">{ticket.time}</span>
                              </div>
                              <p className="font-rajdhani text-lg text-white">{ticket.qty}x {ticket.name}</p>
                              <button onClick={() => setKdsTickets(kdsTickets.filter(t => t.id !== ticket.id))} className="mt-2 text-xs font-mono bg-alert-red/20 text-alert-red py-1 px-2 rounded hover:bg-alert-red hover:text-black">Complete</button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      )}
                    </div>
                  </div>

                  {/* BAR KDS */}
                  <div className="glass p-6 rounded-2xl border border-cyber-cyan/30 flex flex-col h-[400px]">
                    <h2 className="text-xl font-orbitron text-cyber-cyan mb-4 flex items-center justify-between border-b border-cyber-cyan/20 pb-3">
                      <span className="flex items-center gap-2"><Coffee className="w-5 h-5" /> Bar Display</span>
                      <Printer className="w-4 h-4 opacity-50" />
                    </h2>
                    <div className="flex-grow bg-deep-black/50 rounded-xl p-4 overflow-y-auto space-y-3">
                      {kdsTickets.filter(t => t.route === 'bar').length === 0 ? (
                        <div className="h-full flex items-center justify-center text-white/20 font-mono text-sm">NO DRINK ORDERS</div>
                      ) : (
                        <AnimatePresence>
                          {kdsTickets.filter(t => t.route === 'bar').map(ticket => (
                            <motion.div key={ticket.id} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="bg-cyber-cyan/10 border-l-4 border-cyber-cyan rounded p-3">
                              <div className="flex justify-between items-start mb-1">
                                <span className="font-orbitron font-bold text-white">#{ticket.id.toString().slice(-4)}</span>
                                <span className="font-mono text-xs text-cyber-cyan">{ticket.time}</span>
                              </div>
                              <p className="font-rajdhani text-lg text-white">{ticket.qty}x {ticket.name}</p>
                              <button onClick={() => setKdsTickets(kdsTickets.filter(t => t.id !== ticket.id))} className="mt-2 text-xs font-mono bg-cyber-cyan/20 text-cyber-cyan py-1 px-2 rounded hover:bg-cyber-cyan hover:text-black">Complete</button>
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