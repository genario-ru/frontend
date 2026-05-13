import { WandSparklesIcon } from "lucide-react";
import { useMemo } from "react";

import type { ScenarioSceneExtendedSchema } from "@/codegen/api/product";
import { ScenarioChapterScenePreviewImage } from "@/features/scenario/scenario-chapter/scenario-chapter-scene/components/scenario-chapter-scene-preview-image";
import { ScenarioChapterScenePreviewLayout } from "@/features/scenario/scenario-chapter/scenario-chapter-scene/components/scenario-chapter-scene-preview-layout";
import { GenerationAlert } from "@/shared/components/common/generation-alert";
import { Button } from "@/shared/components/ui/button";
import { Plug } from "@/shared/components/ui/plug";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { checkIsGenerationStatus } from "@/shared/utils/check-is-generation-status";
import { cn } from "@/shared/utils/cn";

import { useScenarioChapterScenePreview } from "../hooks/use-scenario-chapter-scene-preview";

type ScenarioChapterScenePreviewProps = {
  chapterId: string;
  sceneId: string;
  videoTypeSlug: string;
  scene: ScenarioSceneExtendedSchema;
};

type ScenarioChapterScenePreviewSkeletonProps = {
  videoTypeSlug: string;
};

type ScenarioChapterScenePreviewPlugProps = {
  actionLabel: string;
  isActionPending: boolean;
  onAction: () => void;
};

export function ScenarioChapterScenePreview({
  chapterId,
  sceneId,
  videoTypeSlug,
  scene,
}: ScenarioChapterScenePreviewProps) {
  const {
    isExpandablePreview,
    isCreateScenarioScenePreviewPending,
    handleCreateScenarioScenePreview,
  } = useScenarioChapterScenePreview({ chapterId, sceneId });

  const actions = useMemo(() => {
    if (!scene.preview) {
      return (
        <Button
          size="sm"
          priority="tertiary"
          icon={<WandSparklesIcon />}
          state={isCreateScenarioScenePreviewPending ? "loading" : "default"}
          onClick={handleCreateScenarioScenePreview}
        />
      );
    }

    return null;
  }, [
    scene.preview,
    isCreateScenarioScenePreviewPending,
    handleCreateScenarioScenePreview,
  ]);

  const body = useMemo(() => {
    if (scene.preview?.urlCompressed && scene.preview.url) {
      return (
        <ScenarioChapterScenePreviewImage
          urlCompressed={scene.preview.urlCompressed}
          url={scene.preview.url}
        />
      );
    }

    if (checkIsGenerationStatus(scene.preview?.status)) {
      return <ScenarioChapterScenePreviewGeneratingAlert />;
    }

    if (scene.preview?.status === "failed") {
      return (
        <ScenarioChapterScenePreviewErrorPlug
          actionLabel="Повторить попытку"
          isActionPending={isCreateScenarioScenePreviewPending}
          onAction={handleCreateScenarioScenePreview}
        />
      );
    }

    return (
      <ScenarioChapterScenePreviewEmptyPlug
        actionLabel="Сгенерировать превью"
        isActionPending={isCreateScenarioScenePreviewPending}
        onAction={handleCreateScenarioScenePreview}
      />
    );
  }, [
    scene.preview,
    handleCreateScenarioScenePreview,
    isCreateScenarioScenePreviewPending,
  ]);

  return (
    <div
      className={cn("flex h-full flex-col", {
        "lg:col-span-2": videoTypeSlug === "short",
        "col-span-1": videoTypeSlug === "long",
      })}
    >
      <ScenarioChapterScenePreviewLayout
        actions={actions}
        videoTypeSlug={videoTypeSlug}
        expandable={isExpandablePreview}
        className="sticky top-8"
        contentClassName={cn("flex items-center justify-center", {
          "p-4": !scene.preview,
        })}
      >
        {body}
      </ScenarioChapterScenePreviewLayout>
    </div>
  );
}

export function ScenarioChapterScenePreviewSkeleton({
  videoTypeSlug,
}: ScenarioChapterScenePreviewSkeletonProps) {
  return (
    <div
      className={cn("flex h-full flex-col", {
        "col-span-2": videoTypeSlug === "short",
        "col-span-1": videoTypeSlug === "long",
      })}
    >
      <ScenarioChapterScenePreviewLayout
        videoTypeSlug={videoTypeSlug}
        className="sticky top-8"
        contentClassName="flex items-center justify-center"
      >
        <Skeleton className="h-full w-full" />
      </ScenarioChapterScenePreviewLayout>
    </div>
  );
}

function ScenarioChapterScenePreviewGeneratingAlert() {
  return (
    <GenerationAlert
      roundedTop={false}
      roundedBottom={false}
      hasGradient={false}
      title="Генерация превью"
      description="Генерируем для вас превью, подождите несколько секунд"
      className="h-full w-full flex-1"
    />
  );
}

function ScenarioChapterScenePreviewErrorPlug({
  actionLabel,
  isActionPending,
  onAction,
}: ScenarioChapterScenePreviewPlugProps) {
  return (
    <Plug
      variant="negative"
      title="Ошибка генерации"
      description="Не удалось сгенерировать превью. Попробуйте еще раз."
      actions={
        <Button
          className="mt-2"
          state={isActionPending ? "loading" : "default"}
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      }
    />
  );
}

function ScenarioChapterScenePreviewEmptyPlug({
  actionLabel,
  isActionPending,
  onAction,
}: ScenarioChapterScenePreviewPlugProps) {
  return (
    <Plug
      title="Превью пока нет"
      description="Вы можете сгенерировать превью сцены."
      actions={
        <Button
          className="mt-2"
          state={isActionPending ? "loading" : "default"}
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      }
    />
  );
}
