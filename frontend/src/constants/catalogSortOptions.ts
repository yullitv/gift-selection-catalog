import type { GiftSort } from "@/types/gift";

export type CatalogSortOption = {
  value: GiftSort;
  label: string;
};

export const CATALOG_SORT_OPTIONS: CatalogSortOption[] = [
  { value: "NEWEST", label: "Popularity" },
  { value: "PRICE_ASC", label: "Price: Low to High" },
  { value: "PRICE_DESC", label: "Price: High to Low" },
];

export const DEFAULT_CATALOG_SORT: GiftSort = "NEWEST";
export const DEFAULT_CATALOG_PAGE_SIZE = 12;