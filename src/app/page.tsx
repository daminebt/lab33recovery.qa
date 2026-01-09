"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import BackgroundImage from "../components/coming-soon/BackgroundImage";
import MinimalTime from "../components/coming-soon/MinimalTime";
import InfinityLoader from "../components/coming-soon/InfinityLoader";
import LocationIndicator from "../components/coming-soon/LocationIndicator";
import SignUpButton from "../components/coming-soon/SignUpButton";
import Copyright from "../components/coming-soon/Copyright";
import WaitlistModal from "../components/coming-soon/WaitlistModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mouse tracking for logo
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  const translateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
  const translateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      // Normalize to -0.5 to 0.5
      mouseX.set((clientX / innerWidth) - 0.5);
      mouseY.set((clientY / innerHeight) - 0.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <main className="relative h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden">
      {/* 1. Static Background (Animated Entry) */}
      <BackgroundImage />

      {/* 2. Heads Up Display */}
      <MinimalTime />
      <LocationIndicator />
      <Copyright />

      {/* 3. Central Graphics (Background Layer) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <InfinityLoader />
      </div>

      {/* 4. Main Content - Logo & Action Stack (Foreground Layer) */}
      <div className="relative z-20 p-8" style={{ perspective: 1000 }}>
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
          className="relative flex flex-col items-center"
          style={{
            rotateX,
            rotateY,
            x: translateX,
            y: translateY,
            transformStyle: "preserve-3d",
          }}
        >
          <Image
            src="/logo-v2.webp"
            alt="Lab 33 Logo"
            width={800}
            height={300}
            className="w-[80vw] md:w-[600px] lg:w-[800px] h-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            priority
          />

          {/* Join Waitlist Button - Triggers Modal */}
          <div className="absolute top-[110%] left-1/2 -translate-x-1/2 w-full flex justify-center">
            <SignUpButton onClick={() => setIsModalOpen(true)} />
          </div>
        </motion.div>
      </div>

      {/* 5. Waitlist Modal Overlay */}
      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
