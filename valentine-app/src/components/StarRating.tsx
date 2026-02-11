"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function StarRating() {
  const [showRating, setShowRating] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStars, setSelectedStars] = useState(0);
  const [ratingMessage, setRatingMessage] = useState("");
  const [showPerfect, setShowPerfect] = useState(false);

  const handleRate = (stars: number) => {
    setSelectedStars(stars);

    if (stars < 5) {
      setRatingMessage(
        "System override: Only 5 stars accepted for lifetime partners 😌"
      );
      setShowPerfect(false);
    } else {
      setRatingMessage("Perfect! Just like us! 💖");
      setShowPerfect(true);
      // Heart confetti burst
      const heart = confetti.shapeFromText({ text: "❤️", scalar: 2 });
      confetti({
        shapes: [heart],
        particleCount: 50,
        spread: 80,
        origin: { y: 0.7 },
        scalar: 1.5,
        ticks: 100,
      });
    }
  };

  return (
    <motion.div
      className="mt-8 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {!showRating ? (
        <motion.button
          onClick={() => setShowRating(true)}
          className="px-8 py-3 bg-gradient-to-r from-pink-400 to-rose-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          Rate this proposal 😄
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          <p className="text-lg text-rose-700 mb-4 font-medium">
            How would you rate this proposal?
          </p>

          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                className="star-btn text-4xl md:text-5xl cursor-pointer select-none"
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => handleRate(star)}
                whileHover={{ scale: 1.3, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                animate={
                  selectedStars >= star || hoveredStar >= star
                    ? { color: "#fbbf24", textShadow: "0 0 10px rgba(251, 191, 36, 0.5)" }
                    : { color: "#d1d5db" }
                }
              >
                ⭐
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {ratingMessage && (
              <motion.p
                key={ratingMessage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`text-base md:text-lg font-medium mt-3 ${
                  showPerfect ? "text-green-600" : "text-rose-600"
                }`}
              >
                {ratingMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
}
