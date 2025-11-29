import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  const preventNav = (e: React.MouseEvent) => e.preventDefault();

  return (
    <footer className="bg-[#050505] pt-32 pb-12 px-6 md:px-12 relative overflow-hidden">
      {/* Top gradient transition */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
      {/* Large Background Text */}
      <div className="absolute top-0 left-0 w-full overflow-hidden opacity-5 select-none pointer-events-none">
        <h1 className="text-[15vw] font-bold text-white whitespace-nowrap leading-none">PRESERVE</h1>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-medium text-white mb-8 tracking-tight">Stay updated with nature</h3>
          <form className="flex flex-col gap-4">
            <div className="relative group">
              <input 
                type="email" 
                placeholder="email@address.com"
                className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-[#4ade80] transition-colors placeholder:text-white/20"
              />
              <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-[#4ade80] transition-colors" />
            </div>
          </form>
        </motion.div>

        {/* Links */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm text-white/60"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col gap-4">
            <span className="text-white font-medium mb-2">Platform</span>
            <a href="#" onClick={preventNav} className="hover:text-[#4ade80] transition-colors">Plans</a>
            <a href="#" onClick={preventNav} className="hover:text-[#4ade80] transition-colors">Mission</a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-white font-medium mb-2">Company</span>
            <a href="#" onClick={preventNav} className="hover:text-[#4ade80] transition-colors">Blog</a>
            <a href="#" onClick={preventNav} className="hover:text-[#4ade80] transition-colors">Careers</a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-white font-medium mb-2">Resources</span>
            <a href="#" onClick={preventNav} className="hover:text-[#4ade80] transition-colors">Docs</a>
            <a href="#" onClick={preventNav} className="hover:text-[#4ade80] transition-colors">Contact</a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div 
        className="max-w-7xl mx-auto mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <p>© 2024 African Journey. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" onClick={preventNav} className="hover:text-white transition-colors">Privacy</a>
          <a href="#" onClick={preventNav} className="hover:text-white transition-colors">Terms</a>
        </div>
      </motion.div>
    </footer>
  );
}