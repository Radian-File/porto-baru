"use client";

import Link from "next/link";
import { createContext, useContext, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react";

const TransitionContext = createContext<((href: string) => void) | null>(null);

type TransitionLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
};

export function TransitionProvider({ navigate, children }: { navigate: (href: string) => void; children: ReactNode }) {
  return <TransitionContext.Provider value={navigate}>{children}</TransitionContext.Provider>;
}

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
