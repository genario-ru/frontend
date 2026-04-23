import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";
import { BackButton } from "@/shared/components/common/back-button";

type ScenarioSettingsAppMenubarProps = {
  scenarioId?: string;
};

export function ScenarioSettingsAppMenubar({
  scenarioId,
}: ScenarioSettingsAppMenubarProps) {
  return (
    <AppMenubar
      actions={<BackButton />}
      title={scenarioId ? "Настройки сценария" : "Новый сценарий"}
    />
  );
}
