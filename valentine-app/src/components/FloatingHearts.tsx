"use client";

import { useMemo } from "react";

const HEART_EMOJIS = ["💕", "💖", "💗", "💓", "❤️", "🩷", "💘", "💝"];

interface Heart {
  id: number;
  emoji: string;
  left: string;
  size: string;
  animationDuration: string;
  animationDelay: string;
  opacity: number;
}

export default function FloatingHearts() {
  const hearts: Heart[] = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: HEART_EMOJIS[i % HEART_EMOJIS.length],
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 1.2 + 0.6}rem`,
      animationDuration: `${Math.random() * 8 + 8}s`,
      animationDelay: `${Math.random() * 10}s`,
      opacity: Math.random() * 0.4 + 0.2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute"
          style={{
            left: heart.left,
            fontSize: heart.size,
            opacity: heart.opacity,
            animation: `floatHeart ${heart.animationDuration} linear infinite`,
            animationDelay: heart.animationDelay,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  );
}
