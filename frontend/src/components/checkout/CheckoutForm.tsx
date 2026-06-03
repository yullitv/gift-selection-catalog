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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CHECKOUT_PAYMENT_OPTIONS } from "@/constants/checkoutPayment";
import {
  BRAND_PANEL_CLASS,
  BRAND_PRIMARY_BUTTON_FULL_CLASS,
} from "@/constants/uiClasses";
import { clearCart } from "@/lib/cart/cartStorage";
import { notifyApiError } from "@/lib/notify";
import { createOrder } from "@/lib/orders/ordersApi";
import { cn } from "@/lib/utils";
import {
  checkoutSchema,
  type CheckoutFormValues,
} from "@/schemas/checkoutSchema";

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

  return (
    <div className={`${BRAND_PANEL_CLASS} bg-white/95 p-5 sm:p-6`}>
      <h2 className="font-serif text-lg font-semibold text-foreground sm:text-xl">
        Shipping & delivery
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async () => {
            try {
              const order = await createOrder();
              clearCart();
              onSuccess(order.id);
            } catch (error) {
              notifyApiError(error, "Checkout failed. Please try again.");
            }
          })}
          className="mt-5 space-y-4"
          noValidate
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="recipientFullName"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
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
          </div>

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

          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Payment method</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="grid gap-3 md:grid-cols-2"
                  >
                    {CHECKOUT_PAYMENT_OPTIONS.map((option) => (
                      <FormItem key={option.value} className="space-y-0">
                        <label
                          htmlFor={`payment-${option.value}`}
                          className={cn(
                            "flex h-full min-h-[4.5rem] cursor-pointer items-start gap-3 rounded-xl border border-border/60 bg-white px-3 py-3 transition-colors sm:px-4",
                            field.value === option.value &&
                              "border-brand-gold/50 ring-1 ring-brand-gold/30",
                          )}
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={option.value}
                              id={`payment-${option.value}`}
                              className="mt-0.5"
                            />
                          </FormControl>
                          <span className="min-w-0 flex-1">
                            <Label
                              htmlFor={`payment-${option.value}`}
                              className="cursor-pointer font-medium text-foreground"
                            >
                              {option.label}
                            </Label>
                            <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                              {option.description}
                            </span>
                          </span>
                        </label>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="border-t border-border/50 pt-5">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className={`shadow-md ${BRAND_PRIMARY_BUTTON_FULL_CLASS}`}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Placing order...
                </>
              ) : (
                "Place order"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
