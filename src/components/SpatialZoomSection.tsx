import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const gridItems = [
    { type: 'text', content: 'Future', color: 'text-purple-400' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=2072&auto=format&fit=crop' },
    { type: 'text', content: 'Tech', color: 'text-blue-400' },
    { type: 'card', title: 'AI Core', desc: 'Neural Networks' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop' },
    { type: 'text', content: 'Data', color: 'text-green-400' },
    { type: 'card', title: 'Cloud', desc: 'Infinite Scale' },
    { type: 'text', content: 'Cyber', color: 'text-red-400' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop' },
    { type: 'text', content: 'Speed', color: 'text-yellow-400' },
    { type: 'card', title: 'Quantum', desc: 'Computing' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1531297461136-82af022f8b85?q=80&w=2574&auto=format&fit=crop' },
    { type: 'text', content: 'Code', color: 'text-pink-400' },
    { type: 'text', content: 'Web3', color: 'text-indigo-400' },
    { type: 'card', title: 'Security', desc: 'Zero Trust' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop' },
];

const SpatialZoomSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const grid = gridRef.current;

        if (!container || !grid) return;

        const items = grid.querySelectorAll('.grid-item');

        // Initial random positions for a "scattered" look that aligns or just a grid
        // The user's request implies a grid that you fly THROUGH.

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "+=300%",
                scrub: true,
                pin: true,
            }
        });

        items.forEach((item, i) => {
            // Randomize start Z slightly to give depth
            const startZ = -1000 - (Math.random() * 2000);
            const endZ = 1000; // Fly past the camera

            gsap.set(item, {
                z: startZ,
                opacity: 0,
                filter: 'blur(10px)'
            });

            tl.to(item, {
                z: endZ,
                opacity: 1, // Fade in as it approaches
                filter: 'blur(0px)', // Clear focus
                duration: 5,
                ease: "none",
                // We want them to appear at different times
            }, i * 0.1);

            // Add a secondary tween to fade out/blur as it passes camera
            tl.to(item, {
                opacity: 0,
                filter: 'blur(20px)',
                duration: 1,
                ease: "none"
            }, ">-1");
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className="h-screen w-full bg-black overflow-hidden relative perspective-1000">
            <div
                ref={gridRef}
                className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-8 p-8 transform-style-3d"
                style={{ perspective: '1000px' }}
            >
                {gridItems.map((item, i) => (
                    <div
                        key={i}
                        className="grid-item flex items-center justify-center transform-style-3d"
                    >
                        {item.type === 'text' && (
                            <span className={`text-4xl md:text-6xl font-black ${item.color} font-['Chelsea_Market']`}>
                                {item.content}
                            </span>
                        )}
                        {item.type === 'image' && (
                            <div className="w-full h-full rounded-2xl overflow-hidden border border-white/20 shadow-lg">
                                <img src={item.src} alt="Visual" className="w-full h-full object-cover" />
                            </div>
                        )}
                        {item.type === 'card' && (
                            <div className="w-full h-full bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col justify-center text-center">
                                <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                                <p className="text-sm text-gray-300">{item.desc}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
                <h2 className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 opacity-20 mix-blend-overlay">
                    EXPLORE
                </h2>
            </div>
        </div>
    );
};

export default SpatialZoomSection;
