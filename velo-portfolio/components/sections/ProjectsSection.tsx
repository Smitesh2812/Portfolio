"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/data";

/* ─── Intersection helper ─── */
function useInView(threshold = 0.12) {
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

function SectionRef({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [ref, inView] = useInView();
  return (
    <motion.div
      ref={ref as any}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ height: "100%" }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Main Section ─── */
export function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [headerRef, headerInView] = useInView();

  return (
    <section id="projects" style={{ padding: "120px 24px", position: "relative" }}>
      {/* bg glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 800,
          height: 400,
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef as any}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="tag mb-5">Featured Work</div>
          <h2
            className="font-black leading-none tracking-tight"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 6vw, 5.5rem)",
            }}
          >
            Projects That{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--cyan), var(--violet))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Perform
            </span>
          </h2>
          <p
            className="mt-4 text-[1rem] font-light max-w-[420px] mx-auto leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            Every pixel serves a purpose. Click any project to explore the full story.
          </p>
        </motion.div>

        {/* Uniform 3-column grid — all cards same size */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
          className="max-md:!grid-cols-1"
        >
          {projects.map((project, i) => (
            <SectionRef key={project.id} delay={i * 0.06}>
              <div style={{ width: "100%", aspectRatio: "4/3" }}>
                <ProjectCard
                  project={project}
                  onClick={() => setSelected(project)}
                />
              </div>
            </SectionRef>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─── 3-D Tilt Card ─── */
function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotX = -(y - 0.5) * 20;
    const rotY = (x - 0.5) * 20;

    card.style.transform = `
      perspective(900px)
      rotateX(${rotX}deg)
      rotateY(${rotY}deg)
      translateZ(18px)
      scale3d(1.02, 1.02, 1.02)
    `;

    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(
        circle at ${x * 100}% ${y * 100}%,
        rgba(255,255,255,0.18) 0%,
        transparent 60%
      )`;
      glareRef.current.style.opacity = "1";
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `
      perspective(900px)
      rotateX(0deg)
      rotateY(0deg)
      translateZ(0px)
      scale3d(1, 1, 1)
    `;
    if (glareRef.current) glareRef.current.style.opacity = "0";
    setHovered(false);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        perspective: "900px",
        overflow: "visible",
      }}
    >
      <div
        ref={cardRef}
        className="relative w-full h-full rounded-2xl cursor-none group"
        style={{
          border: "1px solid var(--border)",
          transition: hovered
            ? "box-shadow 0.2s ease"
            : "transform 0.7s cubic-bezier(0.16,1,0.3,1), box-shadow 0.7s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: hovered
            ? `0 40px 80px rgba(0,0,0,0.55), 0 0 40px ${project.color}26`
            : "0 10px 30px rgba(0,0,0,0.25)",
          transformStyle: "preserve-3d",
          willChange: "transform",
          overflow: "visible",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {/* ── Image + overlays — clipped to card bounds ── */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ overflow: "hidden" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: hovered ? "scale(1.08)" : "scale(1)",
              filter: hovered
                ? "brightness(0.45) saturate(0.9)"
                : "brightness(0.72) saturate(0.75)",
              transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
            }}
          />

          {/* Gradient scrim */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(5,5,7,1) 0%, rgba(5,5,7,0.5) 45%, transparent 100%)",
            }}
          />

          {/* Glare shimmer */}
          <div
            ref={glareRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0,
              transition: "opacity 0.25s ease",
              mixBlendMode: "overlay",
            }}
          />

          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100"
            style={{
              background: `linear-gradient(90deg, ${project.color}, transparent)`,
              transition: "opacity 0.4s ease",
            }}
          />
        </div>

        {/* ── Text content — sits inside rounded clip with its own dark scrim ── */}
        <div
          className="absolute bottom-0 left-0 right-0 rounded-b-2xl"
          style={{
            background: hovered
              ? "linear-gradient(to top, rgba(5,5,7,0.98) 70%, transparent 100%)"
              : "linear-gradient(to top, rgba(5,5,7,0.88) 55%, transparent 100%)",
            transition: "background 0.4s ease",
            padding: "20px",
            transform: "translateZ(30px)",
            overflow: "hidden",
          }}
        >
          {/* Category */}
          <div
            style={{
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: project.color,
              marginBottom: "4px",
            }}
          >
            {project.category}
          </div>

          {/* Project name — always visible, never clipped */}
          <h3
            style={{
              fontWeight: 700,
              fontSize: "clamp(0.88rem, 1.4vw, 1.1rem)",
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
              color: "white",
              margin: 0,
              marginBottom: "8px",
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {project.name}
          </h3>

          {/* Result — animates in on hover */}
          <p
            style={{
              fontSize: "0.74rem",
              fontWeight: 300,
              lineHeight: 1.5,
              color: "var(--muted)",
              margin: 0,
              marginBottom: hovered ? "10px" : "0",
              opacity: hovered ? 1 : 0,
              maxHeight: hovered ? "80px" : "0",
              overflow: "hidden",
              transition:
                "opacity 0.4s 0.05s ease, max-height 0.4s 0.05s ease, margin-bottom 0.3s ease",
            }}
          >
            {project.result}
          </p>

          {/* Tags */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              opacity: hovered ? 1 : 0,
              maxHeight: hovered ? "48px" : "0",
              overflow: "hidden",
              transition:
                "opacity 0.4s 0.1s ease, max-height 0.4s 0.1s ease",
            }}
          >
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "0.62rem",
                  padding: "3px 10px",
                  borderRadius: "999px",
                  border: "1px solid var(--border-h)",
                  color: "var(--muted)",
                  background: "rgba(255,255,255,0.05)",
                  whiteSpace: "nowrap",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── External link button ── */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(5,5,7,0.7)",
            border: "1px solid var(--border-h)",
            backdropFilter: "blur(8px)",
            color: "white",
            fontSize: "0.8rem",
            textDecoration: "none",
            opacity: hovered ? 1 : 0,
            transform: hovered
              ? "translateZ(40px) scale(1)"
              : "translateZ(0) scale(0.85)",
            transition: "all 0.35s 0.08s cubic-bezier(0.16,1,0.3,1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = project.color;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(5,5,7,0.7)";
          }}
        >
          ↗
        </a>
      </div>
    </div>
  );
}

/* ─── Modal ─── */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  const sections = [
    { icon: "◎", title: "Overview", content: project.overview },
    { icon: "⚠", title: "Problem", content: project.problem },
    { icon: "◈", title: "Solution", content: project.solution },
    { icon: "✦", title: "Outcome", content: project.outcome },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{
        background: "rgba(5,5,7,0.85)",
        backdropFilter: "blur(20px)",
        padding: "16px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "880px",
          maxHeight: "92vh",
          overflowY: "auto",
          borderRadius: "20px",
          background: "#0a0a10",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 40px 100px rgba(0,0,0,0.7), 0 0 80px ${project.color}18`,
        }}
      >
        {/* ── Close button ── */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            zIndex: 10,
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.75rem",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#e11d48";
            e.currentTarget.style.color = "white";
            e.currentTarget.style.borderColor = "#e11d48";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            e.currentTarget.style.color = "rgba(255,255,255,0.5)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          }}
        >
          ✕
        </button>

        {/* ── Hero banner ── */}
        <div
          style={{
            position: "relative",
            height: "260px",
            overflow: "hidden",
            borderRadius: "20px 20px 0 0",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.heroImage}
            alt={project.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.55) saturate(0.8)",
            }}
          />
          {/* Bottom fade into modal bg */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, #0a0a10 0%, rgba(10,10,16,0.3) 55%, transparent 100%)",
            }}
          />
          {/* Color glow from project */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse at 20% 80%, ${project.color}22 0%, transparent 60%)`,
            }}
          />

          {/* Hero text */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "24px 32px",
            }}
          >
            {/* Category badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "4px 12px",
                borderRadius: "999px",
                background: `${project.color}22`,
                border: `1px solid ${project.color}44`,
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: project.color,
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: project.color,
                }}
              >
                {project.category}
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 900,
                letterSpacing: "-0.01em",
                color: "white",
                lineHeight: 1,
                margin: 0,
              }}
            >
              {project.name}
            </h2>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ padding: "28px 32px 32px" }}>

          {/* Stats row */}
          {project.stats?.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${Math.min(project.stats.length, 3)}, 1fr)`,
                gap: "12px",
                marginBottom: "28px",
              }}
            >
              {project.stats.map((s) => (
                <div
                  key={s.label}
                  style={{
                    borderRadius: "14px",
                    padding: "16px 20px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "1.9rem",
                      lineHeight: 1,
                      background: `linear-gradient(135deg, #fff 30%, ${project.color})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.35)",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)",
              marginBottom: "28px",
            }}
          />

          {/* Content sections — 2-col grid on desktop */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              marginBottom: "28px",
            }}
            className="max-sm:!grid-cols-1"
          >
            {sections.map((sec, i) => (
              <div
                key={sec.title}
                style={{
                  borderRadius: "14px",
                  padding: "20px 22px",
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.065)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  /* Full-width for Overview */
                  ...(i === 0 ? { gridColumn: "1 / -1" } : {}),
                }}
              >
                {/* Section header */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: project.color,
                      lineHeight: 1,
                    }}
                  >
                    {sec.icon}
                  </span>
                  <span
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: project.color,
                    }}
                  >
                    {sec.title}
                  </span>
                </div>

                {/* Content */}
                <p
                  style={{
                    fontSize: "0.88rem",
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.6)",
                    margin: 0,
                  }}
                >
                  {sec.content}
                </p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)",
              marginBottom: "24px",
            }}
          />

          {/* Footer — tags + CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 500,
                    padding: "5px 12px",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.45)",
                    background: "rgba(255,255,255,0.03)",
                    letterSpacing: "0.03em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA button */}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "11px 24px",
                borderRadius: "999px",
                fontWeight: 600,
                fontSize: "0.85rem",
                color: "white",
                textDecoration: "none",
                background: `linear-gradient(135deg, ${project.color}, #4c1d95)`,
                boxShadow: `0 0 24px ${project.color}40`,
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = `0 0 40px ${project.color}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = `0 0 24px ${project.color}40`;
              }}
            >
              View Live Site
              <span style={{ fontSize: "0.9rem" }}>↗</span>
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}