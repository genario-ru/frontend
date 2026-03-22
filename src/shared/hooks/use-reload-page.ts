import { useCallback } from "react";

export function useReloadPage() {
  const reloadPage = useCallback(() => {
    window.location.reload();
  }, []);

  return reloadPage;
}
