import { useEffect, useState } from "react";

import {
  CATALOG_FIELD_CLASS,
  CATALOG_FILTERS_PANEL_CLASS,
} from "@/constants/catalog/layout";
import { CATALOG_SORT_OPTIONS } from "@/constants/catalog/sortOptions";
import { LANDING_CATEGORIES } from "@/constants/landing/categories";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import type { CatalogFiltersState } from "@/lib/catalog/catalogSearchParams";
import { cn } from "@/lib/utils";
import type { GiftAudience, GiftSort } from "@/types/gift";

type CatalogFiltersProps = {
  filters: CatalogFiltersState;
  onPatch: (patch: Partial<CatalogFiltersState>) => void;
  onClear: () => void;
};

function parsePriceDraft(raw: string): number | null {
  if (!raw.trim()) return null;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

function draftFromFilter(value: number | null): string {
  return value != null ? String(value) : "";
}

export default function CatalogFilters({
  filters,
  onPatch,
  onClear,
}: CatalogFiltersProps) {
  const [priceMinDraft, setPriceMinDraft] = useState(() =>
    draftFromFilter(filters.priceMin),
  );
  const [priceMaxDraft, setPriceMaxDraft] = useState(() =>
    draftFromFilter(filters.priceMax),
  );

  const debouncedMinDraft = useDebouncedValue(priceMinDraft, 400);
  const debouncedMaxDraft = useDebouncedValue(priceMaxDraft, 400);

  useEffect(() => {
    const nextMin = parsePriceDraft(debouncedMinDraft);
    const nextMax = parsePriceDraft(debouncedMaxDraft);

    if (nextMin === filters.priceMin && nextMax === filters.priceMax) {
      return;
    }

    onPatch({ priceMin: nextMin, priceMax: nextMax });
  }, [
    debouncedMinDraft,
    debouncedMaxDraft,
    filters.priceMin,
    filters.priceMax,
    onPatch,
  ]);

  function toggleAudience(audience: GiftAudience, checked: boolean) {
    const next = checked
      ? [...filters.targetAudiences, audience]
      : filters.targetAudiences.filter((a) => a !== audience);
    onPatch({ targetAudiences: next });
  }

  return (
    <div className={cn("flex flex-col gap-6", CATALOG_FILTERS_PANEL_CLASS)}>
      <div>
        <h2 className="text-sm font-semibold text-foreground">Categories</h2>
        <ul className="mt-3 flex flex-col gap-3">
          {LANDING_CATEGORIES.map((cat) => {
            const checked = filters.targetAudiences.includes(
              cat.targetAudience,
            );
            return (
              <li key={cat.id} className="flex items-center gap-2">
                <Checkbox
                  id={`audience-${cat.id}`}
                  checked={checked}
                  className="border-foreground/25 bg-white"
                  onCheckedChange={(value) =>
                    toggleAudience(cat.targetAudience, value === true)
                  }
                />
                <Label
                  htmlFor={`audience-${cat.id}`}
                  className="cursor-pointer font-normal text-foreground/85"
                >
                  {cat.title}
                </Label>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-foreground">
          Price range (USD)
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="price-min" className="text-xs text-foreground/65">
              Min
            </Label>
            <Input
              id="price-min"
              type="number"
              min={0}
              placeholder="0"
              value={priceMinDraft}
              onChange={(e) => setPriceMinDraft(e.target.value)}
              className={CATALOG_FIELD_CLASS}
            />
          </div>
          <div>
            <Label htmlFor="price-max" className="text-xs text-foreground/65">
              Max
            </Label>
            <Input
              id="price-max"
              type="number"
              min={0}
              placeholder="Any"
              value={priceMaxDraft}
              onChange={(e) => setPriceMaxDraft(e.target.value)}
              className={CATALOG_FIELD_CLASS}
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-foreground">Sort by</h2>
        <Select
          value={filters.sort}
          onValueChange={(value) => onPatch({ sort: value as GiftSort })}
        >
          <SelectTrigger className={cn("mt-3 w-full", CATALOG_FIELD_CLASS)}>
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            {CATALOG_SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <button
        type="button"
        onClick={onClear}
        className="text-left text-sm font-medium text-foreground/80 underline underline-offset-4 hover:text-primary"
      >
        Clear all filters
      </button>
    </div>
  );
}
