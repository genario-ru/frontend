import { CommonFooter } from "@/features/navigation/common-footer/components/common-footer";
import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { TariffsHeader } from "@/widgets/tariffs/components/tariffs-header";
import { TariffsList } from "@/widgets/tariffs/components/tariffs-list";

export function TariffsComponent() {
  return (
    <PageLayout className="pt-0">
      <ContentLayout size="xl" className="gap-6">
        <TariffsHeader />
        <TariffsList />
        <CommonFooter />
      </ContentLayout>
    </PageLayout>
  );
}
