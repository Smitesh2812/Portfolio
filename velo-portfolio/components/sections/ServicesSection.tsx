"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { services } from "@/lib/data";

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

const serviceColors = [
  { accent: "#7F77DD", bg: "#EEEDFE", dot: "#AFA9EC" },
  { accent: "#1D9E75", bg: "#E1F5EE", dot: "#5DCAA5" },
  { accent: "#EF9F27", bg: "#FAEEDA", dot: "#EF9F27" },
  { accent: "#D4537E", bg: "#FBEAF0", dot: "#ED93B1" },
];

const stack = ["Next.js 14", "React 18", "Node.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel Edge", "Sanity CMS", "Three.js", "GSAP"];

export function ServicesSection() {
  const [headerRef, headerInView] = useInView();

  return (
    <section
      id="services"
      style={{ padding: "100px 24px 80px", position: "relative" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          ref={headerRef as any}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <div className="tag" style={{ marginBottom: 18 }}>What We Do</div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: "var(--text)",
              marginBottom: 12,
            }}
          >
            End-to-End{" "}
            <span style={{ color: "var(--violet)" }}>Digital</span>
          </h2>
          <p style={{ fontSize: 14, color: "var(--muted)", maxWidth: 360, margin: "0 auto", lineHeight: 1.6 }}>
            Every service engineered for results — not just aesthetics.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 28 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <ServiceCard service={service} palette={serviceColors[i]} index={i} />
            </motion.div>
          ))}
        </div>

        {/* Stack strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          style={{
            marginTop: 44,
            padding: "20px 24px",
            borderRadius: 14,
            border: "0.5px solid var(--border)",
            background: "var(--surface)",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted2)", marginBottom: 14 }}>
            Our Stack
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
            {stack.map((tech) => (
              <span
                key={tech}
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  padding: "5px 12px",
                  borderRadius: 6,
                  border: "0.5px solid var(--border)",
                  color: "var(--muted)",
                  background: "var(--bg)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  palette,
  index,
}: {
  service: (typeof services)[0];
  palette: { accent: string; bg: string; dot: string };
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.borderColor = palette.accent + "55";
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform 0.5s cubic-bezier(0.34,1.2,0.64,1), border-color 0.3s, box-shadow 0.3s";
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    el.style.boxShadow = "none";
    el.style.borderColor = "var(--border)";
    if (shineRef.current) shineRef.current.style.opacity = "0";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const bounds = el.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    const cx = bounds.width / 2;
    const cy = bounds.height / 2;
    const rx = ((y - cy) / cy) * -10;
    const ry = ((x - cx) / cx) * 10;
    const dist = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
    const lift = 6 + (1 - dist / Math.sqrt(cx * cx + cy * cy)) * 6;

    el.style.transition = "transform 0.08s ease, border-color 0.3s, box-shadow 0.3s";
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${lift}px)`;
    el.style.boxShadow = `0 ${lift * 3}px ${lift * 8}px rgba(0,0,0,0.18), 0 0 30px ${palette.accent}18`;

    if (shineRef.current) {
      const pctX = (x / bounds.width) * 100;
      const pctY = (y / bounds.height) * 100;
      shineRef.current.style.opacity = "1";
      shineRef.current.style.background = `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255,255,255,0.08) 0%, transparent 55%)`;
    }
  };

  return (
    <div
      ref={cardRef}
      style={{
        position: "relative",
        borderRadius: 16,
        padding: "28px 24px 24px",
        border: "0.5px solid var(--border)",
        background: "var(--surface)",
        overflow: "hidden",
        cursor: "default",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Shine layer */}
      <div
        ref={shineRef}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 16,
          opacity: 0,
          transition: "opacity 0.3s",
          pointerEvents: "none",
        }}
      />

      {/* Number watermark */}
      <div
        style={{
          position: "absolute",
          top: 16,
          right: 18,
          fontSize: 52,
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: "-0.03em",
          color: "var(--border)",
          userSelect: "none",
          transition: "color 0.3s",
        }}
      >
        0{index + 1}
      </div>

      {/* Icon */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          marginBottom: 18,
          background: palette.bg,
          color: palette.accent,
          position: "relative",
          zIndex: 1,
          transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {service.icon}
      </div>

      {/* Name */}
      <h3
        style={{
          fontSize: 15,
          fontWeight: 500,
          color: "var(--text)",
          marginBottom: 8,
          position: "relative",
          zIndex: 1,
        }}
      >
        {service.name}
      </h3>

      {/* Desc */}
      <p
        style={{
          fontSize: 13,
          color: "var(--muted)",
          lineHeight: 1.6,
          marginBottom: 18,
          position: "relative",
          zIndex: 1,
        }}
      >
        {service.description}
      </p>

      {/* Features */}
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6, position: "relative", zIndex: 1 }}>
        {service.features.map((f) => (
          <li key={f} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "var(--muted2)" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: palette.dot, flexShrink: 0, display: "inline-block" }} />
            {f}
          </li>
        ))}
      </ul>

      {/* Bottom accent bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 2,
          width: 0,
          background: palette.accent,
          transition: "width 0.4s ease",
          borderRadius: 0,
        }}
        className="sc-bar"
      />
    </div>
  );
}