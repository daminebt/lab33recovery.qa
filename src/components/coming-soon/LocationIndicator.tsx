"use client";

import { motion } from "framer-motion";

export default function LocationIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center gap-3 md:gap-4"
        >
            <div className="flex flex-col items-end text-right">
                {/* Top Row: Main Location */}
                <div className="flex flex-col">
                    <span className="text-lg md:text-2xl font-display font-bold text-white tracking-tighter drop-shadow-xl leading-none">
                        The Pearl
                    </span>
                    <span className="text-[10px] md:text-base font-display font-light text-white/60 tracking-wider md:tracking-wide">
                        Porto Arabia
                    </span>
                </div>
            </div>

            {/* Vertical Decor Line - Shorter for Mobile */}
            <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-white/0 via-white/40 to-white/0" />
        </motion.div>
    );
}
