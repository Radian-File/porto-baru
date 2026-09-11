# Revision A-B — System Core foundation

## Outcome

The portfolio now treats the landing page as a focused portal and moves the full body of work into persistent internal routes. A shared dark frame and a single luminous System Core connect both modes visually.

## Decisions

- Keep `R.` as a restrained wordmark, not the primary hero object.
- Use the glowing core as the visual metaphor: a dependable system with energy at its center.
- Give the landing page three clear zones: identity, core, and introduction.
- Use real `/about`, `/portfolio`, `/stack`, and `/contact` routes instead of page anchors.
- Preserve one navigation rail across internal routes; it becomes a bottom dock on small screens.
- Keep project case studies at `/work/[slug]` and mark Portfolio as their parent section.
- Start with a CSS fallback so the composition remains complete before and without WebGL.

## Acceptance checks

- All primary and internal routes render independently.
- The selected-work index links to the existing project case studies.
- Keyboard focus, reduced-motion content, and mobile horizontal overflow are covered by tests.
- TypeScript, ESLint, and the production build pass.

## Next

Revision C-D replaces the static core with a route-aware WebGL object and adds choreographed transitions while keeping this fallback intact.
