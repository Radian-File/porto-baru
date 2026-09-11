import type { Metadata } from "next";
import { LuMail, LuMessageCircle, LuStore } from "react-icons/lu";
import { ArrowUpRight } from "@/components/icons";
import { InternalPage } from "@/components/internal-page";

export const metadata: Metadata = {
  title: "Contact — Ricky",
  description: "Start a conversation with Ricky about a product, role, or technical problem.",
};

export default function ContactPage() {
  return (
    <InternalPage
      section="Contact"
      title={<>Have a project<br />or role in mind?</>}
      intro="For full-stack roles, product collaborations, or well-scoped digital projects."
      className="contact-page"
    >
      <section className="contact-hub" aria-label="Ways to contact Ricky">
        <div className="contact-hub-intro">
          <p className="contact-kicker">Work with me</p>
          <h2>Reach out directly.</h2>
          <p>
            Email works best for role and collaboration details. WhatsApp is ideal for a
            quick first conversation.
          </p>
        </div>
        <div>
          <div className="contact-hub-links">
            <a href="mailto:radianp02@gmail.com">
              <LuMail aria-hidden="true" />
              <span>
                <strong>Email Ricky</strong>
                <small>radianp02@gmail.com</small>
              </span>
              <ArrowUpRight />
            </a>
            <a href="https://wa.me/6281295248513" target="_blank" rel="noreferrer">
              <LuMessageCircle aria-hidden="true" />
              <span>
                <strong>Chat on WhatsApp</strong>
                <small>Start with a quick conversation</small>
              </span>
              <ArrowUpRight />
            </a>
          </div>
          <aside className="contact-rrs" aria-labelledby="contact-rrs-title">
            <div>
              <LuStore aria-hidden="true" />
              <p className="contact-kicker">Also building</p>
            </div>
            <div>
              <h3 id="contact-rrs-title">RRS Studio.</h3>
              <p>
                An independent digital studio for websites, applications, dashboards, and
                custom workflows—with scope agreed before delivery begins.
              </p>
              <a href="https://rrs-studio.store" target="_blank" rel="noreferrer">
                Visit RRS Studio <ArrowUpRight />
              </a>
            </div>
          </aside>
        </div>
      </section>
    </InternalPage>
  );
}
