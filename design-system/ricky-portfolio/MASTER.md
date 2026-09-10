# Ricky Portfolio — Design System

> Global source of truth. Page-specific files in `pages/` may override this document.

## Positioning

- Identity: Ricky / radiansyahp.
- Role: Full-stack Developer / Information Systems Student.
- Location: Indonesia — Bekasi / Bandung.
- Audience: recruiters, product teams, clients, and technical collaborators.
- Principle: **Professional shell, creative core.**

The interface should demonstrate creative engineering without presenting Ricky as a “creative developer”.

## Visual tokens

| Token | Value | Purpose |
|---|---:|---|
| Void | `#000000` | Primary canvas |
| Panel | `#0C0D10` | Secondary surface |
| Raised | `#17191F` | Interactive/raised surface |
| Primary text | `#F2F3F5` | Main text |
| Secondary text | `#9A9FA8` | Supporting text |
| Pulse | `#8A7CFF` | Focus, active state, and Kinetic R seam |

Pulse is semantic, not ambient decoration. Avoid rainbow materials, decorative gradients, and green “developer terminal” styling.

## Typography

- Display: Bricolage Grotesque, variable weight 500–700.
- Body/UI: Manrope, variable weight 400–600.
- Body: minimum 16px, line-height 1.55, maximum measure 72 characters.
- Avoid tracked uppercase eyebrows, monospace metadata, and single-word color accents.

## Layout

- Desktop: 12-column editorial grid with responsive outer gutters.
- Home: one-viewport cover; identity left, Kinetic R centered, introduction and CTA right.
- Work: vertical editorial chapters rather than identical cards.
- Mobile: purpose-built vertical composition; Kinetic R occupies approximately 35–42svh and never obstructs copy.
- Alignment is predominantly left-aligned. Empty space is structural.

## Signature object

The Kinetic R is the only dominant visual gesture. Build its first version from procedural Three.js geometry. A Blender asset may replace it after visual review.

- Matte graphite body, restrained reflective edges, periwinkle internal seam.
- Entry assembly: 700–1000ms.
- Pointer response: maximum 8–12 degrees.
- Near-static idle state; no continuous spinning.
- Static poster/SVG fallback without WebGL.

## Motion

- One orchestrated entry and one spatial Home-to-Work transition.
- Interface feedback uses 160–260ms transitions.
- Do not fade-and-slide every section.
- `prefers-reduced-motion` disables assembly, pointer parallax, scrub, and nonessential transitions.
- Canvas pauses when hidden or outside the viewport.

## Accessibility and responsive floor

- Body contrast ≥ 4.5:1.
- Visible `:focus-visible` indicators using Pulse and an offset.
- Touch targets at least 44×44px with 8px separation.
- Complete semantic DOM remains readable when canvas or JavaScript fails.
- No hover-only information and no horizontal page scroll.
- Verify 375px, 768px, 1024px, and 1440px.

## Anti-patterns

- Generic rounded card grids, glass panels, decorative badges, and gradient blobs.
- An Arkon-like sphere, copied composition, or iridescent material.
- Excessive bloom, particles, cursor replacements, or scroll hijacking.
- Claims, metrics, roles, clients, or outcomes not supported by evidence.

