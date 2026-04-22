import { useStore } from "@tanstack/react-form";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback } from "react";

import { useAppForm } from "@/lib/tanstack-form";
import { useFormHandlers } from "@/lib/tanstack-form/hooks/use-form-handlers";

import type { ArchiveSearchFormSchema } from "../types/archive-search-form-types";

export function useArchiveSearch() {
  const navigate = useNavigate();

  const { q: urlQuery = "" } = useSearch({
    from: "/_with-auth/_with-subscription/archive",
  });

  const form = useAppForm({
    defaultValues: {
      q: urlQuery,
    } satisfies ArchiveSearchFormSchema,
    onSubmit: ({ value }) => {
      navigate({
        to: "/archive",
        search: (prev) => ({
          ...prev,
          q: value.q === "" ? undefined : value.q,
        }),
        replace: true,
      });
    },
  });

  const { onFormSubmit } = useFormHandlers({ form });
  const draftQuery = useStore(form.store, (state) => state.values.q);
  const isDraftDirty = draftQuery !== urlQuery;
  const hasCommittedQuery = urlQuery !== "";

  const resetArchiveSearch = useCallback(() => {
    form.reset({ q: "" });
    navigate({
      to: "/archive",
      search: (prev) => ({
        ...prev,
        q: undefined,
      }),
      replace: true,
    });
  }, [form, navigate]);

  return {
    form,
    hasCommittedQuery,
    isDraftDirty,
    onFormSubmit,
    resetArchiveSearch,
  };
}
