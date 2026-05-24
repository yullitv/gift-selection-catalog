import type {
  GiftAudience,
  GiftDto,
  GiftPageDto,
  GiftSort,
} from "@/types/gift";
import { apiClient } from "../api";

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
