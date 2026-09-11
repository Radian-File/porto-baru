import { TransitionLink } from "@/components/portfolio-shell";

export default function NotFound() {
  return (
    <main className="not-found frame">
      <p>That route is not part of this system.</p>
      <h1>Nothing<br />here.</h1>
      <TransitionLink className="primary-link" href="/">Return home</TransitionLink>
    </main>
  );
}
