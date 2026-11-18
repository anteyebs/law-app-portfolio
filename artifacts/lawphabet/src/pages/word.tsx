import React, { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, BookOpen, Scale, ScrollText, RefreshCw, AlertTriangle } from "lucide-react";
import { useGetWordsByLetter, getGetWordsByLetterQueryKey } from "@workspace/api-client-react";
import { LexAvatar } from "@/components/LexAvatar";

const Divider = () => (
  <div className="flex items-center justify-center my-8 opacity-50">
    <div className="w-16 h-px bg-primary"></div>
    <div className="mx-4 w-2 h-2 rotate-45 bg-primary"></div>
    <div className="w-16 h-px bg-primary"></div>
  </div>
);

export default function Word() {
  const [match, params] = useRoute("/word/:letter");
  const letter = params?.letter?.toUpperCase() || "A";

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [animKey, setAnimKey] = useState(0);

  const { data: wordEntries, isLoading, error } = useGetWordsByLetter(letter, {
    query: {
      enabled: !!letter,
      queryKey: getGetWordsByLetterQueryKey(letter),
    }
  });

  useEffect(() => {
    if (wordEntries && wordEntries.length > 0) {
      const randomStart = Math.floor(Math.random() * wordEntries.length);
      setCurrentIndex(randomStart);
    }
  }, [wordEntries]);

  function showAnotherWord() {
    if (!wordEntries || wordEntries.length <= 1) return;
    let next: number;
    do {
      next = Math.floor(Math.random() * wordEntries.length);
    } while (next === currentIndex);
    setCurrentIndex(next);
    setAnimKey(k => k + 1);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <p className="mt-6 text-primary font-serif italic text-lg animate-pulse">Consulting the archives...</p>
      </div>
    );
  }

  if (error || !wordEntries || wordEntries.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-serif text-foreground mb-4">The archives are silent on this matter.</h2>
        <Link href="/" className="text-primary hover:underline font-serif" data-testid="link-back-home">
          Return to the index
        </Link>
      </div>
    );
  }

  const wordEntry = wordEntries[currentIndex] ?? wordEntries[0];
  const totalWords = wordEntries.length;

  return (
    <div className="min-h-screen text-foreground pb-20 relative overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-b from-primary/5 to-transparent opacity-50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl mx-auto px-4 md:px-8 pt-8 md:pt-12 relative z-10"
      >
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors group font-serif uppercase tracking-wider text-sm"
            data-testid="button-back"
          >
            <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
            Return to Alphabet
          </Link>

          {totalWords > 1 && (
            <button
              onClick={showAnotherWord}
              data-testid="button-show-another"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-primary/40 bg-primary/10 hover:bg-primary/20 hover:border-primary text-primary font-serif text-sm uppercase tracking-wider transition-all duration-200 hover:shadow-[0_0_16px_rgba(201,168,76,0.3)] group"
            >
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              Show Another Word
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={animKey}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-2 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(201,168,76,0.18),transparent)] blur-xl z-0 pointer-events-none" />
                <h1 className="text-5xl md:text-7xl font-serif font-bold mb-2 md:mb-0 capitalize gold-shimmer-text relative z-10">
                  {wordEntry.word}
                </h1>
                <div className="flex flex-col items-end gap-1 absolute -top-4 right-4 md:top-auto md:right-8 md:bottom-auto">
                  <span className="text-6xl md:text-8xl font-serif text-muted/20 font-black leading-none pointer-events-none select-none">
                    {wordEntry.letter}
                  </span>
                  {totalWords > 1 && (
                    <span className="text-xs font-serif text-primary/40 tracking-widest uppercase">
                      {currentIndex + 1} of {totalWords}
                    </span>
                  )}
                </div>
              </div>

              <div className="h-0.5 w-full bg-gradient-to-r from-primary via-primary/50 to-transparent mt-4 mb-12 relative z-10"></div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 relative z-10">
                <div className="md:col-span-8 space-y-10">

                  <section className="backdrop-blur-sm bg-white/[0.04] border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)] p-6 md:p-8 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                    <h3 className="flex items-center text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 relative z-10">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Common Understanding
                    </h3>
                    <p className="text-lg md:text-xl font-sans leading-relaxed text-foreground/90 border-l-4 border-muted pl-4 relative z-10">
                      {wordEntry.commonDefinition}
                    </p>
                  </section>

                  <section className="backdrop-blur-sm bg-primary/[0.07] border border-primary/30 shadow-[inset_0_0_40px_rgba(201,168,76,0.05)] p-6 md:p-8 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                    <h3 className="flex items-center text-sm font-bold uppercase tracking-widest text-primary mb-4 relative z-10">
                      <Scale className="w-4 h-4 mr-2" />
                      Legal Definition
                    </h3>
                    <p className="text-xl md:text-2xl font-serif leading-relaxed text-foreground border-l-4 border-primary pl-4 relative z-10 drop-shadow-sm">
                      {wordEntry.legaleseDefinition}
                    </p>
                  </section>

                  <Divider />

                  <section className="px-2">
                    <h3 className="flex items-center text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
                      <ScrollText className="w-4 h-4 mr-2" />
                      Etymology
                    </h3>
                    <p className="text-md font-serif text-[#c9a84c] italic tracking-wide">
                      {wordEntry.etymology}
                    </p>
                  </section>

                  <section className="px-2">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
                      In Practice
                    </h3>
                    <blockquote className="text-md md:text-lg font-serif text-foreground/80 pl-6 border-l-2 border-[#c9a84c] py-2 shadow-[-10px_0_15px_-10px_rgba(201,168,76,0.3)]">
                      "{wordEntry.legalUsage}"
                    </blockquote>
                  </section>

                  <section className="backdrop-blur-sm bg-white/[0.04] border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)] p-6 md:p-8 rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                    <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4 relative z-10">
                      Why This Matters
                    </h3>
                    <p className="text-md md:text-lg font-sans leading-relaxed text-foreground/90 relative z-10">
                      {wordEntry.whyItMatters}
                    </p>
                  </section>

                </div>

                <div className="md:col-span-4 mt-8 md:mt-0">
                  <div className="sticky top-8">
                    <LexAvatar
                      glowing={true}
                      message={wordEntry.lexQuote}
                      className="flex-col items-center text-center md:items-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
