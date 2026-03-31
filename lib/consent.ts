/**
 * Cookie Consent Utility
 *
 * Pure utility module — no "use client".
 * All localStorage calls wrapped in try/catch for iOS Safari Private Mode.
 */

import { COOKIE_CONSENT } from "./constants";

const KEY = COOKIE_CONSENT.STORAGE_KEY;
const CURRENT_VERSION = COOKIE_CONSENT.VERSION;

// ─── Types ───────────────────────────────────────────────────

export interface ConsentState {
  necessary: true;
  analytics: boolean;
  version: number;
  timestamp: string;
}

// ─── Read ────────────────────────────────────────────────────

/**
 * Returns the saved consent state, or null if:
 * - No consent stored yet
 * - Stored version is outdated (privacy policy changed → re-prompt)
 * - localStorage unavailable (Safari Private Mode)
 */
export function getConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;

    const parsed: ConsentState = JSON.parse(raw);

    // Version mismatch → treat as no consent (re-prompt)
    if (parsed?.version !== CURRENT_VERSION) return null;

    return parsed;
  } catch {
    return null; // Silent fail — Safari Private Mode, SSR, etc.
  }
}

// ─── Write ───────────────────────────────────────────────────

/**
 * Persists the user's consent choice.
 * `necessary` is always true (cannot be disabled).
 */
export function setConsent(analytics: boolean): void {
  try {
    const state: ConsentState = {
      necessary: true,
      analytics,
      version: CURRENT_VERSION,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Silent fail — banner disappears, no crash
  }
}

// ─── Helpers ─────────────────────────────────────────────────

/** Whether any consent decision has been stored. */
export function hasConsent(): boolean {
  return getConsent() !== null;
}

/** Whether analytics cookies were explicitly accepted. */
export function getAnalyticsConsent(): boolean {
  return getConsent()?.analytics ?? false;
}
