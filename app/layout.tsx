import type { Metadata, Viewport } from "next";
import CommandPalette from "@/components/CommandPalette";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/layout/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sajid | Software Development Services",
    template: "%s | Sajid",
  },
  description:
    "Portfolio of Sajid, a software developer building web apps, APIs, dashboards, SaaS products, AI integrations, automations, and deployment-ready systems.",
  keywords: [
    "Sajid",
    "Software Developer",
    "Software Development Services",
    "MERN Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Full Stack Developer",
    "Portfolio",
  ],
  authors: [{ name: "Sajid" }],
  openGraph: {
    title: "Sajid | Software Development Services",
    description:
      "Web apps, APIs, dashboards, SaaS products, AI integrations, automations, and deployment-ready systems.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#050505] text-white antialiased selection:bg-[#00ffcc] selection:text-black">
        <CustomCursor />
        <ScrollProgress />
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
          <CommandPalette />
        </SmoothScroll>
      </body>
    </html>
  );
}
