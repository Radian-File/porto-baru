import type { Metadata } from "next";
import { ContributionHeatmap } from "@/components/contribution-heatmap";
import { InternalPage } from "@/components/internal-page";
import { getContributionCalendar } from "@/data/github";

export const metadata: Metadata = {
  title: "About — Ricky",
  description: "About Ricky, a full-stack developer and Information Systems student in Indonesia.",
};

export default async function AboutPage() {
  const contributionCalendar = await getContributionCalendar("Radian-File");

  return (
    <InternalPage
      section="About"
      title={<>Hi, I’m Ricky.</>}
      intro="I’m a full-stack developer and Information Systems student at Telkom University, working between Bekasi and Bandung."
      className="about-page"
    >
      <section className="about-statement" aria-labelledby="about-approach-title">
        <h2 id="about-approach-title">Building from the whole picture.</h2>
        <div>
          <p>
            I build web experiences from end to end: shaping interfaces people enjoy using,
            then turning them into reliable, maintainable systems.
          </p>
          <p>
            I’m drawn to work where thoughtful design and solid engineering meet — products
            that feel clear, intentional, and useful.
          </p>
        </div>
      </section>

      <section className="about-principles" aria-labelledby="about-contribution-title">
        <h2 id="about-contribution-title">What I bring</h2>
        <div className="about-principle-list">
          <article>
            <h3>Build end to end</h3>
            <p>From early interface decisions to frontend, backend, and deployment.</p>
          </article>
          <article>
            <h3>Think in systems</h3>
            <p>I turn complex requirements into flows that are easier to use and maintain.</p>
          </article>
          <article>
            <h3>Care about the experience</h3>
            <p>I use motion and interaction to guide attention, not simply to decorate a page.</p>
          </article>
        </div>
      </section>

      <section className="about-now" aria-labelledby="about-now-title">
        <p className="about-kicker">Current chapter</p>
        <div>
          <h2 id="about-now-title">Learning by building.</h2>
          <p>
            While studying Information Systems, I’m building through real projects and
            collaborative repositories. I enjoy taking ownership of the details and improving
            a product one iteration at a time.
          </p>
        </div>
      </section>

      {contributionCalendar && (
        <ContributionHeatmap
          calendar={contributionCalendar}
          profileUrl="https://github.com/Radian-File"
        />
      )}

    </InternalPage>
  );
}
