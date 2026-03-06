import { CheckIcon } from "lucide-react";

import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";

type LandingTrialTariffFeatureProps = {
  text: string;
};

export function LandingTrialTariffFeature({
  text,
}: LandingTrialTariffFeatureProps) {
  return (
    <div className="flex items-center gap-2.5">
      <LucideIcon size="xl" color="positive" icon={CheckIcon} />
      <p className="text-2xl">{text}</p>
    </div>
  );
}

export function LandingTrialTariffFeatureSkeleton() {
  return (
    <div className="flex items-center gap-2.5">
      <Skeleton className="rounded-2 size-8" />
      <TextSkeleton fontSize={24} lineHeight={32} className="w-96" />
    </div>
  );
}
