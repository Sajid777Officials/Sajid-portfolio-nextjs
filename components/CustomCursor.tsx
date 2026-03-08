"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion"; // Variants ইম্পোর্ট করা হলো

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  // এখানে : Variants যোগ করে দেওয়া হয়েছে
  const variants: Variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      transition: {
        type: "spring", // এখন TypeScript বুঝতে পারবে এটি Framer Motion এর স্প্রিং অ্যানিমেশন
        mass: 0.1,
        stiffness: 800,
        damping: 40,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      animate="default"
      className="fixed top-0 left-0 w-8 h-8 bg-white rounded-full mix-blend-difference pointer-events-none z-50"
      style={{
        boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
      }}
    />
  );
};

export default CustomCursor;