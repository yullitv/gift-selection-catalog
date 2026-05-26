import CartEmptyState from "@/components/cart/CartEmptyState";
import CartItemRow from "@/components/cart/CartItemRow";
import CartOrderSummary from "@/components/cart/CartOrderSummary";
import { useCart } from "@/hooks/useCart";
import { notifySuccess } from "@/lib/notify";

export default function CartPage() {
  const { items, totals, setQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-below-header bg-brand-cream">
        <CartEmptyState />
      </div>
    );
  }

  function handleRemove(giftId: number) {
    removeItem(giftId);
    notifySuccess("Removed from cart");
  }

  return (
    <div className="min-h-below-header bg-brand-cream">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <header className="mb-8">
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Your thoughtful gifts
          </h1>
          <p className="mt-2 text-muted-foreground">
            Almost ready to make someone smile.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.giftId}>
                <CartItemRow
                  item={item}
                  onQuantityChange={setQuantity}
                  onRemove={handleRemove}
                />
              </li>
            ))}
          </ul>

          <CartOrderSummary totals={totals} />
        </div>
      </div>
    </div>
  );
}
