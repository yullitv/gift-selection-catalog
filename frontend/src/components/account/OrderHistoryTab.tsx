import { ChevronRight, Loader2, PackageSearch } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { ACCOUNT_PANEL_CLASS } from "@/constants/uiClasses";
import { formatPriceUsd } from "@/lib/format/formatPrice";
import { resolveGiftImageUrl } from "@/lib/gifts/giftImages";
import { notifyApiError } from "@/lib/notify";
import { fetchOrderById, fetchOrders } from "@/lib/orders/ordersApi";
import type { OrderDetailsDto, OrderSummaryDto } from "@/types/order";

function formatOrderDate(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime())
    ? "-"
    : new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(date);
}

type OrderHistoryTabProps = {
  active: boolean;
};

export default function OrderHistoryTab({ active }: OrderHistoryTabProps) {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<OrderSummaryDto[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderDetailsDto | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (!active || hasLoadedRef.current) {
      return;
    }

    let cancelled = false;
    hasLoadedRef.current = true;

    async function loadOrders() {
      setLoading(true);
      try {
        const data = await fetchOrders();
        if (cancelled) return;
        setOrders(data);
      } catch (error) {
        if (!cancelled) {
          notifyApiError(error, "Could not load order history");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadOrders();

    return () => {
      cancelled = true;
    };
  }, [active]);

  async function handleOpenOrder(orderId: number) {
    setSelectedOrder(null);
    setDetailsLoading(true);

    try {
      const details = await fetchOrderById(orderId);
      setSelectedOrder(details);
    } catch (error) {
      notifyApiError(error, "Could not load order details");
    } finally {
      setDetailsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className={`${ACCOUNT_PANEL_CLASS} p-6`}>
        <div className="mb-4">
          <h2 className="font-serif text-xl font-semibold tracking-tight text-foreground">
            Recent orders
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Date, total, and status for each purchase.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <PackageSearch className="size-4" />
            No orders yet.
          </div>
        ) : (
          <ul className="space-y-3">
            {orders.map((order) => (
              <li
                key={order.id}
                className="rounded-xl border border-border/60 bg-white/70 p-4"
              >
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1.2fr_1fr_1fr_auto] sm:items-center">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Date
                    </p>
                    <p className="text-sm font-medium">{formatOrderDate(order.createdAt)}</p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Total
                    </p>
                    <p className="text-sm font-medium">{formatPriceUsd(order.totalCents)}</p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Status
                    </p>
                    <p className="text-sm font-medium">
                      {order.statusLabel ?? order.status}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => void handleOpenOrder(order.id)}
                      className="inline-flex items-center gap-1 rounded-lg"
                    >
                      View
                      <ChevronRight className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {detailsLoading ? (
        <div className={`${ACCOUNT_PANEL_CLASS} p-6`}>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Loading order summary...
          </div>
        </div>
      ) : null}

      {!detailsLoading && selectedOrder ? (
        <div className={`${ACCOUNT_PANEL_CLASS} p-6`}>
          <h3 className="font-serif text-lg font-semibold tracking-tight text-foreground">
            Order summary
          </h3>

          <div className="mt-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium text-foreground">Order #{selectedOrder.id}</p>
              <p className="text-sm text-muted-foreground">
                {formatOrderDate(selectedOrder.createdAt)}
              </p>
            </div>

            <p className="mb-3 text-sm text-muted-foreground">
              Status: {selectedOrder.statusLabel ?? selectedOrder.status}
            </p>

            <ul className="space-y-2">
              {selectedOrder.items.map((item) => (
                <li
                  key={`${selectedOrder.id}-${item.giftId}`}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border/50 bg-white/60 px-3 py-2 text-sm"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <img
                      src={resolveGiftImageUrl(item.photoUrl)}
                      alt={item.giftName}
                      className="size-10 shrink-0 rounded-md object-cover"
                    />
                    <span className="min-w-0 truncate">
                      {item.giftName} x{item.quantity}
                    </span>
                  </div>
                  <span className="shrink-0 font-medium">
                    {formatPriceUsd(item.subtotalCents)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t border-border/60 pt-3 text-right font-semibold">
              Total: {formatPriceUsd(selectedOrder.totalCents)}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
