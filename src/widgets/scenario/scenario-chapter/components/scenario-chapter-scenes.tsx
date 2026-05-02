import { GenerationAlert } from "@/shared/components/common/generation-alert";
import { ItemsList } from "@/shared/components/common/items-list";
import { Island } from "@/shared/components/ui/island";
import { Plug } from "@/shared/components/ui/plug";

import { useScenarioChapterScenes } from "../hooks/use-scenario-chapter-scenes";
import {
  ScenarioChapterScene,
  ScenarioChapterSceneSkeleton,
} from "./scenario-chapter-scene";

type ScenarioChapterScenesProps = {
  chapterId: string;
  scenarioId: string;
  chapterPosition: number;
  videoTypeSlug: string;
};

type ScenarioChapterScenesSkeletonProps = {
  videoTypeSlug: string;
};

export function ScenarioChapterScenes({
  chapterId,
  scenarioId,
  chapterPosition,
  videoTypeSlug,
}: ScenarioChapterScenesProps) {
  const {
    scenarioChapterScenesList,
    isScenarioChapterGenerating,
    isScenarioChapterGenerationFailed,
    isScenarioChapterLoading,
    isScenarioChapterError,
    handleIntersectingSceneIdChange,
  } = useScenarioChapterScenes({ scenarioId, chapterId });

  if (isScenarioChapterGenerating) {
    return <ScenarioChapterScenesGeneratingAlert />;
  }

  if (isScenarioChapterLoading) {
    return <ScenarioChapterScenesSkeleton videoTypeSlug={videoTypeSlug} />;
  }

  if (isScenarioChapterError || isScenarioChapterGenerationFailed) {
    return <ScenarioChapterScenesErrorPlug />;
  }

  if (!scenarioChapterScenesList?.length) {
    return <ScenarioChapterScenesEmptyPlug />;
  }

  return (
    <Island noGap roundedTop={false}>
      {scenarioChapterScenesList.map((scene, index) => (
        <ScenarioChapterScene
          key={`scenario-chapter-scene-${scene.id}`}
          chapterId={chapterId}
          videoTypeSlug={videoTypeSlug}
          chapterPosition={chapterPosition}
          position={index + 1}
          scene={scene}
          handleIntersectingSceneIdChange={handleIntersectingSceneIdChange}
        />
      ))}
    </Island>
  );
}

export function ScenarioChapterScenesGeneratingAlert() {
  return (
    <Island roundedTop={false} className="flex-1">
      <GenerationAlert
        title="Генерируем сцены"
        description="Генерируем для вас сцены, подождите несколько секунд"
        className="border-neutral-3 flex-1 border"
        hasGradient={false}
      />
    </Island>
  );
}

export function ScenarioChapterScenesSkeleton({
  videoTypeSlug,
}: ScenarioChapterScenesSkeletonProps) {
  return (
    <Island roundedTop={false}>
      <ItemsList
        noParent
        count={2}
        item={<ScenarioChapterSceneSkeleton videoTypeSlug={videoTypeSlug} />}
      />
    </Island>
  );
}

export function ScenarioChapterScenesErrorPlug() {
  return (
    <Island roundedTop={false} className="flex-1">
      <Plug
        variant="negative"
        appearance="outlined"
        className="flex-1"
        title="Ошибка"
        description="Произошла ошибка при загрузке сцен"
      />
    </Island>
  );
}

export function ScenarioChapterScenesEmptyPlug() {
  return (
    <Island roundedTop={false} className="flex-1">
      <Plug
        appearance="outlined"
        title="Нет сцен"
        description="В данном разделе пока нет сцен."
        className="flex-1"
      />
    </Island>
  );
}
