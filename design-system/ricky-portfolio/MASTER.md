# Ricky Portfolio — Design System

> Global source of truth. Page-specific files in `pages/` may override this document.

## Positioning

- Identity: Ricky / radiansyahp.
- Role: Full-stack Developer / Information Systems Student.
- Location: Indonesia — Bekasi / Bandung.
- Audience: recruiters, product teams, clients, and technical collaborators.
- Principle: **Professional shell, creative core.**

The interface demonstrates creative engineering without presenting Ricky as a “creative developer.”

## Visual tokens

| Token | Value | Purpose |
|---|---:|---|
| Void | `#030307` | Primary canvas |
| Panel | `#0B0B12` | Secondary surface |
| Primary text | `#F4F2FA` | Main text |
| Secondary text | `#9D9AA9` | Supporting text |
| Line | `rgba(226, 220, 255, 0.16)` | Frame and dividers |
| Pulse | `#8A7CFF` | Focus, active state, and Core energy |
| Pulse bright | `#D8D1FF` | Inner light and high-energy state |

Violet light is semantic: it describes energy and state. Avoid rainbow materials, green terminal styling, and unrelated decorative gradients.

## Typography

- Display: Bricolage Grotesque, variable weight 500–700.
- Body/UI: Manrope, variable weight 400–600.
- Body: minimum 16px, line-height 1.55, maximum measure 72 characters.
- Avoid tracked uppercase eyebrows, monospace metadata, and single-word color accents.

## Layout

- Desktop: 12-column editorial grid inside a thin rounded viewport frame.
- Landing: one-viewport portal; identity left, System Core centered, introduction and CTA right.
- Internal: persistent wordmark and vertical pill rail; content occupies the remaining editorial grid.
- Portfolio: evidence-led project index leading into individual case studies.
- Mobile: single-column content, bottom navigation dock, and route-specific Core crop.
- Alignment is predominantly left-aligned. Empty space is structural.

## Signature object

The persistent **System Core** is the dominant visual gesture. The `R.` wordmark is a restrained secondary identity mark.

- Bright center represents dependable logic and reliability.
- Adaptive violet shell represents full-stack range.
- Particles become strongest on Portfolio and represent projects/data.
- Orbits become strongest on Stack and represent connected technical layers.
- Contact receives a slightly stronger energy state.
- Pointer response remains subtle; it must not behave like a toy.
- CSS fallback must preserve the composition without WebGL.

## Motion

- The System Core remains mounted across client-side routes.
- Portal transition: content recedes in 200–280ms, route changes, destination resolves in approximately 520ms.
- The Core brightens and moves between compositions; it does not disappear and re-enter.
- Internal-to-internal transitions are quieter than landing-to-internal transitions.
- `prefers-reduced-motion` bypasses route choreography and renders a static Core.
- Canvas pauses while the document is hidden.

## Accessibility and responsive floor

- Body contrast ≥ 4.5:1.
- Visible `:focus-visible` indicators using Pulse and an offset.
- Touch targets at least 44×44px with 8px separation.
- Complete semantic DOM remains readable when canvas or JavaScript fails.
- Decorative canvas is excluded from the accessibility tree.
- No hover-only information and no horizontal page scroll.
- Verify 375px, 768px, 1024px, and 1440px.

## Performance tiers

- High: 900 particles, 56×56 shell segments, DPR up to 1.35, antialiasing.
- Low: 440 particles, 36×36 shell segments, DPR up to 1.1, no antialiasing.
- Use Low on compact screens, low-core/low-memory devices, or data saver.
- WebGL errors and context loss return to the CSS fallback.

## Anti-patterns

- Generic rounded card grids, glass panels, decorative badges, and gradient blobs.
- Copying Arkon’s exact sphere, typography placement, material, or timing.
- Excessive bloom, particle count, cursor replacement, sound, or scroll hijacking.
- Treating each route as a different visual universe; all states must remain the same Core.
- Claims, metrics, roles, clients, or outcomes not supported by evidence.
