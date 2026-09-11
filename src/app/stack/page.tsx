import type { Metadata } from "next";
import type { IconType } from "react-icons";
import {
  SiDocker,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiSupabase,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { LuBraces, LuShieldCheck, LuTestTubeDiagonal, LuWorkflow } from "react-icons/lu";
import { InternalPage } from "@/components/internal-page";

export const metadata: Metadata = {
  title: "Stack — Ricky",
  description: "The technologies Ricky uses across product interfaces, application systems, and delivery.",
};

type StackTool = {
  name: string;
  description: string;
  icon: IconType;
  level: 1 | 2 | 3;
};

const levelLabels = {
  1: "Familiar",
  2: "Working",
  3: "Confident",
} as const;

const stackGroups: { title: string; note: string; items: StackTool[] }[] = [
  {
    title: "Core tools",
    note: "The tools I reach for when building an application from the ground up.",
    items: [
      { name: "TypeScript", description: "Typed interfaces, application logic, and APIs.", icon: SiTypescript, level: 3 },
      { name: "React", description: "Component systems and responsive product interfaces.", icon: SiReact, level: 3 },
      { name: "Next.js", description: "Production web applications across the full stack.", icon: SiNextdotjs, level: 3 },
      { name: "Node.js", description: "Backend services and reliable application behavior.", icon: SiNodedotjs, level: 2 },
      { name: "PostgreSQL", description: "Structured data models and application queries.", icon: SiPostgresql, level: 2 },
    ],
  },
  {
    title: "Product systems",
    note: "The supporting layers that make a product dependable after the interface is built.",
    items: [
      { name: "Prisma", description: "Type-safe database access and schema management.", icon: SiPrisma, level: 2 },
      { name: "Supabase", description: "Backend services, data, and practical product delivery.", icon: SiSupabase, level: 2 },
      { name: "REST APIs", description: "Clear boundaries between clients, services, and data.", icon: LuBraces, level: 3 },
      { name: "Authentication", description: "Protected access and thoughtful account flows.", icon: LuShieldCheck, level: 2 },
      { name: "Docker", description: "Repeatable environments for development and delivery.", icon: SiDocker, level: 2 },
      { name: "Vercel", description: "Straightforward deployment for production web applications.", icon: SiVercel, level: 2 },
    ],
  },
  {
    title: "Growing practice",
    note: "Tools I am actively using to strengthen quality, testing, and automation.",
    items: [
      { name: "Playwright", description: "End-to-end checks for the journeys users actually take.", icon: LuTestTubeDiagonal, level: 1 },
      { name: "Python", description: "Scripting, small utilities, and data-oriented tasks.", icon: SiPython, level: 2 },
      { name: "Automation", description: "Removing repeatable work from product workflows.", icon: LuWorkflow, level: 2 },
    ],
  },
];

function StackLevel({ level }: { level: StackTool["level"] }) {
  const label = levelLabels[level];

  return (
    <div className="stack-level" aria-label={`Level ${level}: ${label}`}>
      <span className="stack-level-meter" aria-hidden="true">
        {[1, 2, 3].map((step) => <i key={step} data-active={step <= level} />)}
      </span>
      <span>{label}</span>
    </div>
  );
}

export default function StackPage() {
  return (
    <InternalPage
      section="Stack"
      title={<>The tools behind<br />the work.</>}
      intro="A practical stack built through real products: from the interface people use to the systems that keep it dependable."
      className="stack-page"
    >
      <div className="stack-intro">
        <p>Depth is shown as a working signal, not a rating.</p>
        <div aria-label="Skill level key" className="stack-level-key">
          <StackLevel level={1} />
          <StackLevel level={2} />
          <StackLevel level={3} />
        </div>
      </div>
      <div className="stack-groups">
        {stackGroups.map((group) => (
          <section key={group.title}>
            <div className="stack-group-heading">
              <h2>{group.title}</h2>
              <p>{group.note}</p>
            </div>
            <ul className="stack-tool-list">
              {group.items.map(({ name, description, icon: Icon, level }) => (
                <li key={name}>
                  <Icon aria-hidden="true" className="stack-tool-icon" />
                  <div className="stack-tool-copy">
                    <h3>{name}</h3>
                    <p>{description}</p>
                  </div>
                  <StackLevel level={level} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </InternalPage>
  );
}
