import { CommonHeader } from "@/features/navigation/common-header/components/common-header";
import { TariffsHeaderActions } from "@/features/tariffs/tariffs-header/components/tariffs-header-actions";

export function TariffsHeader() {
  return <CommonHeader right={<TariffsHeaderActions />} />;
}
