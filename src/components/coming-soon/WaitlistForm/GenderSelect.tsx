"use client";

import { motion } from "framer-motion";

interface GenderSelectProps {
    value: string;
    onChange: (value: string) => void;
}

const GENDERS = [
    { id: "male", label: "MALE" },
    { id: "female", label: "FEMALE" },
    { id: "other", label: "OTHER" },
];

export default function GenderSelect({ value, onChange }: GenderSelectProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-mono font-medium ml-1">
                GENDER
            </label>
            <div className="grid grid-cols-3 gap-2 bg-white/[0.03] p-1 rounded-xl border border-white/10">
                {GENDERS.map((gender) => (
                    <button
                        key={gender.id}
                        type="button"
                        onClick={() => onChange(gender.id)}
                        className="relative py-3 rounded-lg transition-colors overflow-hidden"
                    >
                        {value === gender.id && (
                            <motion.div
                                layoutId="gender-bg"
                                className="absolute inset-0 bg-white shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className={`relative z-10 text-[9px] font-display font-medium tracking-[0.2em] transition-colors duration-300 ${value === gender.id ? 'text-black' : 'text-white/40'}`}>
                            {gender.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
