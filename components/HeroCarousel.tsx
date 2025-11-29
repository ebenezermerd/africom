import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play, Instagram, Twitter, Facebook } from 'lucide-react';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2674&auto=format&fit=crop",
    title1: "AFRICAN", title2: "FOREST", label: "Amazing Trips",
    desc: "There is a moment in the life of any aspiring astronomer that it is time to buy that first telescope. Experience the wild."
  },
  {
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2670&auto=format&fit=crop",
    title1: "NORDIC", title2: "TUNDRA", label: "Frozen Lands",
    desc: "Witness the silent majesty of the north. Glaciers, fjords, and the dancing lights of the aurora borealis."
  },
  {
    image: "https://images.unsplash.com/photo-1682687220199-d0124f48f95b?q=80&w=2670&auto=format&fit=crop",
    title1: "SAHARA", title2: "DUNES", label: "Endless Sand",
    desc: "Experience the infinite horizon of the world's largest hot desert. A journey through time and silence."
  },
  {
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2572&auto=format&fit=crop",
    title1: "PACIFIC", title2: "REEFS", label: "Deep Blue",
    desc: "Dive into a kaleidoscope of color. Preserving marine life and the vibrant coral cities beneath the waves."
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 1000);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 1000);
  }, [isAnimating]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleScrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const slide = slides[currentSlide];

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-black">
      {/* Bottom gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-30 pointer-events-none" />
      {/* Background Image with Parallax */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }}
          exit={{ scale: 1.0, opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Split Layout Overlay */}
      <div className="absolute inset-0 z-10 grid grid-cols-1 md:grid-cols-12 h-full pointer-events-none">
        {/* Left Frosted Pane - 5 columns on md+ */}
        <div className="hidden md:block col-span-5 h-full backdrop-blur-sm bg-gradient-to-r from-black/80 to-black/20 border-r border-white/5 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
        </div>
        {/* Right Clear Pane - 7 columns */}
        <div className="col-span-7 h-full" />
      </div>

      {/* Content - positioned to align with the left pane */}
      <div className="relative z-20 flex flex-col w-full h-full px-6 md:px-12 justify-center">
        <div className="grid grid-cols-1 md:grid-cols-12 w-full items-center">
          {/* Content stays within the first 5 columns on desktop */}
          <div className="col-span-12 md:col-span-5 relative">
            {/* Label */}
            <div className="overflow-hidden mb-4">
              <motion.p
                key={`label-${currentSlide}`}
                className="text-xs font-medium tracking-[0.3em] text-[#4ade80] uppercase"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {slide.label}
              </motion.p>
            </div>

            {/* Main Title - constrained to left pane */}
            <div className="overflow-hidden">
              <motion.h1
                key={`title1-${currentSlide}`}
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.85] tracking-tighter text-white"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {slide.title1}
              </motion.h1>
            </div>
            
            <div className="overflow-hidden">
              <motion.h1
                key={`title2-${currentSlide}`}
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.85] tracking-tighter text-[#4ade80]"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {slide.title2}
              </motion.h1>
            </div>

            {/* Description */}
            <motion.div 
              className="mt-8 max-w-md"
              key={`desc-${currentSlide}`}
            >
              <motion.p
                className="text-sm md:text-base font-light text-white/70 leading-relaxed border-l border-[#4ade80] pl-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {slide.desc}
              </motion.p>

              <motion.div 
                className="mt-8 flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <motion.button
                  className="px-6 py-3 bg-white text-black text-xs font-bold tracking-widest uppercase hover:bg-[#4ade80] transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleScrollToAbout}
                >
                  Explore Now
                </motion.button>
                <motion.button
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-4 h-4 fill-current" />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Controls - Bottom Right */}
        <div className="absolute bottom-12 right-6 md:right-12 flex items-center gap-6 z-40">
          <div className="flex gap-1">
            <span className="text-2xl font-light text-white">
              {String(currentSlide + 1).padStart(2, '0')}
            </span>
            <span className="text-xs font-light text-white/40 mt-1">/ {String(slides.length).padStart(2, '0')}</span>
          </div>
          <div className="flex gap-2">
            <motion.button
              onClick={prevSlide}
              className="w-12 h-12 border border-white/10 bg-black/20 hover:bg-white hover:text-black backdrop-blur-md flex items-center justify-center transition-all duration-300 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={nextSlide}
              className="w-12 h-12 border border-white/10 bg-black/20 hover:bg-white hover:text-black backdrop-blur-md flex items-center justify-center transition-all duration-300 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Vertical Progress Bar */}
          <div className="absolute bottom-20 right-[-1px] hidden md:block h-32 w-[1px] bg-white/10">
            <motion.div 
              className="w-full bg-[#4ade80]"
              initial={{ height: '0%' }}
              animate={{ height: `${((currentSlide + 1) / slides.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Social Links - Bottom Left */}
        <div className="absolute bottom-12 left-6 md:left-12 flex gap-6 text-white/40 z-40">
          <a href="#" className="hover:text-white transition-colors" onClick={(e) => e.preventDefault()}><Instagram className="w-5 h-5" /></a>
          <a href="#" className="hover:text-white transition-colors" onClick={(e) => e.preventDefault()}><Twitter className="w-5 h-5" /></a>
          <a href="#" className="hover:text-white transition-colors" onClick={(e) => e.preventDefault()}><Facebook className="w-5 h-5" /></a>
        </div>
      </div>
    </section>
  );
}