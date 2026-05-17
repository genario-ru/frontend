import { CommonHeader } from "@/features/navigation/common-header/components/common-header";

import { LegalDocumentsHeaderActions } from "./legal-documents-header-actions";

export function LegalDocumentsHeader() {
  return <CommonHeader right={<LegalDocumentsHeaderActions />} />;
}
