import { useRef } from "react";

import { useCheckScroll } from "@/shared/hooks/use-check-scroll";

export function useCreditsPackages() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const { isScrolled } = useCheckScroll({
    elementRef: scrollContainerRef,
  });

  return {
    isScrolled,
    scrollContainerRef,
  };
}
