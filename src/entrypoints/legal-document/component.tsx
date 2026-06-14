import { useLoaderData } from "@tanstack/react-router";

import { LegalDocumentMarkdown } from "@/features/legal/legal-document-markdown/components/legal-document-markdown";
import { CommonFooter } from "@/features/navigation/common-footer/components/common-footer";
import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { Island } from "@/shared/components/ui/island";
import { AppWithoutAuthHeader } from "@/widgets/navigation/app-without-auth-header/components/app-without-auth-header";

export function LegalDocumentComponent() {
  const { data: legalDocumentData } = useLoaderData({
    from: "/_without-auth/legal/$slug",
  });

  return (
    <PageLayout className="h-fit min-h-full">
      <AppWithoutAuthHeader />
      <ContentLayout>
        <Island className="block">
          <LegalDocumentMarkdown content={legalDocumentData.markdown} />
        </Island>
      </ContentLayout>
      <CommonFooter />
    </PageLayout>
  );
}
