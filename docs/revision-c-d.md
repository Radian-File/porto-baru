# Revision C-D — Persistent System Core and route choreography

## Outcome

The CSS art-direction prototype is now backed by a persistent React Three Fiber scene. The Core remains mounted across client-side navigation, so the landing and internal pages feel like two states of one spatial system rather than disconnected screens.

## Core states

- **Home:** balanced shell, restrained orbit, bright dependable center.
- **About:** quieter surface so the personal narrative remains dominant.
- **Portfolio:** denser point field representing shipped projects and evidence.
- **Stack:** brighter orbital paths representing connected technical layers.
- **Contact:** stronger breathing energy as the visual call to action.

Pointer movement subtly influences the surface. Animation pauses with page visibility and becomes a static composition when reduced motion is requested. A CSS version remains available while WebGL support is checked or unavailable.

## Transition choreography

1. Current content recedes and clips away in 200–280 ms.
2. The persistent Core brightens and expands as the visual bridge.
3. Next.js changes the route without replacing the shared shell.
4. The Core travels to its route-specific composition while new content resolves upward in 520 ms.

Reduced-motion navigation bypasses this choreography and changes route immediately.

## Verification contract

The browser test places a token on the canvas before navigation and asserts that the token remains afterward. This proves the canvas DOM node—and therefore the visual system—persists across the landing-to-portfolio transition.
