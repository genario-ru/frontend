import { ScrollContainer } from "@/shared/components/ui/scroll-container";

import { useCreditsUsage } from "../hooks/use-credits-usage";
import { CreditsUsageHeader } from "./credits-usage-header";
import { CreditsUsageList } from "./credits-usage-list";

export function CreditsUsage() {
  const { scrollContainerRef, isScrolled } = useCreditsUsage();

  return (
    <ScrollContainer
      outerProps={{ className: "rounded-4 bg-neutral-1 h-full" }}
      innerProps={{ ref: scrollContainerRef }}
    >
      <CreditsUsageHeader hasShadow={isScrolled} />
      <CreditsUsageList />
    </ScrollContainer>
  );
}
