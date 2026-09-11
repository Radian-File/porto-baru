"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const navigation = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/stack", label: "Stack" },
  { href: "/contact", label: "Contact" },
];

function StaticSystemCore() {
  return (
    <div className="system-core-static" aria-hidden="true">
      <div className="core-atmosphere" />
      <div className="core-orbit core-orbit-a" />
      <div className="core-orbit core-orbit-b" />
      <div className="core-shell" />
      <div className="core-light" />
      <div className="core-noise" />
    </div>
  );
}

function InternalNavigation({ pathname }: { pathname: string }) {
  return (
    <>
      <Link className="shell-wordmark" href="/" aria-label="Ricky, return to landing page">
        R<span>.</span>
      </Link>
      <nav className="route-rail" aria-label="Portfolio sections">
        {navigation.map((item) => {
          const active = pathname === item.href || (item.href === "/portfolio" && pathname.startsWith("/work/"));
          return (
            <Link href={item.href} key={item.href} aria-current={active ? "page" : undefined}>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

export function PortfolioShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const routeName = pathname.startsWith("/work/") ? "portfolio" : pathname.slice(1) || "home";

  return (
    <div className={`portfolio-shell ${isLanding ? "is-landing" : "is-internal"}`} data-route={routeName}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="ambient-field" aria-hidden="true" />
      <StaticSystemCore />
      {!isLanding && <InternalNavigation pathname={pathname} />}
      <div className="route-stage">{children}</div>
    </div>
  );
}
