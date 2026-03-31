"use client";

import { useState, useEffect, useRef } from "react";
import { COOKIE_CONSENT } from "@/lib/constants";
import { getConsent, setConsent } from "@/lib/consent";

/**
 * CookieBanner — GDPR/DSGVO consent dialog
 *
 * - Loaded via next/dynamic with ssr:false in layout.tsx
 * - Initial state null prevents any render until localStorage is checked (no FOUC)
 * - Focus management: auto-focus on primary CTA when banner appears
 * - prefers-reduced-motion: handled by global CSS block in globals.css
 */
export default function CookieBanner() {
  // null = unknown (SSR/initial), true = show, false = hide
  const [show, setShow] = useState<boolean | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const acceptBtnRef = useRef<HTMLButtonElement>(null);

  // ── Check consent on mount ──────────────────────────────────
  useEffect(() => {
    const consent = getConsent();
    setShow(consent === null);
  }, []);

  // ── Focus management ────────────────────────────────────────
  useEffect(() => {
    if (show === true) {
      const timer = setTimeout(() => acceptBtnRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [show]);

  // ── Handlers ────────────────────────────────────────────────
  const handleAcceptAll = () => {
    setConsent(true);
    setShow(false);
  };

  const handleNecessaryOnly = () => {
    setConsent(false);
    setShow(false);
  };

  const handleSaveSettings = () => {
    setConsent(analyticsEnabled);
    setShow(false);
  };

  // ── Guard: don't render until state is resolved ─────────────
  if (show === null || show === false) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
      className="fixed bottom-0 left-0 right-0 z-[100]
                 bg-white border-t border-border
                 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]
                 animate-cookie-slide-up
                 px-6 py-5 md:py-6"
    >
      <div className="mx-auto max-w-site">
        {/* ── Main view ─────────────────────────────────────── */}
        {!showSettings && (
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            {/* Text */}
            <div className="flex-1">
              <p
                id="cookie-banner-title"
                className="text-[15px] font-semibold text-text mb-1"
              >
                {COOKIE_CONSENT.banner.title}
              </p>
              <p className="text-[13px] text-muted leading-relaxed">
                {COOKIE_CONSENT.banner.body}{" "}
                <a
                  href={COOKIE_CONSENT.banner.privacyHref}
                  className="text-navy hover:underline"
                >
                  {COOKIE_CONSENT.banner.privacyLink}
                </a>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              {/* Settings link */}
              <button
                onClick={() => setShowSettings(true)}
                className="text-[13px] text-muted hover:text-navy
                           underline underline-offset-2
                           transition-colors order-3 sm:order-1"
              >
                {COOKIE_CONSENT.banner.settings}
              </button>

              {/* Necessary only — Secondary */}
              <button
                onClick={handleNecessaryOnly}
                className="px-5 py-2.5 rounded-md text-[14px]
                           font-semibold border-2 border-navy
                           text-navy bg-white
                           hover:bg-navy-tint transition-colors
                           order-2"
              >
                {COOKIE_CONSENT.banner.necessary}
              </button>

              {/* Accept all — Primary */}
              <button
                ref={acceptBtnRef}
                onClick={handleAcceptAll}
                className="px-5 py-2.5 rounded-md text-[14px]
                           font-semibold bg-navy text-white
                           hover:bg-navy-hover transition-colors
                           order-1 sm:order-3"
              >
                {COOKIE_CONSENT.banner.acceptAll}
              </button>
            </div>
          </div>
        )}

        {/* ── Settings view ─────────────────────────────────── */}
        {showSettings && (
          <div className="space-y-4">
            <p className="text-[15px] font-semibold text-text">
              {COOKIE_CONSENT.banner.settingsTitle}
            </p>

            {/* Necessary — always on, disabled */}
            <div className="flex items-start justify-between gap-4 py-3 border-t border-border">
              <div>
                <p className="text-[14px] font-medium text-text">
                  {COOKIE_CONSENT.banner.necessaryLabel}
                </p>
                <p className="text-[12px] text-muted mt-0.5">
                  {COOKIE_CONSENT.banner.necessaryDesc}
                </p>
              </div>
              <input
                type="checkbox"
                role="switch"
                checked={true}
                disabled={true}
                aria-disabled="true"
                aria-label={COOKIE_CONSENT.banner.necessaryLabel}
                className="mt-1 h-4 w-4 accent-navy cursor-not-allowed
                           opacity-60 shrink-0"
              />
            </div>

            {/* Analytics — toggleable */}
            <div className="flex items-start justify-between gap-4 py-3 border-t border-border">
              <div>
                <p className="text-[14px] font-medium text-text">
                  {COOKIE_CONSENT.banner.analyticsLabel}
                </p>
                <p className="text-[12px] text-muted mt-0.5">
                  {COOKIE_CONSENT.banner.analyticsDesc}
                </p>
              </div>
              <input
                type="checkbox"
                role="switch"
                checked={analyticsEnabled}
                onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                aria-label={COOKIE_CONSENT.banner.analyticsLabel}
                className="mt-1 h-4 w-4 accent-navy cursor-pointer shrink-0"
              />
            </div>

            {/* Save button */}
            <div className="flex justify-end pt-2 border-t border-border">
              <button
                onClick={handleSaveSettings}
                className="px-5 py-2.5 rounded-md text-[14px]
                           font-semibold bg-navy text-white
                           hover:bg-navy-hover transition-colors"
              >
                {COOKIE_CONSENT.banner.save}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
