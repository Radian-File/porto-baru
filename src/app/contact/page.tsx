import type { Metadata } from "next";
import { LuMail, LuMessageCircle, LuStore } from "react-icons/lu";
import { ArrowUpRight } from "@/components/icons";
import { InternalPage } from "@/components/internal-page";
import { Copy } from "@/components/language";

export const metadata: Metadata = {
  title: "Contact — Ricky",
  description: "Start a conversation with Ricky about a product, role, or technical problem.",
};

export default function ContactPage() {
  return (
    <InternalPage
      section={<Copy en="Contact" id="Kontak" />}
      title={<Copy en={<>Have a project<br />or role in mind?</>} id={<>Ada project<br />atau role yang lagi dicari?</>} />}
      intro={<Copy en="For full-stack roles, product collaborations, or well-scoped digital projects." id="Untuk role full-stack, kolaborasi product, atau digital project dengan scope yang jelas." />}
      className="contact-page"
    >
      <section className="contact-hub" aria-label="Ways to contact Ricky">
        <div className="contact-hub-intro">
          <p className="contact-kicker"><Copy en="Work with me" id="Kerja bareng saya" /></p>
          <h2><Copy en="Reach out directly." id="Langsung hubungi saja." /></h2>
          <p>
            <Copy en="Email works best for role and collaboration details. WhatsApp is ideal for a quick first conversation." id="Email paling pas untuk detail role dan kolaborasi. WhatsApp lebih enak buat ngobrol singkat dulu." />
          </p>
        </div>
        <div>
          <div className="contact-hub-links">
            <a href="mailto:radianp02@gmail.com">
              <LuMail aria-hidden="true" />
              <span>
                <strong><Copy en="Email Ricky" id="Kirim email ke Ricky" /></strong>
                <small>radianp02@gmail.com</small>
              </span>
              <ArrowUpRight />
            </a>
            <a href="https://wa.me/6281295248513" target="_blank" rel="noreferrer">
              <LuMessageCircle aria-hidden="true" />
              <span>
                <strong><Copy en="Chat on WhatsApp" id="Chat via WhatsApp" /></strong>
                <small><Copy en="Start with a quick conversation" id="Mulai dari obrolan singkat" /></small>
              </span>
              <ArrowUpRight />
            </a>
          </div>
          <aside className="contact-rrs" aria-labelledby="contact-rrs-title">
            <div>
              <LuStore aria-hidden="true" />
              <p className="contact-kicker"><Copy en="Also building" id="Juga sedang membangun" /></p>
            </div>
            <div>
              <h3 id="contact-rrs-title">RRS Studio.</h3>
              <p>
                <Copy en="An independent digital studio for websites, applications, dashboards, and custom workflows—with scope agreed before delivery begins." id="Independent digital studio untuk website, aplikasi, dashboard, dan custom workflow—dengan scope yang disepakati sebelum proses delivery dimulai." />
              </p>
              <a href="https://rrs-studio.store" target="_blank" rel="noreferrer">
                <Copy en="Visit RRS Studio" id="Kunjungi RRS Studio" /> <ArrowUpRight />
              </a>
            </div>
          </aside>
        </div>
      </section>
    </InternalPage>
  );
}
