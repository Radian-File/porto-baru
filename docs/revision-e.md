# Revision E — Hardening and handoff

## Runtime resilience

- The WebGL capability check renders the CSS System Core until a canvas can be created.
- A React error boundary and `webglcontextlost` handler return the experience to the CSS fallback instead of losing the signature visual.
- The renderer pauses when the document is hidden and becomes a demand-rendered still when reduced motion is enabled.
- Small, low-memory, low-core, and data-saver devices receive fewer particles, lower sphere tessellation, lower DPR, and no antialiasing.

## Navigation and accessibility

- Internal links retain native link semantics, modified-click behavior, prefetching, and browser history.
- `aria-busy` exposes the short transition state.
- After an animated route change, focus moves to the new `main` landmark without changing scroll position.
- Reduced-motion navigation bypasses the animation delay.
- The canvas is decorative and excluded from the accessibility tree; every meaning it suggests is represented by semantic page content.

## Visual ownership

The System Core is Ricky's primary signature. The small `R.` wordmark is identity punctuation, not an alternate hero. Route variations should remain one recognizable object:

- change density and energy, not the entire art style;
- preserve the dark professional shell and violet-white illumination;
- avoid adding bloom, particle count, or cursor effects unless they clarify a route state;
- preserve text safe areas and the static fallback before enhancing shaders.

## Content still needed

- verified public email and professional profile URLs;
- approved project screenshots or motion captures;
- measurable project outcomes that can be supported by evidence;
- optional Blender replacement only if it keeps the same persistent-state contract.
