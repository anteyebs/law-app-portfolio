import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LexAvatar({
  message,
  className = '',
  glowing = true,
}: {
  message?: string;
  className?: string;
  glowing?: boolean;
}) {
  return (
    <div className={`flex flex-col md:flex-row items-center md:items-start gap-6 ${className}`}>
      <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0">
        {glowing && (
          <motion.div
            className="absolute inset-0 rounded-full z-0"
            animate={{ 
              boxShadow: [
                "0 0 30px 8px rgba(201,168,76,0.15)", 
                "0 0 50px 18px rgba(201,168,76,0.35)", 
                "0 0 30px 8px rgba(201,168,76,0.15)"
              ] 
            }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
          />
        )}
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md relative z-10">
          <circle cx="50" cy="50" r="48" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2"/>
          {/* Cloak/Robe */}
          <path d="M10 95C10 70 30 65 50 65C70 65 90 70 90 95" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="2"/>
          <path d="M35 95V75L50 85L65 75V95" fill="hsl(var(--secondary))" stroke="hsl(var(--primary))" strokeWidth="1"/>
          {/* Face */}
          <path d="M35 45C35 30 45 20 50 20C55 20 65 30 65 45C65 55 55 60 50 60C45 60 35 55 35 45Z" fill="hsl(var(--foreground))" opacity="0.9" />
          {/* Eyes */}
          <path d="M42 42C42 41 45 41 45 42" stroke="hsl(var(--background))" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M58 42C58 41 55 41 55 42" stroke="hsl(var(--background))" strokeWidth="1.5" strokeLinecap="round"/>
          {/* Hood */}
          <path d="M25 50C25 25 35 10 50 10C65 10 75 25 75 50L85 65C85 65 70 60 50 60C30 60 15 65 15 65L25 50Z" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1"/>
        </svg>
      </div>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="relative backdrop-blur-md bg-white/[0.06] border border-primary/40 shadow-[0_0_30px_rgba(201,168,76,0.12)] p-5 md:p-6 rounded-lg max-w-md"
          >
            <div className="absolute -top-3 md:top-6 left-1/2 md:-left-3 transform -translate-x-1/2 md:translate-x-0 w-6 h-6 bg-transparent border-t border-l border-primary/40 rotate-45 md:-rotate-45 backdrop-blur-md before:absolute before:inset-0 before:bg-white/[0.06] before:z-[-1]" />
            <p className="font-serif text-lg md:text-xl text-primary leading-relaxed relative z-10 italic">
              "{message}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
