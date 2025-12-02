import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TextRevealSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const textElement = textRef.current;

        if (!container || !textElement) return;

        // Split text into words for animation
        const words = textElement.innerText.split(' ');
        textElement.innerHTML = '';
        words.forEach(word => {
            const span = document.createElement('span');
            span.innerText = word + ' ';
            span.className = 'inline-block transform-style-3d';
            textElement.appendChild(span);
        });

        const spans = textElement.querySelectorAll('span');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "+=150%",
                scrub: 1,
                pin: true,
            }
        });

        gsap.set(spans, {
            opacity: 0,
            rotateX: 90,
            y: 100,
            z: -500,
            transformOrigin: "50% 50% -50px"
        });

        tl.to(spans, {
            opacity: 1,
            rotateX: 0,
            y: 0,
            z: 0,
            stagger: 0.1,
            duration: 1,
            ease: "back.out(1.7)"
        })
            .to(spans, {
                color: "#ff9605",
                textShadow: "0 0 20px rgba(255, 150, 5, 0.5)",
                duration: 0.5,
                stagger: 0.05
            }, "-=0.5");

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className="h-screen bg-[#050505] flex items-center justify-center overflow-hidden perspective-1000">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2
                    ref={textRef}
                    className="text-6xl md:text-9xl font-black text-white leading-tight tracking-tighter perspective-text"
                    style={{ perspective: '1000px' }}
                >
                    INNOVATION FORGING THE FUTURE OF AFRICA
                </h2>
            </div>
        </div>
    );
};

export default TextRevealSection;
