import type { Metadata } from "next";
import { InternalPage } from "@/components/internal-page";

export const metadata: Metadata = {
  title: "About — Ricky",
  description: "About Ricky, a full-stack developer and Information Systems student in Indonesia.",
};

export default function AboutPage() {
  return (
    <InternalPage
      section="About"
      title={<>Engineering with<br />the whole system in view.</>}
      intro="I’m Ricky, a full-stack developer and Information Systems student at Telkom University, based between Bekasi and Bandung."
      className="about-page"
    >
      <div className="about-statement">
        <p>
          My work sits where product decisions, interface clarity, and reliable application
          architecture meet. I enjoy tracing a problem through every layer instead of treating
          the visible screen as the whole product.
        </p>
      </div>
      <dl className="fact-list">
        <div><dt>Perspective</dt><dd>Interface to infrastructure</dd></div>
        <div><dt>Based in</dt><dd>Bekasi / Bandung, Indonesia</dd></div>
        <div><dt>Currently</dt><dd>Information Systems student</dd></div>
      </dl>
    </InternalPage>
  );
}
