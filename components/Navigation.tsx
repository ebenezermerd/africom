import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  // Added Showcase and FAQ to the navigation items
  const navItems = ['Home', 'About', 'Ecosystems', 'Showcase', 'Gallery', 'FAQ'];

  return (
    <>
      <motion.nav
        className="fixed z-50 left-0 right-0 flex justify-center transition-all duration-500"
        initial={{ y: -100 }}
        animate={{ y: 0, top: scrolled ? 24 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className={`flex items-center justify-between backdrop-blur-xl border transition-all duration-500 ${
            scrolled 
              ? 'w-[95%] md:w-[750px] rounded-full px-6 py-3 bg-black/60 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]' 
              : 'w-full px-6 md:px-12 py-6 bg-transparent border-transparent'
          }`}
          layout
        >
          {/* Logo */}
          <motion.a 
            href="#home"
            onClick={(e) => handleScroll(e, 'home')}
            className="flex items-center gap-2 group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            layout
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:border-[#4ade80] transition-colors">
              <Leaf className="w-4 h-4 text-[#4ade80]" />
            </div>
            <div className={`flex flex-col leading-none ${scrolled ? 'hidden sm:flex' : 'flex'}`}>
              <span className="font-bold tracking-tight text-sm text-white">AFRICAN</span>
              <span className="text-[10px] tracking-widest text-white/50">JOURNEY</span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleScroll(e, item.toLowerCase())}
                // Changed text-xs to text-sm for larger text
                className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-full transition-all relative group"
              >
                {item}
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#4ade80] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>

          {/* CTA / Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <motion.a 
               href="#faq"
               onClick={(e) => handleScroll(e, 'faq')}
               className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wide hover:bg-[#4ade80] transition-colors ${scrolled ? 'scale-90' : ''}`}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
            >
              <span>Join</span>
              <ArrowUpRight className="w-3 h-3" />
            </motion.a>

            <button 
              className="md:hidden text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#050505] flex items-center justify-center md:hidden"
            initial={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at top right)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2674')] bg-cover opacity-10 pointer-events-none" />
             
            <div className="flex flex-col items-center gap-8 relative z-10">
              {navItems.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => handleScroll(e, item.toLowerCase())}
                  className="text-4xl font-serif italic text-white/50 hover:text-white hover:scale-110 transition-all cursor-pointer"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <div className="text-[#4ade80] text-xs tracking-[0.3em] uppercase mb-2 text-center">Contact Us</div>
                <div className="text-white text-sm opacity-50">hello@africanjourney.com</div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}