import { partition } from "es-toolkit";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { LandingTariffsCardPrimaryAction } from "@/features/landing/landing-tariffs/components/landing-tariffs-card-primary-action";
import { LandingTariffsCardSecondaryAction } from "@/features/landing/landing-tariffs/components/landing-tariffs-card-secondary-action";
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
        const isPreferredTariff = tariff.isPreferred;
        const trialTariffDurationDays = trialTariffData?.data.durationDays;
        const trialTariffPrice = trialTariffData?.data.price;
        const hasTrial = trialTariffDurationDays && trialTariffPrice;

        const primaryAction = (
          <LandingTariffsCardPrimaryAction
            title={
              hasTrial
                ? `Попробовать ${t("common.days_count.days", { count: trialTariffDurationDays })} за ${trialTariffPrice}${NBSP}${RUBBLE_SIGN}`
                : `Оформить за ${tariff.price}${NBSP}${RUBBLE_SIGN}/мес`
            }
            subtitle={
              hasTrial
                ? `Затем ${tariff.price}${NBSP}${RUBBLE_SIGN}/мес`
                : undefined
            }
            to="/sign-in"
            search={{
              tariffSlug: tariff.slug,
              trialTariffSlug: trialTariffData?.data.slug,
            }}
            isPreferredTariff={isPreferredTariff}
          />
        );

        const secondaryAction = hasTrial ? (
          <LandingTariffsCardSecondaryAction
            to="/sign-in"
            search={{
              tariffSlug: tariff.slug,
            }}
            title="Оформить без пробного периода"
            inverseColors={!isPreferredTariff}
          />
        ) : undefined;

        const [features, limitations] = partition(
          tariff.features,
          (feature) => feature.included,
        );

        return (
          <TariffCard
            key={`tariff-${tariff.id}`}
            name={tariff.name}
            description={tariff.description}
            price={tariff.price}
            oldPrice={tariff.oldPrice}
            inverseColors={!isPreferredTariff}
            primaryAction={primaryAction}
            secondaryAction={secondaryAction}
            features={features.map((feature) => feature.text)}
            limitations={limitations.map((limitation) => limitation.text)}
            className={cn("h-full flex-1", {
              "bg-neutral-1/25": !isPreferredTariff,
            })}
          />
        );
      });
    }

    return null;
  }, [t, tariffsData, trialTariffData, isTariffsLoading, isTrialTariffLoading]);

  return <div className="flex w-full items-center gap-2">{list}</div>;
}
