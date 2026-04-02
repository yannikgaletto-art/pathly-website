"use client";

import { useTranslations } from "next-intl";
import { SITE } from "@/lib/constants";

/**
 * Footer — #F9FAFB BG, border-top, 48px vertical padding.
 * Left: Logo + domain. Center: Copyright. Right: Legal links.
 * Year evaluated at render time (not SSG-frozen).
 */
export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer aria-label="Footer" className="bg-bg-soft border-t border-border">
      <div className="mx-auto max-w-site px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Left: Logo + Domain */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center">
              <span className="text-white text-[14px] font-bold">P</span>
            </div>
            <div>
              <span className="text-[16px] font-bold text-text">{SITE.name}</span>
              <p className="text-[12px] text-muted">{SITE.domain}</p>
            </div>
          </div>

          {/* Center: Copyright */}
          <p className="text-[12px] text-muted">
            © {year} {t("copyrightBase")}
          </p>

          {/* Right: Legal Links */}
          <ul className="flex items-center gap-4">
            <li>
              <a href="/impressum" className="text-[12px] text-muted hover:text-navy transition-colors duration-200">
                {t("impressum")}
              </a>
            </li>
            <li>
              <a href="/datenschutz" className="text-[12px] text-muted hover:text-navy transition-colors duration-200">
                {t("datenschutz")}
              </a>
            </li>
          </ul>

        </div>
      </div>
    </footer>
  );
}
