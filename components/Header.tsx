"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-gold/20"
          : "bg-transparent border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-xl font-bold text-offwhite tracking-[0.2em] hover:text-gold transition-colors duration-200"
          aria-label="Adviti - Home"
        >
          ADVITI
        </Link>

        {/* Nav */}
        <nav aria-label="Primary navigation">
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-xs font-sans tracking-widest uppercase transition-colors duration-200 ${
                    pathname === href
                      ? "text-gold"
                      : "text-offwhite/70 hover:text-offwhite"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA */}
        <Link
          href="/contact"
          className="hidden md:inline-flex items-center px-5 py-2 text-xs font-sans tracking-widest uppercase border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-200"
          aria-label="Get in touch with Adviti"
        >
          Get in Touch
        </Link>

        {/* Mobile menu placeholder — visible on small screens */}
        <Link
          href="/contact"
          className="md:hidden text-xs font-sans tracking-widest uppercase border border-gold text-gold px-4 py-2 hover:bg-gold hover:text-black transition-all duration-200"
        >
          Contact
        </Link>
      </div>
    </header>
  );
}
