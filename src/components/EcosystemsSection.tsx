import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CloudRain, Mountain, Waves, TreePine, Bird, Fish, Leaf, Snowflake, Sun, Wind, Droplets, Flame, Globe, Compass } from 'lucide-react';

const ecosystems = [
  {
    id: 'SYS_01',
    icon: CloudRain,
    title: 'Rainforest Core',
    shortDesc: 'High density carbon sequestration units operating at maximum efficiency.',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2727&auto=format&fit=crop',
    status: 'System Status: Optimal',
    details: 'Bio-diversity index currently at 94%. Carbon capture rate exceeding projected targets by 15%.',
    temp: '24°C',
    humidity: '88%',
    color: '#4ade80'
  },
  {
    id: 'SYS_02',
    icon: Mountain,
    title: 'Alpine Matrix',
    shortDesc: 'Freshwater filtration systems originating from high-altitude glaciers.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop',
    status: 'Glacial Filtration: Active',
    details: 'Downstream purity levels at 99.9%. Sediment retention walls holding steady at 80% capacity.',
    temp: '-12°C',
    humidity: '45%',
    color: '#60a5fa'
  },
  {
    id: 'SYS_03',
    icon: Waves,
    title: 'Oceanic Depth',
    shortDesc: 'Thermal regulation and marine biodiversity preservation zones.',
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=2671&auto=format&fit=crop',
    status: 'Coral Regeneration: In Progress',
    details: 'Thermal sensors indicate a 0.5°C drop in local reef temperatures. Spawning events recorded.',
    temp: '18°C',
    humidity: '95%',
    color: '#22d3ee'
  },
  {
    id: 'SYS_04',
    icon: TreePine,
    title: 'Boreal Shield',
    shortDesc: 'Northern coniferous forests acting as critical carbon sinks.',
    image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2674&auto=format&fit=crop',
    status: 'Carbon Sink: Active',
    details: 'Permafrost monitoring stable. Tree growth rate increased 8% this quarter.',
    temp: '4°C',
    humidity: '62%',
    color: '#34d399'
  },
  {
    id: 'SYS_05',
    icon: Bird,
    title: 'Avian Corridor',
    shortDesc: 'Protected migration routes for endangered bird species.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2774&auto=format&fit=crop',
    status: 'Migration: Peak Season',
    details: '2.4 million birds tracked this season. 12 endangered species populations recovering.',
    temp: '16°C',
    humidity: '55%',
    color: '#f472b6'
  },
  {
    id: 'SYS_06',
    icon: Fish,
    title: 'Freshwater Network',
    shortDesc: 'River systems and lake ecosystems under active restoration.',
    image: 'https://images.unsplash.com/photo-1501854140884-074bf86ee91c?q=80&w=2670&auto=format&fit=crop',
    status: 'Water Quality: Excellent',
    details: 'Fish populations up 34%. Microplastic levels reduced by 67% from baseline.',
    temp: '12°C',
    humidity: '78%',
    color: '#38bdf8'
  },
  {
    id: 'SYS_07',
    icon: Leaf,
    title: 'Wetland Reserve',
    shortDesc: 'Marshlands and swamps providing critical flood control.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop',
    status: 'Ecosystem: Thriving',
    details: 'Amphibian diversity at historic highs. Water filtration capacity optimal.',
    temp: '22°C',
    humidity: '92%',
    color: '#a3e635'
  },
  {
    id: 'SYS_08',
    icon: Snowflake,
    title: 'Polar Station',
    shortDesc: 'Arctic and Antarctic monitoring for climate indicators.',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2670&auto=format&fit=crop',
    status: 'Ice Monitoring: Active',
    details: 'Sea ice extent stable this season. Penguin colonies showing strong recruitment.',
    temp: '-28°C',
    humidity: '35%',
    color: '#e0f2fe'
  },
  {
    id: 'SYS_09',
    icon: Sun,
    title: 'Savanna Biome',
    shortDesc: 'Grassland ecosystems supporting megafauna populations.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2668&auto=format&fit=crop',
    status: 'Wildlife: Flourishing',
    details: 'Elephant herds up 18%. Anti-poaching success rate 97%.',
    temp: '32°C',
    humidity: '28%',
    color: '#fbbf24'
  },
  {
    id: 'SYS_10',
    icon: Wind,
    title: 'Desert Edge',
    shortDesc: 'Combating desertification through strategic vegetation.',
    image: 'https://images.unsplash.com/photo-1682687220199-d0124f48f95b?q=80&w=2670&auto=format&fit=crop',
    status: 'Green Wall: Expanding',
    details: '450km of new vegetation established. Sand encroachment halted.',
    temp: '38°C',
    humidity: '15%',
    color: '#fb923c'
  },
  {
    id: 'SYS_11',
    icon: Droplets,
    title: 'Mangrove Belt',
    shortDesc: 'Coastal protection and nursery habitats for marine life.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2673&auto=format&fit=crop',
    status: 'Coastal Defense: Strong',
    details: '12,000 hectares restored. Storm surge protection increased 45%.',
    temp: '26°C',
    humidity: '84%',
    color: '#2dd4bf'
  },
  {
    id: 'SYS_12',
    icon: Flame,
    title: 'Fire Management',
    shortDesc: 'Controlled burn programs for forest health.',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=2641&auto=format&fit=crop',
    status: 'Prevention: Active',
    details: 'Fuel load reduced 60%. Indigenous fire practices integrated.',
    temp: '28°C',
    humidity: '42%',
    color: '#ef4444'
  },
  {
    id: 'SYS_13',
    icon: Globe,
    title: 'Global Network',
    shortDesc: 'Interconnected monitoring across all ecosystems.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop',
    status: 'Network: Fully Connected',
    details: '195 countries linked. Real-time data sharing active.',
    temp: 'N/A',
    humidity: 'N/A',
    color: '#a78bfa'
  },
  {
    id: 'SYS_14',
    icon: Compass,
    title: 'Research Outpost',
    shortDesc: 'Field stations conducting vital ecological research.',
    image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2670&auto=format&fit=crop',
    status: 'Studies: Ongoing',
    details: '847 active research projects. 1,200 scientists deployed globally.',
    temp: 'Various',
    humidity: 'Various',
    color: '#818cf8'
  }
];

export default function EcosystemsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const containerRef = useRef(null);
  const listRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const active = ecosystems[activeIndex];

  const handleServiceChange = (index: number) => {
    if (index === activeIndex || isGlitching) return;
    
    setIsGlitching(true);
    
    setTimeout(() => {
      setActiveIndex(index);
      setTimeout(() => {
        setIsGlitching(false);
      }, 200);
    }, 200);
  };

  return (
    <section 
      id="ecosystems" 
      ref={containerRef}
      className="relative bg-black text-white py-32 overflow-hidden"
    >
      {/* Top gradient transition */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-transparent z-10 pointer-events-none" />
      
      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent z-10 pointer-events-none" />

      {/* Header */}
      <div className="px-6 md:px-12 mb-20 text-center relative z-20">
        <motion.span
          className="text-[#4ade80] text-xs font-bold tracking-[0.3em] uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Advanced Systems
        </motion.span>
        <motion.h2
          className="text-5xl md:text-7xl font-semibold tracking-tighter mt-4 mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Bi-Level <span className="text-white/30">Ecosystems</span>
        </motion.h2>
        <motion.div
          className="w-[1px] h-24 bg-gradient-to-b from-[#4ade80] to-transparent mx-auto"
          initial={{ height: 0 }}
          animate={isInView ? { height: 96 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-20">
        {/* Scrollable Menu with hidden scrollbar and gradient fade */}
        <div className="lg:col-span-4 relative">
          {/* Top fade gradient */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent z-30 pointer-events-none" />
          
          {/* Bottom fade gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-black/90 to-transparent z-30 pointer-events-none" />
          
          <div 
            ref={listRef}
            className="lg:sticky lg:top-24 h-[500px] lg:h-[600px] overflow-y-auto space-y-2 pr-2 scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* Spacer for top gradient */}
            <div className="h-8" />
            
            {ecosystems.map((eco, index) => {
              const Icon = eco.icon;
              const isActive = activeIndex === index;
              
              return (
                <motion.div
                  key={eco.id}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-500 group service-stack-card ${
                    isActive 
                      ? 'bg-white/5 border border-white/10 backdrop-blur-sm' 
                      : 'bg-transparent border border-transparent hover:bg-white/[0.03] hover:border-white/5'
                  }`}
                  onClick={() => handleServiceChange(index)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    x: 0,
                  } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: Math.min(0.2 + index * 0.05, 0.8),
                    ease: [0.2, 0.8, 0.2, 1]
                  }}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono opacity-60" style={{ color: eco.color }}>{eco.id}</span>
                    <Icon 
                      className={`w-4 h-4 transition-all duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-70'
                      }`}
                      style={{ color: isActive ? eco.color : 'white' }}
                    />
                  </div>
                  <h3 className={`text-lg font-medium text-white mb-1 transition-all duration-300 ${
                    isActive ? 'translate-x-1' : 'group-hover:translate-x-1'
                  }`}>
                    {eco.title}
                  </h3>
                  <motion.div
                    className="overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: isActive ? 'auto' : 0,
                      opacity: isActive ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-xs text-white/40 leading-relaxed pt-1">
                      {eco.shortDesc}
                    </p>
                    {/* Active indicator line */}
                    <motion.div 
                      className="h-[2px] mt-3 rounded-full"
                      style={{ backgroundColor: eco.color }}
                      initial={{ width: 0 }}
                      animate={{ width: isActive ? '100%' : 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
            
            {/* Spacer for bottom gradient */}
            <div className="h-20" />
          </div>
        </div>

        {/* Futuristic Display Area */}
        <motion.div
          className="lg:col-span-8 h-[500px] lg:h-[600px] relative rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a]"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* HUD Elements */}
          <div className="absolute top-6 left-6 flex gap-2 z-20">
            <motion.div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: active.color }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <div className="w-2 h-2 bg-white/20 rounded-full" />
            <div className="text-[10px] font-mono text-white/40 tracking-widest ml-2">
              LIVE FEED // {active.id}
            </div>
          </div>

          {/* Ecosystem indicator */}
          <motion.div 
            className="absolute top-6 right-6 z-20 px-3 py-1 rounded-full border backdrop-blur-md"
            style={{ 
              borderColor: `${active.color}40`,
              backgroundColor: `${active.color}10`
            }}
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-[10px] font-mono" style={{ color: active.color }}>
              {active.title.toUpperCase()}
            </span>
          </motion.div>

          {/* Index Display */}
          <div className="absolute bottom-6 right-6 z-20 text-right">
            <motion.div 
              className="text-5xl font-mono font-bold tracking-tighter"
              style={{ color: `${active.color}20` }}
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {String(activeIndex + 1).padStart(2, '0')}
            </motion.div>
          </div>

          {/* Grid Overlay */}
          <div 
            className="absolute inset-0 pointer-events-none z-10 opacity-50"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />

          {/* Scan line effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.1) 50%)',
              backgroundSize: '100% 4px'
            }}
            animate={{ y: [0, 4] }}
            transition={{ duration: 0.1, repeat: Infinity }}
          />

          {/* Image Container with Glitch Effect */}
          <div className="absolute inset-0 w-full h-full">
            <motion.img 
              key={active.image}
              src={active.image} 
              alt={active.title}
              className="w-full h-full object-cover"
              initial={{ 
                opacity: 0.5, 
                filter: 'grayscale(100%) contrast(200%)',
                scale: 1.1
              }}
              animate={{ 
                opacity: isGlitching ? 0.5 : 1, 
                filter: isGlitching ? 'grayscale(100%) contrast(200%)' : 'brightness(0.7)',
                scale: 1.05
              }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
          </div>

          {/* Floating Data Card */}
          <motion.div
            className="absolute bottom-8 left-8 z-20 backdrop-blur-xl bg-black/50 border border-white/10 p-6 rounded-2xl max-w-sm"
            key={`info-${activeIndex}`}
            initial={{ opacity: 0, y: 20, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Status with colored indicator */}
            <div className="flex items-center gap-2 mb-3">
              <div 
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: active.color, boxShadow: `0 0 10px ${active.color}` }}
              />
              <h4 className="text-white font-medium text-lg">{active.status}</h4>
            </div>
            
            <p className="text-sm text-white/60 font-light leading-relaxed mb-4">
              {active.details}
            </p>
            
            <div className="flex gap-3">
              <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/5">
                <div className="text-[9px] text-white/40 uppercase">Temp</div>
                <div className="text-sm font-mono text-white">{active.temp}</div>
              </div>
              <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/5">
                <div className="text-[9px] text-white/40 uppercase">Humidity</div>
                <div className="text-sm font-mono text-white">{active.humidity}</div>
              </div>
              <div 
                className="px-3 py-2 rounded-lg border"
                style={{ 
                  backgroundColor: `${active.color}10`,
                  borderColor: `${active.color}30`
                }}
              >
                <div className="text-[9px] uppercase" style={{ color: `${active.color}80` }}>Status</div>
                <div className="text-sm font-mono" style={{ color: active.color }}>ACTIVE</div>
              </div>
            </div>
          </motion.div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-6 h-6 border-l border-t border-white/10 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-6 h-6 border-r border-t border-white/10 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-l border-b border-white/10 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-white/10 rounded-br-lg" />
        </motion.div>
      </div>
    </section>
  );
}