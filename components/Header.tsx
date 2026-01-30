import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const isHome = location.pathname === '/';
  // If not scrolled and on home page, use transparent theme.
  // Otherwise (scrolled OR not home), use "scrolled" theme (glassy white/dark).
  const isTransparent = isHome && !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className={`mx-auto px-6 md:px-8 transition-all duration-500 ${isScrolled ? 'max-w-5xl' : 'max-w-7xl'}`}>
        <div className={`
            flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500
            ${!isTransparent 
                ? 'bg-white/80 backdrop-blur-xl shadow-lg border border-white/40 supports-[backdrop-filter]:bg-white/60' 
                : 'bg-transparent border border-transparent'}
        `}>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <img 
                  src="/public/favicon.png" 
                  alt="CommIT Enterprise" 
                  className={`h-12 w-auto object-contain transition-all duration-300 `} 
                />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                    <Link
                    key={link.label}
                    to={link.href}
                    className={`
                        relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300
                        ${isActive 
                            ? (!isTransparent ? 'bg-brand-50 text-brand-700' : 'bg-white/20 text-white')
                            : (!isTransparent ? 'text-slate-600 hover:text-brand-600 hover:bg-slate-50' : 'text-slate-200 hover:text-white hover:bg-white/10')
                        }
                    `}
                    >
                    {link.label}
                    </Link>
                );
            })}
            </nav>

            <div className="hidden md:block">
                <Link
                    to="/contact"
                    className={`
                        px-5 py-2.5 text-sm font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                        ${!isTransparent 
                            ? 'bg-slate-900 text-white hover:bg-brand-900 shadow-slate-900/20' 
                            : 'bg-white text-brand-950 hover:bg-brand-50 shadow-black/10'
                        }
                    `}
                >
                    Get Started
                </Link>
            </div>

            {/* Mobile Toggle */}
            <button
            className={`md:hidden p-2 rounded-lg ${!isTransparent ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-24 left-6 right-6 p-4 bg-white rounded-3xl shadow-2xl border border-slate-100 md:hidden z-50 origin-top"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-4 rounded-xl text-lg font-medium transition-colors ${location.pathname === link.href ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 p-4 rounded-xl bg-brand-900 text-white text-center font-semibold text-lg"
              >
                Get Started
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};