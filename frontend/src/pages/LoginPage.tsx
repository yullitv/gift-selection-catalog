import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold">Log in</h1>
      <p className="mt-2 text-muted-foreground">Login — coming soon.</p>
      <p className="mt-6">
        <Link to="/" className="text-primary underline">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}