import React, { useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { LexAvatar } from "@/components/LexAvatar";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 },
};

function ParticleField() {
  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 3,
      size: 2 + Math.random(),
      opacity: 0.4 + Math.random() * 0.2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[#c9a84c]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `float-up ${p.duration}s ease-in-out infinite alternate`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#2a1b4d] rounded-full blur-[120px] opacity-30" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#c9a84c] rounded-full blur-[150px] opacity-20" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen text-foreground flex flex-col items-center py-12 px-4 md:px-8 relative overflow-hidden">
      <ParticleField />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl w-full z-10 flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-black tracking-widest mb-3 uppercase gold-shimmer-text">
            Lawphabet
          </h1>
          <p className="text-sm md:text-base font-serif text-primary/80 tracking-widest uppercase mb-2">
            Contract Law Edition · Volume I
          </p>
          <p className="text-lg md:text-xl font-serif text-muted-foreground italic tracking-wide mb-1">
            Know the Word. Know the Law.
          </p>
          <p className="text-xs md:text-sm font-serif text-primary/60 tracking-wide">
            360 Degrees of Legal Knowledge — Full Circle
          </p>
        </motion.div>

        <div className="mb-16 w-full flex justify-center">
          <LexAvatar 
            glowing={true}
            message="Welcome, seeker. Choose a letter and discover what the law has always known but never told you." 
          />
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4 md:gap-6 w-full"
        >
          {ALPHABET.map((letter) => (
            <motion.div key={letter} variants={item}>
              <Link href={`/word/${letter}`} className="block h-full group" data-testid={`link-letter-${letter}`}>
                <div className="relative flex items-center justify-center aspect-square backdrop-blur-sm bg-white/[0.03] border border-primary/40 rounded-md overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1 group-hover:border-primary group-hover:shadow-[0_8px_32px_rgba(201,168,76,0.4)] group-hover:animate-[tile-pulse_2s_ease-in-out_infinite]">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-md pointer-events-none" />
                  
                  {/* Shimmer effect */}
                  <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] group-hover:animate-[shimmer_1.5s_infinite]" />
                  
                  <span className="font-serif text-4xl md:text-5xl font-bold text-foreground transition-all duration-300 group-hover:text-[#c9a84c] group-hover:drop-shadow-[0_0_8px_rgba(201,168,76,0.8)]">
                    {letter}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
