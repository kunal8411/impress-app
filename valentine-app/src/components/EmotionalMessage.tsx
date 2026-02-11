"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StarRating from "./StarRating";

const LOVE_LINES = [
  "Ever since you came into my life, everything feels brighter and more beautiful.",
  "I'm incredibly grateful that you chose me as your life partner.",
  "I promise you this - I'll always be there for you, today, tomorrow, and forever.",
  "",
  "My love for you grows stronger every single day. ❤️",
  "",
  "Thank you for being by my side.",
  "You are my dream girl, my happiness, and my favorite person.",
  "Somehow, every day I fall for you all over again.",
  "",
  "We've completed 2 years and 2 months since our wedding -",
  "and these truly are the golden days of my life. ✨",
  "",
  "I love you more than words, more than code, and more than coffee (and that says a lot 😄).",
  "Thank you for everything. Always you. I love you moreeeeeeeeeeeee Shreyu ❤️.",
];

export default function EmotionalMessage() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showRating, setShowRating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= LOVE_LINES.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (visibleLines >= LOVE_LINES.length) {
      const timeout = setTimeout(() => setShowRating(true), 1500);
      return () => clearTimeout(timeout);
    }
  }, [visibleLines]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full max-w-2xl mx-auto px-4 py-6 md:px-8 md:py-8"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl md:text-3xl font-bold text-rose-700 text-center mb-8"
      >
        💌 A Letter For You 💌
      </motion.h2>

      <div className="space-y-2 text-center">
        {LOVE_LINES.map((line, index) => {
          if (index >= visibleLines) return null;

          if (line === "") {
            return <div key={index} className="h-3" />;
          }

          return (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-base md:text-lg text-rose-800/90 leading-relaxed font-medium"
              style={{ fontStyle: "italic" }}
            >
              {line}
            </motion.p>
          );
        })}
      </div>

      {showRating && <StarRating />}
    </motion.div>
  );
}
