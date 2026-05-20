import { RotateCwIcon } from "lucide-react";

import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { Button } from "@/shared/components/ui/button";
import { Island } from "@/shared/components/ui/island";
import { Plug } from "@/shared/components/ui/plug";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { useReloadPage } from "@/shared/hooks/use-reload-page";
import { cn } from "@/shared/utils/cn";

export function RootErrorComponent() {
  const reloadPage = useReloadPage();
  const { isMobile } = useBreakpoints();

  return (
    <PageLayout className="justify-center">
      <ContentLayout
        size={isMobile ? "max" : "md"}
        className={cn("h-full justify-center", {
          "p-4": !isMobile,
        })}
      >
        <Island
          grow={isMobile}
          roundedTop={!isMobile}
          roundedBottom={!isMobile}
          className={cn({
            "justify-center": isMobile,
            "py-8": !isMobile,
          })}
        >
          <Plug
            size="lg"
            variant="negative"
            title="Ошибка загрузки"
            description="Не удалось загрузить приложение. Если обновление страницы не помогает, вероятнее всего, мы уже знаем о проблеме и работаем над ее устранением"
            actions={
              <Button
                size="lg"
                className="mt-2"
                icon={<RotateCwIcon />}
                onClick={reloadPage}
              >
                Обновить страницу
              </Button>
            }
          />
        </Island>
      </ContentLayout>
    </PageLayout>
  );
}
