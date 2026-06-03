import type {
  GiftAudience,
  GiftDto,
  GiftPageDto,
  GiftSort,
} from "@/types/gift";
import { apiClient } from "../api";

/** Backend caps page size at 24 (GiftService). */
const MAX_GIFT_PAGE_SIZE = 24;

export type FetchGiftsParams = {
  page?: number;
  size?: number;
  sort?: GiftSort;
  q?: string;
  priceMinCents?: number;
  priceMaxCents?: number;
  targetAudience?: GiftAudience[];
  tags?: string[];
  inStock?: boolean;
};

function serializeParams(params: Record<string, unknown>): string {
  const sp = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value == null || value === "") continue;

    if (Array.isArray(value)) {
      for (const item of value) {
        if (item != null && item !== "") {
          sp.append(key, String(item));
        }
      }
    } else {
      sp.append(key, String(value));
    }
  }

  return sp.toString();
}

export async function fetchGiftPage(
  params: FetchGiftsParams = {},
): Promise<GiftPageDto> {
  const { data } = await apiClient.get<GiftPageDto>("/gifts", {
    params,
    paramsSerializer: { serialize: serializeParams },
  });
  return data;
}

export async function fetchGifts(
  params: FetchGiftsParams = {},
): Promise<GiftDto[]> {
  const page = await fetchGiftPage(params);
  return page.content;
}

export async function fetchGiftById(id: number): Promise<GiftDto> {
  const { data } = await apiClient.get<GiftDto>(`/gifts/${id}`);
  return data;
}

export type FetchAllGiftsParams = Omit<FetchGiftsParams, "page" | "size">;

/** Loads every page and deduplicates by id. */
export async function fetchAllGifts(
  params: FetchAllGiftsParams = {},
): Promise<GiftDto[]> {
  const byId = new Map<number, GiftDto>();
  let page = 0;
  let totalPages = 1;

  while (page < totalPages) {
    const res = await fetchGiftPage({
      ...params,
      page,
      size: MAX_GIFT_PAGE_SIZE,
      sort: params.sort ?? "NEWEST",
    });

    for (const gift of res.content) {
      byId.set(gift.id, gift);
    }

    totalPages = Math.max(res.totalPages ?? 1, 1);
    page += 1;
  }

  return Array.from(byId.values());
}