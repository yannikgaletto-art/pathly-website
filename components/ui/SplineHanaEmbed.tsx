"use client";

/**
 * SplineHanaEmbed — production-ready wrapper for Spline's Hana engine
 *
 * Fixes vs. bare embed:
 *  1. next/script for reliable script injection (not raw <script> JSX)
 *  2. TypeScript declaration for <hana-viewer> custom element
 *  3. SSR guard via `mounted` state — no hydration mismatch
 *  4. Explicit width/height on container prevents layout shift (CLS)
 *  5. pointer-events: none — decorative scene, clicks pass through to page
 */

import Script from "next/script";
import { useState, useEffect } from "react";

// ── TypeScript: teach JSX about the custom web component ──────
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "hana-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { url?: string },
        HTMLElement
      >;
    }
  }
}

// ── Props ─────────────────────────────────────────────────────
interface SplineHanaEmbedProps {
  /** The .hanacode URL from Spline Export → Code → web */
  sceneUrl: string;
  className?: string;
}

// ── Component ─────────────────────────────────────────────────
export function SplineHanaEmbed({
  sceneUrl,
  className = "",
}: SplineHanaEmbedProps) {
  // SSR guard: render nothing on server, mount only in browser
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      {/* Load the hana-viewer web component via next/script (not raw <script>) */}
      <Script
        src="https://cdn.spline.design/@splinetool/hana-viewer@1.2.51/hana-viewer.js"
        strategy="afterInteractive"
        type="module"
      />

      {/* Wrapper: explicit size prevents layout shift */}
      <div
        className={`relative w-full h-full overflow-hidden ${className}`}
        style={{ contain: "strict" }}
      >
        {mounted && (
          <hana-viewer
            url={sceneUrl}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              // decorative — let clicks pass through to page content
              pointerEvents: "none",
            }}
          />
        )}
      </div>
    </>
  );
}
