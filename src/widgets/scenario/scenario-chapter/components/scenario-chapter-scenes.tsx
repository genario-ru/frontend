import { useScenarioScenes } from "@/actions/scenario/hooks/use-scenario-scenes";
import { ScenarioChapterSceneHeader } from "@/features/scenario/scenario-chapter/scenario-chapter-scene/components/scenario-chapter-scene-header";
import { Island } from "@/shared/components/ui/island";

import { ScenarioChapterSceneComponents } from "./scenario-chapter-scene-components";

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
    return <div>Loading...</div>;
  }

  if (isScenarioChapterError) {
    return <div>Error</div>;
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
