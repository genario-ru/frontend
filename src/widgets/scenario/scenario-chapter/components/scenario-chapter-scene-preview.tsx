import { WandSparklesIcon } from "lucide-react";
import { useMemo } from "react";

import type { GetApiV1ScenariosChaptersChapterIdResponse } from "@/codegen/api/product/types.gen";
import { ScenarioChapterScenePreviewLayout } from "@/features/scenario/scenario-chapter/scenario-chapter-scene/components/scenario-chapter-scene-preview-layout";
import { GenerationAlert } from "@/shared/components/common/generation-alert";
import { Button } from "@/shared/components/ui/button";
import {
  EmptyPlug,
  EmptyPlugDescription,
  EmptyPlugHeader,
  EmptyPlugIcon,
  EmptyPlugTitle,
} from "@/shared/components/ui/empty-plug";
import {
  ErrorPlug,
  ErrorPlugDescription,
  ErrorPlugHeader,
  ErrorPlugIcon,
  ErrorPlugTitle,
} from "@/shared/components/ui/error-plug";
import { cn } from "@/shared/utils/cn";

import { useScenarioChapterScenePreview } from "../hooks/use-scenario-chapter-scene-preview";

type ScenarioChapterScenePreviewProps = {
  chapterId: string;
  sceneId: string;
  videoTypeSlug?: string;
  scene: GetApiV1ScenariosChaptersChapterIdResponse["data"]["scenes"][number];
};

export function ScenarioChapterScenePreview({
  chapterId,
  sceneId,
  videoTypeSlug,
  scene,
}: ScenarioChapterScenePreviewProps) {
  const {
    handleCreateScenarioScenePreview,
    isCreateScenarioScenePreviewPending,
  } = useScenarioChapterScenePreview({ chapterId, sceneId });

  const actions = useMemo(() => {
    if (!scene.preview) {
      return (
        <Button
          size="sm"
          icon={<WandSparklesIcon />}
          state={isCreateScenarioScenePreviewPending ? "loading" : "default"}
          onClick={handleCreateScenarioScenePreview}
        >
          Сгенерировать превью
        </Button>
      );
    }

    return null;
  }, [
    scene.preview,
    isCreateScenarioScenePreviewPending,
    handleCreateScenarioScenePreview,
  ]);

  const body = useMemo(() => {
    if (scene.preview?.url) {
      return (
        <img
          src={scene.preview.url}
          alt="Preview"
          className="h-full w-full object-cover"
        />
      );
    }

    if (scene.preview?.status === "generation") {
      return <ScenarioChapterScenePreviewGeneratingAlert />;
    }

    if (scene.preview?.status === "failed") {
      return <ScenarioChapterScenePreviewErrorPlug />;
    }

    return <ScenarioChapterScenePreviewEmptyPlug />;
  }, [scene.preview]);

  return (
    <div
      className={cn("flex h-full flex-col", {
        "col-span-2": videoTypeSlug === "short",
        "col-span-1": videoTypeSlug === "long",
      })}
    >
      <ScenarioChapterScenePreviewLayout
        actions={actions}
        videoTypeSlug={videoTypeSlug}
        className="sticky top-[200px]"
        contentClassName="flex justify-center items-center"
      >
        {body}
      </ScenarioChapterScenePreviewLayout>
    </div>
  );
}

function ScenarioChapterScenePreviewGeneratingAlert() {
  return (
    <GenerationAlert
      title="Генерируем превью сцены"
      description="Генерируем для вас превью сцены, подождите несколько секунд..."
    />
  );
}

function ScenarioChapterScenePreviewErrorPlug() {
  return (
    <ErrorPlug>
      <ErrorPlugHeader>
        <ErrorPlugIcon />
        <ErrorPlugTitle>Ошибка генерации</ErrorPlugTitle>
        <ErrorPlugDescription>
          Не удалось сгенерировать превью сцены, попробуйте позже...
        </ErrorPlugDescription>
      </ErrorPlugHeader>
    </ErrorPlug>
  );
}

function ScenarioChapterScenePreviewEmptyPlug() {
  return (
    <EmptyPlug>
      <EmptyPlugHeader>
        <EmptyPlugIcon />
        <EmptyPlugTitle>Превью пока нет</EmptyPlugTitle>
        <EmptyPlugDescription>
          Если вы хотите, то можете сгенерировать превью сцены по кнопке выше
        </EmptyPlugDescription>
      </EmptyPlugHeader>
    </EmptyPlug>
  );
}
