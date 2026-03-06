// components/sections/Hero.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ParticleMatrix from "../canvas/ParticleMatrix";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Animation context setup for proper cleanup
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2, // Texts will appear one after another
        ease: "power3.out",
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Our 3D matrix canvas in the background */}
      <ParticleMatrix />
      
      {/* Main text content in the foreground */}
      <div 
        ref={containerRef} 
        className="relative z-10 flex flex-col items-center text-center px-4 pointer-events-none"
      >
        <h1 className="hero-text text-5xl md:text-8xl font-bold text-white tracking-tighter mb-4">
          I Build <span className="text-[#00ffcc]">Digital</span> <br/> Realities
        </h1>
        <p className="hero-text text-gray-400 text-lg md:text-xl max-w-2xl mb-8">
          Expert MERN Stack Developer crafting scalable architectures and immersive web experiences.
        </p>
        <button className="hero-text pointer-events-auto px-8 py-4 bg-transparent border border-[#00ffcc] text-[#00ffcc] rounded-full hover:bg-[#00ffcc] hover:text-black transition-all duration-300 font-semibold tracking-wide">
          View Projects
        </button>
      </div>
    </section>
  );
}