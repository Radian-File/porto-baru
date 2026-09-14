import type { Metadata } from "next";
import { ContributionHeatmap } from "@/components/contribution-heatmap";
import { InternalPage } from "@/components/internal-page";
import { Copy } from "@/components/language";
import { getContributionCalendar } from "@/data/github";

export const metadata: Metadata = {
  title: "About — Ricky",
  description: "About Ricky, a full-stack developer and Information Systems student in Indonesia.",
};

export default async function AboutPage() {
  const contributionCalendar = await getContributionCalendar("Radian-File");

  return (
    <InternalPage
      section={<Copy en="About" id="Tentang" />}
      title={<>Hi, I’m Ricky.</>}
      intro={<Copy en="I’m a full-stack developer and Information Systems student at Telkom University, working between Bekasi and Bandung." id="Saya full-stack developer dan mahasiswa Information Systems di Telkom University, aktif antara Bekasi dan Bandung." />}
      className="about-page"
    >
      <section className="about-statement" aria-labelledby="about-approach-title">
        <h2 id="about-approach-title"><Copy en="Building from the whole picture." id="Melihat produk secara utuh." /></h2>
        <div>
          <p>
            <Copy en="I build web experiences from end to end: shaping interfaces people enjoy using, then turning them into reliable, maintainable systems." id="Saya membangun web experience dari awal sampai selesai: merancang interface yang enak dipakai, lalu mengubahnya jadi sistem yang reliable dan mudah dirawat." />
          </p>
          <p>
            <Copy en="I’m drawn to work where thoughtful design and solid engineering meet — products that feel clear, intentional, and useful." id="Saya suka mengerjakan produk saat design yang thoughtful bertemu engineering yang solid—hasilnya jelas, punya purpose, dan benar-benar berguna." />
          </p>
        </div>
      </section>

      <section className="about-principles" aria-labelledby="about-contribution-title">
        <h2 id="about-contribution-title"><Copy en="What I bring" id="Yang saya bawa ke project" /></h2>
        <div className="about-principle-list">
          <article>
            <h3><Copy en="Build end to end" id="Build end to end" /></h3>
            <p><Copy en="From early interface decisions to frontend, backend, and deployment." id="Dari keputusan interface awal sampai frontend, backend, dan deployment." /></p>
          </article>
          <article>
            <h3><Copy en="Think in systems" id="Berpikir pakai sistem" /></h3>
            <p><Copy en="I turn complex requirements into flows that are easier to use and maintain." id="Saya mengubah requirement yang kompleks jadi flow yang lebih gampang dipakai dan di-maintain." /></p>
          </article>
          <article>
            <h3><Copy en="Care about the experience" id="Peduli sama experience" /></h3>
            <p><Copy en="I use motion and interaction to guide attention, not simply to decorate a page." id="Saya pakai motion dan interaction untuk mengarahkan perhatian, bukan cuma buat dekorasi." /></p>
          </article>
        </div>
      </section>

      <section className="about-now" aria-labelledby="about-now-title">
        <p className="about-kicker"><Copy en="Current chapter" id="Saat ini" /></p>
        <div>
          <h2 id="about-now-title"><Copy en="Learning by building." id="Belajar sambil bikin." /></h2>
          <p>
            <Copy en="While studying Information Systems, I’m building through real projects and collaborative repositories. I enjoy taking ownership of the details and improving a product one iteration at a time." id="Sambil kuliah Information Systems, saya terus belajar lewat project nyata dan repository kolaboratif. Saya suka pegang detailnya dan bikin produk makin baik, satu iterasi demi satu iterasi." />
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
