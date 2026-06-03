import { ClipboardList, UserRound } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import OrderHistoryTab from "@/components/account/OrderHistoryTab";
import ProfileTab from "@/components/account/ProfileTab";
import AccountShell, { type AccountNavItem } from "@/components/layout/AccountShell";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { fetchProfile } from "@/lib/profile/profileApi";
import type { UserProfileDto } from "@/types/profile";

type AccountTab = "profile" | "orders";

const ACCOUNT_NAV: AccountNavItem<AccountTab>[] = [
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "orders", label: "Order history", icon: ClipboardList },
];

export default function AccountPage() {
  const [tab, setTab] = useState<AccountTab>("profile");
  const [profile, setProfile] = useState<UserProfileDto | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const { isAuthenticated, isAdmin, logout } = useAuth();

  const loadProfile = useCallback(async () => {
    setProfileLoading(true);
    try {
      const data = await fetchProfile();
      setProfile(data);
    } catch {
      setProfile(null);
    } finally {
      setProfileLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated || isAdmin) {
      return;
    }

    let cancelled = false;

    async function loadInitialProfile() {
      try {
        const data = await fetchProfile();
        if (!cancelled) {
          setProfile(data);
        }
      } catch {
        if (!cancelled) {
          setProfile(null);
        }
      } finally {
        if (!cancelled) {
          setProfileLoading(false);
        }
      }
    }

    void loadInitialProfile();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, isAdmin]);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace state={{ from: ROUTES.account }} />;
  }

  if (isAdmin) {
    return <Navigate to={ROUTES.adminAccount} replace />;
  }

  const welcomeTitle = tab === "profile" ? "Manage your account" : "Your order history";

  const welcomeSubtitle =
    tab === "profile"
      ? "Update your personal details and keep your account information current."
      : "View past purchases and open any order to see what was bought.";

  const accountName = profileLoading
    ? "Loading..."
    : [profile?.lastName?.trim(), profile?.firstName?.trim()].filter(Boolean).join(" ")
      || (profile?.fullName ?? "").trim()
      || "Account";

  return (
    <AccountShell<AccountTab>
      sidebarHeader={
        <p className="font-serif text-xl font-semibold tracking-tight text-foreground">
          {accountName}
        </p>
      }
      navItems={ACCOUNT_NAV}
      activeTab={tab}
      onTabChange={setTab}
      onLogout={logout}
      header={
        <>
          <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">{welcomeTitle}</p>
          <p className="mt-1 text-sm text-muted-foreground">{welcomeSubtitle}</p>
        </>
      }
    >
      <div className={tab === "profile" ? "block" : "hidden"}>
        <ProfileTab
          profile={profile}
          profileLoading={profileLoading}
          onProfileUpdated={setProfile}
          onRetryLoad={() => void loadProfile()}
        />
      </div>

      <div className={tab === "orders" ? "block" : "hidden"}>
        <OrderHistoryTab active={tab === "orders"} />
      </div>
    </AccountShell>
  );
}
