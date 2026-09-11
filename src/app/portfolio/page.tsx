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
  return (
    <InternalPage
      section="Portfolio"
      title={<>Selected systems,<br />examined closely.</>}
      intro="Three projects selected for the depth of Ricky’s contribution and the decisions visible in their repositories."
      className="portfolio-page"
    >
      <div className="project-index-list">
        {projects.map((project, index) => (
          <TransitionLink className="project-index-item" href={`/work/${project.slug}`} key={project.slug}>
            <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
            <span className="project-index-copy">
              <strong>{project.name}</strong>
              <span>{project.shortSummary}</span>
            </span>
            <span className="project-index-stack">{project.stack.slice(0, 3).join(" · ")}</span>
            <ArrowUpRight />
          </TransitionLink>
        ))}
      </div>
    </InternalPage>
  );
}
