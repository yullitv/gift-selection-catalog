import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import {
  buildCatalogSearchParams,
  DEFAULT_CATALOG_FILTERS,
  parseCatalogSearchParams,
  patchCatalogFilters,
  type CatalogFiltersState,
} from "@/lib/catalogSearchParams";

export function useCatalogFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(
    () => parseCatalogSearchParams(searchParams),
    [searchParams],
  );

  const filtersKey = searchParams.toString();

  const [searchDraft, setSearchDraft] = useState<string | null>(null);
  const searchValue =
    searchDraft !== null && searchDraft !== filters.q ? searchDraft : filters.q;
  const debouncedQ = useDebouncedValue(searchValue, 350);

  const applyFilters = useCallback(
    (
      patch: Partial<CatalogFiltersState>,
      options?: { resetPage?: boolean },
    ) => {
      const merged = patchCatalogFilters(filters, patch, options);
      setSearchParams(buildCatalogSearchParams(merged), { replace: true });
    },
    [filters, setSearchParams],
  );

  const handlePatch = useCallback(
    (patch: Partial<CatalogFiltersState>) => {
      applyFilters(patch, { resetPage: true });
    },
    [applyFilters],
  );

  const handleClear = useCallback(() => {
    setSearchDraft(null);
    setSearchParams(buildCatalogSearchParams(DEFAULT_CATALOG_FILTERS), {
      replace: true,
    });
  }, [setSearchParams]);

  useEffect(() => {
    if (debouncedQ === filters.q) return;
    applyFilters({ q: debouncedQ }, { resetPage: true });
  }, [debouncedQ, filters.q, applyFilters]);

  const handleLoadMore = useCallback(() => {
    applyFilters({ page: filters.page + 1 }, { resetPage: false });
  }, [applyFilters, filters.page]);

  return {
    searchParams,
    filters,
    filtersKey,
    searchValue,
    onSearchChange: setSearchDraft,
    handlePatch,
    handleClear,
    handleLoadMore,
  };
}