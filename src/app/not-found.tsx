import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found frame">
      <p>That route is not part of this system.</p>
      <h1>Nothing<br />here.</h1>
      <Link className="primary-link" href="/">Return home</Link>
    </main>
  );
}
