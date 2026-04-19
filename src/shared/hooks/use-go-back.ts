import { useRouter } from "@tanstack/react-router";
import { useCallback } from "react";

export function useGoBack() {
  const router = useRouter();

  const handleGoBack = useCallback(() => {
    router.history.back();
  }, [router]);

  return handleGoBack;
}
