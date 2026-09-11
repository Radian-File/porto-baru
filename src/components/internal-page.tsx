import type { ReactNode } from "react";

type InternalPageProps = {
  section: string;
  title: ReactNode;
  intro: string;
  children: ReactNode;
  className?: string;
};

export function InternalPage({ section, title, intro, children, className = "" }: InternalPageProps) {
  return (
    <main id="main-content" className={`internal-page ${className}`}>
      <header className="internal-heading">
        <p>{section}</p>
        <h1>{title}</h1>
        <p className="internal-intro">{intro}</p>
      </header>
      <div className="internal-content">{children}</div>
    </main>
  );
}
