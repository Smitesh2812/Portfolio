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
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(ref);
    return () => obs.disconnect();
  }, [ref, threshold]);

  return [setRef, inView] as const;
}

const clients = [
  { name: "Pilgrim Sands Hotel", accent: "#7F77DD", bg: "#EEEDFE" },
  { name: "Blue Spruce Motel", accent: "#0F6E56", bg: "#E1F5EE" },
  { name: "Earl of Sandwich", accent: "#854F0B", bg: "#FAEEDA" },
  { name: "River Edge Inn", accent: "#993556", bg: "#FBEAF0" },
  { name: "Neel Core International", accent: "#185FA5", bg: "#E6F1FB" },
  { name: "Prada Hotels", accent: "#534AB7", bg: "#EEEDFE" },
];

export function ClientsSection() {
  const [headerRef, headerInView] = useInView();
  const all = [...testimonials, ...testimonials];

  return (
    <section 
  id="clients" 
  style={{ 
    padding: "80px 24px",
    overflow: "hidden",        // ✅ FIX
    width: "100%",
    maxWidth: "100vw"          // ✅ FIX
  }}
>
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <motion.div
          ref={headerRef as any}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <span
            style={{
              display: "inline-block",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              border: "0.5px solid var(--border-h)",
              borderRadius: 999,
              padding: "5px 16px",
              marginBottom: 20,
            }}
          >
            Client Trust
          </span>

          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(1.8rem, 6vw, 3rem)",
              marginBottom: 12,
            }}
          >
            Brands We’ve <span style={{ color: "#7F77DD" }}>Elevated</span>
          </h2>

          <p
            style={{
              fontSize: "clamp(12px, 3.5vw, 14px)",
              maxWidth: 340,
              margin: "0 auto",
              padding: "0 10px",
            }}
          >
            From boutique properties to established hospitality brands.
          </p>
        </motion.div>

        {/* Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          style={{
            display: "flex",
            flexWrap: "nowrap",
            overflowX: "auto",
            gap: 10,
            marginBottom: 40,
            paddingLeft: 4,
            paddingRight: 4,
          }}
        >
          {clients.map((c) => (
            <div
              key={c.name}
              style={{
                padding: "6px 14px",
                borderRadius: 999,
                border: "0.5px solid var(--border)",
                fontSize: "clamp(12px, 3vw, 13px)",
                whiteSpace: "nowrap",
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
          style={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 12,
              minWidth: "100%",
              animation: "scrollT 60s linear infinite",
            }}
          >
            {all.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
          </div>
        </motion.div>

        <style>{`
          @keyframes scrollT {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) {
  return (
    <div
      style={{
        width: "calc(100vw - 40px)",
        maxWidth: 280,
        flexShrink: 0,
        padding: 16,
        borderRadius: 12,
        border: "0.5px solid var(--border)",
      }}
    >
      <div style={{ marginBottom: 10 }}>
        {Array(testimonial.rating)
          .fill(0)
          .map((_, i) => (
            <span key={i}>★</span>
          ))}
      </div>

      <p
        style={{
          fontSize: 13,
          marginBottom: 16,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical" as any,
          overflow: "hidden",
        }}
      >
        “{testimonial.quote}”
      </p>

      <div style={{ marginBottom: 10 }} />

      <div style={{ display: "flex", gap: 10 }}>
        <div>{testimonial.initials}</div>
        <div>
          <div>{testimonial.author}</div>
          <div>
            {testimonial.role} · {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  );
}