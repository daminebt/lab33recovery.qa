"use client";

import { useEffect, useRef } from "react";

export default function BackgroundVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.8; // Slow down slightly for more "majestic" feel
        }
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-black">
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="absolute w-full h-full object-cover"
            >
                <source src="/background.mp4" type="video/mp4" />
            </video>

            {/* Overlay - Darken slightly */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Gradient Fade to Black at Bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />

            {/* Noise Texture for "Film" feel (Optional, subtle) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
        </div>
    );
}
