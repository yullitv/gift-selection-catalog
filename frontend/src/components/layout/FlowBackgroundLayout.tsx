import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export const CHECKOUT_FLOW_IMAGE = "/images/payment/payment.png";
export const ORDER_SUCCESS_FLOW_IMAGE = "/images/success/success.png";

export const CHECKOUT_FLOW_INNER_CLASS =
  "max-lg:min-h-below-header lg:flex lg:h-full lg:flex-col lg:overflow-hidden py-5 lg:py-6";

type FlowBackgroundLayoutProps = {
  imageSrc: string;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
};

export default function FlowBackgroundLayout({
  imageSrc,
  children,
  className,
  innerClassName,
}: FlowBackgroundLayoutProps) {
  return (
    <div className="relative flex min-h-below-header flex-col bg-brand-cream lg:h-below-header lg:overflow-hidden">
      <img
        src={imageSrc}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 bg-brand-cream/80 backdrop-blur-[1px] lg:bg-brand-cream/75"
        aria-hidden
      />

      <div
        className={cn(
          "relative z-10 mx-auto flex w-full max-w-6xl flex-col px-4 sm:px-5 md:px-6",
          innerClassName,
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
