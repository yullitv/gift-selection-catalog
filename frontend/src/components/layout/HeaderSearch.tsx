import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { catalogUrl } from "@/lib/catalogUrl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeaderSearch() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = query.trim();
    navigate(catalogUrl(q ? { q } : {}));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full min-w-0 max-w-md items-center gap-1"
      role="search"
    >
      <Input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search gifts..."
        aria-label="Search gifts"
        className="min-w-0 flex-1"
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        aria-label="Submit search"
      >
        <Search className="size-4" />
      </Button>
    </form>
  );
}
