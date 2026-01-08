"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface WeatherData {
    temp: number;
    condition: string;
}

export default function MinimalTime() {
    const [time, setTime] = useState<{ hours: string; minutes: string; seconds: string } | null>(null);
    const [weather, setWeather] = useState<WeatherData | null>(null);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const parts = new Intl.DateTimeFormat("en-US", {
                timeZone: "Asia/Qatar",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            }).formatToParts(now);

            const getPart = (type: string) => parts.find(p => p.type === type)?.value || "";

            setTime({
                hours: getPart("hour"),
                minutes: getPart("minute"),
                seconds: getPart("second"),
            });
        };

        const fetchWeather = async () => {
            try {
                // Open-Meteo API (Free, no key required)
                const res = await fetch(
                    "https://api.open-meteo.com/v1/forecast?latitude=25.37&longitude=51.52&current_weather=true"
                );
                const data = await res.json();

                // Map weather codes to simple descriptions
                const codes: Record<number, string> = {
                    0: "CLEAR",
                    1: "MAINLY CLEAR",
                    2: "PARTLY CLOUDY",
                    3: "OVERCAST",
                    45: "FOG",
                    48: "FOG",
                    51: "DRIZZLE",
                    61: "RAIN",
                    71: "SNOW",
                    95: "THUNDER",
                };

                setWeather({
                    temp: Math.round(data.current_weather.temperature),
                    condition: codes[data.current_weather.weathercode] || "STABLE",
                });
            } catch (error) {
                console.error("Weather fetch failed:", error);
                // Fallback for Doha/Pearl average
                setWeather({ temp: 24, condition: "ATMOSPHERIC" });
            }
        };

        updateTime();
        fetchWeather();

        const timeInterval = setInterval(updateTime, 1000);
        const weatherInterval = setInterval(fetchWeather, 600000); // Update weather every 10 mins

        return () => {
            clearInterval(timeInterval);
            clearInterval(weatherInterval);
        };
    }, []);

    if (!time) return null;

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="fixed top-6 left-6 md:top-8 md:left-8 z-50 flex items-start gap-3 md:gap-4"
        >
            {/* Vertical Decor Line */}
            <div className="w-[1px] h-16 bg-gradient-to-b from-white/0 via-white/40 to-white/0" />

            <div className="flex flex-col">
                {/* Top Row: Time Info */}
                <div className="flex items-baseline gap-2">
                    <span className="text-lg md:text-4xl font-display font-bold text-white tracking-tighter drop-shadow-xl leading-none">
                        {time.hours}:{time.minutes}
                    </span>
                    <span className="text-[10px] md:text-base font-mono font-light text-white/60">
                        {time.seconds}
                    </span>
                </div>

                {/* Bottom Row: Weather HUD */}
                <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex items-center gap-1.5">
                        <span className="text-[10px] md:text-xs font-display font-bold text-white tracking-widest">
                            {weather?.temp ?? "--"}°C
                        </span>
                    </div>

                    <div className="w-[1px] h-2.5 bg-white/20" />

                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium whitespace-nowrap">
                        {weather?.condition || "SYNCING..."}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
