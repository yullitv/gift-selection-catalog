import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

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
import { type AuthRedirectState } from "@/constants/routes";
import { BRAND_SUBMIT_BUTTON_CLASS } from "@/constants/uiClasses";
import { applyLoginFormErrors, login as loginUser } from "@/lib/auth/authApi";
import { resolveAuthRedirect } from "@/lib/auth/resolveAuthRedirect";
import { setAccessToken, setCurrentUser } from "@/lib/auth/authStorage";
import { reconcileCartAfterLogin } from "@/lib/cart/syncCartToServer";
import { notifyError, notifySuccess } from "@/lib/notify";
import { loginSchema, type LoginFormValues } from "@/schemas/loginSchema";

const defaultValues: LoginFormValues = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const requestedFrom =
    (location.state as AuthRedirectState | null)?.from ?? null;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues,
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      const res = await loginUser(values);

      setAccessToken(res.accessToken);
      setCurrentUser(res.user);

      if (res.user.role !== "ADMIN") {
        try {
          await reconcileCartAfterLogin();
        } catch {
          // Cart remains in localStorage if server sync fails.
        }
      }

      notifySuccess("Welcome back!");
      navigate(resolveAuthRedirect(res.user.role, requestedFrom), { replace: true });
    } catch (error) {
      const toastMessage = applyLoginFormErrors(error, form.setError);
      if (toastMessage) {
        notifyError(toastMessage);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        <FormField
          control={form.control}
          name="email"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="current-password"
                  placeholder="Your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className={BRAND_SUBMIT_BUTTON_CLASS}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Signing in…
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </Form>
  );
}