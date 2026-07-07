# Lustra — Brand & Design System

## Brand

**Name:** Lustra — from *lustre*: the soft sheen of clean fabric.
**Tagline:** *Laundry, elevated.*
**Personality:** Apple's restraint, Stripe's precision, Airbnb's warmth.
Premium but never cold; technological but never gadgety.

**Logo:** a water-drop inside a machine porthole, set in a rounded-square
gradient tile (see `public/icon.svg` and `src/components/layout/logo.tsx`).
Wordmark: "Lustra" + aqua period, font-display bold.

## Color

| Token        | Light                | Dark                 | Use                        |
| ------------ | -------------------- | -------------------- | -------------------------- |
| `ink-900`    | `#0b1220`            | —                    | Primary text / dark surfaces |
| `aqua-500`   | `#06b6d4`            | `#22d3ee` (400)      | Accent, CTAs, live states  |
| `--bg`       | `#f7f8fb`            | `#060a14`            | Page background            |
| `--card`     | `#ffffff`            | `#0d1424`            | Surfaces                   |
| CTA gradient | `#06b6d4 → #4867a5` (135°)                  | Primary buttons, brand marks |

Status hues: emerald (available/success), aqua (running/info), amber
(reserved/warning), violet (finishing/processing), red (errors only).
All pairings hold ≥ 4.5:1 contrast in both themes.

## Typography

System font stack (SF Pro Display → Inter → Segoe UI) — zero font download,
native feel on every OS. Display sizes use tight tracking (`h-display`
utility). Scale: 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 48 / 60 / 72.

## Shape & depth

- Radii: cards `1.5rem` (`rounded-3xl`), heroes `2.5rem` (`rounded-5xl`),
  controls full-round pills.
- Shadows: `shadow-card` for rest state, `shadow-soft-lg` for hover/lift,
  `shadow-glow` (aqua) reserved for primary CTAs and live/selected states.
- Glassmorphism: `.glass` utility — blur-xl over 60% white (6% white in dark),
  hairline border. Used for nav, floating cards, dark-section tiles.

## Motion

- Entrances: 0.7s fade-up on scroll (`Reveal`), 80ms stagger for grids.
- Easing: `cubic-bezier(.21,.6,.35,1)` everywhere.
- Micro-interactions: hover lift `-translate-y-0.5/1.5` + shadow upgrade;
  icons scale/rotate ≤ 10% on group hover.
- Ambience: floating bubbles (hero), rotating drum (machine states), soft
  pulse (live dots). All motion collapses under `prefers-reduced-motion`.

## Components (src/components)

`ui`: buttons (`.btn-primary`, `.btn-secondary`), inputs (`.input`, `.label`),
chips, skeletons — defined as Tailwind component classes in `globals.css`.
`layout`: Navbar (glass, scroll-aware), Footer (ink-900), FloatingCta,
BottomNav (mobile app-style), ThemeToggle.
`shared`: Reveal/Stagger, SectionHeading, FaqAccordion, CtaBanner, NewsletterForm.
Domain: BookingWizard, PriceCalculator, RoiCalculator, QuoteForm, MachineFloor,
MachineAvailability, OrderTracker, Assistant (chat).

## Photography & illustration direction

When real assets are produced: bright, airy interiors with deep depth of
field; fabric macro textures; no stock-smiling-at-detergent. Illustration
style: soft 3D clay-render objects (machines, bubbles, folded stacks) on
gradient fields matching the CTA gradient. Icons: Lucide, 1.5–2px stroke.

## Voice & copy

Confident, warm, specific. Numbers over adjectives ("98.7% on-time" beats
"reliable"). One idea per sentence in headings. CTAs are verbs: *Schedule
Pickup*, *Reserve a Machine*, *Get my quote*. Humor is allowed exactly one
wink per page (404: "went missing in the wash").
