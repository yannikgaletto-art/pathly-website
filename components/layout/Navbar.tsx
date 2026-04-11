"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { SITE } from "@/lib/constants";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { cn } from "@/lib/utils";

/**
 * Navbar — Redesigned V2
 *
 * 1. Logo edge-aligned (far left, aligned with Hero headline).
 * 2. Center: horizontale Slidebar mit allen Sektions-Anchors.
 *    Active section tracked via IntersectionObserver.
 *    Sliding pill indicator follows the active item.
 * 3. Right: Language Switcher + minimalist Liquid-Slide CTA button.
 */

const NAV_SECTIONS = [
  { key: "features",     href: "#features" },
  { key: "extension",    href: "#extension" },
  { key: "comparison",   href: "#differentiation" },
  { key: "testimonials", href: "#testimonials" },
  { key: "faq",          href: "#faq" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const navListRef = useRef<HTMLUListElement>(null);

  // --- Scroll shadow ---
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // --- IntersectionObserver for active section ---
  useEffect(() => {
    const ids = NAV_SECTIONS.map((s) => s.href.replace("#", ""));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestEntry: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
              bestEntry = entry;
            }
          }
        }
        if (bestEntry) setActiveSection(bestEntry.target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.1, 0.3, 0.5] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // --- Pill position ---
  const [pillStyle, setPillStyle] = useState<React.CSSProperties>({ opacity: 0, width: 0, transform: "translateX(0px)" });

  const updatePill = useCallback(() => {
    if (!navListRef.current) return;
    const activeEl = navListRef.current.querySelector(
      `[data-section="${activeSection}"]`
    ) as HTMLElement | null;
    if (!activeEl) { setPillStyle((p) => ({ ...p, opacity: 0 })); return; }
    const listRect = navListRef.current.getBoundingClientRect();
    const elRect = activeEl.getBoundingClientRect();
    setPillStyle({
      opacity: 1,
      width: elRect.width + 12,
      transform: `translateX(${elRect.left - listRect.left - 6}px)`,
      transition: "all 0.3s cubic-bezier(0.34, 1.4, 0.64, 1)",
    });
  }, [activeSection]);

  useEffect(() => { updatePill(); }, [activeSection, updatePill]);
  useEffect(() => {
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [updatePill]);

  const handleNavClick = useCallback((href: string) => {
    setOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <nav
      aria-label="Main Navigation"
      className={cn(
        "sticky top-0 z-50 transition-all duration-200",
        scrolled
          ? "bg-white/90 backdrop-blur-[8px] border-b border-border"
          : "bg-white border-b border-transparent"
      )}
    >
      {/* ── Main bar — same px as Hero ── */}
      <div className="flex items-center justify-between px-6 md:px-10 lg:px-16 py-3">

        {/* Logo — edge-aligned with "Pathly Simplify your Path." */}
        <a href="/" className="flex items-center gap-2 shrink-0" aria-label="Home">
          {/* P icon — navy rounded square with white P */}
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <defs>
              <linearGradient id="navLogoBg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0D3B82" />
                <stop offset="1" stopColor="#1A5AB8" />
              </linearGradient>
            </defs>
            <rect width="36" height="36" rx="8" fill="url(#navLogoBg)" />
            <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="22" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">P</text>
          </svg>
          <span className="text-[20px] font-bold text-text tracking-tight">Pathly</span>
        </a>

        {/* ── Center: Slidebar ── */}
        <div className="hidden md:flex items-center relative">
          {/* Sliding pill */}
          <div
            className="absolute top-0 left-0 h-full rounded-full bg-navy/[0.06] pointer-events-none"
            style={pillStyle}
          />
          <ul ref={navListRef} className="flex items-center gap-1">
            {NAV_SECTIONS.map((section) => (
              <li key={section.key}>
                <button
                  data-section={section.href.replace("#", "")}
                  onClick={() => handleNavClick(section.href)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap",
                    activeSection === section.href.replace("#", "")
                      ? "text-navy"
                      : "text-muted hover:text-text"
                  )}
                >
                  {t(section.key)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Right: Lang + CTA ── */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />

          {/* Liquid Slide CTA */}
          <a
            href={`${SITE.appUrl}/signup`}
            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold text-white overflow-hidden transition-all duration-300 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #133C7B 0%, #1A4E9F 100%)",
              boxShadow: "0 4px 14px rgba(19,60,123,0.25), inset 0 1px 0 rgba(255,255,255,0.10)",
            }}
          >
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:left-[200%] transition-all duration-700" />
            </span>
            <span className="relative z-10">{t("cta").replace(" →", "").replace(" →", "")}</span>
            <span className="relative z-10 flex items-center justify-center w-5 h-5 rounded-[4px] bg-white/15 group-hover:bg-white/25 transition-colors duration-200">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform duration-200">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </span>
          </a>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-text"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></>}
          </svg>
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-t border-border bg-white"
          >
            <ul className="flex flex-col gap-2 px-6 py-5">
              {NAV_SECTIONS.map((section) => (
                <li key={section.key}>
                  <button
                    onClick={() => handleNavClick(section.href)}
                    className={cn(
                      "block w-full text-left px-3 py-2 rounded-lg text-[15px] font-medium transition-colors",
                      activeSection === section.href.replace("#", "")
                        ? "text-navy bg-navy/5"
                        : "text-text hover:text-navy hover:bg-gray-50"
                    )}
                  >
                    {t(section.key)}
                  </button>
                </li>
              ))}
              <li className="flex items-center gap-3 pt-2">
                <LanguageSwitcher />
              </li>
              <li className="pt-1">
                <a
                  href={`${SITE.appUrl}/signup`}
                  onClick={() => setOpen(false)}
                  className="block w-full text-center px-4 py-2.5 rounded-full text-[14px] font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #133C7B 0%, #1A4E9F 100%)", boxShadow: "0 4px 14px rgba(19,60,123,0.25)" }}
                >
                  {t("cta").replace(" →", "").replace(" →", "")}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
