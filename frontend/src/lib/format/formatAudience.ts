import type { GiftAudience } from "@/types/gift";

const LABELS: Record<GiftAudience, string> = {
  WOMAN: "For Her",
  MAN: "For Him",
  COUPLE: "For Couples",
  CHILD: "For Kids",
};

export function formatAudienceLabel(audience: GiftAudience): string {
  return LABELS[audience];
}

export function formatAudienceList(audiences: GiftAudience[]): string {
  return audiences.map(formatAudienceLabel).join(", ");
}