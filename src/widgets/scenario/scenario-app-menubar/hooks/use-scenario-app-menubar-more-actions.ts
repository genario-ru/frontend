import { useCallback, useMemo, useState } from "react";

import { useGetActiveSubscriptionTariff } from "@/actions/subscriptions/hooks/use-get-active-subscription-tariff";

export function useScenarioAppMenubarMoreActions() {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
  const { activeSubscriptionTariff } = useGetActiveSubscriptionTariff();

  const isExportAvailable = useMemo(() => {
    return activeSubscriptionTariff?.exportAvailable ?? false;
  }, [activeSubscriptionTariff]);

  const handleDropdownMenuClose = useCallback(() => {
    setIsDropdownMenuOpen(false);
  }, []);

  return {
    isDropdownMenuOpen,
    isExportAvailable,
    setIsDropdownMenuOpen,
    handleDropdownMenuClose,
  };
}
