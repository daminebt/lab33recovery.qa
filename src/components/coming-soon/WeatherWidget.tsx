"use client";

import { useEffect, useState } from "react";
import { CloudRain, Sun, Moon, Cloud, Wind } from "lucide-react";
import { motion } from "framer-motion";

export default function WeatherWidget() {
    const [time, setTime] = useState<string>("");
    const [date, setDate] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
            setDate(now.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="fixed top-8 right-8 flex flex-col items-end z-50 text-right backdrop-blur-md bg-black/10 p-4 rounded-2xl border border-white/5 shadow-2xl"
        >
            <div className="text-4xl font-display font-bold tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                {time}
            </div>
            <div className="text-xs font-sans text-gray-400 uppercase tracking-widest mt-1 mb-3">
                {date}
            </div>

            <div className="flex items-center gap-3 text-sm font-medium text-gray-300">
                <span className="flex items-center gap-1.5">
                    <Wind className="w-4 h-4 text-lab-cyan animate-pulse" />
                    <span className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">24°C</span>
                </span>
                <div className="h-3 w-px bg-gray-700" />
                <span className="uppercase text-[10px] tracking-widest">Doha, QA</span>
            </div>
        </motion.div>
    );
}
