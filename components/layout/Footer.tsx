// components/layout/Footer.tsx

export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-white/10 bg-[#050505] text-center z-10 relative">
      <p className="text-gray-500 text-sm">
        © {new Date().getFullYear()} Sajid. All rights reserved. Built with Next.js & Three.js.
      </p>
    </footer>
  );
}