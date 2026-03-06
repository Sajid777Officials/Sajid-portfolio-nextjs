// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer"; // Footer ইমপোর্ট করা হলো


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sajid | MERN Stack Developer",
  description: "Portfolio of a creative full-stack developer specializing in the MERN stack.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#050505] text-white antialiased selection:bg-[#00ffcc] selection:text-black`}>
       
          <Navbar />
          {children}
          <Footer />
        
      </body>
    </html>
  );
}