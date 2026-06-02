import { apiClient } from "@/lib/api";
import type { UserProfileDto } from "@/types/profile";

export async function fetchProfile(): Promise<UserProfileDto> {
  const { data } = await apiClient.get<UserProfileDto>("/profile");
  return data;
}