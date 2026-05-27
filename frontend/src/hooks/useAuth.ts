import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/constants/routes";
import { clearAccessToken, isAuthenticated } from "@/lib/auth/authStorage";
import { notifySuccess } from "@/lib/notify";

export function useAuth() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(isAuthenticated);

  useEffect(() => {
    const sync = () => setLoggedIn(isAuthenticated());
    window.addEventListener("auth-change", sync);
    return () => window.removeEventListener("auth-change", sync);
  }, []);

  const logout = useCallback(() => {
    clearAccessToken();
    notifySuccess("Signed out");
    navigate(ROUTES.login);
  }, [navigate]);

  return { isAuthenticated: loggedIn, logout };
}
