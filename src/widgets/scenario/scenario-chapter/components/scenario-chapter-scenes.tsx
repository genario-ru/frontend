import { useScenarioScenes } from "@/actions/scenario/hooks/use-scenario-scenes";
import { ScenarioChapterSceneHeader } from "@/features/scenario/scenario-chapter/components/scenario-chapter-scene-header";
import { Island } from "@/shared/components/ui/island";

type ScenarioChapterScenesProps = {
  scenarioId: string;
  chapterId?: string;
};

export function ScenarioChapterScenes({
  scenarioId,
  chapterId,
}: ScenarioChapterScenesProps) {
  const {
    scenarioChapterScenesList,
    isScenarioChapterLoading,
    isScenarioChapterError,
  } = useScenarioScenes({ scenarioId, chapterId });

  if (isScenarioChapterLoading) {
    return <div className="h-[1000px]">Loading...</div>;
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
        </section>
      ))}
    </Island>
  );
}
