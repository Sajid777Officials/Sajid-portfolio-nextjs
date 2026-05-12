import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import SelectedProjects from "@/components/SelectedProjects";
import Works from "@/components/Works";
import TechStack from "@/components/sections/TechStack";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-[#050505]">
      <Hero />
      <About />
      <Services />
      <SelectedProjects />
      <Works />
      <TechStack />
      <Contact />
    </main>
  );
}
