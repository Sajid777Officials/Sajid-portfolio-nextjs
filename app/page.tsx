// app/page.tsx
import Hero from "@/components/sections/Hero";
import SelectedProjects from "@/components/SelectedProjects";
import Works from "@/components/Works";
import TechStack from "@/components/sections/TechStack";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-[#050505]">
      {/* ১. হিরো সেকশন */}
      <Hero />
      
      {/* ২. আপনার সেরা ৩টি প্রজেক্ট */}
      <SelectedProjects />
      
      {/* ৩. গিটহাব থেকে আসা লাইভ প্রজেক্টগুলো */}
      <Works />
      
      {/* ৪. আপনার স্কিল বা টেক-স্ট্যাক */}
      <TechStack />
      
      {/* ৫. কন্টাক্ট সেকশন */}
      <Contact />
      
    </main>
  );
}