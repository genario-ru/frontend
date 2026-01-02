import type { PropsWithChildren } from "react";

import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";

export const AuthComponent = ({ children }: PropsWithChildren) => {
  return (
    <PageLayout className="p-8">
      <ContentLayout size="lg" className="flex-1 items-center justify-center">
        {children}
      </ContentLayout>
    </PageLayout>
  );
};
