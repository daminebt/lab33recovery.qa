"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import InputField from "./WaitlistForm/InputField";
import GenderSelect from "./WaitlistForm/GenderSelect";
import BirthdatePicker from "./WaitlistForm/BirthdatePicker";
import CountrySelect from "./WaitlistForm/CountrySelect";
import PhoneInput from "./WaitlistForm/PhoneInput";

interface WaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
    const [formData, setFormData] = useState({
        gender: "",
        firstName: "",
        lastName: "",
        birthdate: null as Date | null,
        nationality: "QA",
        phoneIso: "QA",
        phone: "",
        email: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        onClose();
    };

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 30, stiffness: 200 }}
                        className="relative w-full max-w-xl bg-[#030303]/90 backdrop-blur-3xl border border-white/10 rounded-2xl p-5 md:p-8 pointer-events-auto overflow-hidden shadow-[0_0_80px_rgba(255,255,255,0.03)] ring-1 ring-white/5"
                    >
                        {/* Global HUD Glow */}
                        <div className="absolute -top-32 -left-32 w-64 h-64 bg-white/5 blur-[120px] rounded-full pointer-events-none" />
                        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-white/5 blur-[120px] rounded-full pointer-events-none" />

                        {/* Grid Texture Background */}
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] pointer-events-none" />

                        {/* HUD Decorative Elements - Corners */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/10 rounded-tl-2xl" />
                        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-white/10 rounded-tr-2xl" />
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-white/10 rounded-bl-2xl" />
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/10 rounded-br-2xl" />

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-white/30 hover:text-white transition-all hover:bg-white/5 rounded-full z-50 group"
                        >
                            <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
                        </button>

                        {/* Form Content */}
                        <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
                            {/* Header Section - Minimal, Professional */}
                            <div className="space-y-1 mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-white/60 rounded-full" />
                                    <h2 className="text-lg md:text-xl font-display font-medium text-white tracking-[0.1em] uppercase">
                                        Join the Waitlist
                                    </h2>
                                </div>
                                <p className="text-[9px] font-mono text-white/30 tracking-[0.15em] uppercase ml-3">
                                    Complete the form to register your interest.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                                {/* 1. Names - Row 1 */}
                                <InputField
                                    label="First Name"
                                    placeholder="Enter your first name"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    required
                                />
                                <InputField
                                    label="Last Name"
                                    placeholder="Enter your last name"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    required
                                />

                                {/* 2. Contact - Row 2 & 3 */}
                                <div className="md:col-span-2">
                                    <InputField
                                        label="Email Address"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <PhoneInput
                                        label="Phone Number"
                                        isoValue={formData.phoneIso}
                                        phoneValue={formData.phone}
                                        onIsoChange={(iso) => setFormData({ ...formData, phoneIso: iso })}
                                        onPhoneChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                    />
                                </div>

                                {/* 3. Demographics - Row 4 */}
                                <BirthdatePicker
                                    value={formData.birthdate}
                                    onChange={(date) => setFormData({ ...formData, birthdate: date })}
                                />

                                <CountrySelect
                                    label="Nationality"
                                    value={formData.nationality}
                                    onChange={(iso) => setFormData({ ...formData, nationality: iso })}
                                />

                                {/* 4. Gender - Row 5 (Full) */}
                                <div className="md:col-span-2">
                                    <GenderSelect
                                        value={formData.gender}
                                        onChange={(val) => setFormData({ ...formData, gender: val })}
                                    />
                                </div>
                            </div>

                            {/* Submit Section */}
                            <div className="pt-4 border-t border-white/5">
                                <motion.button
                                    whileHover={{ scale: 1.005 }}
                                    whileTap={{ scale: 0.99 }}
                                    type="submit"
                                    className="group relative w-full py-3.5 overflow-hidden rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                                >
                                    {/* Background Layer */}
                                    <div className="absolute inset-0 bg-white/5 border border-white/10 group-hover:bg-white group-hover:border-white transition-all duration-300" />

                                    {/* Shine Effect */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                                    </div>

                                    {/* Text Content */}
                                    <div className="relative z-10 flex items-center justify-center gap-2">
                                        <span className="font-display font-medium tracking-[0.2em] uppercase text-xs text-white group-hover:text-black transition-colors duration-300">
                                            Submit Registration
                                        </span>
                                    </div>
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
