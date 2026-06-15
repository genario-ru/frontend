import { useGetApiV1LegalDocuments } from "@/codegen/api/product";

import type { CommonFooterLinksColumn } from "../types/common-footer-links";

export function useCommonFooterDocumentsLinksColumn() {
  const legalDocumentsQuery = useGetApiV1LegalDocuments({
    query: {
      staleTime: 1000 * 60 * 5,
    },
  });

  const items: CommonFooterLinksColumn["items"] =
    legalDocumentsQuery.data?.data.map((document) => ({
      title: document.title,
      to: "/legal/$slug",
      params: {
        slug: document.slug,
      },
      goal: "legal-document-click",
    })) ?? [];

  return {
    items,
    isLegalDocumentsLoading: legalDocumentsQuery.isPending,
  };
}
