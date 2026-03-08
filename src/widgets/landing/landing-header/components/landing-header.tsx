import { LandingHeaderActions } from "@/features/landing/landing-header/components/landing-header-actions";
import { LandingHeaderLinks } from "@/features/landing/landing-header/components/landing-header-links";
import { CommonHeader } from "@/features/navigation/common-header/components/common-header";

export function LandingHeader() {
  return (
    <CommonHeader
      left={<LandingHeaderLinks />}
      right={<LandingHeaderActions />}
    />
  );
}
