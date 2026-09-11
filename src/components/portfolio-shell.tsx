"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import gsap from "gsap";
import { SystemCore } from "@/components/system-core";
import { TransitionLink, TransitionProvider } from "@/components/transition-link";

const navigation = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/stack", label: "Stack" },
  { href: "/contact", label: "Contact" },
];

function InternalNavigation({ pathname }: { pathname: string }) {
  return (
    <>
      <TransitionLink className="shell-wordmark" href="/" aria-label="Ricky, return to landing page">
        R<span>.</span>
      </TransitionLink>
      <nav className="route-rail" aria-label="Portfolio sections">
        {navigation.map((item) => {
          const active = pathname === item.href || (item.href === "/portfolio" && pathname.startsWith("/work/"));
          return (
            <TransitionLink href={item.href} key={item.href} aria-current={active ? "page" : undefined}>
              <span>{item.label}</span>
            </TransitionLink>
          );
        })}
      </nav>
    </>
  );
}

export function PortfolioShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLanding = pathname === "/";
  const routeName = pathname.startsWith("/work/") ? "portfolio" : pathname.slice(1) || "home";
  const stage = useRef<HTMLDivElement>(null);
  const pendingPath = useRef<string | null>(null);
  const firstRender = useRef(true);
  const safetyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [introPhase, setIntroPhase] = useState<"running" | "leaving" | "done">(
    isLanding ? "running" : "done",
  );
  const [introProgress, setIntroProgress] = useState(1);

  useEffect(() => {
    if (!isLanding || introPhase !== "running") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;

    if (reduced) {
      animationFrame = window.requestAnimationFrame(() => setIntroPhase("done"));
      return () => window.cancelAnimationFrame(animationFrame);
    }

    const startedAt = performance.now();
    const duration = 1450;
    const tick = (now: number) => {
      const elapsed = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 2.35);
      setIntroProgress(Math.max(1, Math.round(eased * 100)));

      if (elapsed < 1) {
        animationFrame = window.requestAnimationFrame(tick);
        return;
      }

      setIntroProgress(100);
      setIntroPhase("leaving");
    };

    animationFrame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [introPhase, isLanding]);

  useEffect(() => {
    if (introPhase !== "leaving") return;
    const exitTimer = setTimeout(() => setIntroPhase("done"), 720);
    return () => clearTimeout(exitTimer);
  }, [introPhase]);

  function navigate(href: string) {
    if (href === pathname || transitioning) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push(href);
      return;
    }

    pendingPath.current = href;
    setTransitioning(true);
    const destinationIsLanding = href === "/";
    document.documentElement.dataset.transitionKind = isLanding || destinationIsLanding ? "portal" : "section";

    gsap.to(stage.current, {
      autoAlpha: 0,
      y: isLanding ? -14 : 10,
      filter: "blur(7px)",
      clipPath: isLanding ? "inset(0 0 100% 0)" : "inset(0 0 0 0)",
      duration: isLanding || destinationIsLanding ? 0.28 : 0.2,
      ease: "power2.in",
    });

    const routeDelay = isLanding || destinationIsLanding ? 250 : 180;
    safetyTimer.current = setTimeout(() => {
      router.push(href, { scroll: false });
    }, routeDelay);
  }

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (!pendingPath.current) return;

    if (safetyTimer.current) clearTimeout(safetyTimer.current);
    window.scrollTo({ top: 0, behavior: "instant" });
    const frame = window.requestAnimationFrame(() => {
      gsap.fromTo(stage.current,
        { autoAlpha: 0, y: 18, filter: "blur(7px)", clipPath: "inset(100% 0 0 0)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          clipPath: "inset(0% 0 0 0)",
          duration: 0.52,
          ease: "power3.out",
          clearProps: "transform,filter,clipPath,opacity,visibility",
          onComplete: () => {
            pendingPath.current = null;
            setTransitioning(false);
            delete document.documentElement.dataset.transitionKind;
            const main = stage.current?.querySelector<HTMLElement>("main");
            if (main) {
              main.tabIndex = -1;
              main.focus({ preventScroll: true });
            }
          },
        },
      );
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => () => {
    if (safetyTimer.current) clearTimeout(safetyTimer.current);
  }, []);

  return (
    <TransitionProvider navigate={navigate}>
      <div
        className={`portfolio-shell ${isLanding ? "is-landing" : "is-internal"}`}
        data-route={routeName}
        data-transitioning={transitioning}
        data-intro={isLanding ? introPhase : undefined}
        aria-busy={transitioning}
      >
        <a className="skip-link" href="#main-content">Skip to content</a>
        <div className="ambient-field" aria-hidden="true" />
        <SystemCore route={routeName} transitioning={transitioning} />
        {isLanding && introPhase !== "done" && (
          <div className="landing-opening" data-phase={introPhase} aria-hidden="true">
            <div className="opening-meta">
              <span>Forming system core</span>
              <strong>{String(introProgress).padStart(2, "0")}%</strong>
            </div>
            <div
              className="opening-meter"
              style={{ "--intro-progress": `${introProgress}%` } as CSSProperties}
            >
              <span className="opening-meter-fill" />
              <span className="opening-meter-core" />
            </div>
          </div>
        )}
        {!isLanding && <InternalNavigation pathname={pathname} />}
        <div className="route-stage" ref={stage}>{children}</div>
      </div>
    </TransitionProvider>
  );
}
