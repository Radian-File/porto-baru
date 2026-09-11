import type { Metadata } from "next";
import { ArrowUpRight, GithubMark } from "@/components/icons";
import { InternalPage } from "@/components/internal-page";

export const metadata: Metadata = {
  title: "Contact — Ricky",
  description: "Start a conversation with Ricky about a product, role, or technical problem.",
};

export default function ContactPage() {
  return (
    <InternalPage
      section="Contact"
      title={<>Bring the problem.<br />We’ll trace the system.</>}
      intro="For full-stack roles, product collaboration, or a technical problem worth discussing."
      className="contact-page"
    >
      <div className="contact-actions">
        <a href="https://github.com/Radian-File" target="_blank" rel="noreferrer">
          <GithubMark /> Continue on GitHub <ArrowUpRight />
        </a>
        <p>Public email and professional links will be added after verification.</p>
      </div>
    </InternalPage>
  );
}
