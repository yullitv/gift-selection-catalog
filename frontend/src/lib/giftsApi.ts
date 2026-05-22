import type { GiftDto, GiftPageDto } from "@/types/gift";
import { apiClient } from "./api";

export type FetchGiftsParams = {
  page?: number;
  size?: number;
  sort?: "PRICE_ASC" | "PRICE_DESC" | "NEWEST";
  targetAudience?: GiftDto["targetAudiences"][number];
  q?: string;
};

export async function fetchGifts(params: FetchGiftsParams = {}): Promise<GiftDto[]> {
  const { data } = await apiClient.get<GiftPageDto>("/gifts", { params });
  return data.content;
}
