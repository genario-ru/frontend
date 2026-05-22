import { CreditsPackagesHeaderActions } from "@/features/credits/credits-packages-header/components/credits-packages-header-actions";
import { CommonHeader } from "@/features/navigation/common-header/components/common-header";

export function CreditsPackagesHeader() {
  return <CommonHeader right={<CreditsPackagesHeaderActions />} />;
}
