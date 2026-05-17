import { TextSkeleton } from "@/shared/components/ui/text-skeleton";

import { useCommonFooterDocumentsLinksColumn } from "../hooks/use-common-footer-documents-links-column";
import { CommonFooterLinksColumn as CommonFooterLinksColumnComponent } from "./common-footer-links-column";

const DOCUMENTS_LINKS_COLUMN_TITLE = "Документы";
const DOCUMENTS_SKELETONS_COUNT = 7;

export function CommonFooterDocumentsLinksColumn() {
  const { items, isLegalDocumentsLoading } =
    useCommonFooterDocumentsLinksColumn();

  if (isLegalDocumentsLoading) {
    return <CommonFooterDocumentsLinksColumnSkeleton />;
  }

  return (
    <CommonFooterLinksColumnComponent
      title={DOCUMENTS_LINKS_COLUMN_TITLE}
      items={items}
    />
  );
}

function CommonFooterDocumentsLinksColumnSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">{DOCUMENTS_LINKS_COLUMN_TITLE}</p>
      {Array.from({ length: DOCUMENTS_SKELETONS_COUNT }).map((_, index) => (
        <TextSkeleton
          key={`footer-documents-skeleton-${index}`}
          fontSize={14}
          lineHeight={20}
        />
      ))}
    </div>
  );
}
