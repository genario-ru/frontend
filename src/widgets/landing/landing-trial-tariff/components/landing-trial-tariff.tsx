import { LandingIsland } from "@/features/landing/landing-island/components/landing-island";
import {
  LandingTrialTariffFeature,
  LandingTrialTariffFeatureSkeleton,
} from "@/features/landing/landing-trial-tariff/components/landing-trial-tariff-feature";
import {
  LandingTrialTariffHeader,
  LandingTrialTariffHeaderSkeleton,
} from "@/features/landing/landing-trial-tariff/components/landing-trial-tariff-header";
import { ItemsList } from "@/shared/components/common/items-list";

import { useLandingTrialTariff } from "../hooks/use-landing-trial-tariff";

export function LandingTrialTariff() {
  const { trialTariffData, isTrialTariffLoading } = useLandingTrialTariff();

  if (isTrialTariffLoading) {
    return <LandingTrialTariffSkeleton />;
  }

  if (!trialTariffData) {
    return null;
  }

  return (
    <LandingIsland className="items-center gap-8 lg:gap-12">
      <LandingTrialTariffHeader
        title={trialTariffData.data.name}
        description={trialTariffData.data.description}
      />
      <div className="grid w-full max-w-[1000px] gap-4 sm:gap-6 md:grid-cols-2">
        {trialTariffData.data.features.map((feature, index) =>
          feature.included ? (
            <LandingTrialTariffFeature
              key={`trial-tariff-feature-${index}`}
              text={feature.text}
            />
          ) : null,
        )}
      </div>
    </LandingIsland>
  );
}

function LandingTrialTariffSkeleton() {
  return (
    <LandingIsland className="items-center gap-8 lg:gap-12">
      <LandingTrialTariffHeaderSkeleton />
      <ItemsList
        count={6}
        item={<LandingTrialTariffFeatureSkeleton />}
        className="grid w-full max-w-[1000px] gap-4 sm:gap-6 md:grid-cols-2"
      />
    </LandingIsland>
  );
}
