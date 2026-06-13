import type { ReactNode } from "react";

import { LandingHeaderLinks } from "@/features/landing/landing-header/components/landing-header-links";
import { CommonHeader } from "@/features/navigation/common-header/components/common-header";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

type LandingHeaderProps = {
  right: ReactNode;
};

export function LandingHeader({ right }: LandingHeaderProps) {
  const { isDesktop } = useBreakpoints();

  return (
    <CommonHeader left={isDesktop && <LandingHeaderLinks />} right={right} />
  );
}
