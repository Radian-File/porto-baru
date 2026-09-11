import type { Metadata } from "next";
import { ArrowUpRight } from "@/components/icons";
import { InternalPage } from "@/components/internal-page";
import { TransitionLink } from "@/components/transition-link";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Portfolio — Ricky",
  description: "Selected full-stack projects by Ricky.",
};

export default function PortfolioPage() {
  const [featuredProject, ...otherProjects] = projects;

  return (
    <InternalPage
      section="Portfolio"
      title={<>Selected work,<br />made tangible.</>}
      intro="A focused selection of products I helped shape from interface decisions through to the systems behind them."
      className="portfolio-page"
    >
      <section className="featured-dossier" aria-labelledby="featured-project-title">
        <div className="featured-dossier-meta">
          <p>Featured system</p>
          <span>01</span>
        </div>

        <TransitionLink className="featured-dossier-link" href={`/work/${featuredProject.slug}`}>
          <div className="featured-dossier-copy">
            <h2 id="featured-project-title">{featuredProject.name}</h2>
            <p>{featuredProject.shortSummary}</p>
            <span className="featured-proof">{featuredProject.contribution}</span>
          </div>

          <div className="featured-flow" aria-label={`${featuredProject.name} system flow`}>
            <span className="featured-flow-label">System flow</span>
            <ol>
              {featuredProject.workflow.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                </li>
              ))}
            </ol>
            <span className="featured-explore">Explore case study <ArrowUpRight /></span>
          </div>
        </TransitionLink>
      </section>

      <section className="project-index" aria-labelledby="more-projects-title">
        <div className="project-index-heading">
          <p>More systems</p>
          <h2 id="more-projects-title">Other selected work</h2>
        </div>
        <div className="project-index-list">
          {otherProjects.map((project, index) => (
            <TransitionLink className="project-index-item" href={`/work/${project.slug}`} key={project.slug}>
              <span className="project-number">{String(index + 2).padStart(2, "0")}</span>
              <span className="project-index-copy">
                <strong>{project.name}</strong>
                <span>{project.shortSummary}</span>
              </span>
              <span className="project-index-stack">{project.workflow.slice(0, 3).join(" → ")}</span>
              <span className="project-index-evidence">{project.contribution}</span>
              <ArrowUpRight />
            </TransitionLink>
          ))}
        </div>
      </section>
    </InternalPage>
  );
}
