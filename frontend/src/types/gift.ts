/** GiftDto from OpenAPI (GET /gifts). */
export type GiftDto = {
  id: number;
  name: string;
  description: string;
  priceCents: number;
  photoUrl: string | null;
  stockQuantity: number;
  minAge: number | null;
  maxAge: number | null;
  tags: string[];
};
