import { useNavigate, useSearch } from "@tanstack/react-router";
import { debounce } from "es-toolkit";
import { type ChangeEvent, useCallback, useRef } from "react";

export function useArchiveSearch() {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { q: currentSearch } = useSearch({
    from: "/_with-auth/_with-subscription/archive",
  });

  const handleApplyArchiveSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      navigate({
        to: "/archive",
        search: (prev) => ({
          ...prev,
          q: event.target.value,
        }),
        replace: true,
      });
    },
    [navigate],
  );

  const handleResetArchiveSearch = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    navigate({
      to: "/archive",
      search: (prev) => ({
        ...prev,
        q: undefined,
      }),
      replace: true,
    });
  }, [navigate]);

  const handleApplyArchiveSearchDebounced = debounce(
    handleApplyArchiveSearch,
    1000,
  );

  return {
    inputRef,
    currentSearch,
    handleApplyArchiveSearchDebounced,
    handleResetArchiveSearch,
  };
}
