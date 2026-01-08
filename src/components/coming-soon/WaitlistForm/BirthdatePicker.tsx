"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    isSameMonth,
    isSameDay,
    addDays,
    eachDayOfInterval,
    getYear,
    setYear,
    setMonth
} from "date-fns";

interface BirthdatePickerProps {
    value: Date | null;
    onChange: (date: Date) => void;
}

export default function BirthdatePicker({ value, onChange }: BirthdatePickerProps) {
    const [showCalendar, setShowCalendar] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(value || new Date());
    const [view, setView] = useState<'days' | 'months' | 'years'>('days');

    const years = Array.from({ length: 100 }, (_, i) => getYear(new Date()) - i);
    const months = [
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];

    const renderDays = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const days = eachDayOfInterval({ start: startDate, end: endDate });

        return (
            <div className="grid grid-cols-7 gap-1">
                {["SU", "MO", "TU", "WE", "TH", "FR", "SA"].map(d => (
                    <div key={d} className="text-[10px] text-center font-bold text-white/20 py-2 uppercase tracking-widest">{d}</div>
                ))}
                {days.map((day, i) => {
                    const isCurrentMonth = isSameMonth(day, monthStart);
                    const isSelected = value && isSameDay(day, value);

                    return (
                        <button
                            key={i}
                            type="button"
                            onClick={() => {
                                onChange(day);
                                setShowCalendar(false);
                            }}
                            className={`
                aspect-square flex items-center justify-center text-[10px] rounded-lg transition-all duration-300
                ${!isCurrentMonth ? 'text-white/10' : 'text-white/60 hover:bg-white/10 md:hover:scale-110'}
                ${isSelected ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]' : ''}
              `}
                        >
                            {format(day, "d")}
                        </button>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-2 relative">
            <label className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-mono font-medium ml-1">
                DATE OF BIRTH
            </label>

            <button
                type="button"
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-left flex items-center justify-between group hover:border-white/30 transition-all duration-300"
            >
                <span className={`font-display tracking-wider text-xs ${value ? 'text-white' : 'text-white/20'}`}>
                    {value ? format(value, "MMMM dd, yyyy") : "SELECT DATE"}
                </span>
                <CalendarIcon className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
            </button>

            <AnimatePresence>
                {showCalendar && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowCalendar(false)}
                            className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="fixed z-[111] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] bg-[#0A0A0A] border border-white/10 rounded-2xl p-4 shadow-2xl overflow-hidden ring-1 ring-white/10"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setView(view === 'months' ? 'days' : 'months')}
                                        className="text-[10px] font-bold text-white hover:text-white/60 transition-colors uppercase tracking-widest"
                                    >
                                        {format(currentMonth, "MMMM")}
                                    </button>
                                    <button
                                        onClick={() => setView(view === 'years' ? 'days' : 'years')}
                                        className="text-[10px] font-bold text-white hover:text-white/60 transition-colors uppercase tracking-widest"
                                    >
                                        {format(currentMonth, "yyyy")}
                                    </button>
                                </div>
                                <div className="flex gap-1">
                                    <button type="button" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-1 text-white/40 hover:text-white"><ChevronLeft className="w-4 h-4" /></button>
                                    <button type="button" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-1 text-white/40 hover:text-white"><ChevronRight className="w-4 h-4" /></button>
                                </div>
                            </div>

                            <div className="min-h-[220px]">
                                {view === 'days' && renderDays()}
                                {view === 'months' && (
                                    <div className="grid grid-cols-3 gap-2 py-4">
                                        {months.map((m, i) => (
                                            <button
                                                key={m}
                                                onClick={() => {
                                                    setCurrentMonth(setMonth(currentMonth, i));
                                                    setView('days');
                                                }}
                                                className="py-3 text-[10px] font-bold text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-all tracking-widest"
                                            >
                                                {m}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {view === 'years' && (
                                    <div className="grid grid-cols-4 gap-2 py-4 max-h-[200px] overflow-y-auto no-scrollbar">
                                        {years.map(y => (
                                            <button
                                                key={y}
                                                onClick={() => {
                                                    setCurrentMonth(setYear(currentMonth, y));
                                                    setView('days');
                                                }}
                                                className="py-3 text-[10px] font-bold text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-all tracking-widest"
                                            >
                                                {y}
                                            </button>
                                        ))}
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
