import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="font-display text-3xl font-bold">Page not found</h1>
      <p className="mt-2 text-fg-muted">That page doesn't exist.</p>
      <Link to="/" className="mt-6 inline-block font-semibold text-accent-emphasis underline">
        Back to overview
      </Link>
    </div>
  );
}
