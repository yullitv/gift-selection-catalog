import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import {
  clearAccessToken,
  isAuthenticated,
} from "@/lib/authStorage";

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
    toast.success("Signed out");
    navigate("/login");
  }, [navigate]);

  return { isAuthenticated: loggedIn, logout };
}