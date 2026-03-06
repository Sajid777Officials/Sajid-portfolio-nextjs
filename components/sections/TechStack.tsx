// components/sections/TechStack.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Categorized skill data
const skillsData = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Three.js", "Redux"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js", "RESTful APIs", "GraphQL", "Socket.io"],
  },
  {
    category: "Database & Tools",
    skills: ["MongoDB", "PostgreSQL", "Git", "Docker", "Postman", "Vercel"],
  },
];

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Section Header
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      // Animate Category Cards staggering in
      if (categoryRefs.current.length > 0) {
        gsap.from(categoryRefs.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out"
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="tech" 
      ref={sectionRef} 
      className="relative w-full py-24 px-6 md:px-12 lg:px-24 bg-[#050505] z-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <h2 ref={headerRef} className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="text-[#00ffcc]">Tech Stack</span>
          </h2>
          <div className="w-20 h-1 bg-[#00ffcc] rounded-full mx-auto md:mx-0"></div>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillsData.map((group, index) => (
            <div 
              key={index}
              ref={(el) => {
                if (el) categoryRefs.current[index] = el;
              }}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 hover:border-[#00ffcc]/30 transition-colors duration-500"
            >
              <h3 className="text-2xl font-semibold text-white mb-6 border-b border-white/10 pb-4">
                {group.category}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="px-4 py-2 bg-white/5 border border-white/10 text-gray-300 text-sm font-medium rounded-lg hover:bg-[#00ffcc]/10 hover:text-[#00ffcc] hover:border-[#00ffcc]/50 cursor-default transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}