# Pathly Website — Design System

**Version:** 1.0.0
**Last Updated:** 2026-03-21

---

## Color Tokens

| Token              | Hex       | Usage                        |
|--------------------|-----------|------------------------------|
| `--color-navy`     | `#133C7B` | Primary accent, CTAs         |
| `--color-navy-hover` | `#1A4E9F` | Hover states               |
| `--color-navy-tint`| `#EEF3FB` | Very light background tint   |
| `--color-text`     | `#333333` | Headlines, body copy         |
| `--color-muted`    | `#8498B9` | Labels, sublines, captions   |
| `--color-bg`       | `#FFFFFF` | Base background              |
| `--color-bg-soft`  | `#F9FAFB` | Alternating sections         |
| `--color-border`   | `#E5EAF2` | Cards, dividers              |
| `--color-success`  | `#00B870` | DSGVO badges, positive state |

---

## Typography

| Role           | Font                    | Weight     | Size (Desktop)  | Size (Mobile)   | Usage                                  |
|----------------|-------------------------|------------|-----------------|-----------------|----------------------------------------|
| Display        | Geist Variable          | 600–900    | 56px / 3.5rem   | 36px / 2.25rem  | H1, H2, H3 — all section headlines    |
| Body           | Inter Variable          | 100–900    | 18px / 1.125rem | 16px / 1rem     | Body text, labels, UI elements, H4–H6 |
| Serif Accent   | Instrument Serif Italic | 400 Italic | —               | —               | Max. 1 word per headline as accent     |
| Mono           | JetBrains Mono          | 400–700    | 14px / 0.875rem | 13px / 0.8125rem| Code snippets, technical labels        |

### CSS Custom Properties
```css
--font-sans:          'Inter', system-ui, -apple-system, sans-serif;
--font-display:       'Geist', 'Inter', system-ui, sans-serif;
--font-serif-accent:  'Instrument Serif', Georgia, serif;
--font-mono:          'JetBrains Mono', ui-monospace, monospace;
```

### Font Rules
- **Serif accent** via `<span className="font-serif-accent">` — NOT `<em>` (wrong semantics for screen readers)
- `font-display: optional` on Geist + Instrument Serif — no CLS, system font as fallback
- `font-display: swap` on Inter — guarantees brand font loads even on slow connections
- Geist is preloaded in layout.tsx for above-the-fold Hero headline

---

## Spacing (8px Grid)

| Tailwind | px  | Usage                |
|----------|-----|----------------------|
| `p-2`    | 8   | Tight inner padding  |
| `p-4`    | 16  | Card padding         |
| `p-6`    | 24  | Section inner        |
| `p-8`    | 32  | Section gaps         |
| `p-12`   | 48  | Large gaps           |
| `p-16`   | 64  | Section top/bottom   |
| `p-24`   | 96  | Hero top/bottom      |

---

## Section Order & Backgrounds

| #  | Section          | Background         |
|----|------------------|---------------------|
| 01 | Navbar           | `#FFFFFF` (sticky)  |
| 02 | Hero             | `#FFFFFF`           |
| 03 | Trust Ticker     | `#F9FAFB`           |
| 04 | Problem          | `#FFFFFF`           |
| 05 | How It Works     | `#F9FAFB`           |
| 06 | Features         | `#FFFFFF`           |
| 07 | Differentiation  | `#133C7B` (navy)    |
| 08 | Testimonials     | `#F9FAFB`           |
| 09 | FAQ              | `#F9FAFB` (bg-soft) |
| 10 | Final CTA        | `#FFFFFF`           |
| 11 | Footer           | `#F9FAFB`           |

---

## Breakpoints

| Name   | Width     |
|--------|-----------|
| `sm`   | 640px     |
| `md`   | 768px     |
| `lg`   | 1024px    |
| `xl`   | 1280px    |

---

## Border Radius

| Token   | Value | Usage         |
|---------|-------|---------------|
| `sm`    | 4px   | Chips, badges |
| `md`    | 8px   | Buttons       |
| `lg`    | 12px  | Cards         |
| `xl`    | 16px  | Sections      |
| `2xl`   | 24px  | Phone frame   |
| `full`  | 9999px| Avatars       |

---

## Shadows

| Token     | Value                                    | Usage        |
|-----------|------------------------------------------|--------------|
| `sm`      | `0 1px 2px rgba(0,0,0,0.05)`            | Subtle       |
| `md`      | `0 4px 12px rgba(19,60,123,0.08)`       | Cards        |
| `lg`      | `0 8px 24px rgba(19,60,123,0.12)`       | Elevated     |
| `phone`   | `0 16px 48px rgba(19,60,123,0.18)`      | Phone frame  |
