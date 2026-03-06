// components/layout/Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Wrapped in gsap.context to prevent React 19 strict-mode glitches
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      });
    });

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <header 
      ref={navRef} 
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between bg-black/30 backdrop-blur-md border-b border-white/10"
    >
      <div className="text-white font-bold text-xl tracking-wider cursor-pointer">
        <span className="text-[#00ffcc]">{'<'}</span> 
        SAJID 
        <span className="text-[#00ffcc]">{ '/>'}</span>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
        <Link href="#about" className="hover:text-[#00ffcc] transition-colors duration-300">About</Link>
        <Link href="#projects" className="hover:text-[#00ffcc] transition-colors duration-300">Projects</Link>
        <Link href="#tech" className="hover:text-[#00ffcc] transition-colors duration-300">Tech Stack</Link>
      </nav>

      <Link 
        href="#contact" 
        className="px-6 py-2 text-sm font-bold text-black bg-[#00ffcc] rounded-full hover:bg-white transition-colors duration-300"
      >
        Hire Me
      </Link>
    </header>
  );
}