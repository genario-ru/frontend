import { RotateCwIcon } from "lucide-react";

import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { Button } from "@/shared/components/ui/button";
import { Plug } from "@/shared/components/ui/plug";
import { useReloadPage } from "@/shared/hooks/use-reload-page";

export function RootErrorComponent() {
  const reloadPage = useReloadPage();

  return (
    <PageLayout className="justify-center">
      <ContentLayout size="md">
        <Plug
          size="lg"
          variant="negative"
          title="Ошибка загрузки"
          description="Не удалось загрузить приложение. Если обновление страницы не помогает, вероятнее всего, мы уже знаем о проблеме и работаем над ее устранением"
          actions={
            <Button size="lg" icon={<RotateCwIcon />} onClick={reloadPage}>
              Обновить страницу
            </Button>
          }
        />
      </ContentLayout>
    </PageLayout>
  );
}
