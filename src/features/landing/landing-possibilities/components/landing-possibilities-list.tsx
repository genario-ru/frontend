import { LucideIcon } from "@/shared/components/ui/lucide-icon";

import { landingPossibilitiesList } from "../constants/landing-possibilities-list";
import { LandingPossibilitiesCard } from "./landing-possibilities-card";

export function LandingPossibilitiesList() {
  return (
    <div className="flex w-full flex-col gap-3 lg:flex-row">
      {landingPossibilitiesList.map(
        ({ icon, iconColor, title, description, disabled, soon }, index) => (
          <LandingPossibilitiesCard
            key={`landing-possibilities-card-${index}`}
            icon={<LucideIcon icon={icon} style={{ stroke: iconColor }} />}
            title={title}
            description={description}
            disabled={disabled}
            soon={soon}
          />
        ),
      )}
    </div>
  );
}
