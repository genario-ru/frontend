import { Island } from "@/shared/components/ui/island";

import { useCreditsPackagesList } from "../hooks/use-credits-packages-list";
import { CreditsPackagesList } from "./credits-packages-list";

export function CreditsPackages() {
  const state = useCreditsPackagesList();

  return (
    <Island grow title="Пакеты кредитов" className="flex-1">
      <CreditsPackagesList
        cardViews={state.cardViews}
        popularPackageId={state.popularPackageId}
        isCreditsPackagesLoading={state.isCreditsPackagesLoading}
        isCreditsPackagesError={state.isCreditsPackagesError}
        isInitiateCreditsPackagePaymentPending={
          state.isInitiateCreditsPackagePaymentPending
        }
        onPurchase={state.handlePurchase}
      />
    </Island>
  );
}
