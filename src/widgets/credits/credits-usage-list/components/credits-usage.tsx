import { Island } from "@/shared/components/ui/island";

import { CreditsUsageList } from "./credits-usage-list";

export function CreditsUsage() {
  return (
    <Island title="Расход кредитов" className="flex-1">
      <CreditsUsageList />
    </Island>
  );
}
