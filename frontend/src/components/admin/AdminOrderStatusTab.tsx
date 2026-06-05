import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ACCOUNT_PANEL_CLASS } from "@/constants/uiClasses";
import { updateAdminOrderStatus } from "@/lib/admin/adminApi";
import { formatPriceUsd } from "@/lib/format/formatPrice";
import { notifyApiError, notifySuccess } from "@/lib/notify";
import { cn } from "@/lib/utils";
import {
  adminOrderStatusSchema,
  type AdminOrderStatusFormValues,
} from "@/schemas/adminOrderStatusSchema";
import type { OrderStatus, UpdateOrderStatusResult } from "@/types/admin";

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "PENDING_PAYMENT", label: "Pending payment" },
  { value: "IN_TRANSIT", label: "In transit" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

const defaultValues: AdminOrderStatusFormValues = {
  orderId: "",
  status: "IN_TRANSIT",
};

export default function AdminOrderStatusTab() {
  const [lastResult, setLastResult] = useState<UpdateOrderStatusResult | null>(null);
  const [highlightResult, setHighlightResult] = useState(false);

  const form = useForm<AdminOrderStatusFormValues>({
    resolver: zodResolver(adminOrderStatusSchema),
    defaultValues,
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (!highlightResult) {
      return;
    }

    const timer = window.setTimeout(() => {
      setHighlightResult(false);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [highlightResult]);

  async function onSubmit(values: AdminOrderStatusFormValues) {
    const id = Number(values.orderId);

    try {
      const updated = await updateAdminOrderStatus(id, { status: values.status });
      setLastResult(updated);
      setHighlightResult(false);
      requestAnimationFrame(() => {
        setHighlightResult(true);
      });
      form.setValue("orderId", "", { shouldDirty: false, shouldTouch: false });
      notifySuccess("Order status updated");
    } catch (error) {
      notifyApiError(error, "Could not update order status");
    }
  }

  return (
    <div className={`${ACCOUNT_PANEL_CLASS} p-6`}>
      <h2 className="mb-4 font-serif text-xl font-semibold tracking-tight text-foreground">
        Order status update
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <FormField
              control={form.control}
              name="orderId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order ID</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      placeholder="Order ID"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update status"
            )}
          </Button>
        </form>
      </Form>

      {lastResult ? (
        <div
          className={cn(
            "mt-4 rounded-lg border p-3 text-sm transition-colors duration-300",
            highlightResult
              ? "border-brand-gold/50 bg-brand-gold/10 shadow-sm"
              : "border-border/70 bg-white/70",
          )}
        >
          <p>
            <span className="font-medium">Order:</span> #{lastResult.id}
          </p>
          <p>
            <span className="font-medium">Status:</span>{" "}
            {lastResult.statusLabel ?? lastResult.status}
          </p>
          <p>
            <span className="font-medium">Total:</span> {formatPriceUsd(lastResult.totalCents)}
          </p>
        </div>
      ) : null}
    </div>
  );
}
