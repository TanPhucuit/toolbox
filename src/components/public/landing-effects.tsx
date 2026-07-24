"use client";

import { useEffect, useRef } from "react";

export function LandingPointerGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow || window.matchMedia("(pointer: coarse)").matches) return;
    const move = (event: PointerEvent) => {
      glow.animate(
        { transform: `translate3d(${event.clientX - 260}px, ${event.clientY - 260}px, 0)` },
        { duration: 700, fill: "forwards", easing: "cubic-bezier(.16,1,.3,1)" }
      );
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return <div ref={glowRef} className="landing-pointer-glow" aria-hidden="true" />;
}

export function PremiumTilt({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  function move(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--tilt-x", `${-y * 5}deg`);
    card.style.setProperty("--tilt-y", `${x * 7}deg`);
    card.style.setProperty("--shine-x", `${(x + 0.5) * 100}%`);
    card.style.setProperty("--shine-y", `${(y + 0.5) * 100}%`);
  }

  function reset() {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <div ref={cardRef} onPointerMove={move} onPointerLeave={reset} className={`premium-tilt ${className}`}>
      {children}
    </div>
  );
}
