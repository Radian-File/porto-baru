# Phase 0–1 — Discovery and Wireframe

## Phase 0 findings

- Repository began empty except for Git metadata.
- Implementation stack: Next.js App Router, TypeScript, React Three Fiber/Three.js, Drei, GSAP, CSS Modules/global tokens, local TypeScript project data, and Playwright.
- No local photography, screenshots, CV, logo, or final contact handles are available yet.
- First preview scope: Home cover, selected-work index, About, Contact, and a procedural Kinetic R with static/reduced-motion fallback.
- Initial project candidates: `rrs-web`, `find-my-job`, and `project-bowl`. Project outcomes remain explicitly unclaimed until supplied.

## Information architecture

```text
Home /
├── Identity + positioning
├── Kinetic R
├── Selected work /#work
├── About /#about
└── Contact /#contact
```

The first implementation uses one accessible document with anchored sections. A dedicated case-study route is deferred until enough verified content exists.

## Desktop wireframe

```text
┌─────────────────────────────────────────────────────────────────────┐
│ RICKY                                      Work  About  Contact     │
│                                                                     │
│ FULL-STACK          [ procedural Kinetic R ]   I build dependable  │
│ DEVELOPER                                      digital products.    │
│ Student / builder                              View selected work   │
│ Indonesia · Bekasi / Bandung                                        │
└─────────────────────────────────────────────────────────────────────┘
│ SELECTED WORK                                                       │
│ Project title          role / stack             contribution       │
│ ──────────────────────────────────────────────────────────────────  │
│ Project title          role / stack             contribution       │
└─────────────────────────────────────────────────────────────────────┘
```

## Mobile wireframe

```text
┌────────────────────────────┐
│ RICKY                 Menu │
│ FULL-STACK                 │
│ DEVELOPER                  │
│ [     Kinetic R      ]     │
│ Short positioning copy     │
│ View selected work         │
│ Bekasi / Bandung           │
└────────────────────────────┘
│ Selected work              │
│ Project / contribution     │
│ Project / contribution     │
└────────────────────────────┘
```

## Content and behavior decisions

- Hero title communicates profession in under five seconds.
- The primary CTA is “View selected work”.
- Project rows remain useful without previews or animation.
- Mobile navigation remains inline and compact; no modal menu is needed for three links.
- Kinetic R is decorative in semantics. All navigation remains in the DOM.
- Missing email is represented as a transparent placeholder, not fabricated.

## Approval carried into implementation

The user authorized project execution and requested one Git commit after every two phases. Phase 0–1 therefore closes with its own commit before visual implementation begins.

