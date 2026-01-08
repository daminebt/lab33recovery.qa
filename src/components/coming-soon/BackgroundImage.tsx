"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function BackgroundImage() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="fixed inset-0 z-0 overflow-hidden bg-black"
        >
            <Image
                src="/background.webp"
                alt="Background"
                fill
                className="object-cover"
                quality={90}
                priority
            />

            {/* Overlay - Darken slightly */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Gradient Fade to Black at Bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
        </motion.div>
    );
}
