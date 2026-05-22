import { ButtonLink } from "@/shared/components/ui/button-link";
import { NBSP, RUBLE_SIGN } from "@/shared/constants/unicode";
import { cn } from "@/shared/utils/cn";

import { LandingSectionHeader } from "../../landing-section-header/components/landing-section-header";
import type { LandingPersonalizationFeature } from "../types/landing-personalization-feature";

export function LandingPersonalizationFeature({
  image,
  title,
  description,
  buttonLinkText = `Попробовать 3 дня за 1${NBSP}${RUBLE_SIGN}`,
  inverseOrder,
}: LandingPersonalizationFeature) {
  return (
    <div className="grid w-full gap-6 lg:grid-cols-2 lg:items-center lg:gap-12">
      <div className="rounded-6 from-neutral-8 to-accent-6 bg-linear-to-b p-4 sm:p-6 lg:p-8">
        <img src={image} alt={title} className="rounded-4 h-full w-full" />
      </div>
      <div
        className={cn("flex flex-col gap-6", {
          "lg:-order-1": inverseOrder,
        })}
      >
        <LandingSectionHeader
          title={title}
          description={description}
          align="left"
        />
        <ButtonLink size="lg" to="/" hash="tariffs" className="w-full sm:w-fit">
          {buttonLinkText}
        </ButtonLink>
      </div>
    </div>
  );
}
