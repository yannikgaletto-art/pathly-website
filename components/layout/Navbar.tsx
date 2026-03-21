"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE, NAV_LINKS, NAV_CTA } from "@/lib/constants";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll-aware border: show border-bottom + blur only after 20px scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll(); // initial state
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Hauptnavigation"
      className={cn(
        "sticky top-0 z-50 transition-all duration-200",
        scrolled
          ? "bg-white/90 backdrop-blur-[8px] border-b border-border"
          : "bg-white border-b border-transparent"
      )}
    >
      <div className="mx-auto flex max-w-site items-center justify-between px-6 py-4">
        {/* Logo: "P" Icon + Wortmarke */}
        <a href="/" className="flex items-center gap-2" aria-label="Zurück zur Startseite">
          {/* Square "P" icon — placeholder until logo.svg is delivered */}
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-navy text-sm font-bold text-white">
            P
          </span>
          <span className="text-xl font-bold text-text">{SITE.name}</span>
        </a>

        {/* Desktop Links (center) */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[14px] font-medium text-muted hover:text-navy transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA (right) */}
        <div className="hidden md:block">
          <ShimmerButton href="#waitlist" size="md">
            {NAV_CTA}
          </ShimmerButton>
        </div>

        {/* Mobile Hamburger — inline SVG, no external icon lib */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-text"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu — animated slide-down */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-border bg-white"
          >
            <ul className="flex flex-col gap-4 px-6 py-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block text-body font-medium text-text hover:text-navy transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <ShimmerButton href="#waitlist" size="md" className="w-full text-center">
                  {NAV_CTA}
                </ShimmerButton>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
