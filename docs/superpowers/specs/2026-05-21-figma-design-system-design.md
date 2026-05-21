# NookMind — Figma Design System & Screens

**Date:** 2026-05-21  
**Scope:** Export the complete design system and main app screens into the existing Figma file.  
**Figma file:** https://www.figma.com/design/KweBzjC4egEtTmaiEaTeIC/Nookmind  
**Mode:** Dark mode (light mode variables left as empty slots for manual fill)

---

## Structure

3 Figma pages, each building on the previous:

```
🔧 Tokens       → raw values (variables, type styles, radius, shadows)
🧩 Components   → reusable UI pieces built from tokens
📱 Screens      → full screens built from components
```

---

## Page 1 — 🔧 Tokens

### Figma Variables (Color — Dark & Light modes)

All colors are defined as Figma Variables with two modes: **Dark** (filled) and **Light** (empty slot for user to fill).

#### Backgrounds
| Variable | Dark value |
|----------|-----------|
| `background/primary` | `#0f1117` |
| `background/secondary` | `#1a1f2e` |
| `background/overlay` | `rgba(0,0,0,0.50)` |

#### Borders
| Variable | Dark value |
|----------|-----------|
| `border/default` | `rgba(255,255,255,0.08)` |
| `border/strong` | `rgba(255,255,255,0.12)` |

#### Text
| Variable | Dark value |
|----------|-----------|
| `text/primary` | `#f3f4f6` |
| `text/secondary` | `#9ca3af` |
| `text/muted` | `#6b7280` |

#### Accent — Books
| Variable | Value |
|----------|-------|
| `accent/books/default` | `#f59e0b` |
| `accent/books/subtle` | `rgba(245,158,11,0.10)` |
| `accent/books/strong` | `#d97706` |

#### Accent — Movies
| Variable | Value |
|----------|-------|
| `accent/movies/default` | `#6366f1` |
| `accent/movies/subtle` | `rgba(99,102,241,0.10)` |
| `accent/movies/strong` | `#4f46e5` |

#### Accent — Series
| Variable | Value |
|----------|-------|
| `accent/series/default` | `#14b8a6` |
| `accent/series/subtle` | `rgba(20,184,166,0.10)` |
| `accent/series/strong` | `#0d9488` |

#### Status
| Variable | Value |
|----------|-------|
| `status/read` | `#10b981` |
| `status/in-progress` | `#3b82f6` |
| `status/want` | `#f59e0b` |
| `status/waiting` | `#a855f7` |
| `status/future` | `#0ea5e9` |

---

### Typography Styles

| Style name | Font | Weight | Size | Line height |
|-----------|------|--------|------|-------------|
| `Display/XL` | Playfair Display | Bold 700 | 30px | 1.25 |
| `Heading/L` | Playfair Display | Bold 700 | 24px | 1.25 |
| `Heading/M` | Inter | SemiBold 600 | 20px | 1.3 |
| `Body/M` | Inter | Regular 400 | 16px | 1.5 |
| `Body/S` | Inter | Regular 400 | 14px | 1.5 |
| `Label/M` | Inter | SemiBold 600 | 14px | 1.4 |
| `Label/S` | Inter | Medium 500 | 12px | 1.4 |

---

### Radius & Shadow Swatches (visual reference frame)

**Radius values:**
- `radius/sm` = 8px
- `radius/md` = 12px (cards, inputs)
- `radius/lg` = 16px (sheet modals, detail cards)
- `radius/xl` = 24px (bottom sheet top corners)
- `radius/full` = 9999px (pills, avatars)

**Shadow levels:**
- `shadow/sm` = `0 2px 8px rgba(15,23,42,0.22)`
- `shadow/md` = `0 4px 16px rgba(15,23,42,0.30)`
- `shadow/lg` = `0 8px 24px rgba(15,23,42,0.40)`
- `shadow/xl` = `0 18px 40px rgba(15,23,42,0.50)`

---

## Page 2 — 🧩 Components

Each component uses color variables and text styles from Tokens. Components are built as Figma **components** (not plain frames) with variants where relevant.

### Buttons
- **Button/Primary** — variants: Default, Hover, Disabled. Amber-500 bg, white text, rounded-full, px-5 py-2.5.
- **Button/Ghost** — variants: Default, Hover. Transparent, gray text, rounded-full.
- **Button/Icon** — variants: Default, Hover. Square-ish ghost button for icon-only actions.

### Cards
- **Card/Book** — cover image (placeholder rect), title (Heading/M), author (Body/S text/secondary), status badge, star rating. Rounded-2xl, background/secondary bg, border/default border.
- **Card/Movie** — same structure, movie poster ratio (2:3).
- **Card/Series** — same, with season/episode progress indicator.
- **Card/Skeleton** — pulsing placeholder version of the above.

### Inputs
- **Input/Default** — full-width, rounded-xl, border/default, Body/M.
- **Input/Focus** — border accent/books/default + ring.
- **Input/Error** — border red-500.
- **Input/Search** — with leading search icon, clear button.

### Badges
- **Badge/Status** — 5 variants (read, in-progress, want, waiting, future). Rounded-full, text-white, Label/S.
- **Badge/Tag** — filter pill, rounded-full, accent/subtle bg, accent text.

### Navigation
- **Nav/BottomBar** — mobile bottom navigation. 5 tabs: Home, Library, NextUp, Discover, (mode toggle pill center).
- **Nav/Sidebar** — desktop 60px vertical nav. Icon-only links + mode toggle + user avatar at bottom.
- **Nav/MobileTopBar** — mobile header. Logo left, avatar right.

### Modal Base
- **Modal/Sheet** — drag handle top, header with title + close button, scrollable content area. Rounded-t-3xl bottom sheet shape.

### Toggle
- **Toggle/Off** — gray track, white knob.
- **Toggle/On** — teal track, white knob.

### Avatar
- **Avatar/SM** (28px), **Avatar/MD** (36px), **Avatar/LG** (48px) — rounded-full, colored initials fallback.

---

## Page 3 — 📱 Screens

All mobile screens: **390×844px** (iPhone 14 Pro). Login also has a **1440×900px** desktop variant.

Screens are assembled from Page 2 components. Placeholder cover images are gray rectangles (user will replace).

### Screen list

| # | Name | Accent | Notes |
|---|------|--------|-------|
| 1 | Home — Books | Amber | Horizontal sliders: En cours, À lire, Tendances |
| 2 | Home — Movies | Indigo | Same layout, indigo accent swap |
| 3 | Home — Series | Teal | Same layout, teal accent swap |
| 4 | Home — Search active | Amber | Search bar focused, results grid below |
| 5 | Library | Amber | Grid view, filter pills top, sort button |
| 6 | Login (mobile + desktop) | — | Email/pw fields, Google + Apple buttons, logo |
| 7 | Onboarding (3 slides) | Amber | Illustration area + headline + CTA per slide |
| 8 | NextUp | Amber | Card stack / carousel, swipe hint |
| 9 | Discover | — | "Coming soon" state with icon |
| 10 | Settings | Teal | Sections: account, notifications, theme, language |
| 11 | Modal — BookDetail | Amber | Cover, metadata, rating, notes, status controls |
| 12 | Modal — MovieDetail | Indigo | Poster, cast, streaming providers, rating |
| 13 | Modal — SeriesDetail | Teal | Poster, seasons grid, progress, rating |

---

## Execution order

1. Set up Figma variables (color modes Dark/Light)
2. Create typography + radius + shadow styles on Tokens page
3. Build components page bottom-up (atoms → molecules → organisms)
4. Assemble screens using components

---

## Out of scope

- Light mode fill (user will do this using the variable slots)
- AuthCallback, Privacy, Terms pages
- Exhaustive screen variations (user will extend from the pattern)
