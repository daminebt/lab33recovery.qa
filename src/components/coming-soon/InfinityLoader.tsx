"use client";

import { motion } from "framer-motion";

export default function InfinityLoader() {
    return (
        <div className="relative w-[90vw] h-[90vw] md:w-[40rem] md:h-[40rem] flex items-center justify-center pointer-events-none select-none">
            {/* Horizontal Fade Mask - Smooth Fade on Left/Right Edges */}
            <div className="absolute inset-0 [mask-image:linear-gradient(90deg,transparent_0%,black_30%,black_70%,transparent_100%)] [-webkit-mask-image:linear-gradient(90deg,transparent_0%,black_30%,black_70%,transparent_100%)]">
                {/* Outer Ring */}
                <motion.div
                    className="absolute inset-0 border border-white/10 rounded-full"
                    animate={{ scale: [1, 1.02, 1], opacity: [0.1, 0.4, 0.1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Rotating segments - Monochrome */}
                <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="url(#gradient-loader)"
                        strokeWidth="0.5"
                        strokeLinecap="round"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                    />
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth="0.3"
                        strokeDasharray="1 4"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
                    />
                    <defs>
                        <linearGradient id="gradient-loader" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                            <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Central Glow - White */}
                <motion.div
                    className="absolute w-64 h-64 bg-white/5 rounded-full blur-3xl opacity-20"
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* Blur Under Logo (Central Blur Overlay) - Matches Logo Shape */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[90vw] h-[15rem] md:w-[40rem] md:h-[15rem] backdrop-blur-md rounded-full [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
            </div>
        </div>
    );
}
