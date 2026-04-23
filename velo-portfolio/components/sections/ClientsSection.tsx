"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { testimonials } from "@/lib/data";

function useInView(threshold = 0.1) {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(ref);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return [setRef, inView] as const;
}

const clients = [
  { name: "Pilgrim Sands Hotel",     accent: "#7F77DD", bg: "#EEEDFE" },
  { name: "Blue Spruce Motel",       accent: "#0F6E56", bg: "#E1F5EE" },
  { name: "Earl of Sandwich",        accent: "#854F0B", bg: "#FAEEDA" },
  { name: "River Edge Inn",          accent: "#993556", bg: "#FBEAF0" },
  { name: "Neel Core International", accent: "#185FA5", bg: "#E6F1FB" },
  { name: "Prada Hotels",            accent: "#534AB7", bg: "#EEEDFE" },
];

export function ClientsSection() {
  const [headerRef, headerInView] = useInView();
  const all = [...testimonials, ...testimonials];

  return (
    <section id="clients" style={{ padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          ref={headerRef as any}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <span style={{
            display: "inline-block",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--muted)",
            border: "0.5px solid var(--border-h)",
            borderRadius: 999,
            padding: "5px 16px",
            marginBottom: 20,
          }}>
            Client Trust
          </span>

          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            color: "var(--text)",
            marginBottom: 12,
          }}>
            Brands We&apos;ve{" "}
            <span style={{ color: "#7F77DD" }}>Elevated</span>
          </h2>

          <p style={{ fontSize: 14, color: "var(--muted)", maxWidth: 340, margin: "0 auto", lineHeight: 1.6 }}>
            From boutique properties to established hospitality brands.
          </p>
        </motion.div>

        {/* Pills */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 52 }}
        >
          {clients.map((c) => (
            <div
              key={c.name}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                border: "0.5px solid var(--border)",
                background: "var(--surface)",
                fontSize: 13,
                fontWeight: 500,
                color: "var(--muted)",
                cursor: "default",
                whiteSpace: "nowrap",
                transition: "border-color 0.2s, color 0.2s, background 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = c.accent;
                el.style.color = c.accent;
                el.style.background = c.bg;
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--border)";
                el.style.color = "var(--muted)";
                el.style.background = "var(--surface)";
                el.style.transform = "translateY(0)";
              }}
            >
              {c.name}
            </div>
          ))}
        </motion.div>

        {/* Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ position: "relative", overflow: "hidden" }}
        >
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 60, zIndex: 2, pointerEvents: "none", background: "linear-gradient(to right, var(--bg), transparent)" }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 60, zIndex: 2, pointerEvents: "none", background: "linear-gradient(to left, var(--bg), transparent)" }} />

          <div
            style={{ display: "flex", gap: 12, width: "max-content", animation: "scrollT 48s linear infinite" }}
            className="marquee-track"
          >
            {all.map((t, i) => <TestimonialCard key={i} testimonial={t} />)}
          </div>
        </motion.div>

        <style>{`
          @keyframes scrollT { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .marquee-track:hover { animation-play-state: paused; }
        `}</style>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[0] }) {
  return (
    <div
      style={{
        width: 280,
        flexShrink: 0,
        padding: 20,
        borderRadius: 12,
        border: "0.5px solid var(--border)",
        background: "var(--surface)",
        cursor: "default",
        transition: "border-color 0.2s, transform 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-h)";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Stars */}
      <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
        {Array(testimonial.rating).fill(0).map((_, i) => (
          <span key={i} style={{ color: "#EF9F27", fontSize: 12 }}>★</span>
        ))}
      </div>

      {/* Quote — clamped to 3 lines for uniform card height */}
      <p style={{
        fontSize: 13,
        lineHeight: 1.65,
        fontStyle: "italic",
        color: "var(--muted)",
        marginBottom: 16,
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical" as any,
        overflow: "hidden",
      }}>
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Separator */}
      <div style={{ height: "0.5px", background: "var(--border)", marginBottom: 14 }} />

      {/* Author — min-width:0 on text container prevents overflow */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32,
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--violet), var(--cyan))",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 500,
          flexShrink: 0,
        }}>
          {testimonial.initials}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {testimonial.author}
          </div>
          <div style={{ fontSize: 11, color: "var(--muted2)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: 1 }}>
            {testimonial.role} · {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  );
}