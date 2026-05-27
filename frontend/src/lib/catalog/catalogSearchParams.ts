import {
  DEFAULT_CATALOG_PAGE_SIZE,
  DEFAULT_CATALOG_SORT,
} from "@/constants/catalog/sortOptions";
import type { FetchGiftsParams } from "@/lib/gifts/giftsApi";
import type { GiftAudience, GiftSort } from "@/types/gift";

export type CatalogFiltersState = {
  q: string;
  sort: GiftSort;
  page: number;
  size: number;
  priceMin: number | null;
  priceMax: number | null;
  targetAudiences: GiftAudience[];
};

export const DEFAULT_CATALOG_FILTERS: CatalogFiltersState = {
  q: "",
  sort: DEFAULT_CATALOG_SORT,
  page: 0,
  size: DEFAULT_CATALOG_PAGE_SIZE,
  priceMin: null,
  priceMax: null,
  targetAudiences: [],
};

const VALID_AUDIENCES = new Set<GiftAudience>([
  "MAN",
  "WOMAN",
  "COUPLE",
  "CHILD",
]);

function parseTargetAudiences(searchParams: URLSearchParams): GiftAudience[] {
  return searchParams
    .getAll("targetAudience")
    .filter((value): value is GiftAudience =>
      VALID_AUDIENCES.has(value as GiftAudience),
    );
}

function parsePositiveInt(value: string | null): number | null {
  if (!value?.trim()) return null;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

function parseSort(value: string | null): GiftSort {
  if (value === "PRICE_ASC" || value === "PRICE_DESC" || value === "NEWEST") {
    return value;
  }
  return DEFAULT_CATALOG_SORT;
}

/** URL об'єкт фільтрів для UI і fetch. */
export function parseCatalogSearchParams(
  searchParams: URLSearchParams,
): CatalogFiltersState {
  const page = parsePositiveInt(searchParams.get("page")) ?? 0;
  const size =
    parsePositiveInt(searchParams.get("size")) ?? DEFAULT_CATALOG_PAGE_SIZE;

  return {
    q: searchParams.get("q")?.trim() ?? "",
    sort: parseSort(searchParams.get("sort")),
    page,
    size,
    priceMin: parsePositiveInt(searchParams.get("priceMin")),
    priceMax: parsePositiveInt(searchParams.get("priceMax")),
    targetAudiences: parseTargetAudiences(searchParams),
  };
}

/** Фільтри URLSearchParams для setSearchParams. */
export function buildCatalogSearchParams(
  filters: CatalogFiltersState,
): URLSearchParams {
  const sp = new URLSearchParams();

  if (filters.q.trim()) sp.set("q", filters.q.trim());
  if (filters.sort !== DEFAULT_CATALOG_SORT) sp.set("sort", filters.sort);
  if (filters.page > 0) sp.set("page", String(filters.page));
  if (filters.size !== DEFAULT_CATALOG_PAGE_SIZE) {
    sp.set("size", String(filters.size));
  }
  if (filters.priceMin != null) sp.set("priceMin", String(filters.priceMin));
  if (filters.priceMax != null) sp.set("priceMax", String(filters.priceMax));

  for (const audience of filters.targetAudiences) {
    sp.append("targetAudience", audience);
  }

  return sp;
}

/** UI-фільтри параметри GET /gifts. */
export function toFetchGiftsParams(
  filters: CatalogFiltersState,
): FetchGiftsParams {
  const params: FetchGiftsParams = {
    page: filters.page,
    size: filters.size,
    sort: filters.sort,
  };

  if (filters.q.trim()) params.q = filters.q.trim();

  if (filters.priceMin != null) {
    params.priceMinCents = filters.priceMin * 100;
  }
  if (filters.priceMax != null) {
    params.priceMaxCents = filters.priceMax * 100;
  }
  if (filters.targetAudiences.length > 0) {
    params.targetAudience = filters.targetAudiences;
  }

  return params;
}

/** Часткове оновлення; за замовчуванням скидає page на 0 (новий пошук/фільтр). */
export function patchCatalogFilters(
  current: CatalogFiltersState,
  patch: Partial<CatalogFiltersState>,
  options?: { resetPage?: boolean },
): CatalogFiltersState {
  const resetPage = options?.resetPage ?? true;
  return {
    ...current,
    ...patch,
    page: patch.page ?? (resetPage ? 0 : current.page),
  };
}
