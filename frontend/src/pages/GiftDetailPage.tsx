import { Link, useParams } from "react-router-dom";

export default function GiftDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-3xl font-bold">Gift #{id}</h1>
      <p className="mt-2 text-muted-foreground">Product detail — coming soon.</p>
      <p className="mt-6">
        <Link to="/catalog" className="text-primary underline">
          ← Back to catalog
        </Link>
      </p>
    </div>
  );
}