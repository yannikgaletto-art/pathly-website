"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/**
 * Compact language switcher for Navbar.
 * Shows current locale as uppercase code, dropdown reveals all options.
 */
export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("languageSwitcher");
  const pathname = usePathname();
  const router = useRouter();

  function handleChange(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-1 text-[13px] font-medium text-muted hover:text-navy transition-colors px-2 py-1 rounded-md hover:bg-gray-50"
        aria-label="Change language"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="uppercase">{locale}</span>
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="bg-white rounded-lg shadow-lg border border-border py-1 min-w-[140px]">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleChange(loc)}
              className={`w-full text-left px-4 py-2 text-[13px] transition-colors ${
                loc === locale
                  ? "text-navy font-semibold bg-navy/5"
                  : "text-muted hover:text-navy hover:bg-gray-50"
              }`}
            >
              {t(loc)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
