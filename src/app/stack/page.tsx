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
import { Copy } from "@/components/language";

export const metadata: Metadata = {
  title: "Stack — Ricky",
  description: "The technologies Ricky uses across product interfaces, application systems, and delivery.",
};

type StackTool = {
  name: string;
  description: { en: string; id: string };
  icon: IconType;
  level: 1 | 2 | 3;
};

const levelLabels = {
  1: "Familiar",
  2: "Working",
  3: "Confident",
} as const;

const stackGroups: { title: { en: string; id: string }; note: { en: string; id: string }; items: StackTool[] }[] = [
  {
    title: { en: "Core tools", id: "Core tools" },
    note: { en: "The tools I reach for when building an application from the ground up.", id: "Tools yang paling sering saya pakai saat membangun aplikasi dari nol." },
    items: [
      { name: "TypeScript", description: { en: "Typed interfaces, application logic, and APIs.", id: "Interface, application logic, dan API yang lebih aman berkat types." }, icon: SiTypescript, level: 3 },
      { name: "React", description: { en: "Component systems and responsive product interfaces.", id: "Component system dan product interface yang responsive." }, icon: SiReact, level: 3 },
      { name: "Next.js", description: { en: "Production web applications across the full stack.", id: "Aplikasi web production untuk kebutuhan full-stack." }, icon: SiNextdotjs, level: 3 },
      { name: "Node.js", description: { en: "Backend services and reliable application behavior.", id: "Backend service dan behavior aplikasi yang reliable." }, icon: SiNodedotjs, level: 2 },
      { name: "PostgreSQL", description: { en: "Structured data models and application queries.", id: "Data model terstruktur dan query aplikasi." }, icon: SiPostgresql, level: 2 },
    ],
  },
  {
    title: { en: "Product systems", id: "Product systems" },
    note: { en: "The supporting layers that make a product dependable after the interface is built.", id: "Layer pendukung yang bikin product tetap dependable setelah interfacenya jadi." },
    items: [
      { name: "Prisma", description: { en: "Type-safe database access and schema management.", id: "Akses database yang type-safe dan schema management." }, icon: SiPrisma, level: 2 },
      { name: "Supabase", description: { en: "Backend services, data, and practical product delivery.", id: "Backend service, data, dan delivery product yang practical." }, icon: SiSupabase, level: 2 },
      { name: "REST APIs", description: { en: "Clear boundaries between clients, services, and data.", id: "Batas yang jelas antara client, service, dan data." }, icon: LuBraces, level: 3 },
      { name: "Authentication", description: { en: "Protected access and thoughtful account flows.", id: "Akses yang terlindungi dan account flow yang dipikirkan dengan baik." }, icon: LuShieldCheck, level: 2 },
      { name: "Docker", description: { en: "Repeatable environments for development and delivery.", id: "Environment yang repeatable untuk development dan delivery." }, icon: SiDocker, level: 2 },
      { name: "Vercel", description: { en: "Straightforward deployment for production web applications.", id: "Deployment aplikasi web production yang straightforward." }, icon: SiVercel, level: 2 },
    ],
  },
  {
    title: { en: "Growing practice", id: "Sedang saya dalami" },
    note: { en: "Tools I am actively using to strengthen quality, testing, and automation.", id: "Tools yang sedang saya pakai untuk memperkuat quality, testing, dan automation." },
    items: [
      { name: "Playwright", description: { en: "End-to-end checks for the journeys users actually take.", id: "End-to-end check untuk journey yang benar-benar dilalui user." }, icon: LuTestTubeDiagonal, level: 1 },
      { name: "Python", description: { en: "Scripting, small utilities, and data-oriented tasks.", id: "Scripting, utility kecil, dan task yang berhubungan dengan data." }, icon: SiPython, level: 2 },
      { name: "Automation", description: { en: "Removing repeatable work from product workflows.", id: "Mengurangi pekerjaan berulang dari product workflow." }, icon: LuWorkflow, level: 2 },
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
      <span><Copy en={label} id={level === 1 ? "Kenal" : level === 2 ? "Aktif pakai" : "Mahir"} /></span>
    </div>
  );
}

export default function StackPage() {
  return (
    <InternalPage
      section="Stack"
      title={<Copy en={<>The tools behind<br />the work.</>} id={<>Tools di balik<br />setiap product.</>} />}
      intro={<Copy en="A practical stack built through real products: from the interface people use to the systems that keep it dependable." id="Stack yang dibangun lewat product nyata: dari interface yang dipakai user sampai sistem yang bikin semuanya dependable." />}
      className="stack-page"
    >
      <div className="stack-intro">
        <p><Copy en="Depth is shown as a working signal, not a rating." id="Level ini menunjukkan kedalaman pengalaman, bukan sekadar rating." /></p>
        <div aria-label="Skill level key" className="stack-level-key">
          <StackLevel level={1} />
          <StackLevel level={2} />
          <StackLevel level={3} />
        </div>
      </div>
      <div className="stack-groups">
        {stackGroups.map((group) => (
          <section key={group.title.en}>
            <div className="stack-group-heading">
              <h2><Copy en={group.title.en} id={group.title.id} /></h2>
              <p><Copy en={group.note.en} id={group.note.id} /></p>
            </div>
            <ul className="stack-tool-list">
              {group.items.map(({ name, description, icon: Icon, level }) => (
                <li key={name}>
                  <Icon aria-hidden="true" className="stack-tool-icon" />
                  <div className="stack-tool-copy">
                    <h3>{name}</h3>
                    <p><Copy en={description.en} id={description.id} /></p>
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
