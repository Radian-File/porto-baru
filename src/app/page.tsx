import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";

export default function Home() {
  return (
    <main className="landing" id="main-content">
      <header className="landing-header">
        <Link className="wordmark" href="/" aria-label="Ricky, home">
          Ricky<span>.</span>
        </Link>
        <nav className="landing-nav" aria-label="Primary navigation">
          <Link href="/about">About</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      <section className="landing-hero" aria-labelledby="hero-title">
        <div className="landing-title">
          <p>Information Systems student</p>
          <h1 id="hero-title">Full-stack<br />developer.</h1>
        </div>

        <div className="landing-intro">
          <p>
            I build complete web products—from interface and application logic to the systems
            that keep them dependable.
          </p>
          <Link className="primary-link" href="/portfolio">
            Explore selected work <ArrowUpRight />
          </Link>
        </div>
      </section>

      <footer className="landing-footer">
        <div><span>Based in</span><strong>Bekasi / Bandung</strong></div>
        <p aria-hidden="true">Move to influence the light</p>
        <div><span>Focus</span><strong>Web · Systems · Product</strong></div>
      </footer>
    </main>
  );
}
