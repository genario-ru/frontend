import { LogOutIcon } from "lucide-react";

import { useSignOut } from "@/actions/auth/hooks/use-sign-out";
import { Footer } from "@/features/navigation/footer/components/footer";
import { Logo } from "@/shared/components/common/logo";
import { NeedSupport } from "@/shared/components/common/need-support";
import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { Button } from "@/shared/components/ui/button";
import { Heading } from "@/shared/components/ui/heading";
import { Island } from "@/shared/components/ui/island";
import { TariffsList } from "@/widgets/tariffs/components/tariffs-list";

export function TariffsComponent() {
  const signOut = useSignOut();

  return (
    <PageLayout className="pt-0">
      <ContentLayout size="xl" className="gap-5">
        <Island row roundedTop={false} className="items-center justify-between">
          <Logo />
          <Button icon={<LogOutIcon />} iconPosition="left" onClick={signOut}>
            Выйти
          </Button>
        </Island>
        <Island className="h-fit min-h-[520px] max-w-7xl items-center justify-between gap-8 p-6">
          <header className="flex max-w-3xl flex-col items-center gap-2">
            <Heading className="text-3xl font-semibold">Тарифы</Heading>
            <p className="text-neutral-7 text-center text-lg">
              Создавайте сценарии для видео за минуты, а не часы, Создавайте
              сценарии для видео за минуты, а не часы, Создавайте сценарии
            </p>
          </header>
          <TariffsList />
          <NeedSupport className="mx-auto text-sm" />
        </Island>
        <Footer />
      </ContentLayout>
    </PageLayout>
  );
}
