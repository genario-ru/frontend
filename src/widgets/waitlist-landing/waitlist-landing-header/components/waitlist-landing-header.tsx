import type { ReactNode } from "react";

import { CommonHeader } from "@/features/navigation/common-header/components/common-header";
import { WaitlistLandingHeaderLinks } from "@/features/waitlist-landing/waitlist-landing-header/components/waitlist-landing-header-links";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

type WaitlistLandingHeaderProps = {
  right: ReactNode;
};

export function WaitlistLandingHeader({ right }: WaitlistLandingHeaderProps) {
  const { isDesktop } = useBreakpoints();

  return (
    <CommonHeader
      left={isDesktop && <WaitlistLandingHeaderLinks />}
      right={right}
    />
  );
}
