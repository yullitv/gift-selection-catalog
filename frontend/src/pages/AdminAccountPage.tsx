import { ClipboardCheck, Gift, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

import AdminGiftsTab from "@/components/admin/AdminGiftsTab";
import AdminOrderStatusTab from "@/components/admin/AdminOrderStatusTab";
import AccountShell, { type AccountNavItem } from "@/components/layout/AccountShell";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";

type AdminTab = "gifts" | "orders";

const ADMIN_NAV: AccountNavItem<AdminTab>[] = [
  { id: "gifts", label: "Gifts", icon: Gift },
  { id: "orders", label: "Order status", icon: ClipboardCheck },
];

export default function AdminAccountPage() {
  const [tab, setTab] = useState<AdminTab>("gifts");
  const { isAuthenticated, isAdmin, logout } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace state={{ from: ROUTES.adminAccount }} />;
  }

  if (!isAdmin) {
    return <Navigate to={ROUTES.account} replace />;
  }

  return (
    <AccountShell<AdminTab>
      sidebarHeader={
        <>
          <p className="font-serif text-xl font-semibold tracking-tight text-foreground">
            Admin panel
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage gifts and order statuses
          </p>
        </>
      }
      navItems={ADMIN_NAV}
      activeTab={tab}
      onTabChange={setTab}
      onLogout={logout}
      header={
        <>
          <h1 className="inline-flex items-center gap-2 font-serif text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            <ShieldCheck className="size-6" />
            Administrator account
          </h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Use this area to manage products and update order statuses.
          </p>
        </>
      }
    >
      <div className={tab === "gifts" ? "block" : "hidden"}>
        <AdminGiftsTab />
      </div>

      <div className={tab === "orders" ? "block" : "hidden"}>
        <AdminOrderStatusTab />
      </div>
    </AccountShell>
  );
}
