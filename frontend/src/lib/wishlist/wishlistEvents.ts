export const WISHLIST_CHANGE_EVENT = "wishlist-change";

export function notifyWishlistChange(): void {
  window.dispatchEvent(new Event(WISHLIST_CHANGE_EVENT));
}
