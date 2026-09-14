import { ArrowUpRight } from "@/components/icons";
import { Copy, LanguageToggle } from "@/components/language";
import { TransitionLink } from "@/components/transition-link";

export default function Home() {
  return (
    <main className="landing" id="main-content">
      <header className="landing-header">
        <TransitionLink className="wordmark" href="/" aria-label="Ricky, home">
          Ricky<span>.</span>
        </TransitionLink>
        <nav className="landing-nav" aria-label="Primary navigation">
          <TransitionLink href="/about"><Copy en="About" id="Tentang" /></TransitionLink>
          <TransitionLink href="/portfolio">Portfolio</TransitionLink>
          <TransitionLink href="/contact"><Copy en="Contact" id="Kontak" /></TransitionLink>
          <LanguageToggle />
        </nav>
      </header>

      <section className="landing-hero" aria-labelledby="hero-title">
        <div className="landing-title">
          <p><Copy en="Information Systems student · Telkom University" id="Mahasiswa Information Systems · Telkom University" /></p>
          <h1 id="hero-title">Full-stack<br />developer.</h1>
        </div>

        <div className="landing-intro">
          <p><Copy
            en="I build complete web products—from interface and application logic to the systems that keep them dependable."
            id="Saya bikin web product dari ujung ke ujung—mulai dari interface dan logic sampai sistem yang bikin semuanya tetap reliable."
          /></p>
          <TransitionLink className="primary-link" href="/portfolio">
            <Copy en="Explore selected work" id="Lihat project pilihan" /> <ArrowUpRight />
          </TransitionLink>
          <p className="landing-availability">
            <Copy en="Open to internships & collaborations." id="Open untuk internship & kolaborasi." />
          </p>
        </div>
      </section>

      <div className="landing-system-trace" aria-hidden="true">
        <span className="trace-label trace-label-start"><Copy en="Interface & product thinking" id="Interface & product thinking" /></span>
        <span className="trace-line"><i /></span>
        <span className="trace-label trace-label-end"><Copy en="Logic & reliable systems" id="Logic & sistem yang reliable" /></span>
      </div>

      <footer className="landing-footer">
        <div><span><Copy en="Based in" id="Berbasis di" /></span><strong>Bekasi / Bandung</strong></div>
        <div><span><Copy en="Interaction" id="Interaksi" /></span><strong><Copy en="Move cursor to shift the light" id="Gerakkan cursor untuk menggeser cahaya" /></strong></div>
      </footer>
    </main>
  );
}
