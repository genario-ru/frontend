import { useCallback, useMemo, useState } from "react";

import { useGetActiveSubscriptionTariff } from "@/actions/subscriptions/hooks/use-get-active-subscription-tariff";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

export function useScenarioAppMenubarMoreActions() {
  const { isMobile } = useBreakpoints();
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
  const { activeSubscriptionTariff } = useGetActiveSubscriptionTariff();

  const isExportAvailable = useMemo(() => {
    return activeSubscriptionTariff?.exportAvailable ?? false;
  }, [activeSubscriptionTariff]);

  const isVersionHistoryAvailable = useMemo(() => {
    return activeSubscriptionTariff?.versionHistoryAvailable ?? false;
  }, [activeSubscriptionTariff]);

  const handleDropdownMenuClose = useCallback(() => {
    setIsDropdownMenuOpen(false);
  }, []);

  return {
    isMobile,
    isDropdownMenuOpen,
    isExportAvailable,
    isVersionHistoryAvailable,
    setIsDropdownMenuOpen,
    handleDropdownMenuClose,
  };
}
