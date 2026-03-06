// components/sections/Contact.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MapPin, Github, Linkedin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade and slide up animation for the entire contact content
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="relative w-full py-24 px-6 md:px-12 lg:px-24 bg-[#050505] z-10"
    >
      <div 
        ref={contentRef}
        className="max-w-7xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Side: Contact Info */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let&apos;s build something <span className="text-[#00ffcc]">together.</span>
            </h2>
            <p className="text-gray-400 mb-10 text-lg">
              I&apos;m currently open for new opportunities. Whether you have a project to discuss or just want to say hi, my inbox is open!
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-gray-300 hover:text-[#00ffcc] transition-colors">
                <Mail className="w-6 h-6 text-[#00ffcc]" />
                <a href="mailto:hello@sajid.com" className="text-lg">hello@sajid.com</a>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <MapPin className="w-6 h-6 text-[#00ffcc]" />
                <span className="text-lg">Dhaka, Bangladesh</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-6 mt-12">
              <a href="#" className="p-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-[#00ffcc] hover:text-black hover:border-[#00ffcc] transition-all duration-300">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-[#00ffcc] hover:text-black hover:border-[#00ffcc] transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Your Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00ffcc]/50 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00ffcc]/50 transition-colors"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Your Message</label>
              <textarea 
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00ffcc]/50 transition-colors resize-none"
              ></textarea>
            </div>

            <button 
              type="button"
              className="w-full py-4 bg-[#00ffcc] text-black font-bold rounded-xl hover:bg-white transition-colors duration-300"
            >
              Send Message
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}