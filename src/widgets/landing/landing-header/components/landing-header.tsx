import { LandingHeaderActions } from "@/features/landing/landing-header/components/landing-header-actions";
import { LandingHeaderLinks } from "@/features/landing/landing-header/components/landing-header-links";
import { CommonHeader } from "@/features/navigation/common-header/components/common-header";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

export function LandingHeader() {
  const { isDesktop } = useBreakpoints();

  return (
    <CommonHeader
      left={isDesktop && <LandingHeaderLinks />}
      right={<LandingHeaderActions />}
    />
  );
}
