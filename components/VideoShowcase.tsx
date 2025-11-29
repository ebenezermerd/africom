import React, { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, ChevronLeft, ChevronRight, Sparkles, Leaf, Globe, Zap, Eye } from 'lucide-react';

const videoData = [
  {
    id: 1,
    title: "Dawn of the Serengeti",
    subtitle: "WILDLIFE • 4K HDR",
    description: "Witness the breathtaking sunrise over Africa's most iconic landscape, where millions of wildebeest begin their ancient migration.",
    thumbnail: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2668&auto=format&fit=crop",
    video: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2668&auto=format&fit=crop",
    duration: "12:34",
    views: "2.4M",
    category: "Migration",
    color: "#4ade80"
  },
  {
    id: 2,
    title: "Rainforest Symphony",
    subtitle: "ECOSYSTEM • DOLBY ATMOS",
    description: "Immerse yourself in the world's largest tropical rainforest, home to 10% of all species on Earth.",
    thumbnail: "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?q=80&w=2670&auto=format&fit=crop",
    video: "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?q=80&w=2670&auto=format&fit=crop",
    duration: "18:45",
    views: "1.8M",
    category: "Forest",
    color: "#22c55e"
  },
  {
    id: 3,
    title: "Ocean Depths Unveiled",
    subtitle: "MARINE • 8K ULTRA",
    description: "Descend into the mysterious abyss where bioluminescent creatures illuminate the eternal darkness.",
    thumbnail: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=2671&auto=format&fit=crop",
    video: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=2671&auto=format&fit=crop",
    duration: "24:12",
    views: "3.1M",
    category: "Ocean",
    color: "#06b6d4"
  },
  {
    id: 4,
    title: "Arctic Aurora",
    subtitle: "POLAR • HDR10+",
    description: "Experience the dancing lights of the aurora borealis over pristine ice landscapes.",
    thumbnail: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2670&auto=format&fit=crop",
    video: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2670&auto=format&fit=crop",
    duration: "15:28",
    views: "4.2M",
    category: "Polar",
    color: "#a78bfa"
  }
];

const stats = [
  { icon: Globe, value: "195+", label: "Countries Covered", color: "#4ade80" },
  { icon: Eye, value: "50M+", label: "Global Viewers", color: "#22c55e" },
  { icon: Leaf, value: "12K", label: "Species Documented", color: "#06b6d4" },
  { icon: Zap, value: "8K", label: "Ultra Resolution", color: "#a78bfa" }
];

function VideoCard({ video, index, isActive, onClick }: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden cursor-pointer group ${
        isActive ? 'col-span-2 row-span-2' : ''
      }`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      layout
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <motion.img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            filter: isHovered ? 'brightness(0.6)' : 'brightness(0.8)'
          }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        
        {/* Category Badge */}
        <motion.div
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md border"
          style={{ 
            backgroundColor: `${video.color}20`,
            borderColor: `${video.color}40`,
            color: video.color
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {video.category}
        </motion.div>

        {/* Duration Badge */}
        <div className="absolute top-4 right-4 px-2 py-1 rounded bg-black/60 backdrop-blur-sm text-white text-xs font-mono">
          {video.duration}
        </div>

        {/* Play Button */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20"
            style={{ backgroundColor: `${video.color}30` }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-6 h-6 text-white fill-white ml-1" />
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <motion.p
            className="text-[10px] font-mono tracking-widest mb-2"
            style={{ color: video.color }}
          >
            {video.subtitle}
          </motion.p>
          <h3 className="text-white text-lg font-semibold mb-2 leading-tight">
            {video.title}
          </h3>
          
          <motion.p
            className="text-white/60 text-sm leading-relaxed line-clamp-2"
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
          >
            {video.description}
          </motion.p>

          {/* Views */}
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1 text-white/40 text-xs">
              <Eye className="w-3 h-3" />
              <span>{video.views} views</span>
            </div>
          </div>
        </div>
      </div>

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: isHovered 
            ? `0 0 60px ${video.color}20, inset 0 0 60px ${video.color}10`
            : 'none'
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}

function FeaturedVideo({ video }: any) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <motion.div
      className="relative rounded-3xl overflow-hidden aspect-video lg:aspect-[21/9]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Video/Image Background */}
      <motion.img
        src={video.thumbnail}
        alt={video.title}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: isPlaying ? 1.05 : 1 }}
        transition={{ duration: 10, ease: "linear" }}
      />

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

      {/* Scan Lines Effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'
        }}
      />

      {/* HUD Elements */}
      <div className="absolute top-6 left-6 flex items-center gap-4 z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-mono text-white/60 tracking-widest">REC</span>
        </div>
        <div className="h-4 w-px bg-white/20" />
        <span className="text-[10px] font-mono text-white/40">{video.subtitle}</span>
      </div>

      <div className="absolute top-6 right-6 flex items-center gap-3 z-10">
        <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
          <span className="text-[10px] font-mono text-[#4ade80]">● LIVE</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 flex items-center z-10">
        <div className="max-w-2xl px-8 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#4ade80]" />
              <span className="text-xs font-medium tracking-widest text-[#4ade80] uppercase">
                Featured Documentary
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight tracking-tight">
              {video.title}
            </h2>

            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              {video.description}
            </p>

            <div className="flex items-center gap-4">
              <motion.button
                className="flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-[#4ade80] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                {isPlaying ? 'Pause' : 'Watch Now'}
              </motion.button>

              <motion.button
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </motion.button>

              <motion.button
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Maximize2 className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-[#4ade80] to-[#22c55e]"
          initial={{ width: '0%' }}
          animate={{ width: isPlaying ? '100%' : '35%' }}
          transition={{ duration: isPlaying ? 30 : 0.5 }}
        />
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/20 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/20 rounded-tr-lg" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/20 rounded-bl-lg" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/20 rounded-br-lg" />
    </motion.div>
  );
}

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      id="showcase"
      ref={containerRef}
      className="relative py-32 bg-[#030303] overflow-hidden"
    >
      {/* Top gradient transition */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black via-[#030303]/90 to-transparent z-20 pointer-events-none" />
      
      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020202] via-[#030303]/90 to-transparent z-20 pointer-events-none" />
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2727&auto=format&fit=crop')`,
            filter: 'blur(100px) saturate(150%)'
          }}
        />
      </motion.div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
            <span className="text-xs font-medium tracking-widest text-white/60 uppercase">
              Cinematic Experience
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#22c55e]">Stories</span>
          </motion.h2>

          <motion.p
            className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Immerse yourself in stunning 8K documentaries capturing the raw beauty 
            and untold stories of our planet's most precious ecosystems.
          </motion.p>
        </div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm group cursor-pointer"
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
                whileHover={{ scale: 1.02, borderColor: `${stat.color}40` }}
              >
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${stat.color}10 0%, transparent 70%)`
                  }}
                />
                <div className="relative z-10">
                  <Icon 
                    className="w-5 h-5 mb-3 transition-colors duration-300"
                    style={{ color: hoveredStat === index ? stat.color : 'rgba(255,255,255,0.3)' }}
                  />
                  <div 
                    className="text-3xl font-bold mb-1 transition-colors duration-300"
                    style={{ color: hoveredStat === index ? stat.color : 'white' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Featured Video */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <FeaturedVideo video={videoData[activeVideo]} />
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {videoData.map((video, index) => (
            <VideoCard
              key={video.id}
              video={video}
              index={index}
              isActive={activeVideo === index}
              onClick={() => setActiveVideo(index)}
            />
          ))}
        </div>

        {/* Navigation */}
        <motion.div
          className="flex items-center justify-center gap-4 mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.button
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveVideo((prev) => (prev - 1 + videoData.length) % videoData.length)}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <div className="flex items-center gap-2">
            {videoData.map((_, index) => (
              <motion.button
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  activeVideo === index ? 'w-8 bg-[#4ade80]' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                onClick={() => setActiveVideo(index)}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>

          <motion.button
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveVideo((prev) => (prev + 1) % videoData.length)}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}