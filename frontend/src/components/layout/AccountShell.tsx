import { LogOut, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import AccountBackgroundLayout from "@/components/layout/AccountBackgroundLayout";
import { Button } from "@/components/ui/button";
import { ACCOUNT_PANEL_CLASS } from "@/constants/uiClasses";
import { cn } from "@/lib/utils";

export type AccountNavItem<T extends string> = {
  id: T;
  label: string;
  icon: LucideIcon;
};

type AccountShellProps<T extends string> = {
  sidebarHeader: ReactNode;
  navItems: AccountNavItem<T>[];
  activeTab: T;
  onTabChange: (tab: T) => void;
  onLogout: () => void;
  header: ReactNode;
  children: ReactNode;
};

export default function AccountShell<T extends string>({
  sidebarHeader,
  navItems,
  activeTab,
  onTabChange,
  onLogout,
  header,
  children,
}: AccountShellProps<T>) {
  return (
    <AccountBackgroundLayout>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        <aside className={`${ACCOUNT_PANEL_CLASS} h-fit p-4`}>
          <div className="mb-4 rounded-xl border border-brand-gold/25 bg-white/80 p-4">
            {sidebarHeader}
          </div>

          <nav className="space-y-2">
            {navItems.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                type="button"
                variant="ghost"
                onClick={() => onTabChange(id)}
                className={cn(
                  "w-full justify-start rounded-xl",
                  activeTab === id && "bg-brand-gold/10 text-foreground",
                )}
              >
                <Icon className="mr-2 size-4" />
                {label}
              </Button>
            ))}

            <Button
              type="button"
              variant="ghost"
              onClick={onLogout}
              className="w-full justify-start rounded-xl text-muted-foreground hover:text-foreground"
            >
              <LogOut className="mr-2 size-4" />
              Logout
            </Button>
          </nav>
        </aside>

        <section className="space-y-4">
          <div className={`${ACCOUNT_PANEL_CLASS} p-6`}>{header}</div>
          {children}
        </section>
      </div>
    </AccountBackgroundLayout>
  );
}
