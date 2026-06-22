import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderReview from "@/components/checkout/OrderReview";
import FlowBackgroundLayout, {
  CHECKOUT_FLOW_IMAGE,
  CHECKOUT_FLOW_INNER_CLASS,
} from "@/components/layout/FlowBackgroundLayout";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
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
  const { isAdmin } = useAuth();

  const [authenticated, setAuthenticated] = useState(isAuthenticated);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartDto | null>(null);
  const [prefill, setPrefill] = useState<CheckoutPrefill>({
    fullName: "",
    phone: "",
    email: "",
  });
  const loadSeqRef = useRef(0);

  useEffect(() => {
    const syncAuth = () => setAuthenticated(isAuthenticated());
    window.addEventListener("auth-change", syncAuth);
    return () => window.removeEventListener("auth-change", syncAuth);
  }, []);

  useEffect(() => {
    if (!authenticated || isAdmin) return;

    const loadSeq = ++loadSeqRef.current;

    async function loadCheckoutData() {
      setLoading(true);
      try {
        const profile = await fetchProfile();
        const localItems = getCartItems();

        const serverCart =
          localItems.length > 0
            ? await syncLocalCartToServer()
            : await fetchCart();

        if (loadSeq !== loadSeqRef.current) return;

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
        if (loadSeq === loadSeqRef.current) {
          notifyApiError(error, "Could not load checkout.");
          navigate(ROUTES.cart, { replace: true });
        }
      } finally {
        if (loadSeq === loadSeqRef.current) {
          setLoading(false);
        }
      }
    }

    void loadCheckoutData();

  }, [authenticated, isAdmin, navigate]);

  const handleSuccess = useCallback(
    (orderId: number) => {
      navigate(ROUTES.orderSuccess, {
        replace: true,
        state: { orderId: String(orderId) },
      });
    },
    [navigate],
  );

  if (isAdmin) {
    return <Navigate to={ROUTES.adminAccount} replace />;
  }

  if (!authenticated) {
    return <Navigate to={ROUTES.login} replace state={{ from: ROUTES.checkout }} />;
  }

  if (loading || !cart) {
    return (
      <FlowBackgroundLayout
        imageSrc={CHECKOUT_FLOW_IMAGE}
        className="items-center justify-center"
        innerClassName={CHECKOUT_FLOW_INNER_CLASS}
      >
        <Loader2 className="size-8 animate-spin text-brand-gold" aria-hidden />
        <span className="sr-only">Loading checkout...</span>
      </FlowBackgroundLayout>
    );
  }

  return (
    <FlowBackgroundLayout
      imageSrc={CHECKOUT_FLOW_IMAGE}
      innerClassName={CHECKOUT_FLOW_INNER_CLASS}
    >
      <header className="mb-5 shrink-0 lg:mb-6">
        <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Checkout
        </h1>
        <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Review your order and complete delivery details.
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col pb-2 lg:overflow-hidden lg:pb-0">
        <div className="flex flex-col gap-5 sm:gap-6 lg:min-h-0 lg:flex-1 lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start lg:gap-6 lg:overflow-y-auto xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="order-1 lg:order-2">
            <OrderReview cart={cart} />
          </div>
          <div className="order-2 lg:order-1">
            <CheckoutForm prefill={prefill} onSuccess={handleSuccess} />
          </div>
        </div>
      </div>
    </FlowBackgroundLayout>
  );
}