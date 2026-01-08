"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { COUNTRIES } from "@/lib/countries";
import Image from "next/image";

interface CountrySelectProps {
    label: string;
    value: string; // ISO code
    onChange: (iso: string) => void;
    mode?: 'flags-only' | 'full';
}

export default function CountrySelect({ label, value, onChange, mode = 'full' }: CountrySelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");

    const selectedCountry = useMemo(() =>
        COUNTRIES.find(c => c.iso === value) || COUNTRIES.find(c => c.iso === 'QA') || COUNTRIES[0]
        , [value]);

    const filteredCountries = useMemo(() =>
        COUNTRIES.filter(c =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.code.includes(search)
        )
        , [search]);

    return (
        <div className="flex flex-col gap-2 relative">
            {label && (
                <label className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-mono font-medium ml-1">
                    {label}
                </label>
            )}

            <button
                type="button"
                onClick={(e) => {
                    // Calculate position for fixed dropdown if needed, but for now simple toggle
                    setIsOpen(!isOpen)
                }}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-left flex items-center justify-between group hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300"
            >
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="relative w-6 h-4 rounded-[2px] overflow-hidden shadow-sm shrink-0">
                        <img
                            src={selectedCountry?.flag}
                            alt={selectedCountry?.name}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <span className="font-display tracking-wider text-xs text-white truncate">
                        {mode === 'full' ? selectedCountry?.name : selectedCountry?.code}
                    </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-white/30 group-hover:text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-[120]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="fixed z-[121] w-[280px] md:w-[320px] max-h-[300px] overflow-hidden bg-[#0A0A0A]/95 backdrop-blur-3xl border border-white/10 rounded-xl p-2 shadow-2xl ring-1 ring-white/5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        >

                            {/* Search */}
                            <div className="relative mb-2 px-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="SEARCH..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full bg-white/5 border border-white/5 rounded-lg pl-10 pr-4 py-2.5 text-[10px] font-mono tracking-widest text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors uppercase"
                                />
                            </div>

                            <div className="max-h-[240px] overflow-y-auto custom-scrollbar pr-1">
                                {filteredCountries.map((country) => (
                                    <button
                                        key={country.iso}
                                        type="button"
                                        onClick={() => {
                                            onChange(country.iso);
                                            setIsOpen(false);
                                            setSearch("");
                                        }}
                                        className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/10 rounded-lg transition-colors group"
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="relative w-5 h-3.5 rounded-[2px] overflow-hidden shadow-sm opacity-80 group-hover:opacity-100 transition-opacity">
                                                <img src={country.flag} alt={country.name} className="object-cover w-full h-full" />
                                            </div>
                                            <span className="text-[10px] font-display font-medium tracking-wider text-white/60 group-hover:text-white transition-colors truncate text-left">
                                                {country.name}
                                            </span>
                                        </div>
                                        <span className="text-[9px] font-mono text-white/20 group-hover:text-white/40 ml-2 whitespace-nowrap">
                                            {country.code}
                                        </span>
                                    </button>
                                ))}
                                {filteredCountries.length === 0 && (
                                    <div className="text-[10px] font-mono text-white/20 text-center py-4 uppercase">
                                        No matches found
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
