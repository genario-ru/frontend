import { Island } from "@/shared/components/ui/island";
import { ScrollContainer } from "@/shared/components/ui/scroll-container";

import { useCreditsPackages } from "../hooks/use-credits-packages";
import { CreditsPackagesList } from "./credits-packages-list";
import { CreditsPackagesListHeader } from "./credits-packages-list-header";

export function CreditsPackages() {
  const { isScrolled, scrollContainerRef } = useCreditsPackages();

  return (
    <ScrollContainer
      outerProps={{ className: "rounded-4 flex-1 bg-neutral-1" }}
      innerProps={{ ref: scrollContainerRef }}
    >
      <CreditsPackagesListHeader hasShadow={isScrolled} />
      <Island
        grow
        roundedBottom={false}
        roundedTop={false}
        className="gap-2 pt-0"
      >
        <CreditsPackagesList />
      </Island>
    </ScrollContainer>
  );
}
