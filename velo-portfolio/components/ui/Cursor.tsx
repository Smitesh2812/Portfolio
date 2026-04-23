"use client";

import { useEffect, useRef } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (dotRef.current && ringRef.current) {
        const dot = dotRef.current;
        const ringEl = ringRef.current;
        dot.style.transform = `translate(${mouse.current.x - 5}px, ${mouse.current.y - 5}px)`;
        ring.current.x += (mouse.current.x - ring.current.x) * 0.1;
        ring.current.y += (mouse.current.y - ring.current.y) * 0.1;
        ringEl.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnter = () => {
      if (ringRef.current) { ringRef.current.style.width = "52px"; ringRef.current.style.height = "52px"; }
      if (dotRef.current) dotRef.current.style.opacity = "0";
    };
    const onLeave = () => {
      if (ringRef.current) { ringRef.current.style.width = "40px"; ringRef.current.style.height = "40px"; }
      if (dotRef.current) dotRef.current.style.opacity = "1";
    };

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[10px] h-[10px] rounded-full bg-[var(--cyan)] pointer-events-none z-[9998] mix-blend-difference transition-opacity duration-200"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-[40px] h-[40px] rounded-full border border-[rgba(0,229,204,0.5)] pointer-events-none z-[9997] transition-[width,height] duration-300"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
