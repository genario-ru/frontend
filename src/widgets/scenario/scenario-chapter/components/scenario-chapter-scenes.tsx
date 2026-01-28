import { useScenarioScenes } from "@/actions/scenario/hooks/use-scenario-scenes";
import {
  ScenarioChapterSceneHeader,
  ScenarioChapterSceneHeaderSkeleton,
} from "@/features/scenario/scenario-chapter/scenario-chapter-scene/components/scenario-chapter-scene-header";
import { ItemsList } from "@/shared/components/common/items-list";
import {
  ErrorPlug,
  ErrorPlugDescription,
  ErrorPlugIcon,
  ErrorPlugTitle,
} from "@/shared/components/ui/error-plug";
import { Island } from "@/shared/components/ui/island";

import {
  ScenarioChapterSceneComponents,
  ScenarioChapterSceneComponentsSkeleton,
} from "./scenario-chapter-scene-components";

type ScenarioChapterScenesProps = {
  scenarioId: string;
  chapterId?: string;
  videoTypeSlug?: string;
};

export function ScenarioChapterScenes({
  scenarioId,
  chapterId,
  videoTypeSlug,
}: ScenarioChapterScenesProps) {
  const {
    scenarioChapterScenesList,
    isScenarioChapterLoading,
    isScenarioChapterError,
  } = useScenarioScenes({ scenarioId, chapterId });

  if (isScenarioChapterLoading) {
    return <ScenarioChapterScenesSkeleton />;
  }

  if (isScenarioChapterError) {
    return <ScenarioChapterScenesErrorPlug />;
  }

  if (!scenarioChapterScenesList?.length) {
    return <div>No scenes</div>;
  }

  return (
    <Island roundedTop={false} className="gap-8 py-8">
      {scenarioChapterScenesList.map((scene) => (
        <section key={scene.id} className="flex flex-col gap-4">
          <ScenarioChapterSceneHeader
            key={scene.id}
            name={scene.name}
            startTime={scene.startTime}
            endTime={scene.endTime}
          />
          <ScenarioChapterSceneComponents
            videoTypeSlug={videoTypeSlug}
            components={scene.components}
          />
        </section>
      ))}
    </Island>
  );
}

export function ScenarioChapterScenesSkeleton() {
  return (
    <Island roundedTop={false} className="gap-8 py-8">
      <ItemsList
        noParent
        count={2}
        item={
          <section className="flex flex-col gap-4">
            <ScenarioChapterSceneHeaderSkeleton />
            <ScenarioChapterSceneComponentsSkeleton />
          </section>
        }
      />
    </Island>
  );
}

export function ScenarioChapterScenesErrorPlug() {
  return (
    <Island roundedTop={false}>
      <ErrorPlug variant="outlined" className="h-[30dvh]">
        <ErrorPlugIcon />
        <ErrorPlugTitle>Ошибка</ErrorPlugTitle>
        <ErrorPlugDescription>
          Произошла ошибка при загрузке сцен
        </ErrorPlugDescription>
      </ErrorPlug>
    </Island>
  );
}
