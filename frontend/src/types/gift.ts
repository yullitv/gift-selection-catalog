export type GiftAudience = "MAN" | "WOMAN" | "COUPLE" | "CHILD";

/** GiftDto from OpenAPI. */
export type GiftDto = {
  id: number;
  name: string;
  description: string;
  priceCents: number;
  photoUrl: string | null;
  stockQuantity: number;
  minAge: number | null;
  maxAge: number | null;
  targetAudiences: GiftAudience[];
  tags: string[];
};

/** Paginated GET /gifts response (Spring Page). */
export type GiftPageDto = {
  content: GiftDto[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};
