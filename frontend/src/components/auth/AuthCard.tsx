import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AuthCardProps = {
  children: ReactNode;
  className?: string;
};

export default function AuthCard({ children, className }: AuthCardProps) {
  return (
    <Card
      className={cn(
        "rounded-2xl border-border/60 bg-background/95 py-6 shadow-lg ring-1 ring-black/5 backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </Card>
  );
}