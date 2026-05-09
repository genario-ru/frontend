import { LandingIsland } from "@/features/landing/landing-island/components/landing-island";
import { LandingTariffsHeader } from "@/features/landing/landing-tariffs/components/landing-tariffs-header";

import { LandingTariffsList } from "./landing-tariffs-list";

export function LandingTariffs() {
  return (
    <LandingIsland
      id="tariffs"
      className="from-neutral-8 dark:from-neutral-1 to-accent-6 isolate items-center gap-6 bg-linear-to-r sm:gap-8"
    >
      <LandingTariffsHeader />
      <LandingTariffsList />
    </LandingIsland>
  );
}
