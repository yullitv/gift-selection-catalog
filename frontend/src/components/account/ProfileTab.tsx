import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, RefreshCw, Save } from "lucide-react";
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
import { ACCOUNT_PANEL_CLASS } from "@/constants/uiClasses";
import { notifyError, notifySuccess } from "@/lib/notify";
import { applyProfileFormErrors } from "@/lib/profile/profileFormErrors";
import { updateProfile } from "@/lib/profile/profileApi";
import { profileSchema, type ProfileFormValues } from "@/schemas/profileSchema";
import type { UserProfileDto } from "@/types/profile";

type ProfileTabProps = {
  profile: UserProfileDto | null;
  profileLoading: boolean;
  onProfileUpdated?: (profile: UserProfileDto) => void;
  onRetryLoad?: () => void;
};

export default function ProfileTab({
  profile,
  profileLoading,
  onProfileUpdated,
  onRetryLoad,
}: ProfileTabProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (!profile) {
      return;
    }

    form.reset({
      firstName: (profile.firstName ?? "").trim(),
      lastName: (profile.lastName ?? "").trim(),
      phone: profile.phone ?? "",
    });
  }, [profile, form]);

  async function onSubmit(values: ProfileFormValues) {
    try {
      const updated = await updateProfile({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        phone: values.phone.trim(),
      });

      onProfileUpdated?.(updated);

      form.reset({
        firstName: (updated.firstName ?? "").trim(),
        lastName: (updated.lastName ?? "").trim(),
        phone: updated.phone ?? "",
      });

      notifySuccess("Saved successfully");
    } catch (error) {
      const toastMessage = applyProfileFormErrors(error, form.setError);
      if (toastMessage) {
        notifyError(toastMessage);
      }
    }
  }

  if (profileLoading) {
    return (
      <div className={`${ACCOUNT_PANEL_CLASS} p-6`}>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="size-4 animate-spin" aria-hidden />
          Loading profile...
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className={`${ACCOUNT_PANEL_CLASS} p-6`}>
        <p className="text-sm text-muted-foreground">
          Could not load profile. Please try again.
        </p>
        {onRetryLoad ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3 rounded-xl"
            onClick={onRetryLoad}
          >
            <RefreshCw className="mr-2 size-4" />
            Retry
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <div className={`${ACCOUNT_PANEL_CLASS} p-6`}>
      <div className="mb-4">
        <h2 className="font-serif text-xl font-semibold tracking-tight text-foreground">
          Profile details
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Keep your information up to date.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input value={profile.email ?? ""} readOnly disabled />
            </FormControl>
          </FormItem>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surname</FormLabel>
                  <FormControl>
                    <Input placeholder="Surname" autoComplete="family-name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" autoComplete="given-name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="+1 555 123 4567"
                    autoComplete="tel"
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
            className="inline-flex h-10 rounded-xl bg-brand-gold px-4 text-white hover:bg-brand-gold/90"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 size-4" />
                Save
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
