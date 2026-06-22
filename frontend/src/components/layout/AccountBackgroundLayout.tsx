import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type AccountBackgroundLayoutProps = {
  children: ReactNode;
  className?: string;
};

export default function AccountBackgroundLayout({
  children,
  className,
}: AccountBackgroundLayoutProps) {
  return (
    <div className="relative min-h-below-header overflow-hidden bg-brand-cream">
      <img
        src="/images/account/account.png"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 bg-brand-cream/75 backdrop-blur-[1px]"
        aria-hidden
      />

      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-10",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
