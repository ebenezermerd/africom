import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TorchCardProps {
    children: React.ReactNode;
    className?: string;
}

export default function TorchCard({ children, className = '' }: TorchCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden bg-white/[0.02] ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        animate={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Border Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay"
        animate={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(74,222,128,0.15), transparent 40%)`
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-30">
        {children}
      </div>
    </motion.div>
  );
}