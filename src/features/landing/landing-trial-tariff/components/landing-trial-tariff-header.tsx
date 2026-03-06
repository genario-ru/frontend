import { Badge } from "@/shared/components/ui/badge";

import {
  LandingSectionHeader,
  type LandingSectionHeaderProps,
  LandingSectionHeaderSkeleton,
} from "../../landing-section-header/components/landing-section-header";

const LANDING_TRIAL_TARIFF_BADGE = "Пробный период";

type LandingTrialTariffHeaderProps = Pick<
  LandingSectionHeaderProps,
  "title" | "description"
>;

export function LandingTrialTariffHeader({
  title,
  description,
}: LandingTrialTariffHeaderProps) {
  return (
    <LandingSectionHeader
      badge={
        <Badge color="custom" className="bg-accent-1 text-accent-6">
          {LANDING_TRIAL_TARIFF_BADGE}
        </Badge>
      }
      title={title}
      description={description}
    />
  );
}

export const LandingTrialTariffHeaderSkeleton = LandingSectionHeaderSkeleton;
