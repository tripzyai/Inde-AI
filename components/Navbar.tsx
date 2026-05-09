'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Button from './ui/Button';

interface NavbarProps {
  onOpenChatbot: () => void;
}

export default function Navbar({ onOpenChatbot }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#industries', label: 'Industries' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#faq', label: 'FAQ' },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white border-b transition-shadow duration-300 ${isScrolled ? 'shadow-sm border-slate-200' : 'border-transparent'}`}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 bg-[#635bff] rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl font-bold">I</span>
              </div>
              <span className="text-xl font-bold text-[#0f172a]">Inde AI</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[#0f172a] hover:text-[#635bff] font-medium transition-colors whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
              <Button variant="primary" onClick={onOpenChatbot}>
                Book Free Audit
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#0f172a] p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20 md:hidden">
          <div className="flex flex-col items-center gap-6 p-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="text-xl text-[#0f172a] hover:text-[#635bff] font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button variant="primary" className="mt-4" onClick={onOpenChatbot}>
              Book Free Audit
            </Button>
          </div>
        </div>
      )}

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-20"></div>
    </>
  );
}
