# Ricky Portfolio

Personal portfolio for Ricky / radiansyahp, designed around a restrained dark editorial interface and one interactive signature: the persistent System Core.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run test:e2e
npm run build
```

Implementation decisions and phase records live in [`docs/`](docs) and the design source of truth is [`design-system/ricky-portfolio/MASTER.md`](design-system/ricky-portfolio/MASTER.md).

## Experience architecture

- `/` is a focused landing portal.
- `/about`, `/portfolio`, `/stack`, and `/contact` share a persistent internal shell.
- `/work/[slug]` contains evidence-led case studies.
- One React Three Fiber canvas persists across client navigation and changes state per route.
- GSAP handles route choreography; reduced-motion visitors navigate immediately.
- CSS artwork remains as the no-WebGL and pre-hydration fallback.

## Content status

The portfolio is production-buildable, but quantified project outcomes, approved screenshots, public email, and professional social links remain intentionally unclaimed until Ricky supplies them.
