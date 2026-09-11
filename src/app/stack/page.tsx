import type { Metadata } from "next";
import { InternalPage } from "@/components/internal-page";

export const metadata: Metadata = {
  title: "Stack — Ricky",
  description: "The technologies Ricky uses across product interfaces, application systems, and delivery.",
};

const stackGroups = [
  { title: "Product interface", items: ["React", "Next.js", "TypeScript", "Responsive UI", "Playwright"] },
  { title: "Application systems", items: ["Node.js", "Python", "REST APIs", "Authentication", "Automation"] },
  { title: "Data and delivery", items: ["PostgreSQL", "Prisma", "Supabase", "Docker", "Vercel"] },
];

export default function StackPage() {
  return (
    <InternalPage
      section="Stack"
      title={<>Tools follow<br />the problem.</>}
      intro="A practical stack for carrying products from a usable interface to dependable application behavior and delivery."
      className="stack-page"
    >
      <div className="stack-groups">
        {stackGroups.map((group) => (
          <section key={group.title}>
            <h2>{group.title}</h2>
            <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
        ))}
      </div>
    </InternalPage>
  );
}
