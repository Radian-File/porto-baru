"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import gsap from "gsap";
import { SystemCore } from "@/components/system-core";

const navigation = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/stack", label: "Stack" },
  { href: "/contact", label: "Contact" },
];

const TransitionContext = createContext<((href: string) => void) | null>(null);

type TransitionLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
};

export function TransitionLink({ href, onClick, children, ...props }: TransitionLinkProps) {
  const navigate = useContext(TransitionContext);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (
      event.defaultPrevented || !navigate || event.button !== 0 || event.metaKey ||
      event.ctrlKey || event.shiftKey || event.altKey || props.target === "_blank"
    ) return;

    event.preventDefault();
    navigate(href);
  }

  return <Link href={href} onClick={handleClick} {...props}>{children}</Link>;
}

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
    <TransitionContext.Provider value={navigate}>
      <div
        className={`portfolio-shell ${isLanding ? "is-landing" : "is-internal"}`}
        data-route={routeName}
        data-transitioning={transitioning}
      >
        <a className="skip-link" href="#main-content">Skip to content</a>
        <div className="ambient-field" aria-hidden="true" />
        <SystemCore route={routeName} transitioning={transitioning} />
        {!isLanding && <InternalNavigation pathname={pathname} />}
        <div className="route-stage" ref={stage}>{children}</div>
      </div>
    </TransitionContext.Provider>
  );
}
