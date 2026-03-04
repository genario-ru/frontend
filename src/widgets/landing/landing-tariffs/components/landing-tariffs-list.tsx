import { useMemo } from "react";

import { TariffCard } from "@/features/tariffs/components/tariff-card";
import { ItemsList } from "@/shared/components/common/items-list";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { RUBBLE_SIGN } from "@/shared/constants/unicode";

import { useLandingTariffsList } from "../hooks/use-landing-tariffs-list";

export function LandingTariffsList() {
  const { tariffsData, isTariffsLoading } = useLandingTariffsList();

  const list = useMemo(() => {
    if (isTariffsLoading) {
      return (
        <ItemsList
          count={3}
          item={<Skeleton className="rounded-6 h-[400px] flex-1" />}
        />
      );
    }

    if (tariffsData) {
      return tariffsData.data.map((tariff) => {
        const isPriorityTariff = tariff.priority;
        let buttonLinkTitle = `Оформить за ${tariff.price} ${RUBBLE_SIGN}`;

        if (tariff.trial) {
          const tariffTrialPrice = tariff.trial.price;
          const tariffTrialDurationDays = tariff.trial.durationDays;

          buttonLinkTitle = `Попробовать ${tariffTrialDurationDays} за ${tariffTrialPrice} ${RUBBLE_SIGN}`;
        }

        return (
          <TariffCard
            key={`tariff-${tariff.id}`}
            name={tariff.name}
            description={tariff.description}
            price={tariff.price}
            oldPrice={tariff.oldPrice}
            inverseColors={!isPriorityTariff}
            buttonLinkTitle={buttonLinkTitle}
            buttonLinkProps={{
              to: "/sign-in",
              variant: isPriorityTariff ? "accent" : "neutral",
              priority: isPriorityTariff ? "primary" : "secondary",
            }}
          />
        );
      });
    }

    return null;
  }, [tariffsData, isTariffsLoading]);

  return <div className="flex w-full items-center">{list}</div>;
}
