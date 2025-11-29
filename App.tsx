import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

import Navigation from './components/Navigation';
import HeroCarousel from './components/HeroCarousel';
import AboutSection from './components/AboutSection';
import EcosystemsSection from './components/EcosystemsSection';
import VideoShowcase from './components/VideoShowcase';
import GallerySection from './components/GallerySection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-[#020202] text-white overflow-x-hidden antialiased"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 4px;
        }
        
        ::-webkit-scrollbar-track {
          background: #000;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 2px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #4ade80;
        }
        
        /* Services Sticky Stack */
        .service-stack-card {
          transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.5s;
          transform-origin: top center;
        }
        
        /* Selection */
        ::selection {
          background: #4ade80;
          color: black;
        }
        
        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <Navigation />
      <HeroCarousel />
      <AboutSection />
      <EcosystemsSection />
      <VideoShowcase />
      <GallerySection />
      <FAQSection />
      <Footer />
    </motion.div>
  );
}