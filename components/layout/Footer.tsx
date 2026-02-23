// FILE: components/layout/Footer.tsx
import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Mail, Zap } from 'lucide-react';
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);
export function Footer() {

  
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Features', href: '/products' },
      { label: 'Demo', href: '/demo' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'FAQ', href: '/about#faq' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/about#careers' },
      { label: 'Blog', href: '/blog' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'GDPR', href: '/gdpr' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/ghostwiresys', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/aistoriesimagined1/', label: 'Instagram' },
    { icon: TikTokIcon, href: 'https://www.tiktok.com/@ghostwiresystems', label: 'TikTok' },
    { icon: Mail, href: 'mailto:abelidoguts@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="relative border-t border-neon-green/20 bg-dark-grey">
      {/* Glowing top border effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="w-8 h-8 text-neon-green" />
              <span className="text-2xl font-orbitron font-bold text-glow-green">
                GHOSTWIRE
              </span>
            </div>
            <p className="text-ghost-white/70 font-rajdhani mb-6 max-w-sm">
              Next-generation Point of Sale and ERP system designed for the future of retail, hospitality, and enterprise management.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-ghost-white hover:text-neon-green hover:border-neon-green border border-transparent transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-neon-green font-orbitron font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-ghost-white/70 hover:text-neon-green transition-colors font-rajdhani"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-cyber-cyan font-orbitron font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-ghost-white/70 hover:text-cyber-cyan transition-colors font-rajdhani"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-electric-purple font-orbitron font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-ghost-white/70 hover:text-electric-purple transition-colors font-rajdhani"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-ghost-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-ghost-white/50 text-sm font-rajdhani">
              © {currentYear} Ghostwire Systems. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Background Grid Effect */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none"></div>
    </footer>
  );
}