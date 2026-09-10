import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, GithubMark } from "@/components/icons";
import { getProject, projects } from "@/data/projects";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? { title: `${project.name} — Ricky`, description: project.shortSummary } : { title: "Project not found — Ricky" };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <header className="case-header frame">
        <Link className="wordmark" href="/" aria-label="Ricky, return home">Ricky<span>.</span></Link>
        <Link className="back-link" href="/#work">Back to selected work</Link>
      </header>

      <main className="case-main">
        <section className="case-hero frame" aria-labelledby="project-title">
          <p className="case-context">Repository study · {project.contribution}</p>
          <h1 id="project-title">{project.name}</h1>
          <p className="case-summary">{project.shortSummary}</p>
          <div className="system-map" aria-hidden="true">
            {project.workflow.map((step, stepIndex) => (
              <span key={step} style={{ "--step": stepIndex } as React.CSSProperties}>{step}</span>
            ))}
          </div>
        </section>

        <section className="case-section frame" aria-labelledby="overview-title">
          <h2 id="overview-title">What the repository shows</h2>
          <div className="case-body">
            <p className="case-lead">{project.overview}</p>
            <div className="stack-list" aria-label="Technology stack">
              {project.stack.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        </section>

        <section className="case-section frame" aria-labelledby="decisions-title">
          <h2 id="decisions-title">Documented decisions</h2>
          <ol className="evidence-list">
            {project.evidence.map((item) => <li key={item}>{item}</li>)}
          </ol>
        </section>

        <section className="case-section case-gap frame" aria-labelledby="gaps-title">
          <h2 id="gaps-title">Before this becomes a final case study</h2>
          <div className="case-body">
            <p>These details are deliberately left open. Verified evidence is more valuable than turning repository structure into an invented success story.</p>
            <ul>{project.openQuestions.map((item) => <li key={item}>{item}</li>)}</ul>
            <a className="source-link" href={project.repository} target="_blank" rel="noreferrer">
              <GithubMark /> Inspect source repository <ArrowUpRight />
            </a>
          </div>
        </section>

        <nav className="next-project frame" aria-label="Project navigation">
          <span>Next project</span>
          <Link href={`/work/${next.slug}`}>{next.name} <ArrowUpRight /></Link>
        </nav>
      </main>
    </>
  );
}
