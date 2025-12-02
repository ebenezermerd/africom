import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ImageZoomSection: React.FC = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const heroSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const image = imageRef.current;
        const heroSection = heroSectionRef.current;

        if (!wrapper || !image || !heroSection) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapper,
                start: "top top",
                end: "+=150%",
                pin: true,
                scrub: true,
            }
        });

        tl.to(image, {
            scale: 2,
            z: 250,
            transformOrigin: "center center",
            ease: "power1.inOut"
        })
            .to(heroSection, {
                scale: 1.4,
                transformOrigin: "center center",
                ease: "power1.inOut"
            }, "<");

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div ref={wrapperRef} className="relative w-full z-10 bg-black font-['Chelsea_Market'] text-white overflow-hidden">

            {/* Intro Overlay */}
            <div className="absolute left-0 top-0 w-full h-screen z-20 flex flex-col justify-center items-center text-[#ff9605] pointer-events-none">
                <h1 className="text-4xl md:text-6xl font-['Beth_Ellen'] mb-4">The Story of</h1>
                <p className="text-6xl md:text-8xl font-black text-center leading-tight">
                    Africa's<br />Untold<br />Wonders
                </p>
            </div>

            {/* Scrollable Content */}
            <div className="relative w-full z-10">
                <section ref={heroSectionRef} className="w-full h-screen flex items-center justify-center">
                    {/* Hero content if any, scaling with the effect */}
                </section>

                <section className="w-full h-[50vh] bg-gradient-to-b from-transparent to-purple-900/20" />

                <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900/20 to-blue-900/20 py-20">
                    <div className="relative z-30 max-w-3xl mx-auto text-center px-6">
                        <div className="space-y-12 text-[#ff9605] text-2xl md:text-4xl leading-relaxed font-light drop-shadow-lg">
                            <p>In the vast expanse of the cradle of mankind,</p>
                            <p>lie secrets older than time itself.</p>
                            <p>Listen closely, for in the winds of the Sahara and the mists of the Congo,</p>
                            <p>echoes the heartbeat of a continent rising,</p>
                            <p>a symphony of nature and innovation harmonizing in the golden light.</p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Background Image */}
            <div className="absolute top-0 left-0 w-full h-screen z-0 perspective-[500px] overflow-hidden">
                <img
                    ref={imageRef}
                    src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop"
                    alt="African Landscape"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>
        </div>
    );
};

export default ImageZoomSection;
