/**
 * Lustra design tokens for React Native / Expo — generated from tokens.json v1.0.0.
 *
 * Usage:
 *   import { colors, type, radius, spacing, useTheme } from "./theme";
 *   const t = useTheme(); // semantic colors for the current scheme
 */

import { useColorScheme } from "react-native";

export const palette = {
  ink: {
    50: "#f4f6fb", 100: "#e8ecf6", 200: "#ccd6ea", 300: "#9fb1d6", 400: "#6b87bd",
    500: "#4867a5", 600: "#37508a", 700: "#2e4170", 800: "#29385e", 900: "#0b1220", 950: "#060a14",
  },
  aqua: {
    50: "#ecfeff", 100: "#cffafe", 200: "#a5f3fc", 300: "#67e8f9",
    400: "#22d3ee", 500: "#06b6d4", 600: "#0891b2", 700: "#0e7490",
  },
  status: {
    success: "#10b981",
    info: "#06b6d4",
    warning: "#f59e0b",
    processing: "#8b5cf6",
    error: "#ef4444",
  },
} as const;

export type SemanticColors = {
  background: string;
  foreground: string;
  card: string;
  muted: string;
  border: string;
  accent: string;
};

export const light: SemanticColors = {
  background: "#f7f8fb",
  foreground: "#0b1220",
  card: "#ffffff",
  muted: "#64748b",
  border: "#e2e8f0",
  accent: palette.aqua[500],
};

export const dark: SemanticColors = {
  background: "#060a14",
  foreground: "#edf2fa",
  card: "#0d1424",
  muted: "#94a3b8",
  border: "#1e293b",
  accent: palette.aqua[400],
};

export function useTheme(): SemanticColors {
  return useColorScheme() === "dark" ? dark : light;
}

/** Primary CTA gradient — render with expo-linear-gradient at 135°. */
export const ctaGradient = {
  colors: [palette.aqua[500], palette.ink[500]] as [string, string],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
};

export const type = {
  caption: { fontSize: 12, lineHeight: 16, fontWeight: "600" as const },
  bodySm: { fontSize: 14, lineHeight: 21 },
  body: { fontSize: 16, lineHeight: 26 },
  titleSm: { fontSize: 18, lineHeight: 26, fontWeight: "600" as const },
  title: { fontSize: 20, lineHeight: 28, fontWeight: "600" as const },
  headline: { fontSize: 24, lineHeight: 30, fontWeight: "700" as const, letterSpacing: -0.5 },
  displaySm: { fontSize: 30, lineHeight: 36, fontWeight: "700" as const, letterSpacing: -0.6 },
  display: { fontSize: 36, lineHeight: 40, fontWeight: "700" as const, letterSpacing: -0.7 },
  hero: { fontSize: 48, lineHeight: 50, fontWeight: "700" as const, letterSpacing: -1.4 },
  eyebrow: {
    fontSize: 12,
    fontWeight: "700" as const,
    letterSpacing: 2.4,
    textTransform: "uppercase" as const,
  },
};

export const spacing = {
  unit: 4,
  screenPadding: 20,
  cardPadding: 28,
  sectionGap: 96,
} as const;

export const radius = {
  control: 16,
  card: 24,
  sheet: 32,
  hero: 40,
  pill: 999,
} as const;

export const shadow = {
  card: {
    shadowColor: palette.ink[900],
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  glow: {
    shadowColor: palette.aqua[400],
    shadowOpacity: 0.35,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },
} as const;

export const motion = {
  /** Matches web cubic-bezier(0.21, 0.6, 0.35, 1) — use with Easing.bezier(). */
  easing: [0.21, 0.6, 0.35, 1] as const,
  duration: { micro: 150, control: 250, entrance: 700 },
  stagger: 80,
} as const;

/** Machine/order status → color, matching the web UI. */
export const statusColor = {
  available: palette.status.success,
  running: palette.status.info,
  reserved: palette.status.warning,
  finishing: palette.status.processing,
  maintenance: light.muted,
  delivered: palette.status.success,
  out_for_delivery: palette.status.info,
  processing: palette.status.processing,
  scheduled: palette.status.warning,
} as const;
