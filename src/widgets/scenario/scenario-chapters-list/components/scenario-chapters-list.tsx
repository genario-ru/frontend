import { Island } from "@/shared/components/ui/island";

import { useScenarioChaptersList } from "../hooks/use-scenario-chapters-list";

type ScenarioChaptersListProps = {
  scenarioId: string;
};

export function ScenarioChaptersList({
  scenarioId,
}: ScenarioChaptersListProps) {
  const { scenarioChaptersList } = useScenarioChaptersList({
    scenarioId,
  });

  return (
    <Island className="flex-1 overflow-auto">
      {scenarioChaptersList.map((chapter) => (
        <div key={chapter.id}>{chapter.name}</div>
      ))}
    </Island>
  );
}
