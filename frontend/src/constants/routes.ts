export const ROUTES = {
  home: "/",
  catalog: "/catalog",
  orderSuccess: "/order/success",
  login: "/login",
  register: "/register",
  devSmoke: "/dev/smoke",
} as const;

export type OrderSuccessState = {
  orderId: string;
};