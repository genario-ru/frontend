import { CommonHeader } from "@/features/navigation/common-header/components/common-header";

import { AppWithoutAuthHeaderActions } from "./app-without-auth-header-actions";

export function AppWithoutAuthHeader() {
  return <CommonHeader right={<AppWithoutAuthHeaderActions />} />;
}
