"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "adviti-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      // localStorage unavailable
    }
  }, []);

  function acknowledge() {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // localStorage unavailable
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-[slideIn_0.3s_ease_forwards]"
      style={{ animation: "slideIn 0.3s ease forwards" }}
    >
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="bg-charcoal border border-gold/30 p-5 shadow-2xl">
        <p className="text-xs font-sans text-offwhite/70 leading-relaxed mb-5">
          Adviti uses highly secure cookies to optimize performance. By navigating adviti.in, you acknowledge acceptance under our Compliance Guidelines.
        </p>
        <button
          onClick={acknowledge}
          className="w-full py-2.5 px-4 bg-transparent border border-gold text-gold text-xs font-sans tracking-widest uppercase hover:bg-gold hover:text-black transition-all duration-200"
        >
          Acknowledge
        </button>
      </div>
    </div>
  );
}
