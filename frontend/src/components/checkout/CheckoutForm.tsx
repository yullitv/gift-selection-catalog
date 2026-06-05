import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
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
  BRAND_PANEL_CLASS,
  BRAND_PRIMARY_BUTTON_FULL_CLASS,
} from "@/constants/uiClasses";
import { clearCart } from "@/lib/cart/cartStorage";
import { notifyApiError } from "@/lib/notify";
import { createOrder } from "@/lib/orders/ordersApi";
import {
  checkoutSchema,
  type CheckoutFormValues,
} from "@/schemas/checkoutSchema";
import type { CreateOrderRequest } from "@/types/order";

type CheckoutFormProps = {
  prefill: {
    fullName: string;
    phone: string;
    email: string;
  };
  onSuccess: (orderId: number) => void;
};

const defaultValues: CheckoutFormValues = {
  recipientFullName: "",
  recipientPhone: "",
  recipientEmail: "",
  courierAddress: "",
  paymentMethod: "CARD_ONLINE",
};

function toCreateOrderRequest(values: CheckoutFormValues): CreateOrderRequest {
  return {
    recipientFullName: values.recipientFullName,
    recipientPhone: values.recipientPhone,
    recipientEmail: values.recipientEmail,
    deliveryType: "COURIER",
    courierAddress: values.courierAddress.trim(),
    paymentMethod: values.paymentMethod,
    rememberAddress: false,
  };
}

export default function CheckoutForm({ prefill, onSuccess }: CheckoutFormProps) {
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues,
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    form.reset({
      ...defaultValues,
      recipientFullName: prefill.fullName,
      recipientPhone: prefill.phone,
      recipientEmail: prefill.email,
    });
  }, [form, prefill.email, prefill.fullName, prefill.phone]);

  async function onSubmit(values: CheckoutFormValues) {
    try {
      const order = await createOrder(toCreateOrderRequest(values));
      clearCart();
      onSuccess(order.id);
    } catch (error) {
      notifyApiError(error, "Checkout failed. Please try again.");
    }
  }

  return (
    <div className={`${BRAND_PANEL_CLASS} p-6`}>
      <h2 className="font-serif text-xl font-semibold text-foreground">
        Shipping & payment
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-6 space-y-5"
          noValidate
        >
          <FormField
            control={form.control}
            name="recipientFullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input autoComplete="name" placeholder="Recipient name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recipientPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    autoComplete="tel"
                    placeholder="+1 555 123 4567"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="recipientEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="your@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="courierAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery address</FormLabel>
                <FormControl>
                  <Input placeholder="Street, building, apartment" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <fieldset className="space-y-3">
            <legend className="text-sm font-medium">Payment method</legend>
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-2">
                    <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-border/60 bg-white px-4 py-3">
                      <input
                        type="radio"
                        className="size-4 accent-brand-gold"
                        checked={field.value === "CARD_ONLINE"}
                        onChange={() => field.onChange("CARD_ONLINE")}
                      />
                      <span className="text-sm">Card online</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-border/60 bg-white px-4 py-3">
                      <input
                        type="radio"
                        className="size-4 accent-brand-gold"
                        checked={field.value === "CASH_ON_DELIVERY"}
                        onChange={() => field.onChange("CASH_ON_DELIVERY")}
                      />
                      <span className="text-sm">Cash on delivery</span>
                    </label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className={BRAND_PRIMARY_BUTTON_FULL_CLASS}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Processing payment...
              </>
            ) : (
              "Pay"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}