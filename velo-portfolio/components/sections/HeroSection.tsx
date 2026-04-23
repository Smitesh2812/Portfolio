"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/* ── Floating card data ── */
const floatingCards = [
  {
    img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=70",
    rot: -8, top: "14%", left: "3%", w: 220, delay: 0.6,
  },
  {
    img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=70",
    rot: 7, top: "18%", right: "4%", w: 190, delay: 0.75,
  },
  {
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=70",
    rot: 4, bottom: "22%", left: "5%", w: 170, delay: 0.65,
  },
  {
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=70",
    rot: -5, bottom: "18%", right: "3%", w: 210, delay: 0.8,
  },
];

/* ── Stats ── */
const stats = [
  { num: "42+", label: "Projects Shipped" },
  { num: "98%", label: "Client Retention" },
  { num: "3.2×", label: "Avg Revenue Lift" },
  { num: "<1s",  label: "Target Load Time" },
];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y       = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ padding: "120px 24px 80px" }}
    >
      {/* ── Grid background ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.055) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)",
        }}
      />

      {/* ── Ambient orbs — CSS-only float, no filter animation ── */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width: 680,
          height: 680,
          top: -160,
          left: -120,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.16) 0%, transparent 65%)",
          filter: "blur(56px)",
          animation: "orbFloat1 12s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width: 480,
          height: 480,
          bottom: -60,
          right: -80,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,229,204,0.13) 0%, transparent 65%)",
          filter: "blur(56px)",
          animation: "orbFloat2 14s ease-in-out infinite",
        }}
      />

      {/* ── CSS keyframes injected once ── */}
      <style>{`
        @keyframes orbFloat1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(28px,-36px) scale(1.04); }
        }
        @keyframes orbFloat2 {
          0%,100% { transform: translate(0,0); }
          50%      { transform: translate(-18px,28px); }
        }
        @keyframes cardFloat0 { 0%,100%{transform:rotate(-8deg) translateY(0)}  50%{transform:rotate(-8deg) translateY(-14px)} }
        @keyframes cardFloat1 { 0%,100%{transform:rotate(7deg)  translateY(0)}  50%{transform:rotate(7deg)  translateY(-12px)} }
        @keyframes cardFloat2 { 0%,100%{transform:rotate(4deg)  translateY(0)}  50%{transform:rotate(4deg)  translateY(-16px)} }
        @keyframes cardFloat3 { 0%,100%{transform:rotate(-5deg) translateY(0)}  50%{transform:rotate(-5deg) translateY(-10px)} }
      `}</style>

      {/* ── Floating cards (desktop only) ── */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block" aria-hidden>
        {floatingCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: card.delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              width: card.w,
              top: (card as any).top,
              left: (card as any).left,
              right: (card as any).right,
              bottom: (card as any).bottom,
              animation: `cardFloat${i} ${7 + i * 1.5}s ease-in-out infinite ${card.delay}s`,
            }}
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(255,255,255,0.09)",
                boxShadow: "0 24px 56px rgba(0,0,0,0.45)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.img}
                alt=""
                style={{
                  width: "100%",
                  height: card.w * 0.65,
                  objectFit: "cover",
                  display: "block",
                  filter: "brightness(0.65) saturate(0.75)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(139,92,246,0.18), rgba(0,229,204,0.08))",
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Main content ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        style={{ y, opacity }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-7"
        >
          <span
            className="block w-8 h-[1px]"
            style={{ background: "var(--cyan)" }}
          />
          <span
            className="text-[0.68rem] font-semibold tracking-[0.25em] uppercase"
            style={{ color: "var(--cyan)" }}
          >
            Digital Agency · Est. 2019
          </span>
          <span
            className="block w-8 h-[1px]"
            style={{ background: "var(--cyan)" }}
          />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3.6rem, 9.5vw, 9rem)",
            lineHeight: 0.93,
            letterSpacing: "0.01em",
            fontWeight: 900,
            maxWidth: 880,
            margin: 0,
          }}
        >
          <span style={{ color: "var(--text)" }}>We Build</span>
          <br />
          <span
            style={{
              background:
                "linear-gradient(135deg, var(--violet) 20%, var(--cyan))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            High-Performance
          </span>
          <br />
          <span style={{ color: "var(--text)" }}>Websites That</span>
          <br />
          <span
            style={{
              background:
                "linear-gradient(135deg, var(--cyan) 0%, var(--violet))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Convert
          </span>
        </motion.h1>

        {/* Sub-heading */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: "24px",
            fontSize: "1.05rem",
            fontWeight: 300,
            maxWidth: 460,
            lineHeight: 1.7,
            color: "var(--muted)",
          }}
        >
          From luxury hotels to global brands — we craft digital experiences
          that drive revenue and leave lasting impressions.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.65 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "14px",
            marginTop: "36px",
            justifyContent: "center",
          }}
        >
          <a
            href="#projects"
            style={{
              padding: "14px 32px",
              borderRadius: "999px",
              fontWeight: 600,
              color: "white",
              fontSize: "0.92rem",
              textDecoration: "none",
              background: "linear-gradient(135deg, var(--violet), #4c1d95)",
              boxShadow: "0 0 36px rgba(139,92,246,0.38)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04) translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 0 56px rgba(139,92,246,0.58)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow =
                "0 0 36px rgba(139,92,246,0.38)";
            }}
          >
            View Our Work
          </a>
          <a
            href="#contact"
            style={{
              padding: "14px 32px",
              borderRadius: "999px",
              fontWeight: 500,
              fontSize: "0.92rem",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              border: "1px solid var(--border-h)",
              color: "var(--text)",
              transition:
                "border-color 0.25s ease, color 0.25s ease, transform 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--cyan)";
              e.currentTarget.style.color = "var(--cyan)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-h)";
              e.currentTarget.style.color = "var(--text)";
              e.currentTarget.style.transform = "none";
            }}
          >
            Start a Project <span>↗</span>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.54, duration: 0.65 }}
          style={{
            marginTop: "52px",
            paddingTop: "36px",
            borderTop: "1px solid var(--border)",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0",
            width: "100%",
            maxWidth: "640px",
          }}
          className="max-sm:!grid-cols-2 max-sm:gap-y-8"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                textAlign: "center",
                /* Dividers between columns */
                borderLeft:
                  i > 0 ? "1px solid var(--border)" : "none",
                padding: "0 20px",
              }}
              className="max-sm:border-l-0"
            >
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "2.2rem",
                  lineHeight: 1,
                  fontWeight: 900,
                  background:
                    "linear-gradient(135deg, var(--text), var(--cyan))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginTop: "6px",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "var(--muted)" }}
      >
        <span
          style={{
            fontSize: "0.6rem",
            fontWeight: 500,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <motion.div
          style={{
            width: "1px",
            height: "36px",
            background:
              "linear-gradient(to bottom, var(--muted), transparent)",
          }}
          animate={{ scaleY: [1, 0.5, 1], opacity: [0.8, 0.3, 0.8] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}