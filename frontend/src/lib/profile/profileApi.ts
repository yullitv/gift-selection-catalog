import { apiClient } from "@/lib/api";
import type { UpdateProfileRequest, UserProfileDto } from "@/types/profile";

export async function fetchProfile(): Promise<UserProfileDto> {
  const { data } = await apiClient.get<UserProfileDto>("/profile");
  return data;
}

export async function updateProfile(
  payload: UpdateProfileRequest,
): Promise<UserProfileDto> {
  const { data } = await apiClient.put<UserProfileDto>("/profile", payload);
  return data;
}