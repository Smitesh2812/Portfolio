"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Work",     href: "#projects" },
  { label: "Clients",  href: "#clients"  },
  { label: "Services", href: "#services" },
  { label: "Contact",  href: "#contact"  },
];

export function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [active,    setActive]    = useState("");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  /* ── scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── active section via IntersectionObserver ── */
  useEffect(() => {
    const ids = links.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(`#${id}`); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ── lock body scroll when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          padding: scrolled ? "10px 40px" : "18px 40px",
          background: scrolled
            ? "rgba(5,5,7,0.8)"
            : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.055)"
            : "1px solid transparent",
          transition: "padding 0.4s cubic-bezier(0.16,1,0.3,1), background 0.4s ease, border-color 0.4s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* ── Logo ── */}
          <a
            href="#"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.45rem",
              fontWeight: 900,
              letterSpacing: "0.04em",
              textDecoration: "none",
              background: "linear-gradient(135deg, #EEEEF4 45%, #00E5CC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              userSelect: "none",
            }}
          >
            VELO ✦
          </a>

          {/* ── Desktop links ── */}
          <ul
            className="hidden md:flex"
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              gap: "4px",
              alignItems: "center",
            }}
          >
            {links.map((l) => {
              const isActive  = active === l.href;
              const isHovered = hoveredLink === l.label;
              return (
                <li key={l.label} style={{ position: "relative" }}>
                  <a
                    href={l.href}
                    onMouseEnter={() => setHoveredLink(l.label)}
                    onMouseLeave={() => setHoveredLink(null)}
                    style={{
                      display: "block",
                      padding: "7px 14px",
                      borderRadius: "999px",
                      fontSize: "0.78rem",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      color: isActive
                        ? "var(--text)"
                        : isHovered
                        ? "var(--text)"
                        : "var(--muted)",
                      background: isActive
                        ? "rgba(255,255,255,0.07)"
                        : isHovered
                        ? "rgba(255,255,255,0.04)"
                        : "transparent",
                      transition: "color 0.2s ease, background 0.2s ease",
                      position: "relative",
                    }}
                  >
                    {l.label}
                    {/* Active dot indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        style={{
                          position: "absolute",
                          bottom: "5px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "3px",
                          height: "3px",
                          borderRadius: "50%",
                          background: "var(--cyan)",
                          display: "block",
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* ── Desktop CTA ── */}
          <a
            href="#contact"
            className="hidden md:inline-flex"
            style={{
              alignItems: "center",
              gap: "6px",
              padding: "9px 22px",
              borderRadius: "999px",
              fontSize: "0.78rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "white",
              textDecoration: "none",
              background: "linear-gradient(135deg, var(--violet), #5b21b6)",
              boxShadow: "0 0 28px rgba(139,92,246,0.32)",
              transition: "box-shadow 0.25s ease, transform 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 48px rgba(139,92,246,0.52)";
              e.currentTarget.style.transform = "scale(1.04) translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 28px rgba(139,92,246,0.32)";
              e.currentTarget.style.transform = "scale(1) translateY(0)";
            }}
          >
            Start a Project ↗
          </a>

          {/* ── Mobile hamburger ── */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              background: "none",
              border: "none",
              padding: "8px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              alignItems: "flex-end",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  height: "1.5px",
                  background: "var(--text)",
                  borderRadius: "2px",
                  transformOrigin: "center",
                  transition: "transform 0.3s ease, opacity 0.3s ease, width 0.3s ease",
                  width: menuOpen
                    ? i === 1 ? "0px" : "20px"
                    : i === 1 ? "14px" : "20px",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                  transform: menuOpen
                    ? i === 0
                      ? "rotate(45deg) translate(4px, 4px)"
                      : i === 2
                      ? "rotate(-45deg) translate(4px, -4px)"
                      : "none"
                    : "none",
                }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile menu overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 40,
                background: "rgba(5,5,7,0.5)",
                backdropFilter: "blur(4px)",
              }}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                zIndex: 49,
                width: "min(320px, 85vw)",
                background: "#09090f",
                borderLeft: "1px solid rgba(255,255,255,0.07)",
                display: "flex",
                flexDirection: "column",
                padding: "80px 32px 40px",
                gap: "4px",
              }}
            >
              {/* Logo in panel */}
              <span
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.1rem",
                  letterSpacing: "0.08em",
                  background: "linear-gradient(135deg, #EEEEF4 45%, #00E5CC)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: "32px",
                  display: "block",
                }}
              >
                VELO ✦
              </span>

              {/* Links */}
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 0",
                    fontSize: "1.5rem",
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontWeight: 900,
                    letterSpacing: "0.06em",
                    textDecoration: "none",
                    color: active === l.href ? "var(--cyan)" : "rgba(255,255,255,0.75)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "white"; }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color =
                      active === l.href ? "var(--cyan)" : "rgba(255,255,255,0.75)";
                  }}
                >
                  {l.label}
                  <span style={{ fontSize: "1rem", opacity: 0.4 }}>↗</span>
                </motion.a>
              ))}

              {/* CTA */}
              <motion.a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  marginTop: "auto",
                  display: "block",
                  padding: "14px 24px",
                  borderRadius: "14px",
                  textAlign: "center",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "white",
                  textDecoration: "none",
                  background: "linear-gradient(135deg, var(--violet), #5b21b6)",
                  boxShadow: "0 0 32px rgba(139,92,246,0.3)",
                }}
              >
                Start a Project ↗
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}