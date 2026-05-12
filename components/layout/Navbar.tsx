"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Command, Menu, X } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About", id: "about" },
  { href: "#services", label: "Services", id: "services" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#works", label: "GitHub", id: "works" },
  { href: "#tech", label: "Stack", id: "tech" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.35,
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const sections = ["home", ...navLinks.map((link) => link.id), "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const openCommandPalette = () => {
    window.dispatchEvent(new Event("open-command-palette"));
  };

  return (
    <header
      ref={navRef}
      className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/45 px-4 py-3 backdrop-blur-xl md:px-6"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
        <Link
          href="#home"
          onClick={() => setIsOpen(false)}
          className="shrink-0 text-lg font-bold tracking-normal text-white md:text-xl"
        >
          <span className="text-[#00ffcc]">&lt;</span>
          SAJID
          <span className="text-[#00ffcc]">/&gt;</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <Link
                key={link.id}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-[#00ffcc]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label="Open command palette"
            className="hidden h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 text-sm font-semibold text-gray-300 transition-colors hover:border-[#00ffcc]/40 hover:text-white lg:flex"
          >
            <Command className="h-4 w-4" />
            Ctrl K
          </button>

          <Link
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="hidden rounded-full bg-[#00ffcc] px-5 py-2 text-sm font-bold text-black transition-colors hover:bg-white sm:inline-flex"
          >
            Hire Me
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="fixed right-4 top-3 z-[70] flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white backdrop-blur transition-colors hover:border-[#00ffcc]/40 md:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <nav className="mx-auto mt-4 grid max-w-7xl gap-2 rounded-lg border border-white/10 bg-[#0b0b0b] p-3 shadow-2xl">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-gray-200 transition-colors hover:bg-white/5 hover:text-[#00ffcc]"
              >
                {link.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                openCommandPalette();
              }}
              className="flex items-center gap-2 rounded-lg px-4 py-3 text-left text-sm font-semibold text-gray-200 transition-colors hover:bg-white/5 hover:text-[#00ffcc]"
            >
              <Command className="h-4 w-4" />
              Command palette
            </button>

            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-[#00ffcc] px-4 py-3 text-center text-sm font-bold text-black transition-colors hover:bg-white"
            >
              Hire Me
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
