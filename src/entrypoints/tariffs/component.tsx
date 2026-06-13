import { CommonFooter } from "@/features/navigation/common-footer/components/common-footer";
import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { AppWithoutAuthHeader } from "@/widgets/navigation/app-without-auth-header/components/app-without-auth-header";
import { TariffsList } from "@/widgets/tariffs/components/tariffs-list";

export function TariffsComponent() {
  return (
    <PageLayout className="h-fit min-h-full">
      <AppWithoutAuthHeader />
      <ContentLayout size="xl">
        <TariffsList />
      </ContentLayout>
      <CommonFooter />
    </PageLayout>
  );
}
