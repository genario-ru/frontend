import type { ProductFeatureSchema } from "@/codegen/api/product";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";

import { WaitlistLandingPossibilitiesCard } from "./waitlist-landing-possibilities-card";

type WaitlistLandingPossibilitiesListProps = {
  productFeatures: ProductFeatureSchema[];
};

export function WaitlistLandingPossibilitiesList({
  productFeatures,
}: WaitlistLandingPossibilitiesListProps) {
  return (
    <div className="grid w-full gap-3 md:grid-cols-2">
      {productFeatures.map((productFeature) => (
        <WaitlistLandingPossibilitiesCard
          key={productFeature.id}
          icon={
            <LucideIcon
              icon={productFeature.icon}
              style={{ stroke: productFeature.color }}
            />
          }
          title={productFeature.name}
          description={productFeature.description}
          disabled={!productFeature.available}
          soon={!productFeature.available}
        />
      ))}
    </div>
  );
}
