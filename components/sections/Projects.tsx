// components/sections/Projects.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registering ScrollTrigger so GSAP knows we are using scroll animations
gsap.registerPlugin(ScrollTrigger);

// Dummy project data (You can change these later with your actual projects)
const projectData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-stack scalable e-commerce solution with payment gateway integration and real-time inventory management.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    link: "#",
  },
  {
    id: 2,
    title: "Healthcare Patient Portal",
    description: "Secure, responsive dashboard for patients to book appointments, view records, and chat with doctors.",
    tech: ["Next.js", "Tailwind CSS", "GSAP", "Prisma"],
    link: "#",
  },
  {
    id: 3,
    title: "Task Management App",
    description: "Real-time collaborative task manager with Kanban boards, user authentication, and activity tracking.",
    tech: ["React", "Redux", "Socket.io", "Express"],
    link: "#",
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  // Array of refs to store each project card
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the section heading when it enters the viewport
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", 
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Animate the project cards popping up one after another (stagger)
      // Using cardsRef.current array directly
      if (cardsRef.current.length > 0) {
        gsap.from(cardsRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
          y: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2, 
          ease: "power3.out"
        });
      }
    }, sectionRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="relative w-full min-h-screen bg-[#050505] py-24 px-6 md:px-12 lg:px-24 z-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <h2 ref={headerRef} className="text-4xl md:text-5xl font-bold text-white mb-4">
            Selected <span className="text-[#00ffcc]">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-[#00ffcc] rounded-full"></div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectData.map((project, index) => (
            <div 
              key={project.id}
              ref={(el) => {
                // Ensure we only store valid DOM elements in the ref array
                if (el) cardsRef.current[index] = el;
              }}
              className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-[#00ffcc]/50 transition-colors duration-500 overflow-hidden"
            >
              {/* Updated to modern Tailwind v4 syntax: bg-linear-to-br */}
              <div className="absolute inset-0 bg-linear-to-br from-[#00ffcc]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
              <p className="text-gray-400 mb-6 line-clamp-3">{project.description}</p>
              
              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((tech, i) => (
                  <span key={i} className="text-xs font-medium text-[#00ffcc] bg-[#00ffcc]/10 px-3 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>

              {/* View Project Link */}
              <a 
                href={project.link} 
                className="inline-flex items-center text-sm font-semibold text-white group-hover:text-[#00ffcc] transition-colors"
              >
                View Details 
                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}