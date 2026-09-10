export type Project = {
  slug: string;
  name: string;
  shortSummary: string;
  overview: string;
  contribution: string;
  repository: string;
  stack: string[];
  workflow: string[];
  evidence: string[];
  openQuestions: string[];
};

export const projects: Project[] = [
  {
    slug: "rrs-web",
    name: "RRS Studio",
    shortSummary: "A quotation-first web and product studio platform spanning public, client, and owner experiences.",
    overview: "The repository describes an independent-studio operating system: visitors become clients through technical briefs and versioned quotations, then move into protected agreements, delivery, payment verification, and reviews.",
    contribution: "112 authored commits detected on the public repository.",
    repository: "https://github.com/Radian-File/rrs-web",
    stack: ["Next.js 16", "React 19", "PostgreSQL", "Prisma 7", "Auth.js", "Docker", "Playwright"],
    workflow: ["Technical brief", "Versioned quotation", "Protected agreement", "Project workspace", "Delivery approval"],
    evidence: [
      "Server Components are the documented default, with Client Components limited to interactive boundaries.",
      "Authorization and ownership checks are kept close to data access.",
      "Sent quotations are immutable; changes create a new version.",
      "Private files and agreements are separated from public capability links.",
    ],
    openQuestions: ["Exact team size and Ricky's decision ownership", "Production outcome or usage evidence", "Approved product screenshots"],
  },
  {
    slug: "find-my-job",
    name: "RRS JobRadar",
    shortSummary: "A local-first automation tool for discovering and tracking internship and junior engineering opportunities.",
    overview: "The system watches configured Instagram sources, stores raw posts, combines caption and OCR processing, extracts job information, scores matches, detects duplicates, and moves useful opportunities into an application tracker.",
    contribution: "46 authored commits detected on the public repository.",
    repository: "https://github.com/Radian-File/find-my-job",
    stack: ["Next.js", "TypeScript", "Python", "Prisma", "Playwright", "OCR pipeline"],
    workflow: ["Source scan", "Caption and OCR", "AI extraction", "Match scoring", "Application tracking"],
    evidence: [
      "Instagram login uses a local Playwright browser profile; the password is not stored by the application.",
      "Seen-post caching helps avoid repeated submissions.",
      "Low-confidence OCR results are gated for human review.",
      "The main workflow is automation-first while parser internals remain reusable.",
    ],
    openQuestions: ["Exact extraction model and evaluation results", "Time saved compared with manual search", "Approved dashboard screenshots"],
  },
  {
    slug: "project-bowl",
    name: "ProjectBowl",
    shortSummary: "An AI-assisted developer portfolio CMS and project-management dashboard.",
    overview: "The active architecture is a Next.js full-stack application deployed to Vercel, backed by Supabase Auth and Postgres. A prior NestJS API remains in the repository as a legacy reference but is outside the production workspace.",
    contribution: "31 authored commits detected on the public repository.",
    repository: "https://github.com/Radian-File/project-bowl",
    stack: ["Next.js", "TypeScript", "Turborepo", "Supabase", "OpenRouter", "pnpm"],
    workflow: ["Public portfolio", "Authenticated dashboard", "Project data", "AI helpers", "Vercel delivery"],
    evidence: [
      "The repository separates shared configuration, types, and UI primitives into workspace packages.",
      "Internal route handlers replace the need for a separately deployed production backend.",
      "The application has fallback public data when Supabase environment variables are absent.",
      "Cloudinary integration is described as optional future work, not a completed feature.",
    ],
    openQuestions: ["Ricky's ownership across the monorepo", "Why the backend architecture changed", "Approved CMS and portfolio screenshots"],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
