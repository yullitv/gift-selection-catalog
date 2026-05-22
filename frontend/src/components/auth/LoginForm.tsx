import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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
  applyLoginFormErrors,
  login as loginUser,
} from "@/lib/authApi";
import { setAccessToken } from "@/lib/authStorage";
import { loginSchema, type LoginFormValues } from "@/schemas/loginSchema";

const defaultValues: LoginFormValues = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const navigate = useNavigate();

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
      toast.success("Welcome back!");
      navigate("/");
    } catch (error) {
      const toastMessage = applyLoginFormErrors(error, form.setError);
      if (toastMessage) {
        toast.error(toastMessage);
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
          className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-xl bg-brand-gold text-white shadow-md hover:bg-brand-gold/90"
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