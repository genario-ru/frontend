import { ScrollContainer } from "@/shared/components/ui/scroll-container";

import { useCreditsPackages } from "../hooks/use-credits-packages";
import { CreditsPackagesHeader } from "./credits-packages-header";
import { CreditsPackagesList } from "./credits-packages-list";

export function CreditsPackages() {
  const { isScrolled, scrollContainerRef } = useCreditsPackages();

  return (
    <ScrollContainer
      outerProps={{ className: "rounded-4 flex-1 bg-neutral-1" }}
      innerProps={{ ref: scrollContainerRef }}
    >
      <CreditsPackagesHeader hasShadow={isScrolled} />
      <CreditsPackagesList />
    </ScrollContainer>
  );
}
