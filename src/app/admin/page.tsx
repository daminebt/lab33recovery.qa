"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsReady(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.8,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
            },
        },
    };

    return (
        <main className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-black">
            {/* Cinematic Opening */}
            <AnimatePresence>
                {!isReady && (
                    <motion.div
                        initial={{ scaleY: 1 }}
                        animate={{ scaleY: 0 }}
                        exit={{ scaleY: 0 }}
                        transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
                        className="fixed inset-0 z-50 bg-black origin-top"
                    />
                )}
            </AnimatePresence>

            {/* Background Image */}
            <motion.div
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 4, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 z-0 overflow-hidden bg-black"
            >
                <Image
                    src="/admin-bg.webp"
                    alt="Lab 33 Recovery Lounge Interior - Admin Portal Background"
                    fill
                    className="object-cover blur-[2px]"
                    quality={85}
                    priority
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 3, delay: 0.8 }}
                    className="absolute inset-0 bg-black/50"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 3, delay: 1.2 }}
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80"
                />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
            </motion.div>

            {/* Ambient Light */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.25, scale: 1 }}
                transition={{ duration: 4, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/10 rounded-full blur-[120px] pointer-events-none"
            />

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-md mx-4"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                    className="relative p-8 md:p-10 bg-black/50 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden"
                >
                    {/* Card Glows */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 2, delay: 1.2 }}
                        className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl"
                    />
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 2, delay: 1.4 }}
                        className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/5 rounded-full blur-3xl"
                    />

                    {/* Header */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative text-center mb-10"
                    >
                        {/* Logo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            transition={{ duration: 1.5, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
                            className="flex justify-center mb-8"
                        >
                            <Image
                                src="/logo-v2.webp"
                                alt="Lab 33"
                                width={200}
                                height={80}
                                className="h-14 w-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                            />
                        </motion.div>

                        <div className="space-y-6">

                            {/* Subtitle */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
                                className="flex items-center justify-center gap-4"
                            >
                                <motion.div
                                    initial={{ scale: 0, rotate: 0 }}
                                    animate={{ scale: 1, rotate: 45 }}
                                    transition={{ duration: 0.8, delay: 2.7, ease: [0.22, 1, 0.36, 1] }}
                                    className="w-1 h-1 bg-white/30"
                                />
                                <div className="overflow-hidden">
                                    <motion.p
                                        initial={{ y: 20 }}
                                        animate={{ y: 0 }}
                                        transition={{ duration: 1, delay: 2.6, ease: [0.22, 1, 0.36, 1] }}
                                        className="text-[10px] text-white/40 tracking-[0.5em] uppercase font-light"
                                    >
                                        Staff Login
                                    </motion.p>
                                </div>
                                <motion.div
                                    initial={{ scale: 0, rotate: 0 }}
                                    animate={{ scale: 1, rotate: 45 }}
                                    transition={{ duration: 0.8, delay: 2.7, ease: [0.22, 1, 0.36, 1] }}
                                    className="w-1 h-1 bg-white/30"
                                />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.form
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        onSubmit={handleSubmit}
                        className="relative space-y-6"
                    >
                        {/* Email Field */}
                        <motion.div variants={itemVariants} className="relative">
                            <label className="block text-[10px] font-medium text-white/40 tracking-[0.3em] uppercase mb-2">
                                Email
                            </label>
                            <div className={`relative group transition-all duration-500 ${isFocused === 'email' ? 'scale-[1.02]' : ''}`}>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setIsFocused('email')}
                                    onBlur={() => setIsFocused(null)}
                                    required
                                    className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-full text-white text-sm placeholder-white/20 outline-none transition-all duration-500 focus:border-white/40 focus:bg-white/[0.06] focus:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                                    placeholder="admin@lab33.com"
                                />
                            </div>
                        </motion.div>

                        {/* Password Field */}
                        <motion.div variants={itemVariants} className="relative">
                            <label className="block text-[10px] font-medium text-white/40 tracking-[0.3em] uppercase mb-2">
                                Password
                            </label>
                            <div className={`relative group transition-all duration-500 ${isFocused === 'password' ? 'scale-[1.02]' : ''}`}>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setIsFocused('password')}
                                    onBlur={() => setIsFocused(null)}
                                    required
                                    className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 rounded-full text-white text-sm placeholder-white/20 outline-none transition-all duration-500 focus:border-white/40 focus:bg-white/[0.06] focus:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                                    placeholder="••••••••••••"
                                />
                            </div>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div variants={itemVariants} className="pt-4">
                            <motion.button
                                type="submit"
                                disabled={isLoading}
                                whileHover="hover"
                                whileTap={{ scale: 0.98 }}
                                className="relative w-full group"
                            >
                                <motion.div
                                    className="absolute inset-0 bg-white/10 blur-[30px] rounded-full"
                                    variants={{ hover: { scale: 1.2, opacity: 0.3 } }}
                                    initial={{ scale: 1, opacity: 0.1 }}
                                />
                                <motion.div
                                    className="relative py-4 px-8 bg-black/50 backdrop-blur-2xl border border-white/10 rounded-full flex items-center justify-center gap-3"
                                    variants={{
                                        hover: {
                                            borderColor: "rgba(255,255,255,0.5)",
                                            backgroundColor: "rgba(255,255,255,0.08)",
                                            boxShadow: "0 0 30px rgba(255,255,255,0.15)",
                                        },
                                    }}
                                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                                >
                                    {isLoading ? (
                                        <>
                                            <motion.div
                                                className="w-2 h-2 bg-white rounded-full"
                                                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                                transition={{ duration: 1, repeat: Infinity }}
                                            />
                                            <span className="text-xs font-display font-semibold text-white/80 tracking-[0.35em] uppercase">
                                                Authenticating
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="relative w-2 h-2">
                                                <motion.div
                                                    className="absolute inset-0 bg-white rounded-full"
                                                    animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                                />
                                                <div className="relative w-full h-full bg-white rounded-full shadow-[0_0_12px_white]" />
                                            </div>
                                            <motion.span
                                                className="text-xs font-display font-semibold text-white/80 tracking-[0.35em] uppercase"
                                                variants={{ hover: { color: "rgba(255,255,255,1)" } }}
                                            >
                                                Sign In
                                            </motion.span>
                                        </>
                                    )}
                                </motion.div>
                            </motion.button>
                        </motion.div>
                    </motion.form>

                    {/* Footer - Forgot Password with Breathing Effect */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.2 }}
                        className="mt-8 pt-6 border-t border-white/[0.05] text-center"
                    >
                        <motion.button
                            type="button"
                            animate={{ opacity: [0.4, 0.7, 0.4] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="text-[10px] text-white tracking-[0.3em] uppercase hover:opacity-100 transition-opacity duration-300"
                        >
                            Forgot Password?
                        </motion.button>
                    </motion.div>
                </motion.div>
            </motion.div>
        </main>
    );
}
