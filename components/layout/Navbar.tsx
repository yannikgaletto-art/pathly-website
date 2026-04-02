"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { SITE } from "@/lib/constants";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { cn } from "@/lib/utils";

const NAV_HREFS = ["#features", "#how-it-works", "#differentiation"] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { label: t("features"), href: NAV_HREFS[0] },
    { label: t("howItWorks"), href: NAV_HREFS[1] },
    { label: t("aboutUs"), href: NAV_HREFS[2] },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
      <div className="mx-auto flex max-w-site items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2" aria-label="Home">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-navy text-sm font-bold text-white">
            P
          </span>
          <span className="text-xl font-bold text-text">{SITE.name}</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
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

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <ShimmerButton href="#waitlist" size="md">
            {t("cta")}
          </ShimmerButton>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-text"
          aria-label={open ? "Close menu" : "Open menu"}
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
              {links.map((link) => (
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
              <li className="flex items-center gap-3">
                <LanguageSwitcher />
              </li>
              <li>
                <ShimmerButton href="#waitlist" size="md" className="w-full text-center">
                  {t("cta")}
                </ShimmerButton>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
