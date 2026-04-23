"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

interface FormData {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
}

const WHATSAPP_NUMBER = "919049977327"; // your number with country code, no +

export function ContactSection() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState<FormData>({
    name: "", email: "", company: "", budget: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const budgets = ["< $2K", "$2K – $5K", "$5K – $15K", "$15K+"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const text = [
      `*New Project Enquiry*`,
      ``,
      `*Name:* ${form.name}`,
      `*Email:* ${form.email}`,
      `*Company:* ${form.company || "—"}`,
      `*Budget:* ${form.budget || "Not specified"}`,
      ``,
      `*Message:*`,
      form.message,
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    setTimeout(() => {
      setStatus("success");
      window.open(url, "_blank");
    }, 600);
  };

  const field = (label: string, required = false) => ({
    style: {
      display: "block",
      fontSize: "0.72rem",
      fontWeight: 500,
      letterSpacing: "0.1em",
      textTransform: "uppercase" as const,
      color: "var(--muted)",
      marginBottom: 8,
    },
    children: label + (required ? " *" : ""),
  });

  const inputBase: React.CSSProperties = {
    width: "100%",
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    padding: "12px 14px",
    color: "var(--text)",
    fontSize: "0.88rem",
    fontFamily: "'Outfit', sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  const focusProps = {
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      (e.target.style.borderColor = "var(--violet)"),
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      (e.target.style.borderColor = "var(--border)"),
  };

  return (
    <section
      id="contact"
      style={{ padding: "100px 24px 80px", position: "relative", overflow: "hidden" }}
    >
      {/* Subtle bg glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          ref={ref as any}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <div className="tag" style={{ marginBottom: 20 }}>Let&apos;s Work Together</div>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(2.8rem, 7vw, 6rem)",
              lineHeight: 1,
              letterSpacing: "0.01em",
              color: "var(--text)",
              margin: 0,
            }}
          >
            Let&apos;s Build Something
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, var(--violet), var(--cyan))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Exceptional
            </span>
          </h2>
          <p
            style={{
              marginTop: 16,
              fontSize: "0.95rem",
              fontWeight: 300,
              maxWidth: 420,
              margin: "16px auto 0",
              lineHeight: 1.65,
              color: "var(--muted)",
            }}
          >
            Ready to outperform your competition? Fill in the form and we&apos;ll connect on WhatsApp within 24 hours.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          style={{
            maxWidth: 640,
            margin: "0 auto",
            borderRadius: 20,
            padding: "36px 36px 32px",
            background: "rgba(12,12,20,0.75)",
            border: "1px solid var(--border)",
            backdropFilter: "blur(20px)",
          }}
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: "center", padding: "40px 0" }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "rgba(37,211,102,0.15)",
                    border: "1px solid rgba(37,211,102,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    fontSize: 24,
                    color: "#25D366",
                  }}
                >
                  ✓
                </div>
                <h3 style={{ color: "#25D366", fontSize: "1.1rem", fontWeight: 600, marginBottom: 8 }}>
                  Opening WhatsApp…
                </h3>
                <p style={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                  Your message is pre-filled and ready to send.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                {/* Row: Name + Email */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={field("Name", true).style}>{field("Name", true).children}</label>
                    <input
                      style={inputBase}
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      {...focusProps}
                      required
                    />
                  </div>
                  <div>
                    <label style={field("Email", true).style}>{field("Email", true).children}</label>
                    <input
                      type="email"
                      style={inputBase}
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      {...focusProps}
                      required
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label style={field("Company").style}>{field("Company").children}</label>
                  <input
                    style={inputBase}
                    placeholder="Your company name"
                    value={form.company}
                    onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                    {...focusProps}
                  />
                </div>

                {/* Budget */}
                <div>
                  <label style={field("Project Budget").style}>{field("Project Budget").children}</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {budgets.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, budget: b }))}
                        style={{
                          padding: "8px 16px",
                          borderRadius: 8,
                          fontSize: "0.8rem",
                          fontWeight: 500,
                          border: form.budget === b ? "1px solid var(--violet)" : "1px solid var(--border)",
                          background: form.budget === b ? "rgba(139,92,246,0.15)" : "var(--surface)",
                          color: form.budget === b ? "var(--violet)" : "var(--muted)",
                          cursor: "pointer",
                          transition: "all 0.15s",
                        }}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label style={field("Tell us about your project", true).style}>
                    {field("Tell us about your project", true).children}
                  </label>
                  <textarea
                    style={{ ...inputBase, minHeight: 110, resize: "vertical" }}
                    placeholder="What are you building? What's your timeline?"
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    onFocus={(e) => (e.target.style.borderColor = "var(--violet)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                    required
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{
                    width: "100%",
                    padding: "14px 0",
                    borderRadius: 12,
                    fontWeight: 700,
                    fontSize: "0.92rem",
                    color: "white",
                    background: status === "loading"
                      ? "rgba(37,211,102,0.6)"
                      : "linear-gradient(135deg, #25D366, #128C7E)",
                    border: "none",
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    transition: "all 0.25s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    marginTop: 4,
                  }}
                  onMouseEnter={(e) => {
                    if (status !== "loading")
                      (e.currentTarget.style.transform = "translateY(-2px)");
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  {status === "loading" ? (
                    "Opening WhatsApp…"
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Send via WhatsApp
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}