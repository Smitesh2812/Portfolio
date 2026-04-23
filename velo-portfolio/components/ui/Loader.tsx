"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let p = 0;
    const iv = setInterval(() => {
      p = Math.min(p + Math.random() * 18, 100);
      setProgress(Math.floor(p));
      if (p >= 100) {
        clearInterval(iv);
        setTimeout(() => setDone(true), 400);
      }
    }, 70);
    return () => clearInterval(iv);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[var(--bg)]"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated rings */}
          <div className="relative mb-10">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-[rgba(139,92,246,0.15)]"
                style={{
                  width: 120 + i * 60,
                  height: 120 + i * 60,
                  top: "50%",
                  left: "50%",
                  marginLeft: -(60 + i * 30),
                  marginTop: -(60 + i * 30),
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8 + i * 3, repeat: Infinity, ease: "linear" }}
              />
            ))}
            <motion.div
              className="relative z-10 flex items-center justify-center w-[80px] h-[80px]"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span
                className="text-3xl font-black tracking-tighter"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  background: "linear-gradient(135deg, #8B5CF6, #00E5CC)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                V
              </span>
            </motion.div>
          </div>

          <div
            className="text-4xl font-black tracking-tighter mb-8"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              background: "linear-gradient(135deg, #EEEEF4 30%, #00E5CC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            VELO STUDIO
          </div>

          {/* Progress bar */}
          <div className="w-48 h-[1px] bg-[var(--border)] overflow-hidden mb-4">
            <motion.div
              className="h-full"
              style={{
                background: "linear-gradient(90deg, var(--violet), var(--cyan))",
                width: `${progress}%`,
              }}
              transition={{ duration: 0.05 }}
            />
          </div>
          <div
            className="text-[10px] tracking-[0.25em] uppercase"
            style={{ color: "var(--muted)" }}
          >
            {progress}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
