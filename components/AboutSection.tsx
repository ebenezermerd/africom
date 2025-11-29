import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, Wind, Sprout, ArrowUpRight, TrendingUp, Activity, Droplets, TreePine, Sun, Thermometer } from 'lucide-react';
import TorchCard from './TorchCard';

// Animated circular progress component
function CircularProgress({ value, max, size = 120, strokeWidth = 8, color = "#4ade80", label, sublabel }: any) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / max) * circumference;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-xl font-bold text-white">{value}%</span>
        <span className="text-[9px] text-white/40 uppercase tracking-wider mt-1">{label}</span>
      </div>
    </div>
  );
}

// Animated line chart
function MiniLineChart({ data, color = "#4ade80", height = 60 }: any) {
  const maxValue = Math.max(...data);
  const points = data.map((value: number, index: number) => ({
    x: (index / (data.length - 1)) * 100,
    y: 100 - (value / maxValue) * 100
  }));
  
  const pathD = points.map((point: any, i: number) => 
    `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full" style={{ height }}>
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Area fill */}
      <motion.path
        d={`${pathD} L 100 100 L 0 100 Z`}
        fill="url(#areaGradient)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      {/* Line */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="url(#lineGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      {/* Dots */}
      {points.map((point: any, i: number) => (
        <motion.circle
          key={i}
          cx={point.x}
          cy={point.y}
          r="2"
          fill={color}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 + i * 0.1 }}
        />
      ))}
    </svg>
  );
}

// Animated bar with label
function StatBar({ label, value, maxValue, color = "#4ade80", delay = 0 }: any) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-[10px]">
        <span className="text-white/50">{label}</span>
        <span className="text-white/70 font-mono">{value}</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
          initial={{ width: 0 }}
          animate={{ width: `${(parseInt(value) / maxValue) * 100}%` }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function AboutSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredCard, setHoveredCard] = useState(null);

  const chartData = [30, 45, 35, 60, 55, 70, 65, 80, 75, 90, 85, 95];
  const monthlyData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 72 },
    { month: 'Mar', value: 68 },
    { month: 'Apr', value: 85 },
    { month: 'May', value: 92 },
    { month: 'Jun', value: 88 }
  ];

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative py-32 px-6 md:px-12 bg-[#050505] overflow-hidden"
    >
      {/* Top gradient transition from previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
      
      {/* Bottom gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-[#4ade80]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#4ade80]/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[#4ade80] text-xs font-bold tracking-[0.2em] uppercase mb-4">Global Impact</h2>
            <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-white">
              The Breathing <span className="italic font-serif text-white/50">Earth</span>
            </h3>
          </motion.div>
          <motion.p
            className="text-white/60 text-sm font-light max-w-sm leading-relaxed text-right md:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hover over the data points to illuminate the statistics. We leverage technology to track, preserve, and restore.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:min-h-[700px]">
          {/* Big Card 1 - Enhanced with charts */}
          <motion.div
            className="col-span-1 md:col-span-2 md:row-span-2"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <TorchCard className="h-full rounded-3xl border border-white/5 p-8 flex flex-col justify-between min-h-[500px]">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Globe className="w-8 h-8 text-white/20" />
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wider">Global Network</div>
                    <div className="text-sm text-white/70">Real-time monitoring</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
                  <span className="text-[10px] text-[#4ade80] font-mono">LIVE</span>
                </div>
              </div>

              {/* Main Stats */}
              <div className="my-8">
                <motion.div 
                  className="text-7xl font-light text-white mb-2 tracking-tighter"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  42<span className="text-[#4ade80] text-4xl">%</span>
                </motion.div>
                <div className="text-sm text-white/50 uppercase tracking-widest mb-6">Global Coverage</div>
                
                {/* Trend indicator */}
                <div className="flex items-center gap-2 text-[#4ade80]">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">+12.5% from last year</span>
                </div>
              </div>

              {/* Mini Chart */}
              <div className="mb-6">
                <div className="text-[10px] text-white/40 uppercase tracking-wider mb-3">Coverage Growth Trend</div>
                <MiniLineChart data={chartData} />
              </div>

              {/* Interactive Bars */}
              <div className="flex items-end gap-2 h-24 w-full">
                {monthlyData.map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      className="w-full bg-white/10 rounded-t-sm cursor-pointer transition-all duration-300 hover:bg-[#4ade80] relative group"
                      style={{ height: `${item.value}%` }}
                      initial={{ height: 0 }}
                      animate={isInView ? { height: `${item.value}%` } : {}}
                      transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded text-[10px] text-white whitespace-nowrap">
                        {item.value}%
                      </div>
                    </motion.div>
                    <span className="text-[9px] text-white/30">{item.month}</span>
                  </div>
                ))}
              </div>
            </TorchCard>
          </motion.div>

          {/* Card 2 - Enhanced CO2 with circular progress */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TorchCard className="h-full rounded-3xl border border-white/5 p-6 min-h-[240px]">
              <div className="flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full bg-[#4ade80]/10 flex items-center justify-center text-[#4ade80]">
                    <Wind className="w-5 h-5" />
                  </div>
                  <Activity className="w-4 h-4 text-white/20" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-medium text-white mb-1">
                      850<span className="text-sm text-white/40 ml-1">GT</span>
                    </div>
                    <div className="text-xs text-white/40 uppercase tracking-wider">CO2 Absorbed</div>
                  </div>
                  <CircularProgress value={72} max={100} size={70} strokeWidth={5} label="Efficiency" />
                </div>

                {/* Mini stats */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/5">
                  <div className="text-center">
                    <div className="text-sm font-medium text-[#4ade80]">+15%</div>
                    <div className="text-[9px] text-white/30">This Month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-white">2.4B</div>
                    <div className="text-[9px] text-white/30">Trees Equiv.</div>
                  </div>
                </div>
              </div>
            </TorchCard>
          </motion.div>

          {/* Card 3 - Enhanced Reforestation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <TorchCard className="h-full rounded-3xl border border-white/5 p-6 min-h-[240px]">
              <div className="flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                  <div className="text-[10px] text-[#4ade80] border border-[#4ade80]/20 px-2 py-1 rounded-full bg-[#4ade80]/5">
                    Live Progress
                  </div>
                  <Sprout className="w-5 h-5 text-white/30" />
                </div>
                
                <div>
                  <div className="text-white text-lg font-medium leading-tight mb-4">Reforestation</div>
                  
                  <div className="space-y-3">
                    <StatBar label="Amazon Basin" value="78" maxValue={100} color="#4ade80" delay={0.3} />
                    <StatBar label="Congo Rainforest" value="65" maxValue={100} color="#22c55e" delay={0.4} />
                    <StatBar label="Southeast Asia" value="52" maxValue={100} color="#16a34a" delay={0.5} />
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5">
                  <TreePine className="w-4 h-4 text-[#4ade80]" />
                  <span className="text-[10px] text-white/50">12.4M hectares restored</span>
                </div>
              </div>
            </TorchCard>
          </motion.div>

          {/* New Card - Climate Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            <TorchCard className="h-full rounded-3xl border border-white/5 p-6 min-h-[200px]">
              <div className="flex flex-col h-full justify-between">
                <div className="flex justify-between items-start mb-4">
                  <Thermometer className="w-5 h-5 text-orange-400" />
                  <span className="text-[9px] text-white/30 font-mono">CLIMATE</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-light text-white">-0.8°</div>
                    <div className="text-[9px] text-white/40">Temp Offset</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-light text-[#4ade80]">94%</div>
                    <div className="text-[9px] text-white/40">Air Quality</div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1 mt-4">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 rounded-full bg-gradient-to-t from-orange-500 to-[#4ade80]"
                      initial={{ height: 4 }}
                      animate={{ height: 4 + Math.random() * 20 }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", delay: i * 0.1 }}
                    />
                  ))}
                </div>
              </div>
            </TorchCard>
          </motion.div>

          {/* New Card - Water Conservation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <TorchCard className="h-full rounded-3xl border border-white/5 p-6 min-h-[200px]">
              <div className="flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                  <Droplets className="w-5 h-5 text-cyan-400" />
                  <Sun className="w-4 h-4 text-yellow-400/50" />
                </div>
                
                <div>
                  <div className="text-2xl font-medium text-white mb-1">2.8B</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wider">Liters Preserved</div>
                </div>

                {/* Water wave animation */}
                <div className="relative h-8 overflow-hidden rounded-lg bg-white/5">
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-cyan-500/30 to-transparent"
                    animate={{ 
                      y: [0, -5, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <svg className="absolute bottom-0 w-full h-4" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <motion.path
                      d="M0 5 Q 25 0, 50 5 T 100 5 V 10 H 0 Z"
                      fill="rgba(34, 211, 238, 0.3)"
                      animate={{ d: [
                        "M0 5 Q 25 0, 50 5 T 100 5 V 10 H 0 Z",
                        "M0 5 Q 25 10, 50 5 T 100 5 V 10 H 0 Z",
                        "M0 5 Q 25 0, 50 5 T 100 5 V 10 H 0 Z"
                      ]}}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </svg>
                </div>
              </div>
            </TorchCard>
          </motion.div>

          {/* Wide Bottom Card */}
          <motion.div
            className="col-span-1 md:col-span-2"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            <div className="h-full min-h-[280px] rounded-3xl bg-cover bg-center relative overflow-hidden group cursor-pointer"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?q=80&w=2670&auto=format&fit=crop')` }}
            >
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />
              
              {/* Floating stats */}
              <div className="absolute top-6 right-6 flex gap-3">
                <div className="px-3 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
                  <div className="text-lg font-bold text-white">50K+</div>
                  <div className="text-[9px] text-white/50">Members</div>
                </div>
                <div className="px-3 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
                  <div className="text-lg font-bold text-[#4ade80]">195</div>
                  <div className="text-[9px] text-white/50">Countries</div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 p-8 w-full z-10">
                <h4 className="text-xl font-medium text-white mb-2">The Green Initiative</h4>
                <div className="flex justify-between items-end">
                  <p className="text-sm text-white/70 max-w-xs font-light">
                    Join 50,000+ preservers ensuring a safer tomorrow.
                  </p>
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center border border-white/20"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(74,222,128,0.3)' }}
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}