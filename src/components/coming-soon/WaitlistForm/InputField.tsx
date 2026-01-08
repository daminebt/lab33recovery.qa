"use client";

import { motion } from "framer-motion";

interface InputFieldProps {
    label: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

export default function InputField({ label, type = "text", placeholder, value, onChange, required }: InputFieldProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-mono font-medium ml-1">
                {label} {required && <span className="text-cyan-500/50 select-none">*</span>}
            </label>
            <div className="relative group">
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/10 focus:outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all duration-300 font-display tracking-wider text-xs"
                />
                {/* Corner Accents */}
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/10 group-hover:border-white/30 transition-colors rounded-br-lg pointer-events-none" />

                {/* Animated Border Bottom */}
                <motion.div
                    className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    initial={{ width: 0, opacity: 0 }}
                    whileFocus={{ width: "100%", opacity: 1 }}
                    transition={{ duration: 0.6, ease: "circOut" }}
                    style={{ left: "0%", right: "0%", margin: "0 auto" }}
                />
            </div>
        </div>
    );
}
