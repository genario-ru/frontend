import {
  LandingSectionHeader,
  type LandingSectionHeaderProps,
  LandingSectionHeaderSkeleton,
} from "../../landing-section-header/components/landing-section-header";

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
      title={title}
      description={description}
    />
  );
}

export const LandingTrialTariffHeaderSkeleton = LandingSectionHeaderSkeleton;
