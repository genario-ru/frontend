import { LandingIsland } from "@/features/landing/landing-island/components/landing-island";
import { LandingTariffsHeader } from "@/features/landing/landing-tariffs/components/landing-tariffs-header";

import { LandingTariffsList } from "./landing-tariffs-list";

export function LandingTariffs() {
  return (
    <LandingIsland className="from-neutral-8 dark:from-neutral-1 to-accent-6 isolate items-center gap-8 bg-linear-to-r">
      <LandingTariffsHeader />
      <LandingTariffsList />
    </LandingIsland>
  );
}
