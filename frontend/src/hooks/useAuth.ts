import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/constants/routes";
import {
  clearAuthSession,
  getAuthRole,
  isAuthenticated,
} from "@/lib/auth/authStorage";
import { syncLocalCartToServer } from "@/lib/cart/syncCartToServer";
import { clearCart } from "@/lib/cart/cartStorage";
import { notifySuccess } from "@/lib/notify";
import type { UserRole } from "@/types/auth";

type AuthState = {
  isAuthenticated: boolean;
  role: UserRole | null;
};

function readAuthState(): AuthState {
  return {
    isAuthenticated: isAuthenticated(),
    role: getAuthRole(),
  };
}

export function useAuth() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<AuthState>(readAuthState);

  useEffect(() => {
    const sync = () => setAuth(readAuthState());
    window.addEventListener("auth-change", sync);
    return () => window.removeEventListener("auth-change", sync);
  }, []);

  const logout = useCallback(() => {
    void (async () => {
      const role = getAuthRole();
      if (isAuthenticated() && role !== "ADMIN") {
        try {
          await syncLocalCartToServer();
        } catch {
          // Best-effort; guest cart is still cleared below.
        }
        clearCart();
      }

      clearAuthSession();
      notifySuccess("Signed out");
      navigate(ROUTES.home);
    })();
  }, [navigate]);

  return {
    isAuthenticated: auth.isAuthenticated,
    role: auth.role,
    isAdmin: auth.role === "ADMIN",
    logout,
  };
}