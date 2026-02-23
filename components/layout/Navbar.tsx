'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useRobotStore } from '@/lib/store';

// Screen positions for each section (where robot should fly)
const sectionTargets: Record<string, { x: number; y: number }> = {
  '/': { x: 0, y: 0 },
  '/products': { x: -80, y: -20 },
  '/demo': { x: 80, y: -20 },
  '/pricing': { x: 0, y: 50 },
  '/about': { x: -80, y: 50 },
  '/contact': { x: 80, y: 50 },
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { flyTo, isFlying } = useRobotStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/demo', label: 'Demo' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    
    if (isFlying) return; // Don't allow clicks while robot is flying
    
    // Send the EXACT pixel coordinates of your mouse click to the robot!
    const target = { x: e.clientX, y: e.clientY };
    
    // Tell robot to fly to target, then navigate when it arrives
    flyTo(href, target, () => {
      router.push(href);
    });
    
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass border-b border-neon-green/20 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a 
            href="/"
            onClick={(e) => handleNavClick(e, '/')}
            className="flex items-center space-x-2 group cursor-pointer"
          >
            <div className="relative">
              <Zap className="w-8 h-8 text-neon-green animate-pulse-glow" />
              <div className="absolute inset-0 blur-md bg-neon-green opacity-50 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <span className="text-2xl font-orbitron font-bold text-glow-green">
              GHOSTWIRE
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`font-rajdhani text-ghost-white hover:text-neon-green transition-colors duration-300 relative group cursor-pointer ${isFlying ? 'pointer-events-none opacity-50' : ''}`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-green group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

              {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="neon-green" size="md" disabled={isFlying} onClick={(e) => handleNavClick(e, '/portal')}>
              Client Portal
            </Button>
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-ghost-white hover:text-neon-green transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass border-t border-neon-green/20">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block font-rajdhani text-ghost-white hover:text-neon-green transition-colors py-2 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
            <Button variant="neon-green" size="md" className="w-full">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}