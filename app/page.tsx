// app/page.tsx
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects"
import TechStack from "@/components/sections/TechStack";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-[#050505]">
      <Hero />
      <Projects />
      <TechStack />
      <Contact />
    </main>
  );
}