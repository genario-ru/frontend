import { partition } from "es-toolkit";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
  TariffCard,
  TariffCardSkeleton,
} from "@/features/tariffs/tariff-card/components/tariff-card";
import { TariffCardPrimaryAction } from "@/features/tariffs/tariff-card/components/tariff-card-primary-action";
import { TariffCardSecondaryAction } from "@/features/tariffs/tariff-card/components/tariff-card-secondary-action";
import { ItemsList } from "@/shared/components/common/items-list";
import { NeedSupport } from "@/shared/components/common/need-support";
import { Heading } from "@/shared/components/ui/heading";
import { Island } from "@/shared/components/ui/island";
import { NBSP, RUBLE_SIGN } from "@/shared/constants/unicode";
import { cn } from "@/shared/utils/cn";

import { useTariffsList } from "../hooks/use-tariffs-list";

export function TariffsList() {
  const { t } = useTranslation();

  const {
    tariffsData,
    trialTariffData,
    isTariffsLoading,
    isTrialTariffLoading,
  } = useTariffsList();

  const list = useMemo(() => {
    if (isTariffsLoading || isTrialTariffLoading) {
      return (
        <ItemsList
          noParent
          row
          count={3}
          item={<TariffCardSkeleton className="bg-neutral-3/60" />}
          itemClassName="flex-1"
        />
      );
    }

    if (tariffsData) {
      return tariffsData.data.map((tariff) => {
        const isPreferredTariff = tariff.isPreferred;
        const trialTariffDurationDays = trialTariffData?.data.durationDays;
        const trialTariffPrice = trialTariffData?.data.price;
        const hasTrial = trialTariffDurationDays && trialTariffPrice;

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
            priority={isPreferredTariff ? "primary" : "secondary"}
          />
        );

        const secondaryAction = hasTrial ? (
          <TariffCardSecondaryAction
            to="/payment-redirect"
            search={{
              tariffSlug: tariff.slug,
            }}
            title="Оформить без пробного периода"
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
            primaryAction={primaryAction}
            secondaryAction={secondaryAction}
            features={features.map((feature) => feature.text)}
            limitations={limitations.map((limitation) => limitation.text)}
            className={cn("flex-1", {
              "bg-neutral-2": isPreferredTariff,
              "border-neutral-3 border": !isPreferredTariff,
            })}
          />
        );
      });
    }

    return null;
  }, [t, tariffsData, trialTariffData, isTariffsLoading, isTrialTariffLoading]);

  return (
    <Island className="h-fit min-h-[520px] max-w-7xl items-center justify-between gap-8 p-6">
      <header className="flex max-w-3xl flex-col items-center gap-2">
        <Heading className="text-2xl font-semibold lg:text-3xl">Тарифы</Heading>
        <p className="text-neutral-7 text-center lg:text-lg">
          Создавайте сценарии для видео за минуты, а не часы, Создавайте
          сценарии для видео за минуты, а не часы, Создавайте сценарии
        </p>
      </header>
      <div className="flex w-full flex-col gap-2 lg:flex-row">{list}</div>
      <NeedSupport className="mx-auto text-sm" />
    </Island>
  );
}
