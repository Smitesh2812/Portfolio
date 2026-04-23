"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

interface FormData {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
}

const WHATSAPP_NUMBER = "919049977327";

export function ContactSection() {
  const [ref, inView] = useInView();

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

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

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      text
    )}`;

    setTimeout(() => {
      setStatus("success");
      window.open(url, "_blank");
    }, 600);
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    padding: "12px 14px",
    color: "var(--text)",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  const focusProps = {
    onFocus: (e: any) => (e.target.style.borderColor = "var(--violet)"),
    onBlur: (e: any) => (e.target.style.borderColor = "var(--border)"),
  };

  return (
    <section
      id="contact"
      style={{
        padding: "100px 16px 80px",
        position: "relative",
        overflow: "hidden",
        width: "100%",
        maxWidth: "100vw",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.08), transparent)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1100,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <motion.div
          ref={ref as any}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 40 }}
        >
          <h2
            style={{
              fontSize: "clamp(2.2rem, 7vw, 5rem)",
              lineHeight: 1,
              margin: 0,
            }}
          >
            Let’s Build Something
            <br />
            <span style={{ color: "#8B5CF6" }}>Exceptional</span>
          </h2>

          {/* ✅ FIXED MARGIN ISSUE */}
          <p
            style={{
              marginTop: "16px",
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: "0.9rem",
              maxWidth: 420,
              lineHeight: 1.6,
              color: "var(--muted)",
            }}
          >
            Fill the form and we’ll connect on WhatsApp within 24 hours.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: 640,
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: 16,
            padding: "28px 20px",
            background: "rgba(12,12,20,0.8)",
            border: "1px solid var(--border)",
            backdropFilter: "blur(16px)",
          }}
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                style={{ textAlign: "center", padding: 30 }}
              >
                <h3 style={{ color: "#25D366" }}>
                  Opening WhatsApp…
                </h3>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                {/* Responsive grid */}
                <div className="form-grid">
                  <input
                    placeholder="Name"
                    style={inputBase}
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    {...focusProps}
                    required
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    style={inputBase}
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    {...focusProps}
                    required
                  />
                </div>

                <textarea
                  placeholder="Tell us about your project..."
                  style={{ ...inputBase, minHeight: 120 }}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  {...focusProps}
                  required
                />

                <button
                  type="submit"
                  style={{
                    padding: "14px",
                    borderRadius: 10,
                    background:
                      "linear-gradient(135deg, #25D366, #128C7E)",
                    border: "none",
                    color: "#fff",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Send via WhatsApp
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Responsive Fix */}
      <style>{`
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }

        html, body {
          overflow-x: hidden;
          max-width: 100vw;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </section>
  );
}