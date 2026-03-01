import { ContentLayout } from "@/shared/components/layouts/content-layout";
import { PageLayout } from "@/shared/components/layouts/page-layout";
import { Plug } from "@/shared/components/ui/plug";

export function AppErrorComponent() {
  return (
    <PageLayout className="justify-center">
      <ContentLayout size="md">
        <Plug
          size="lg"
          variant="negative"
          title="Ошибка загрузки"
          description="Не удалось загрузить приложение. Если обновление страницы не помогает, вероятнее всего, мы уже знаем о проблеме и работаем над ее устранением"
        />
      </ContentLayout>
    </PageLayout>
  );
}
