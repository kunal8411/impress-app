"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import FloatingHearts from "./FloatingHearts";
import EmotionalMessage from "./EmotionalMessage";
import ProcessingOverlay from "./ProcessingOverlay";

// --- Constants ---
const YES_TEXTS = ["Yes", "Yes ❤️", "Obviously Yes", "YES!!!", "YES PLEASE!!! 💍"];

const NO_MESSAGES = [
  "Are you sure? 🤔",
  "Think carefully...",
  "System error: Wrong choice detected 🚫",
  "This button seems broken 🤔",
  "Deploying love.exe... 💕",
  "Error 404: Valid reason not found 😏",
  "Nice try! But nope 😄",
  "The universe disagrees with you ✨",
  "Even this button wants you to say Yes 💖",
  "Last chance... just kidding, try again! 😂",
];

// --- Cute GIF Component ---
function CuteGif() {
  return (
    <div className="flex justify-center mb-4">
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Using a cute bear/cat emoji placeholder with animation */}
        <div className="text-6xl md:text-7xl select-none">
          <motion.span
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🐻‍❄️
          </motion.span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="inline-block ml-1"
          >
            💕
          </motion.span>
          <motion.span
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          >
            🐱
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}

// --- Success Screen ---
function SuccessScreen() {
  const [showMessage, setShowMessage] = useState(false);
  const [confettiDone, setConfettiDone] = useState(false);
  const [waitText, setWaitText] = useState(true);

  // Unlock scrolling when success screen mounts
  useEffect(() => {
    document.body.classList.remove("no-scroll");
    return () => {
      document.body.classList.add("no-scroll");
    };
  }, []);

  useEffect(() => {
    // Multi-burst confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ["#ff6b81", "#ff4757", "#ff6348", "#ffa502", "#ff6b81", "#e84393"];

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.6 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.6 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Big burst
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        colors,
      });
    }, 500);

    // Heart shapes
    setTimeout(() => {
      const heart = confetti.shapeFromText({ text: "❤️", scalar: 2 });
      confetti({
        shapes: [heart],
        particleCount: 30,
        spread: 80,
        origin: { y: 0.5 },
        scalar: 2,
      });
    }, 1500);

    // Vibration support
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 200]);
    }

    // After confetti ends, show emotional message
    const confettiTimer = setTimeout(() => {
      setConfettiDone(true);
    }, duration + 500);

    return () => clearTimeout(confettiTimer);
  }, []);

  useEffect(() => {
    if (confettiDone) {
      // Show "wait, I have something for you" for 2.5s then reveal letter
      const waitTimer = setTimeout(() => {
        setWaitText(false);
        setShowMessage(true);
        // Smooth scroll down to the letter after a brief delay
        setTimeout(() => {
          window.scrollTo({ top: 300, behavior: "smooth" });
        }, 400);
      }, 2500);
      return () => clearTimeout(waitTimer);
    }
  }, [confettiDone]);

  return (
    <div className="valentine-bg-success heart-pattern min-h-screen flex flex-col items-center justify-start py-8 pb-16">
      <FloatingHearts />

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8, bounce: 0.5 }}
        className="glass-card rounded-3xl p-6 md:p-10 max-w-lg mx-4 text-center z-10 mt-8"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-5xl md:text-6xl mb-4"
        >
          🎉💍✨
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-bold text-rose-700 mb-3"
        >
          Congratulations!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-rose-600 font-medium leading-relaxed"
        >
          You accepted the correct guy in your life.
          <br />
          <span className="font-bold">Best decision ever! 💍✨</span>
        </motion.p>

        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-4 text-4xl"
        >
          💖
        </motion.div>
      </motion.div>

      {/* Wait message before love letter */}
      <AnimatePresence mode="wait">
        {confettiDone && waitText && !showMessage && (
          <motion.div
            key="wait"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-8 z-10"
          >
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-xl md:text-2xl font-semibold text-rose-700"
            >
              Wait... I have something for you to read 💌
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Emotional Message Section */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="z-10 mt-6 w-full glass-card rounded-3xl mx-4 max-w-2xl"
          >
            <EmotionalMessage />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-16" />
    </div>
  );
}

// --- Main Valentine App ---
export default function ValentineApp() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [showProcessing, setShowProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [floatingMsg, setFloatingMsg] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lock scrolling on the question screen to prevent teleport scrollbars
  useEffect(() => {
    if (!showSuccess) {
      document.body.classList.add("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [showSuccess]);

  // Current Yes button text
  const yesText = YES_TEXTS[Math.min(noCount, YES_TEXTS.length - 1)];

  // Yes button scale grows with each No attempt
  const yesScale = 1 + noCount * 0.08;

  // Handle No button interaction
  const handleNo = useCallback(() => {
    setNoCount((prev) => prev + 1);

    // Show floating message
    const msgIndex = noCount % NO_MESSAGES.length;
    setFloatingMsg(NO_MESSAGES[msgIndex]);

    // Trigger shake
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);

    // Teleport No button to random position
    const padding = 80;
    const maxX = window.innerWidth - padding * 2;
    const maxY = window.innerHeight - padding * 2;
    const newX = Math.random() * maxX + padding;
    const newY = Math.random() * maxY + padding;
    setNoPosition({ x: newX, y: newY });

    // Clear floating message after a delay
    setTimeout(() => setFloatingMsg(""), 2500);
  }, [noCount]);

  // Handle Yes button click
  const handleYes = useCallback(() => {
    setYesPressed(true);
    setShowProcessing(true);
  }, []);

  // After processing completes
  const handleProcessingComplete = useCallback(() => {
    setShowProcessing(false);
    setShowSuccess(true);
  }, []);

  // Show success screen
  if (showSuccess) {
    return <SuccessScreen />;
  }

  return (
    <div
      ref={containerRef}
      className="valentine-bg min-h-screen w-full flex items-center justify-center relative overflow-hidden"
    >
      <FloatingHearts />

      {/* Processing Overlay */}
      <AnimatePresence>
        {showProcessing && (
          <ProcessingOverlay onComplete={handleProcessingComplete} />
        )}
      </AnimatePresence>

      {/* Floating Message */}
      <AnimatePresence>
        {floatingMsg && (
          <motion.div
            key={floatingMsg}
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ opacity: 1, y: -20, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-40 px-6 py-3 rounded-full glass-card text-rose-700 font-semibold text-base md:text-lg shadow-lg"
          >
            {floatingMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Card */}
      <motion.div
        className={`glass-card rounded-3xl p-6 md:p-10 max-w-md w-[90%] md:w-full text-center z-10 relative ${
          isShaking ? "animate-shake" : ""
        }`}
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", duration: 0.8, bounce: 0.4 }}
      >
        {/* Cute GIF */}
        <CuteGif />

        {/* Heading */}
        <motion.h1
          className="text-xl md:text-2xl lg:text-3xl font-bold text-rose-700 leading-snug mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Shreyu, will you be my Valentine this year and all the years to come?
        </motion.h1>

        {/* Attempt counter */}
        {noCount > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-rose-400 mb-4"
          >
            Wrong attempts: {noCount} 😅
          </motion.p>
        )}

        {/* Buttons Container */}
        <div className="flex items-center justify-center gap-4 mt-4">
          {/* Yes Button */}
          <motion.button
            onClick={handleYes}
            disabled={yesPressed}
            className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full font-bold text-lg md:text-xl shadow-lg yes-glow cursor-pointer"
            animate={{
              scale: yesScale,
            }}
            whileHover={{
              scale: yesScale * 1.08,
              boxShadow: "0 0 40px rgba(34, 197, 94, 0.6)",
            }}
            whileTap={{ scale: yesScale * 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{ animation: noCount >= 2 ? "heartbeat 1.5s ease-in-out infinite" : "none" }}
          >
            {yesText}
          </motion.button>

          {/* No Button — teleports when it hasn't been clicked yet */}
          {!noPosition && (
            <motion.button
              onMouseEnter={handleNo}
              onClick={handleNo}
              className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-red-400 to-rose-500 text-white rounded-full font-bold text-lg md:text-xl shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              No
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Teleported No Button */}
      <AnimatePresence>
        {noPosition && (
          <motion.button
            key={`no-${noCount}`}
            onMouseEnter={handleNo}
            onClick={handleNo}
            className="fixed z-30 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-red-400 to-rose-500 text-white rounded-full font-bold text-lg md:text-xl shadow-lg cursor-pointer"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: Math.max(1 - noCount * 0.05, 0.6),
              left: noPosition.x,
              top: noPosition.y,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            style={{ transform: "translate(-50%, -50%)" }}
          >
            No
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
