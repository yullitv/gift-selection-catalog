export const ROUTES = {
  home: "/",
  catalog: "/catalog",
  cart: "/cart",
  checkout: "/checkout",
  account: "/account",
  adminAccount: "/admin/account",
  orderSuccess: "/order/success",
  login: "/login",
  register: "/register",
  devSmoke: "/dev/smoke",
} as const;

export type OrderSuccessState = {
  orderId: string;
};

export type AuthRedirectState = {
  from?: string;
};

export function giftDetailPath(id: number | string): string {
  return `/gift/${id}`;
}