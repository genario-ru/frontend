import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { TariffCard } from "@/features/tariffs/components/tariff-card";
import { ItemsList } from "@/shared/components/common/items-list";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { NBSP, RUBBLE_SIGN } from "@/shared/constants/unicode";
import { cn } from "@/shared/utils/cn";

import { useLandingTariffsList } from "../hooks/use-landing-tariffs-list";

export function LandingTariffsList() {
  const { t } = useTranslation();

  const {
    tariffsData,
    trialTariffData,
    isTariffsLoading,
    isTrialTariffLoading,
  } = useLandingTariffsList();

  const list = useMemo(() => {
    if (isTariffsLoading || isTrialTariffLoading) {
      return (
        <ItemsList
          count={3}
          item={<Skeleton className="rounded-6 h-[400px] flex-1" />}
        />
      );
    }

    if (tariffsData) {
      return tariffsData.data.map((tariff) => {
        const isPriorityTariff = tariff.isPreferred;

        const buttonLinkTitle = trialTariffData?.data.durationDays
          ? `Попробовать ${t("common.days_count.days", { count: trialTariffData.data.durationDays })} за ${trialTariffData.data.price}${NBSP}${RUBBLE_SIGN}`
          : `Оформить за ${tariff.price}${NBSP}${RUBBLE_SIGN}`;

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
            className={cn("flex-1", {
              "bg-neutral-1/25": !isPriorityTariff,
            })}
          />
        );
      });
    }

    return null;
  }, [t, tariffsData, trialTariffData, isTariffsLoading, isTrialTariffLoading]);

  return <div className="flex w-full items-center gap-2">{list}</div>;
}
