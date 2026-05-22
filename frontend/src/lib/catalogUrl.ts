import type { GiftAudience } from "@/types/gift";

export type CatalogSearchParams = {
  targetAudience?: GiftAudience;
  q?: string;
  page?: number;
  size?: number;
  sort?: string;
};

export function catalogUrl(params: CatalogSearchParams = {}): string {
  const sp = new URLSearchParams();

  if (params.targetAudience) {
    sp.set("targetAudience", params.targetAudience);
  }
  if (params.q?.trim()) {
    sp.set("q", params.q.trim());
  }
  if (params.page != null && params.page > 0) {
    sp.set("page", String(params.page));
  }
  if (params.size != null && params.size > 0) {
    sp.set("size", String(params.size));
  }
  if (params.sort?.trim()) {
    sp.set("sort", params.sort.trim());
  }

  const qs = sp.toString();
  return qs ? `/catalog?${qs}` : "/catalog";
}