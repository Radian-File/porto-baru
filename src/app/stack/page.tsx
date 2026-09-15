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
import {
  LuBotMessageSquare,
  LuBrainCircuit,
  LuBraces,
  LuMessagesSquare,
  LuScanText,
  LuShieldCheck,
  LuTestTubeDiagonal,
  LuWorkflow,
} from "react-icons/lu";
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

type StackGroup = {
  stage: string;
  label: { en: string; id: string };
  title: { en: string; id: string };
  note: { en: string; id: string };
  intelligence?: boolean;
  items: StackTool[];
};

const levelLabels = {
  1: "Exploring",
  2: "Working with",
  3: "Confident",
} as const;

const stackGroups: StackGroup[] = [
  {
    stage: "01",
    label: { en: "Interface", id: "Interface" },
    title: { en: "Shape the experience", id: "Membentuk experience" },
    note: { en: "Where product decisions become responsive, useful screens.", id: "Tempat keputusan product berubah jadi layar yang responsive dan berguna." },
    items: [
      { name: "TypeScript", description: { en: "Typed interfaces, application logic, and APIs.", id: "Interface, application logic, dan API yang lebih aman berkat types." }, icon: SiTypescript, level: 3 },
      { name: "React", description: { en: "Component systems and responsive product interfaces.", id: "Component system dan product interface yang responsive." }, icon: SiReact, level: 3 },
      { name: "Next.js", description: { en: "Production web applications across the full stack.", id: "Aplikasi web production untuk kebutuhan full-stack." }, icon: SiNextdotjs, level: 3 },
    ],
  },
  {
    stage: "02",
    label: { en: "Application", id: "Application" },
    title: { en: "Build the system", id: "Membangun system" },
    note: { en: "The services and boundaries that let an interface do real work.", id: "Service dan boundary yang bikin interface bisa melakukan pekerjaan nyata." },
    items: [
      { name: "Node.js", description: { en: "Backend services and reliable application behavior.", id: "Backend service dan behavior aplikasi yang reliable." }, icon: SiNodedotjs, level: 2 },
      { name: "REST APIs", description: { en: "Clear boundaries between clients, services, and data.", id: "Batas yang jelas antara client, service, dan data." }, icon: LuBraces, level: 3 },
      { name: "Authentication", description: { en: "Protected access and thoughtful account flows.", id: "Akses yang terlindungi dan account flow yang dipikirkan dengan baik." }, icon: LuShieldCheck, level: 2 },
    ],
  },
  {
    stage: "03",
    label: { en: "Data", id: "Data" },
    title: { en: "Structure the data", id: "Menyusun data" },
    note: { en: "The models and services that keep a product's information useful and connected.", id: "Model dan service yang menjaga informasi product tetap berguna dan saling terhubung." },
    items: [
      { name: "PostgreSQL", description: { en: "Structured data models and application queries.", id: "Data model terstruktur dan query aplikasi." }, icon: SiPostgresql, level: 2 },
      { name: "Prisma", description: { en: "Type-safe database access and schema management.", id: "Akses database yang type-safe dan schema management." }, icon: SiPrisma, level: 2 },
      { name: "Supabase", description: { en: "Backend services, data, and practical product delivery.", id: "Backend service, data, dan delivery product yang practical." }, icon: SiSupabase, level: 2 },
    ],
  },
  {
    stage: "04",
    label: { en: "AI & Agentic Systems", id: "AI & Agentic Systems" },
    title: { en: "Orchestrate intelligence", id: "Membangun intelligent workflows" },
    note: { en: "AI-assisted workflows that turn unstructured input into useful, reviewable actions.", id: "Workflow berbasis AI yang mengubah input tidak terstruktur jadi action yang berguna dan tetap bisa direview." },
    intelligence: true,
    items: [
      { name: "LLM integration", description: { en: "Model APIs such as OpenRouter for product helpers and structured tasks.", id: "Model API seperti OpenRouter untuk product helper dan task yang terstruktur." }, icon: LuMessagesSquare, level: 2 },
      { name: "Agentic workflows", description: { en: "Multi-step flows that turn an input into useful, reviewable actions.", id: "Flow multi-step yang mengubah input jadi action yang berguna dan bisa direview." }, icon: LuBotMessageSquare, level: 2 },
      { name: "Extraction & OCR", description: { en: "Captions, OCR, and AI extraction combined into structured data.", id: "Caption, OCR, dan AI extraction yang dirangkai menjadi data terstruktur." }, icon: LuScanText, level: 2 },
      { name: "Human-in-the-loop", description: { en: "Low-confidence output is held for review before it moves forward.", id: "Output dengan confidence rendah ditahan untuk direview sebelum diteruskan." }, icon: LuBrainCircuit, level: 2 },
    ],
  },
  {
    stage: "05",
    label: { en: "Delivery & Quality", id: "Delivery & Quality" },
    title: { en: "Ship with confidence", id: "Merilis dengan percaya diri" },
    note: { en: "The habits and tools that make delivery repeatable and products easier to trust.", id: "Kebiasaan dan tools yang bikin delivery lebih repeatable dan product lebih mudah dipercaya." },
    items: [
      { name: "Docker", description: { en: "Repeatable environments for development and delivery.", id: "Environment yang repeatable untuk development dan delivery." }, icon: SiDocker, level: 2 },
      { name: "Vercel", description: { en: "Straightforward deployment for production web applications.", id: "Deployment aplikasi web production yang straightforward." }, icon: SiVercel, level: 2 },
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
      title={<Copy en={<>The layers behind<br />the work.</>} id={<>Layer di balik<br />setiap product.</>} />}
      intro={<Copy en="A practical build path: from the interface people use to the intelligence and systems that keep it dependable." id="Alur build yang practical: dari interface yang dipakai user sampai intelligence dan sistem yang bikin semuanya dependable." />}
      className="stack-page"
    >
      <div className="stack-intro">
        <p><Copy en="The map follows how I build. Levels show practical exposure, not a score." id="Peta ini mengikuti cara saya membangun. Level menunjukkan pengalaman di praktik, bukan sekadar skor." /></p>
        <div aria-label="Skill level key" className="stack-level-key">
          <StackLevel level={1} />
          <StackLevel level={2} />
          <StackLevel level={3} />
        </div>
      </div>
      <div className="stack-groups">
        {stackGroups.map((group) => (
          <section key={group.stage} data-intelligence={group.intelligence || undefined}>
            <div className="stack-group-heading">
              <span aria-hidden="true" className="stack-group-stage">{group.stage}</span>
              <p className="stack-group-label"><Copy en={group.label.en} id={group.label.id} /></p>
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
