import { LucideIcon } from "@/shared/components/ui/lucide-icon";

import { waitlistLandingPossibilitiesList } from "../constants/waitlist-landing-possibilities-list";
import { WaitlistLandingPossibilitiesCard } from "./waitlist-landing-possibilities-card";

export function WaitlistLandingPossibilitiesList() {
  return (
    <div className="grid w-full gap-3 md:grid-cols-2">
      {waitlistLandingPossibilitiesList.map(
        ({ icon, iconColor, title, description, disabled }, index) => (
          <WaitlistLandingPossibilitiesCard
            key={`waitlist-landing-possibilities-card-${index}`}
            icon={<LucideIcon icon={icon} style={{ stroke: iconColor }} />}
            title={title}
            description={description}
            disabled={disabled}
          />
        ),
      )}
    </div>
  );
}
