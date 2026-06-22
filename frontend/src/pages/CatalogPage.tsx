import { SlidersHorizontal } from "lucide-react";

import CatalogFilters from "@/components/catalog/CatalogFilters";
import CatalogResults from "@/components/catalog/CatalogResults";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  CATALOG_FIELD_CLASS,
  CATALOG_SUBTITLE_CLASS,
} from "@/constants/catalog/layout";
import { useCatalogFilters } from "@/hooks/useCatalogFilters";
import { useCatalogGifts } from "@/hooks/useCatalogGifts";
import { cn } from "@/lib/utils";

export default function CatalogPage() {
  const {
    searchParams,
    filters,
    filtersKey,
    searchValue,
    onSearchChange,
    handlePatch,
    handleClear,
    handleLoadMore,
  } = useCatalogFilters();

  const { gifts, loading, loadingMore, error, hasMore, showEmpty } =
    useCatalogGifts(searchParams);

  return (
    <div className="min-h-below-header flex-1 bg-brand-cream">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-semibold">Catalog</h1>
            <p className={cn("mt-1", CATALOG_SUBTITLE_CLASS)}>
              Find the perfect gift
            </p>
          </div>

          <div className="flex w-full max-w-md items-center gap-2 md:w-auto">
            <Input
              type="search"
              placeholder="Search gifts..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search gifts"
              className={cn("min-w-0 flex-1", CATALOG_FIELD_CLASS)}
            />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 border-border bg-white shadow-sm md:hidden"
                  aria-label="Open filters"
                >
                  <SlidersHorizontal className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[min(100%,20rem)] overflow-y-auto"
              >
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="px-4 pb-6">
                  <CatalogFilters
                    key={filtersKey}
                    filters={filters}
                    onPatch={handlePatch}
                    onClear={handleClear}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="mt-8 flex gap-8">
          <aside className="hidden w-64 shrink-0 md:block">
            <CatalogFilters
              key={filtersKey}
              filters={filters}
              onPatch={handlePatch}
              onClear={handleClear}
            />
          </aside>

          <div className="min-w-0 flex-1">
            <CatalogResults
              gifts={gifts}
              loading={loading}
              loadingMore={loadingMore}
              error={error}
              hasMore={hasMore}
              showEmpty={showEmpty}
              onLoadMore={handleLoadMore}
            />
          </div>
        </div>
      </div>
    </div>
  );
}