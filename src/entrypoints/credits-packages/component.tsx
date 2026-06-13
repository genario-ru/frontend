import { CommonFooter } from "@/features/navigation/common-footer/components/common-footer";
import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { Heading } from "@/shared/components/ui/heading";
import { Island } from "@/shared/components/ui/island";
import { CreditsPackagesList } from "@/widgets/credits/credits-packages-list/components/credits-packages-list";
import { AppWithoutAuthHeader } from "@/widgets/navigation/app-without-auth-header/components/app-without-auth-header";

export function CreditsPackagesComponent() {
  return (
    <PageLayout className="h-fit min-h-full">
      <AppWithoutAuthHeader />
      <ContentLayout>
        <Island grow className="items-center gap-8 p-6">
          <header className="flex max-w-3xl flex-col items-center gap-2">
            <Heading className="text-2xl font-semibold lg:text-3xl">
              Пакеты кредитов
            </Heading>
            <p className="text-neutral-7 text-center lg:text-lg">
              Кредиты расходуются на генерацию идей, сценариев и превью сцен.
              Пакет — разовая покупка без автопродления, оплачивается один раз.
              Купить пакет можно только при активной подписке
            </p>
          </header>
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-2">
            <CreditsPackagesList />
          </div>
        </Island>
      </ContentLayout>
      <CommonFooter className="mt-auto" />
    </PageLayout>
  );
}
