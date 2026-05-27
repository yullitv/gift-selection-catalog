import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 text-brand-gold" />,
        info: <InfoIcon className="size-4 text-brand-gold" />,
        warning: <TriangleAlertIcon className="size-4 text-brand-gold" />,
        error: <OctagonXIcon className="size-4 text-destructive" />,
        loading: <Loader2Icon className="size-4 animate-spin text-brand-gold" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "font-sans !rounded-xl !border !border-brand-gold/30 !bg-brand-cream !text-foreground !shadow-lg",
          title: "!font-medium",
          description: "!text-muted-foreground",
          actionButton:
            "!rounded-lg !bg-brand-gold !text-white hover:!bg-brand-gold/90",
          cancelButton: "!rounded-lg !border-border",
          closeButton:
            "!rounded-md !border-border/60 !bg-white/80 hover:!bg-white",
          success: "!border-brand-gold/50",
          error: "!border-destructive/40",
          warning: "!border-brand-gold/40",
          info: "!border-brand-gold/30",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };