import { Outlet } from "@tanstack/react-router";

import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";

export const AuthComponent = () => {
  return (
    <PageLayout className="p-8">
      <ContentLayout size="lg" className="flex-1 items-center justify-center">
        <Outlet />
      </ContentLayout>
    </PageLayout>
  );
};
