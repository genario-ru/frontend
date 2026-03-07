import { partition } from "es-toolkit";
import { useTheme } from "next-themes";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { LandingTariffsCardPrimaryAction } from "@/features/landing/landing-tariffs/components/landing-tariffs-card-primary-action";
import { LandingTariffsCardSecondaryAction } from "@/features/landing/landing-tariffs/components/landing-tariffs-card-secondary-action";
import {
  TariffCard,
  TariffCardSkeleton,
} from "@/features/tariffs/components/tariff-card";
import { ItemsList } from "@/shared/components/common/items-list";
import { NBSP, RUBBLE_SIGN } from "@/shared/constants/unicode";
import { cn } from "@/shared/utils/cn";

import { useLandingTariffsList } from "../hooks/use-landing-tariffs-list";

export function LandingTariffsList() {
  const { t } = useTranslation();
  const { resolvedTheme } = useTheme();

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
          noParent
          row
          count={3}
          item={<TariffCardSkeleton className="bg-neutral-3/60" />}
          itemClassName="flex-1 opacity-60"
        />
      );
    }

    if (tariffsData) {
      return tariffsData.data.map((tariff) => {
        const isDarkTheme = resolvedTheme !== "light";
        const isPreferredTariff = tariff.isPreferred;
        const trialTariffDurationDays = trialTariffData?.data.durationDays;
        const trialTariffPrice = trialTariffData?.data.price;
        const hasTrial = trialTariffDurationDays && trialTariffPrice;

        const inverseColors = isDarkTheme
          ? isPreferredTariff
          : !isPreferredTariff;

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
            isDarkTheme={isDarkTheme}
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
            inverseColors={inverseColors}
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
            inverseColors={inverseColors}
            primaryAction={primaryAction}
            secondaryAction={secondaryAction}
            features={features.map((feature) => feature.text)}
            limitations={limitations.map((limitation) => limitation.text)}
            className={cn("h-full flex-1", {
              "bg-neutral-1/20 dark:bg-neutral-8/20": !isPreferredTariff,
              "bg-neutral-1 dark:bg-neutral-8": isPreferredTariff,
            })}
          />
        );
      });
    }

    return null;
  }, [
    t,
    resolvedTheme,
    tariffsData,
    trialTariffData,
    isTariffsLoading,
    isTrialTariffLoading,
  ]);

  return <div className="flex w-full items-center gap-2">{list}</div>;
}
