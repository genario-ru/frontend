import { partition } from "es-toolkit";
import { useTheme } from "next-themes";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
  TariffCard,
  TariffCardSkeleton,
} from "@/features/tariffs/tariff-card/components/tariff-card";
import { TariffCardPrimaryAction } from "@/features/tariffs/tariff-card/components/tariff-card-primary-action";
import { TariffCardSecondaryAction } from "@/features/tariffs/tariff-card/components/tariff-card-secondary-action";
import { ItemsList } from "@/shared/components/common/items-list";
import { NBSP, RUBLE_SIGN } from "@/shared/constants/unicode";
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
          count={3}
          item={<TariffCardSkeleton className="bg-neutral-3/60" />}
          className="flex flex-col gap-3 lg:flex-row"
          itemClassName="opacity-60 lg:flex-1"
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

        const primaryActionTitle = hasTrial
          ? `Попробовать ${t("common.days_count.days", { count: trialTariffDurationDays })} за ${trialTariffPrice}${NBSP}${RUBLE_SIGN}`
          : `Оформить за ${tariff.price}${NBSP}${RUBLE_SIGN}/мес`;

        const primaryActionSubtitle = hasTrial
          ? `Затем ${tariff.price}${NBSP}${RUBLE_SIGN}/мес`
          : undefined;

        const primaryAction = (
          <TariffCardPrimaryAction
            title={primaryActionTitle}
            subtitle={primaryActionSubtitle}
            to="/payment-redirect"
            search={{
              tariffSlug: tariff.slug,
              trialTariffSlug: trialTariffData?.data.slug,
            }}
            variant={isPreferredTariff ? "accent" : "neutral"}
            priority={isDarkTheme || isPreferredTariff ? "primary" : "tertiary"}
          />
        );

        const secondaryAction = hasTrial && (
          <TariffCardSecondaryAction
            to="/payment-redirect"
            search={{
              tariffSlug: tariff.slug,
            }}
            title="Оформить без пробного периода"
            className={cn({
              "text-neutral-1/70 hover:text-neutral-1": inverseColors,
            })}
          />
        );

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
            className={cn("h-full w-full lg:flex-1", {
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

  return (
    <div className="flex w-full flex-col items-stretch gap-3 lg:flex-row lg:items-center">
      {list}
    </div>
  );
}
