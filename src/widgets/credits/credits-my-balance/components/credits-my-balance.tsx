import { Island } from "@/shared/components/ui/island";

import { useCreditsMyBalance } from "../hooks/use-credits-my-balance";
import { getCreditsBalanceIslandTitle } from "../utils/get-credits-balance-island-title";
import { CreditsMyBalanceList } from "./credits-my-balance-list";

export function CreditsMyBalance() {
  const { totalRemaining, isMyCreditsBatchesLoading, isMyCreditsBatchesError } =
    useCreditsMyBalance();

  const title = getCreditsBalanceIslandTitle({
    totalRemaining,
    isMyCreditsBatchesLoading,
    isMyCreditsBatchesError,
  });

  return (
    <Island grow title={title} className="flex-1">
      <CreditsMyBalanceList />
    </Island>
  );
}
