import { useLoaderData } from "@tanstack/react-router";

import { LegalDocumentMarkdown } from "@/features/legal/legal-document-markdown/components/legal-document-markdown";
import { CommonFooter } from "@/features/navigation/common-footer/components/common-footer";
import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { Island } from "@/shared/components/ui/island";
import { LegalDocumentsHeader } from "@/widgets/legal-documents/legal-documents-header/components/legal-documents-header";

export function LegalDocumentComponent() {
  const { data: legalDocumentData } = useLoaderData({
    from: "/_without-auth/legal/$slug",
  });

  return (
    <PageLayout className="h-fit min-h-full">
      <LegalDocumentsHeader />
      <ContentLayout>
        <Island className="block">
          <LegalDocumentMarkdown content={legalDocumentData.markdown} />
        </Island>
      </ContentLayout>
      <CommonFooter />
    </PageLayout>
  );
}
