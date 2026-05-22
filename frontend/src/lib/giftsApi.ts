import type { GiftDto } from "@/types/gift";
import { apiClient } from "./api";

export async function fetchGifts(): Promise<GiftDto[]> {
  const { data } = await apiClient.get<GiftDto[]>("/gifts");
  return data;
}
