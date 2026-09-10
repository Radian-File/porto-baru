import Link from "next/link";
import { ExperienceShell } from "@/components/experience-shell";
import { KineticR } from "@/components/kinetic-r";
import { ArrowUpRight, GithubMark } from "@/components/icons";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <ExperienceShell>
      <header className="site-header frame">
        <a className="wordmark" href="#top" aria-label="Ricky, back to top">Ricky<span>.</span></a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero frame" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="role-line">Information Systems student</p>
            <h1 id="hero-title">Full-stack<br />developer.</h1>
          </div>
          <div className="hero-visual"><KineticR /></div>
          <div className="hero-intro">
            <p>I build web products from interface to infrastructure—shaping systems that stay clear, dependable, and useful.</p>
            <a className="primary-link" href="#work">View selected work <ArrowUpRight /></a>
          </div>
          <div className="hero-meta"><span>Indonesia</span><span>Bekasi / Bandung</span></div>
          <p className="scroll-note" aria-hidden="true">Scroll to inspect</p>
        </section>

        <section className="work frame" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <h2 id="work-title">Selected work</h2>
            <p>Projects chosen by contribution depth. Case-study outcomes are being documented.</p>
          </div>
          <div className="project-list">
            {projects.map((project, index) => (
              <Link className="project-row" href={`/work/${project.slug}`} key={project.name}>
                <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="project-main">
                  <strong>{project.name}</strong>
                  <span>{project.shortSummary}</span>
                </span>
                <span className="project-tech">{project.stack.slice(0, 4).join(" · ")}</span>
                <span className="project-contribution">{project.contribution.replace(" detected on the public repository.", "")}</span>
                <ArrowUpRight />
              </Link>
            ))}
          </div>
        </section>

        <section className="about frame" id="about" aria-labelledby="about-title">
          <div className="section-heading"><h2 id="about-title">About</h2></div>
          <p className="about-lead">I’m Ricky, a full-stack developer and Information Systems student at Telkom University. My work spans web, mobile, and AI-powered applications.</p>
          <p className="about-note">I care about the boundary between a well-structured system and an interface people can understand without explanation.</p>
        </section>

        <section className="contact frame" id="contact" aria-labelledby="contact-title">
          <p>Have a product, role, or technical problem worth discussing?</p>
          <h2 id="contact-title">Let’s build something<br />that holds up.</h2>
          <a className="contact-link" href="https://github.com/Radian-File" target="_blank" rel="noreferrer">
            <GithubMark /> Continue on GitHub <ArrowUpRight />
          </a>
          <p className="contact-note">Public email and professional links will be added after verification.</p>
        </section>
      </main>

      <footer className="site-footer frame">
        <span>Ricky / radiansyahp</span><span>Full-stack developer</span><span>© {new Date().getFullYear()}</span>
      </footer>
    </ExperienceShell>
  );
}
