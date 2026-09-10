"use client";

import { useLayoutEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ExperienceShell({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".site-header, .hero-copy, .hero-intro, .hero-meta", {
        opacity: 0,
        y: 18,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.to(".hero-visual", {
        yPercent: 30,
        scale: 0.82,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    });

    return () => media.revert();
  }, []);

  return children;
}
