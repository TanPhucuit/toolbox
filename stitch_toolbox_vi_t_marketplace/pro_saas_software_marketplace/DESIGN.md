---
name: Pro-SaaS Software Marketplace
colors:
  surface: '#f9f9ff'
  surface-dim: '#d8d9e3'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3fd'
  surface-container: '#ecedf7'
  surface-container-high: '#e6e7f2'
  surface-container-highest: '#e1e2ec'
  on-surface: '#191b23'
  on-surface-variant: '#424754'
  inverse-surface: '#2e3038'
  inverse-on-surface: '#eff0fa'
  outline: '#727785'
  outline-variant: '#c2c6d6'
  surface-tint: '#005ac2'
  primary: '#0058be'
  on-primary: '#ffffff'
  primary-container: '#2170e4'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#545f73'
  on-secondary: '#ffffff'
  secondary-container: '#d5e0f8'
  on-secondary-container: '#586377'
  tertiary: '#924700'
  on-tertiary: '#ffffff'
  tertiary-container: '#b75b00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#d8e3fb'
  secondary-fixed-dim: '#bcc7de'
  on-secondary-fixed: '#111c2d'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#f9f9ff'
  on-background: '#191b23'
  surface-variant: '#e1e2ec'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-padding: 64px
---

## Brand & Style
The design system focuses on a **Corporate / Modern** aesthetic, intentionally distancing itself from the "warez" or "underground" aesthetics often associated with software resellers. The goal is to feel like a premium SaaS platform—clean, reliable, and technically competent.

The target audience consists of professionals, developers, and students in Vietnam looking for legitimate-feeling purchasing experiences. The UI evokes an emotional response of security and efficiency through high-quality typography, a restrained color palette, and ample whitespace. Every element is structured to suggest that the software sold is stable, verified, and professional.

## Colors
The palette is rooted in functional professionalism. 
- **Primary Blue (#3B82F6):** Used exclusively for primary actions, progress indicators, and key links to drive conversion.
- **Dark Navy (#1E293B):** Used for headings and primary body text to provide high contrast and an authoritative feel.
- **Light Neutrals (#F9FAFB):** The global background color, providing a soft canvas that makes white product cards "pop."
- **Success Green (#10B981):** Reserved for "In Stock" indicators, compatibility checkmarks, and successful checkout states.

## Typography
Inter is used across all levels to maintain a systematic, utilitarian feel. 
- **Headlines:** Use Bold (700) or SemiBold (600) weights with slight negative letter spacing to create a compact, modern look.
- **Body Text:** Standard weight (400) with a generous line height (1.5x) to ensure readability for technical descriptions and license terms.
- **Numeric Data:** For price blocks, use SemiBold weights to ensure the "value" is immediately visible.

## Layout & Spacing
The system utilizes a **Fixed Grid** for desktop (12 columns) and a **Fluid Grid** for mobile. 
- **Rhythm:** A 4px/8px baseline shift is used for all internal component spacing.
- **Product Grids:** Desktop layouts use a 3 or 4-column grid with 24px gutters to allow each product card sufficient "breathing room."
- **Negative Space:** Generous vertical padding (64px+) between sections (e.g., Featured Software vs. Categories) reinforces the premium, uncluttered feel.

## Elevation & Depth
Depth is achieved through **Tonal Layers** and **Ambient Shadows**. 
- **Level 0:** Background (#F9FAFB).
- **Level 1 (Cards):** Pure White (#FFFFFF) surfaces with a very soft, diffused shadow (0px 4px 20px rgba(30, 41, 59, 0.05)).
- **Level 2 (Hover/Modals):** A slightly more pronounced shadow (0px 10px 30px rgba(30, 41, 59, 0.08)) to indicate interactivity.
- **Borders:** Use subtle 1px outlines (#E2E8F0) instead of heavy shadows for input fields and license selectors to maintain a flat, modern SaaS look.

## Shapes
The design system uses a consistent **Rounded** language.
- **Standard Radius:** 0.5rem (8px) for small buttons and input fields.
- **Large Radius (rounded-lg):** 1rem (16px) for product cards and main containers to evoke a friendly, modern software vibe.
- **License Selectors:** Use 12px (between standard and large) to distinguish them as specific interactive units.

## Components
- **Product Cards:** White background, 16px border-radius, subtle shadow. The software icon should be top-left, followed by a bold title and a clear price block.
- **Price Blocks:** The "Sale" price should be in Primary Blue (#3B82F6) at `title-lg` size, while the "Regular" price is struck through in a muted gray at `body-sm`.
- **License Selectors:** Large, clickable tiles for "1 PC", "3 PCs", or "Lifetime." Selected state features a 2px Primary Blue border and a subtle blue tint background.
- **Windows Compatibility Badges:** Small, pill-shaped labels with a light gray background and navy text (e.g., "Windows 11 Compatible"). Use a simple Windows logo icon for quick recognition.
- **Buttons:** 
  - *Primary:* Solid Blue background, White text, 10px-12px padding.
  - *Secondary:* Ghost style with Blue border or light blue tint background.
- **Input Fields:** 1px border (#E2E8F0), 8px radius, focus state transitions border to Primary Blue.