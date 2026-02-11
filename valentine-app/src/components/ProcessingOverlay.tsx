"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROCESSING_MESSAGES = [
  "Processing your answer...",
  "Calculating future together...",
  "Loading happiness.exe...",
  "Deploying love protocol...",
  "✅ Answer verified!",
];

interface Props {
  onComplete: () => void;
}

export default function ProcessingOverlay({ onComplete }: Props) {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMessage((prev) => {
        if (prev >= PROCESSING_MESSAGES.length - 1) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 900);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-card rounded-3xl p-8 md:p-12 text-center max-w-md mx-4"
      >
        {/* Spinner */}
        <div className="mb-6 flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-pink-200 border-t-rose-500 rounded-full"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={currentMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-lg md:text-xl font-semibold text-rose-700"
          >
            {PROCESSING_MESSAGES[currentMessage]}
          </motion.p>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="mt-6 h-2 bg-pink-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{
              width: `${((currentMessage + 1) / PROCESSING_MESSAGES.length) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
