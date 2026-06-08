import { useScenarioChapters } from "@/actions/scenario/hooks/use-scenario-chapters";
import { GenerationAlert } from "@/shared/components/common/generation-alert";

type ScenarioGenerationAlertProps = {
  scenarioId: string;
};

export function ScenarioGenerationAlert({
  scenarioId,
}: ScenarioGenerationAlertProps) {
  const { isScenarioChaptersGenerating } = useScenarioChapters({ scenarioId });

  if (!isScenarioChaptersGenerating) {
    return null;
  }

  return (
    <GenerationAlert
      title="Генерируем сценарий"
      description="Генерируем для вас сценарий, подождите несколько секунд"
      roundedBottom={false}
      className="flex-1"
    />
  );
}
