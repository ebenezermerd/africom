import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
    {
        id: 1,
        title: "Ecosystem",
        subtitle: "Preservation",
        description: "Guardians of the natural world, using tech to protect biodiversity.",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop",
        color: "from-emerald-900 to-black"
    },
    {
        id: 2,
        title: "Connectivity",
        subtitle: "Digital Bridge",
        description: "Weaving a web of high-speed connection across the continent.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
        color: "from-blue-900 to-black"
    },
    {
        id: 3,
        title: "Heritage",
        subtitle: "Digital Archives",
        description: "Preserving ancient wisdom in the eternal memory of the cloud.",
        image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2071&auto=format&fit=crop",
        color: "from-purple-900 to-black"
    },
    {
        id: 4,
        title: "Energy",
        subtitle: "Solar Future",
        description: "Harvesting the boundless power of the African sun.",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop",
        color: "from-orange-900 to-black"
    }
];

const StackedCardsSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const cardElements = cardsRef.current.filter(Boolean);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: `+=${cards.length * 100}%`,
                scrub: 1,
                pin: true,
                anticipatePin: 1
            }
        });

        // Initial state: Cards are stacked deep in Z space
        gsap.set(cardElements, {
            y: 800,
            z: -1000,
            rotationX: 45,
            opacity: 0
        });

        cardElements.forEach((card, index) => {
            tl.to(card, {
                y: index * 20, // Slight vertical offset for stacking
                z: 0, // Bring to front
                rotationX: 0, // Flatten out
                opacity: 1,
                scale: 1 - (index * 0.05), // Slight scale down for back cards effect (inverted here for stacking up)
                duration: 1,
                ease: "power3.out"
            }, index * 0.8); // Overlap animations
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className="h-screen bg-black flex items-center justify-center overflow-hidden perspective-1000">
            <div className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center">
                {cards.map((card, index) => (
                    <div
                        key={card.id}
                        ref={el => cardsRef.current[index] = el}
                        className={`absolute w-[90%] md:w-[70%] aspect-[3/4] md:aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br ${card.color}`}
                        style={{
                            transformStyle: 'preserve-3d',
                            zIndex: index
                        }}
                    >
                        <div className="relative w-full h-full group">
                            <img
                                src={card.image}
                                alt={card.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end transform translate-z-10">
                                <span className="text-[#ff9605] font-['Beth_Ellen'] text-xl mb-2">{card.subtitle}</span>
                                <h3 className="text-4xl md:text-6xl font-bold text-white mb-4 font-['Chelsea_Market']">{card.title}</h3>
                                <p className="text-lg md:text-xl text-gray-300 max-w-lg">{card.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StackedCardsSection;
