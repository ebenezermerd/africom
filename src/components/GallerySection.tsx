import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const galleryImages1 = [
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2774&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1501854140884-074bf86ee91c?q=80&w=2670&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=2670&auto=format&fit=crop',
];

const galleryImages2 = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2673&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2664&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2670&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop',
];

function GalleryImage({ src, index }: any) {
  return (
    <div className="w-[400px] h-[250px] relative rounded-lg overflow-hidden group cursor-pointer flex-shrink-0">
      <img 
        src={src} 
        alt={`Gallery ${index}`}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
      <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
        <span className="text-xs font-mono text-[#4ade80] bg-black/80 px-2 py-1">
          IMG_{String(index + 1).padStart(3, '0')}.RAW
        </span>
      </div>
    </div>
  );
}

export default function GallerySection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section 
      id="gallery" 
      ref={containerRef}
      className="py-32 bg-[#020202] relative overflow-hidden"
    >
      {/* Top gradient transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#030303] to-transparent z-20 pointer-events-none" />
      
      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
      {/* Header */}
      <div className="text-center mb-16 relative z-10 px-6">
        <motion.span
          className="text-[#4ade80] text-xs font-bold tracking-widest uppercase border border-[#4ade80]/20 px-4 py-2 rounded-full bg-[#4ade80]/5 inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Archive
        </motion.span>
        <motion.h2
          className="text-5xl md:text-8xl font-bold text-white mt-8 tracking-tighter"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          VISUAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">DATA</span>
        </motion.h2>
      </div>

      {/* Marquee Row 1 */}
      <div 
        className="w-full overflow-hidden mb-8 relative z-0"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
      >
        <motion.div 
          className="flex gap-4"
          animate={{ x: [0, -1600] }}
          transition={{ 
            duration: 40, 
            repeat: Infinity, 
            ease: "linear",
            repeatType: "loop"
          }}
        >
          {[...galleryImages1, ...galleryImages1].map((src, i) => (
            <GalleryImage key={i} src={src} index={i % galleryImages1.length} />
          ))}
        </motion.div>
      </div>

      {/* Marquee Row 2 (Reverse) */}
      <div 
        className="w-full overflow-hidden relative z-0"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
      >
        <motion.div 
          className="flex gap-4"
          animate={{ x: [-1600, 0] }}
          transition={{ 
            duration: 40, 
            repeat: Infinity, 
            ease: "linear",
            repeatType: "loop"
          }}
        >
          {[...galleryImages2, ...galleryImages2].map((src, i) => (
            <GalleryImage key={i} src={src} index={i % galleryImages2.length + 4} />
          ))}
        </motion.div>
      </div>

      {/* Side Gradients */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black via-transparent to-black z-10" />
    </section>
  );
}