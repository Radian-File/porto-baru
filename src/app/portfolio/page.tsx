import type { Metadata } from "next";
import { ArrowUpRight } from "@/components/icons";
import { InternalPage } from "@/components/internal-page";
import { Copy } from "@/components/language";
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
      title={<Copy en={<>Selected work,<br />made tangible.</>} id={<>Project pilihan,<br />dibuat jadi nyata.</>} />}
      intro={<Copy en="A focused selection of products I helped shape from interface decisions through to the systems behind them." id="Pilihan product yang saya bantu bentuk, dari keputusan interface sampai sistem di baliknya." />}
      className="portfolio-page"
    >
      <section className="featured-dossier" aria-labelledby="featured-project-title">
        <div className="featured-dossier-meta">
          <p><Copy en="Featured system" id="Sistem pilihan" /></p>
          <span>01</span>
        </div>

        <TransitionLink className="featured-dossier-link" href={`/work/${featuredProject.slug}`}>
          <div className="featured-dossier-copy">
            <h2 id="featured-project-title">{featuredProject.name}</h2>
            <p><Copy en={featuredProject.shortSummary.en} id={featuredProject.shortSummary.id} /></p>
            <span className="featured-proof"><Copy en={featuredProject.contribution.en} id={featuredProject.contribution.id} /></span>
          </div>

          <div className="featured-flow" aria-label={`${featuredProject.name} system flow`}>
            <span className="featured-flow-label"><Copy en="System flow" id="Alur sistem" /></span>
            <ol>
              {featuredProject.workflow.map((step, index) => (
                <li key={step.en}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong><Copy en={step.en} id={step.id} /></strong>
                </li>
              ))}
            </ol>
            <span className="featured-explore"><Copy en="Explore case study" id="Lihat case study" /> <ArrowUpRight /></span>
          </div>
        </TransitionLink>
      </section>

      <section className="project-index" aria-labelledby="more-projects-title">
        <div className="project-index-heading">
          <p><Copy en="More systems" id="Sistem lainnya" /></p>
          <h2 id="more-projects-title"><Copy en="Other selected work" id="Project pilihan lainnya" /></h2>
        </div>
        <div className="project-index-list">
          {otherProjects.map((project, index) => (
            <TransitionLink className="project-index-item" href={`/work/${project.slug}`} key={project.slug}>
              <span className="project-number">{String(index + 2).padStart(2, "0")}</span>
              <span className="project-index-copy">
                <strong>{project.name}</strong>
                <span><Copy en={project.shortSummary.en} id={project.shortSummary.id} /></span>
              </span>
              <span className="project-index-stack"><Copy en={project.workflow.slice(0, 3).map((step) => step.en).join(" → ")} id={project.workflow.slice(0, 3).map((step) => step.id).join(" → ")} /></span>
              <span className="project-index-evidence"><Copy en={project.contribution.en} id={project.contribution.id} /></span>
              <ArrowUpRight />
            </TransitionLink>
          ))}
        </div>
      </section>
    </InternalPage>
  );
}
