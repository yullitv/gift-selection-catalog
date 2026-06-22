import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ACCOUNT_PANEL_CLASS } from "@/constants/uiClasses";
import {
  createAdminGift,
  deleteAdminGift,
  updateAdminGift,
} from "@/lib/admin/adminApi";
import { applyAdminGiftFormErrors } from "@/lib/admin/adminGiftFormErrors";
import { formatPriceUsd } from "@/lib/format/formatPrice";
import { GIFT_FALLBACK_IMAGE } from "@/lib/gifts/giftImages";
import { fetchAllGifts } from "@/lib/gifts/giftsApi";
import { notifyApiError, notifyError, notifySuccess } from "@/lib/notify";
import {
  adminGiftSchema,
  type AdminGiftFormValues,
} from "@/schemas/adminGiftSchema";
import type { GiftUpsertRequest } from "@/types/admin";
import type { GiftAudience, GiftDto } from "@/types/gift";

const AUDIENCE_OPTIONS: GiftAudience[] = ["MAN", "WOMAN", "COUPLE", "CHILD"];

const defaultValues: AdminGiftFormValues = {
  name: "",
  description: "",
  photoUrl: "",
  priceUsd: "",
  stockQuantity: "",
  minAge: "",
  maxAge: "",
  tags: "",
  targetAudiences: ["MAN"],
};

function centsToUsdString(cents: number): string {
  const dollars = cents / 100;
  return Number.isInteger(dollars) ? String(dollars) : dollars.toFixed(2);
}

function toPayload(values: AdminGiftFormValues): GiftUpsertRequest {
  const photoUrl = values.photoUrl.trim();

  return {
    name: values.name.trim(),
    description: values.description.trim(),
    photoUrl: photoUrl || GIFT_FALLBACK_IMAGE,
    priceCents: Math.round(Number(values.priceUsd) * 100),
    stockQuantity: Number(values.stockQuantity),
    minAge: values.minAge.trim() === "" ? null : Number(values.minAge),
    maxAge: values.maxAge.trim() === "" ? null : Number(values.maxAge),
    targetAudiences: values.targetAudiences,
    tags: values.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
  };
}

function giftToForm(gift: GiftDto): AdminGiftFormValues {
  const photoUrl = (gift.photoUrl ?? gift.primaryImageUrl ?? "").trim();

  return {
    name: gift.name ?? "",
    description: gift.description ?? "",
    photoUrl: photoUrl === GIFT_FALLBACK_IMAGE ? "" : photoUrl,
    priceUsd: centsToUsdString(gift.priceCents ?? 0),
    stockQuantity: String(gift.stockQuantity ?? 0),
    minAge: gift.minAge == null ? "" : String(gift.minAge),
    maxAge: gift.maxAge == null ? "" : String(gift.maxAge),
    tags: (gift.tags ?? []).join(", "),
    targetAudiences: gift.targetAudiences?.length ? gift.targetAudiences : ["MAN"],
  };
}

function sortGiftsNewestFirst(items: GiftDto[]): GiftDto[] {
  return [...items].sort((a, b) => b.id - a.id);
}

type PendingDelete = {
  id: number;
  name: string;
};

export default function AdminGiftsTab() {
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null);
  const [gifts, setGifts] = useState<GiftDto[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const form = useForm<AdminGiftFormValues>({
    resolver: zodResolver(adminGiftSchema),
    defaultValues,
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const selectedAudiences = useWatch({
    control: form.control,
    name: "targetAudiences",
    defaultValue: defaultValues.targetAudiences,
  });

  const minAge = useWatch({ control: form.control, name: "minAge" });
  const maxAge = useWatch({ control: form.control, name: "maxAge" });

  useEffect(() => {
    void form.trigger(["minAge", "maxAge"]);
  }, [minAge, maxAge, form]);

  const upsertGiftInList = useCallback((gift: GiftDto) => {
    setGifts((prev) => {
      const index = prev.findIndex((item) => item.id === gift.id);
      if (index === -1) {
        return sortGiftsNewestFirst([gift, ...prev]);
      }
      const next = [...prev];
      next[index] = gift;
      return sortGiftsNewestFirst(next);
    });
  }, []);

  const removeGiftFromList = useCallback((id: number) => {
    setGifts((prev) => prev.filter((gift) => gift.id !== id));
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadInitialGifts() {
      try {
        const all = await fetchAllGifts({ sort: "NEWEST" });
        if (!cancelled) {
          setGifts(sortGiftsNewestFirst(all));
        }
      } catch (error) {
        if (!cancelled) {
          notifyApiError(error, "Could not load gifts");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadInitialGifts();

    return () => {
      cancelled = true;
    };
  }, []);

  function toggleAudience(audience: GiftAudience) {
    const current = form.getValues("targetAudiences");
    const exists = current.includes(audience);
    const next = exists ? current.filter((a) => a !== audience) : [...current, audience];

    form.setValue("targetAudiences", next, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }

  async function onSubmit(values: AdminGiftFormValues) {
    try {
      const payload = toPayload(values);

      const saved =
        editingId == null
          ? await createAdminGift(payload)
          : await updateAdminGift(editingId, payload);

      upsertGiftInList(saved);
      notifySuccess(editingId == null ? "Gift created" : "Gift updated");

      setEditingId(null);
      form.reset(defaultValues);
    } catch (error) {
      const toastMessage = applyAdminGiftFormErrors(error, form.setError);
      if (toastMessage) {
        notifyError(toastMessage);
      }
    }
  }

  async function confirmDelete() {
    if (!pendingDelete) {
      return;
    }

    const { id, name } = pendingDelete;

    try {
      setDeletingId(id);
      await deleteAdminGift(id);
      removeGiftFromList(id);
      notifySuccess(`Gift "${name}" deleted`);

      if (editingId === id) {
        setEditingId(null);
        form.reset(defaultValues);
      }
    } catch (error) {
      notifyApiError(error, "Could not delete gift");
    } finally {
      setDeletingId(null);
      setPendingDelete(null);
    }
  }

  const submitLabel = useMemo(
    () => (editingId == null ? "Create gift" : "Update gift"),
    [editingId],
  );

  return (
    <>
      <div className="space-y-4">
        <div className={`${ACCOUNT_PANEL_CLASS} p-6`}>
          <div className="mb-4">
            <h2 className="font-serif text-xl font-semibold tracking-tight text-foreground">
              Gift management
            </h2>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gift name</FormLabel>
                      <FormControl>
                        <Input placeholder="Gift name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="photoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Photo URL (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <p className="text-xs text-muted-foreground">
                        Leave empty to use the store logo as the product image.
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description"
                          rows={4}
                          className="resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priceUsd"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (USD)</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          inputMode="decimal"
                          placeholder="e.g. 29.99"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stockQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock quantity</FormLabel>
                      <FormControl>
                        <Input type="number" min={0} placeholder="e.g. 25" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input placeholder="gift, romantic, premium" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="minAge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min age (optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          max={maxAge.trim() === "" ? undefined : Number(maxAge)}
                          placeholder="e.g. 6"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxAge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max age (optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={minAge.trim() === "" ? 0 : Number(minAge)}
                          placeholder="e.g. 14"
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
                name="targetAudiences"
                render={() => (
                  <FormItem>
                    <FormLabel>Target audiences</FormLabel>
                    <div className="flex flex-wrap gap-2">
                      {AUDIENCE_OPTIONS.map((audience) => {
                        const active = selectedAudiences.includes(audience);
                        return (
                          <Button
                            key={audience}
                            type="button"
                            variant={active ? "default" : "outline"}
                            onClick={() => toggleAudience(audience)}
                            className="rounded-lg"
                          >
                            {audience}
                          </Button>
                        );
                      })}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    submitLabel
                  )}
                </Button>

                {editingId != null ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingId(null);
                      form.reset(defaultValues);
                    }}
                  >
                    Cancel edit
                  </Button>
                ) : null}
              </div>
            </form>
          </Form>
        </div>

        <div className={`${ACCOUNT_PANEL_CLASS} p-6`}>
          <h3 className="mb-1 font-serif text-lg font-semibold tracking-tight text-foreground">
            Existing gifts
          </h3>
          <p className="mb-3 text-xs text-muted-foreground">
            Total loaded: {gifts.length}
          </p>

          {loading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Loading gifts...
            </div>
          ) : gifts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No gifts found.</p>
          ) : (
            <ul className="space-y-2">
              {gifts.map((gift) => (
                <li
                  key={gift.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/60 bg-white/70 px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{gift.name}</p>
                    <p className="text-xs text-muted-foreground">
                      ID: {gift.id} • {formatPriceUsd(gift.priceCents)} • stock {gift.stockQuantity}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingId(gift.id);
                        form.reset(giftToForm(gift));
                      }}
                    >
                      <Pencil className="mr-1 size-3.5" />
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setPendingDelete({ id: gift.id, name: gift.name })}
                      disabled={deletingId === gift.id}
                    >
                      {deletingId === gift.id ? (
                        <>
                          <Loader2 className="mr-1 size-3.5 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 className="mr-1 size-3.5" />
                          Delete
                        </>
                      )}
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={pendingDelete != null}
        title="Delete gift"
        description={
          pendingDelete
            ? `Delete gift "${pendingDelete.name}"? This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete"
        destructive
        confirmLoading={deletingId != null}
        onConfirm={() => void confirmDelete()}
        onCancel={() => {
          if (deletingId == null) {
            setPendingDelete(null);
          }
        }}
      />
    </>
  );
}
