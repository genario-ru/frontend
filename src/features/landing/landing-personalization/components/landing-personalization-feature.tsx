import { ButtonLink } from "@/shared/components/ui/button-link";
import { cn } from "@/shared/utils/cn";

import { LandingSectionHeader } from "../../landing-section-header/components/landing-section-header";
import type { LandingPersonalizationFeature } from "../types/landing-personalization-feature";

export function LandingPersonalizationFeature({
  image,
  title,
  description,
  buttonLinkText = "Попробовать бесплатно",
  inverseOrder,
}: LandingPersonalizationFeature) {
  return (
    <div className="grid w-full grid-cols-2 items-center gap-12">
      <div className="rounded-6 from-neutral-8 to-accent-6 bg-linear-to-b p-8">
        <img
          src={image}
          alt="Feature screenshot"
          className="rounded-4 h-full w-full"
        />
      </div>
      <div
        className={cn("flex flex-col gap-6", {
          "-order-1": inverseOrder,
        })}
      >
        <LandingSectionHeader
          title={title}
          description={description}
          align="left"
        />
        <ButtonLink size="lg" to="/sign-in">
          {buttonLinkText}
        </ButtonLink>
      </div>
    </div>
  );
}
