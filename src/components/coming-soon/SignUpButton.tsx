"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface SignUpButtonProps {
    onClick?: () => void;
}

export default function SignUpButton({ onClick }: SignUpButtonProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative z-30">
            <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                onClick={onClick}
                className="relative group p-4 flex items-center justify-center cursor-pointer outline-none"
            >
                {/* Aura Glow - Intensifies on Hover */}
                <motion.div
                    className="absolute inset-0 bg-white/10 blur-[50px] rounded-full"
                    variants={{
                        hover: { scale: 1.3, opacity: 0.4 },
                    }}
                    initial={{ scale: 1, opacity: 0.15 }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.15, 0.25, 0.15],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Orbital System - Accelerates on Hover */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg className="w-[200%] h-[200%] overflow-visible" viewBox="0 0 100 100">
                        {/* Outer Ring */}
                        <motion.circle
                            cx="50" cy="50" r="46"
                            fill="none"
                            stroke="rgba(255,255,255,0.06)"
                            strokeWidth="0.3"
                            strokeDasharray="1 8"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        />
                        {/* Mid Ring - Brighter on Hover */}
                        <motion.circle
                            cx="50" cy="50" r="36"
                            fill="none"
                            stroke="rgba(255,255,255,0.12)"
                            strokeWidth="0.5"
                            strokeDasharray="10 80"
                            strokeLinecap="round"
                            variants={{
                                hover: { stroke: "rgba(255,255,255,0.35)" },
                            }}
                            animate={{ rotate: -360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                    </svg>
                </div>

                {/* Glass Core - Premium Hover Effect */}
                <motion.div
                    className="relative z-10 py-3 px-8 bg-black/50 backdrop-blur-2xl border border-white/10 rounded-full flex items-center gap-4"
                    variants={{
                        hover: {
                            borderColor: "rgba(255,255,255,0.5)",
                            backgroundColor: "rgba(255,255,255,0.08)",
                            boxShadow: "0 0 30px rgba(255,255,255,0.15)",
                        },
                    }}
                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                >
                    {/* Pulse Dot - Glows Brighter on Hover */}
                    <motion.div
                        className="relative w-2 h-2"
                        variants={{
                            hover: { scale: 1.3 },
                        }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-white rounded-full"
                            animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <div className="relative w-full h-full bg-white rounded-full shadow-[0_0_12px_white]" />
                    </motion.div>

                    {/* Text - Brightens on Hover */}
                    <motion.span
                        className="text-xs font-display font-semibold text-white/80 tracking-[0.35em] uppercase whitespace-nowrap"
                        variants={{
                            hover: { color: "rgba(255,255,255,1)" },
                        }}
                    >
                        Join Waitlist
                    </motion.span>
                </motion.div>
            </motion.button>
        </div>
    );
}
