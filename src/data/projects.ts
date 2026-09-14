export type LocalizedText = { en: string; id: string };

export type Project = {
  slug: string;
  name: string;
  shortSummary: LocalizedText;
  overview: LocalizedText;
  contribution: LocalizedText;
  repository: string;
  stack: string[];
  workflow: LocalizedText[];
  evidence: LocalizedText[];
  openQuestions: LocalizedText[];
};

export const projects: Project[] = [
  {
    slug: "rrs-web",
    name: "RRS Studio",
    shortSummary: { en: "A quotation-first web and product studio platform spanning public, client, and owner experiences.", id: "Platform web dan product studio yang berpusat pada quotation, untuk experience publik, client, dan owner." },
    overview: { en: "The repository describes an independent-studio operating system: visitors become clients through technical briefs and versioned quotations, then move into protected agreements, delivery, payment verification, and reviews.", id: "Repository ini menggambarkan operating system independent studio: pengunjung masuk lewat technical brief dan quotation berversi, lalu lanjut ke agreement terlindungi, delivery, verifikasi pembayaran, dan review." },
    contribution: { en: "112 authored commits detected on the public repository.", id: "112 commit yang saya buat terdeteksi di repository publik." },
    repository: "https://github.com/Radian-File/rrs-web",
    stack: ["Next.js 16", "React 19", "PostgreSQL", "Prisma 7", "Auth.js", "Docker", "Playwright"],
    workflow: [{ en: "Technical brief", id: "Technical brief" }, { en: "Versioned quotation", id: "Quotation berversi" }, { en: "Protected agreement", id: "Agreement terlindungi" }, { en: "Project workspace", id: "Project workspace" }, { en: "Delivery approval", id: "Approval delivery" }],
    evidence: [
      { en: "Server Components are the documented default, with Client Components limited to interactive boundaries.", id: "Server Components jadi default; Client Components dibatasi untuk bagian yang interaktif." },
      { en: "Authorization and ownership checks are kept close to data access.", id: "Pengecekan authorization dan ownership dijaga dekat dengan akses data." },
      { en: "Sent quotations are immutable; changes create a new version.", id: "Quotation yang sudah dikirim bersifat immutable; perubahan membuat versi baru." },
      { en: "Private files and agreements are separated from public capability links.", id: "File dan agreement private dipisahkan dari capability link publik." },
    ],
    openQuestions: [{ en: "Exact team size and Ricky's decision ownership", id: "Jumlah tim dan ruang keputusan Ricky yang lebih detail" }, { en: "Production outcome or usage evidence", id: "Bukti penggunaan atau outcome production" }, { en: "Approved product screenshots", id: "Screenshot product yang sudah disetujui" }],
  },
  {
    slug: "find-my-job",
    name: "RRS JobRadar",
    shortSummary: { en: "A local-first automation tool for discovering and tracking internship and junior engineering opportunities.", id: "Tool automation local-first untuk menemukan dan melacak peluang internship serta junior engineering." },
    overview: { en: "The system watches configured Instagram sources, stores raw posts, combines caption and OCR processing, extracts job information, scores matches, detects duplicates, and moves useful opportunities into an application tracker.", id: "System ini memantau source Instagram yang dipilih, menyimpan post mentah, memadukan caption dan OCR, mengambil info lowongan, memberi skor kecocokan, mendeteksi duplikat, lalu memasukkan peluang yang relevan ke application tracker." },
    contribution: { en: "46 authored commits detected on the public repository.", id: "46 commit yang saya buat terdeteksi di repository publik." },
    repository: "https://github.com/Radian-File/find-my-job",
    stack: ["Next.js", "TypeScript", "Python", "Prisma", "Playwright", "OCR pipeline"],
    workflow: [{ en: "Source scan", id: "Scan source" }, { en: "Caption and OCR", id: "Caption dan OCR" }, { en: "AI extraction", id: "Ekstraksi AI" }, { en: "Match scoring", id: "Skor kecocokan" }, { en: "Application tracking", id: "Tracking lamaran" }],
    evidence: [
      { en: "Instagram login uses a local Playwright browser profile; the password is not stored by the application.", id: "Login Instagram memakai browser profile Playwright lokal; password tidak disimpan oleh aplikasi." },
      { en: "Seen-post caching helps avoid repeated submissions.", id: "Cache post yang sudah dilihat membantu menghindari submission berulang." },
      { en: "Low-confidence OCR results are gated for human review.", id: "Hasil OCR dengan confidence rendah ditahan untuk dicek manusia." },
      { en: "The main workflow is automation-first while parser internals remain reusable.", id: "Workflow utama automation-first, sementara bagian parser tetap bisa dipakai ulang." },
    ],
    openQuestions: [{ en: "Exact extraction model and evaluation results", id: "Model ekstraksi dan hasil evaluasi yang lebih detail" }, { en: "Time saved compared with manual search", id: "Waktu yang dihemat dibanding pencarian manual" }, { en: "Approved dashboard screenshots", id: "Screenshot dashboard yang sudah disetujui" }],
  },
  {
    slug: "project-bowl",
    name: "ProjectBowl",
    shortSummary: { en: "An AI-assisted developer portfolio CMS and project-management dashboard.", id: "CMS portfolio developer dan dashboard project management dengan bantuan AI." },
    overview: { en: "The active architecture is a Next.js full-stack application deployed to Vercel, backed by Supabase Auth and Postgres. A prior NestJS API remains in the repository as a legacy reference but is outside the production workspace.", id: "Arsitektur aktifnya adalah aplikasi Next.js full-stack yang di-deploy ke Vercel, didukung Supabase Auth dan Postgres. API NestJS lama masih ada di repository sebagai referensi legacy, tapi bukan bagian dari workspace production." },
    contribution: { en: "31 authored commits detected on the public repository.", id: "31 commit yang saya buat terdeteksi di repository publik." },
    repository: "https://github.com/Radian-File/project-bowl",
    stack: ["Next.js", "TypeScript", "Turborepo", "Supabase", "OpenRouter", "pnpm"],
    workflow: [{ en: "Public portfolio", id: "Portfolio publik" }, { en: "Authenticated dashboard", id: "Dashboard terautentikasi" }, { en: "Project data", id: "Data project" }, { en: "AI helpers", id: "AI helpers" }, { en: "Vercel delivery", id: "Delivery via Vercel" }],
    evidence: [
      { en: "The repository separates shared configuration, types, and UI primitives into workspace packages.", id: "Repository memisahkan konfigurasi, types, dan UI primitives bersama ke dalam package workspace." },
      { en: "Internal route handlers replace the need for a separately deployed production backend.", id: "Route handler internal menggantikan kebutuhan backend production yang di-deploy terpisah." },
      { en: "The application has fallback public data when Supabase environment variables are absent.", id: "Aplikasi punya fallback data publik ketika environment variable Supabase tidak tersedia." },
      { en: "Cloudinary integration is described as optional future work, not a completed feature.", id: "Integrasi Cloudinary dijelaskan sebagai opsi untuk pengembangan berikutnya, bukan fitur yang sudah selesai." },
    ],
    openQuestions: [{ en: "Ricky's ownership across the monorepo", id: "Ruang ownership Ricky di seluruh monorepo" }, { en: "Why the backend architecture changed", id: "Alasan perubahan arsitektur backend" }, { en: "Approved CMS and portfolio screenshots", id: "Screenshot CMS dan portfolio yang sudah disetujui" }],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
