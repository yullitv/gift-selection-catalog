import {
  buildCatalogSearchParams,
  DEFAULT_CATALOG_FILTERS,
  patchCatalogFilters,
  type CatalogFiltersState,
} from "@/lib/catalogSearchParams";

export type CatalogUrlParams = Partial<CatalogFiltersState>;

export function catalogUrl(params: CatalogUrlParams = {}): string {
  const filters = patchCatalogFilters(
    DEFAULT_CATALOG_FILTERS,
    { ...params, page: 0 },
    { resetPage: true },
  );
  const qs = buildCatalogSearchParams(filters).toString();
  return qs ? `/catalog?${qs}` : "/catalog";
}