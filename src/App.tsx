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

// New Creative Scroll Sections
import ImageZoomSection from './components/ImageZoomSection';
import TextRevealSection from './components/TextRevealSection';
import SpatialZoomSection from './components/SpatialZoomSection';
import StackedCardsSection from './components/StackedCardsSection';

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
            <Navigation />
            <HeroCarousel />

            <ImageZoomSection />

            <AboutSection />

            <TextRevealSection />

            <EcosystemsSection />

            <StackedCardsSection />

            <VideoShowcase />

            <SpatialZoomSection />

            <GallerySection />
            <FAQSection />
            <Footer />
        </motion.div>
    );
}
