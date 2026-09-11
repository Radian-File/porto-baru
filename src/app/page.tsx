import { ArrowUpRight } from "@/components/icons";
import { TransitionLink } from "@/components/transition-link";

export default function Home() {
  return (
    <main className="landing" id="main-content">
      <header className="landing-header">
        <TransitionLink className="wordmark" href="/" aria-label="Ricky, home">
          Ricky<span>.</span>
        </TransitionLink>
        <nav className="landing-nav" aria-label="Primary navigation">
          <TransitionLink href="/about">About</TransitionLink>
          <TransitionLink href="/portfolio">Portfolio</TransitionLink>
          <TransitionLink href="/contact">Contact</TransitionLink>
        </nav>
      </header>

      <section className="landing-hero" aria-labelledby="hero-title">
        <div className="landing-title">
          <p>Information Systems student · Telkom University</p>
          <h1 id="hero-title">Full-stack<br />developer.</h1>
        </div>

        <div className="landing-intro">
          <p>
            I build complete web products—from interface and application logic to the systems
            that keep them dependable.
          </p>
          <TransitionLink className="primary-link" href="/portfolio">
            Explore selected work <ArrowUpRight />
          </TransitionLink>
        </div>
      </section>

      <footer className="landing-footer">
        <div><span>Based in</span><strong>Bekasi / Bandung</strong></div>
        <div><span>Status</span><strong>Open to internships &amp; collaborations</strong></div>
        <div><span>Interaction</span><strong>Move cursor to shift the light</strong></div>
      </footer>
    </main>
  );
}
