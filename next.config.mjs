/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  // Ignore ESLint errors during production builds (lint separately in CI)
  eslint: {
    ignoreDuringBuilds: true,
  },

  transpilePackages: ['gsap', '@gsap/react'],
  // F-02: local assets are served from /public — no remote domains needed
  images: {
    unoptimized: true, // static export compatible; swap to remotePatterns if CDN is added
  },

  // F-01: Security Headers — OWASP baseline
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking
          { key: "X-Frame-Options", value: "DENY" },
          // Prevent MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Control referrer info sent to external sites
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Disable browser features that are not needed
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Content Security Policy
          // Dev: unsafe-eval required for Webpack hot-module replacement (eval-source-map)
          // Prod: unsafe-eval removed — webpack uses non-eval bundling in production builds
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              isDev
                ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://tally.so" // webpack HMR needs eval in dev
                : "script-src 'self' 'unsafe-inline' https://tally.so",              // prod: no eval
              "style-src 'self' 'unsafe-inline'",  // required for Tailwind
              "img-src 'self' data: blob:",
              "font-src 'self'",
              "frame-src https://tally.so",          // Tally.so waitlist embed
              "connect-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://tally.so",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
