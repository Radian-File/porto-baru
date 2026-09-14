import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, GithubMark } from "@/components/icons";
import { Copy } from "@/components/language";
import { TransitionLink } from "@/components/transition-link";
import { getProject, projects } from "@/data/projects";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: `${project.name} — Ricky`, description: project.shortSummary.en } : { title: "Project not found — Ricky" };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
      <main className="case-main" id="main-content">
        <header className="case-header">
          <TransitionLink className="back-link" href="/portfolio"><Copy en="Back to portfolio" id="Kembali ke portfolio" /></TransitionLink>
          <span>{String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
        </header>
        <section className="case-hero frame" aria-labelledby="project-title">
          <p className="case-context"><Copy en="Repository study" id="Studi repository" /> · <Copy en={project.contribution.en} id={project.contribution.id} /></p>
          <h1 id="project-title">{project.name}</h1>
          <p className="case-summary"><Copy en={project.shortSummary.en} id={project.shortSummary.id} /></p>
          <div className="system-map" aria-hidden="true">
            {project.workflow.map((step, stepIndex) => (
              <span key={step.en} style={{ "--step": stepIndex } as React.CSSProperties}><Copy en={step.en} id={step.id} /></span>
            ))}
          </div>
        </section>

        <section className="case-section frame" aria-labelledby="overview-title">
          <h2 id="overview-title"><Copy en="What the repository shows" id="Yang ditunjukkan repository ini" /></h2>
          <div className="case-body">
            <p className="case-lead"><Copy en={project.overview.en} id={project.overview.id} /></p>
            <div className="stack-list" aria-label="Technology stack">
              {project.stack.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        </section>

        <section className="case-section frame" aria-labelledby="decisions-title">
          <h2 id="decisions-title"><Copy en="Documented decisions" id="Keputusan yang terdokumentasi" /></h2>
          <ol className="evidence-list">
            {project.evidence.map((item) => <li key={item.en}><Copy en={item.en} id={item.id} /></li>)}
          </ol>
        </section>

        <section className="case-section case-gap frame" aria-labelledby="gaps-title">
          <h2 id="gaps-title"><Copy en="Before this becomes a final case study" id="Sebelum ini jadi case study final" /></h2>
          <div className="case-body">
            <p><Copy en="These details are deliberately left open. Verified evidence is more valuable than turning repository structure into an invented success story." id="Detail ini sengaja dibiarkan terbuka. Bukti yang terverifikasi jauh lebih berharga daripada menjadikan struktur repository sebagai cerita sukses yang dibuat-buat." /></p>
            <ul>{project.openQuestions.map((item) => <li key={item.en}><Copy en={item.en} id={item.id} /></li>)}</ul>
            <a className="source-link" href={project.repository} target="_blank" rel="noreferrer">
              <GithubMark /> <Copy en="Inspect source repository" id="Lihat source repository" /> <ArrowUpRight />
            </a>
          </div>
        </section>

        <nav className="next-project frame" aria-label="Project navigation">
          <span><Copy en="Next project" id="Project berikutnya" /></span>
          <TransitionLink href={`/work/${next.slug}`}>{next.name} <ArrowUpRight /></TransitionLink>
        </nav>
      </main>
  );
}
