import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderReview from "@/components/checkout/OrderReview";
import { ROUTES } from "@/constants/routes";
import { isAuthenticated } from "@/lib/auth/authStorage";
import { fetchCart } from "@/lib/cart/cartApi";
import { getCartItems } from "@/lib/cart/cartStorage";
import { syncLocalCartToServer } from "@/lib/cart/syncCartToServer";
import { notifyApiError } from "@/lib/notify";
import { fetchProfile } from "@/lib/profile/profileApi";
import type { CartDto } from "@/types/cartApi";

type CheckoutPrefill = {
  fullName: string;
  phone: string;
  email: string;
};

export default function CheckoutPage() {
  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = useState(isAuthenticated);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartDto | null>(null);
  const [prefill, setPrefill] = useState<CheckoutPrefill>({
    fullName: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const syncAuth = () => setAuthenticated(isAuthenticated());
    window.addEventListener("auth-change", syncAuth);
    return () => window.removeEventListener("auth-change", syncAuth);
  }, []);

  useEffect(() => {
    if (!authenticated) return;

    let cancelled = false;

    async function loadCheckoutData() {
      setLoading(true);
      try {
        const profile = await fetchProfile();
        let serverCart = await fetchCart();

        if (serverCart.items.length === 0 && getCartItems().length > 0) {
          await syncLocalCartToServer();
          serverCart = await fetchCart();
        }

        if (cancelled) return;

        if (serverCart.items.length === 0) {
          navigate(ROUTES.cart, { replace: true });
          return;
        }

        const profileFullName =
          (profile.fullName ?? "").trim() ||
          `${profile.firstName ?? ""} ${profile.lastName ?? ""}`.trim();

        setCart(serverCart);
        setPrefill({
          fullName: profileFullName,
          phone: profile.phone ?? "",
          email: profile.email ?? "",
        });
      } catch (error) {
        if (!cancelled) {
          notifyApiError(error, "Could not load checkout.");
          navigate(ROUTES.cart, { replace: true });
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadCheckoutData();

    return () => {
      cancelled = true;
    };
  }, [authenticated, navigate]);

  const handleSuccess = useCallback(
    (orderId: number) => {
      navigate(ROUTES.orderSuccess, {
        replace: true,
        state: { orderId: String(orderId) },
      });
    },
    [navigate],
  );

  if (!authenticated) {
    return <Navigate to={ROUTES.login} replace state={{ from: ROUTES.checkout }} />;
  }

  if (loading || !cart) {
    return (
      <div className="flex min-h-below-header flex-1 items-center justify-center bg-brand-cream">
        <Loader2 className="size-8 animate-spin text-brand-gold" aria-hidden />
        <span className="sr-only">Loading checkout...</span>
      </div>
    );
  }

  return (
    <div className="min-h-below-header bg-brand-cream">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <header className="mb-8">
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Checkout
          </h1>
          <p className="mt-2 text-muted-foreground">
            Review your order and complete delivery details.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
          <CheckoutForm prefill={prefill} onSuccess={handleSuccess} />
          <OrderReview cart={cart} />
        </div>
      </div>
    </div>
  );
}