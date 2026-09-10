# Phase 4–5 — Case Studies and Hardening

## Phase 4: work experience

- Added static case-study routes for RRS Studio, RRS JobRadar, and ProjectBowl.
- Replaced external project rows with internal Next.js navigation.
- Derived summaries, workflows, technology, and documented decisions from each public repository README.
- Separated verified repository evidence from missing role, outcome, and screenshot information.
- Added predictable cyclic next-project navigation and direct source links.

## Phase 5: responsive, accessibility, and performance

- Preserved semantic headings, sections, navigation landmarks, and visible keyboard focus.
- Kept all important information available without hover and outside the Three.js canvas.
- Verified no mobile horizontal document overflow.
- Kept reduced-motion content visible while disabling GSAP timelines and scene motion.
- Limited canvas pixel density and paused rendering when hidden or offscreen.
- Added Playwright coverage for desktop and mobile navigation, project evidence, keyboard focus, reduced motion, and overflow.

## Verification

- `npm run typecheck`
- `npm run lint`
- `npm run test:e2e` — 10 tests across desktop Chromium and an iPhone 12-sized Chromium context.
- `npm run build`
- Collaborative-browser inspection of Home and RRS Studio at desktop and mobile widths.

## Remaining content work

- Replace repository-study framing with personal case-study narratives once role and result evidence is supplied.
- Add real project screenshots.
- Add verified email, LinkedIn, and optional Instagram.
