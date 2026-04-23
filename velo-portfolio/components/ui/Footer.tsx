"use client";

const links = [
  { label: "Work",     href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Clients",  href: "#clients"  },
  { label: "Contact",  href: "#contact"  },
];

export function Footer() {
  return (
    <footer
      style={{
        padding: "48px",
        borderTop: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {/* Logo + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.4rem",
              letterSpacing: "0.04em",
              background: "linear-gradient(135deg, var(--text) 45%, var(--cyan))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1,
            }}
          >
            VELO ✦
          </span>
          <span
            style={{
              fontSize: "0.7rem",
              color: "var(--muted)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Digital Agency · Est. 2019
          </span>
        </div>

        {/* Nav links */}
        <nav style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                fontSize: "0.76rem",
                fontWeight: 500,
                color: "var(--muted)",
                textDecoration: "none",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "6px 14px",
                borderRadius: "999px",
                transition: "color 0.2s ease, background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--text)";
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--muted)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          style={{
            padding: "9px 22px",
            borderRadius: "999px",
            fontSize: "0.76rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "white",
            textDecoration: "none",
            background: "linear-gradient(135deg, var(--violet), #5b21b6)",
            boxShadow: "0 0 24px rgba(139,92,246,0.28)",
            transition: "box-shadow 0.25s ease, transform 0.25s ease",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 40px rgba(139,92,246,0.48)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 0 24px rgba(139,92,246,0.28)";
            e.currentTarget.style.transform = "none";
          }}
        >
          Start a Project ↗
        </a>
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, var(--border) 20%, var(--border) 80%, transparent)",
        }}
      />

      {/* Bottom row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <p
          style={{
            fontSize: "0.72rem",
            color: "var(--muted)",
            margin: 0,
            letterSpacing: "0.04em",
          }}
        >        </p>
        <p
          style={{
            fontSize: "0.72rem",
            color: "var(--muted)",
            margin: 0,
            letterSpacing: "0.04em",
          }}
        >
          Built with Next.js · Serverless Edge
        </p>
      </div>
    </footer>
  );
}