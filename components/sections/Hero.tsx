"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import ParticleMatrix from "../canvas/ParticleMatrix";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 42,
        opacity: 0,
        duration: 1,
        stagger: 0.16,
        ease: "power3.out",
        delay: 0.15,
      });

      gsap.from(".hero-chip", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.7,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#050505] px-4 sm:px-5"
    >
      <ParticleMatrix />

      {/* Ambient glow orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00ffcc]/[0.035] blur-[130px]"
      />

      <div className="absolute inset-x-0 bottom-0 z-[1] h-48 bg-linear-to-t from-[#050505] to-transparent" />

      <div
        ref={containerRef}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center"
      >
        <div className="hero-text mb-6 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs leading-5 text-gray-300 backdrop-blur sm:px-4 sm:text-sm">
          <Sparkles className="h-4 w-4 text-[#00ffcc]" />
          <span>Software developer for complete digital products</span>
        </div>

        <h1 className="hero-text max-w-5xl text-4xl font-bold leading-[1.04] tracking-normal text-white min-[420px]:text-5xl sm:text-6xl md:text-8xl">
          I Build{" "}
          <span className="block bg-gradient-to-r from-[#00ffcc] to-[#00b4ff] bg-clip-text text-transparent sm:inline">Digital</span>
          <br />
          Realities
        </h1>

        <p className="hero-text mt-6 w-full max-w-xs text-sm leading-7 text-gray-400 sm:max-w-2xl sm:text-base md:text-xl md:leading-8">
          <span className="sm:hidden">
            Web apps, APIs, dashboards,
            <br />
            AI tools, and automation.
          </span>
          <span className="hidden sm:inline">
            Full-stack web apps, backend APIs, dashboards, e-commerce systems,
            AI integrations, automation tools, and deployment-ready software.
          </span>
        </p>

        <div className="hero-text mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="#services"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00ffcc] px-7 py-3 font-bold text-black shadow-[0_0_28px_rgba(0,255,204,0.35)] transition-all hover:bg-white hover:shadow-[0_0_28px_rgba(255,255,255,0.2)]"
          >
            View Services
            <ArrowRight className="h-5 w-5" />
          </Link>

          <Link
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3 font-bold text-white backdrop-blur transition-colors hover:border-[#00ffcc]/50 hover:text-[#00ffcc]"
          >
            <Mail className="h-5 w-5" />
            Contact Me
          </Link>
        </div>

        <div className="mt-14 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          {["Full-stack builds", "AI & automation", "Deployment support"].map((item) => (
            <div
              key={item}
              className="hero-chip rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-sm font-semibold text-gray-300 backdrop-blur"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
