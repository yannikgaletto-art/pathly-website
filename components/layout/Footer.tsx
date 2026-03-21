import { SITE, FOOTER } from "@/lib/constants";

export function Footer() {
  // F-04 fix: getFullYear() evaluated at render time, not at SSG build time
  const year = new Date().getFullYear();

  return (
    <footer aria-label="Footer" className="bg-bg-soft border-t border-border">
      <div className="mx-auto max-w-site px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <span className="text-xl font-bold text-navy">{SITE.name}</span>
            <p className="mt-2 text-small text-muted">{SITE.tagline}</p>
          </div>

          {/* Legal Links */}
          <ul className="flex items-center gap-6">
            {FOOTER.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-small text-muted hover:text-navy transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {FOOTER.socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-muted hover:text-navy transition-colors duration-200"
              >
                {/* Inline LinkedIn SVG icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Copyright — year evaluated at render time (not SSG-frozen) */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-small text-muted">
            © {year} {FOOTER.copyrightBase}
          </p>
        </div>
      </div>
    </footer>
  );
}
