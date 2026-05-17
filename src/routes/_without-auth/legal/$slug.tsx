import { createFileRoute } from "@tanstack/react-router";

import { getApiV1LegalDocumentsBySlugQueryOptions } from "@/codegen/api/product";
import { LegalDocumentComponent } from "@/entrypoints/legal-document/component";

export const Route = createFileRoute("/_without-auth/legal/$slug")({
  loader: async ({ context, params: { slug } }) => {
    return context.queryClient.ensureQueryData({
      ...getApiV1LegalDocumentsBySlugQueryOptions({
        slug,
      }),
    });
  },
  component: LegalDocumentComponent,
});
