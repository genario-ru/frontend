import { ScenarioChapterSceneComponent } from "@/features/scenario/scenario-chapter/scenario-chapter-scene/components/scenario-chapter-scene-component";

import { useScenarioChapterSceneComponentCard } from "../hooks/use-scenario-chapter-scene-component-card";
import { ScenarioChapterSceneComponentEditDialog } from "./scenario-chapter-scene-component-edit-dialog";

type ScenarioChapterSceneComponentCardProps = {
  componentId: string;
  chapterId: string;
  name: string;
  content?: string | null;
  icon?: string | null;
  color?: string | null;
};

export function ScenarioChapterSceneComponentCard({
  componentId,
  chapterId,
  name,
  content,
  icon,
  color,
}: ScenarioChapterSceneComponentCardProps) {
  const { isEditDialogOpen, setIsEditDialogOpen, handleOpenEditDialog } =
    useScenarioChapterSceneComponentCard();

  return (
    <>
      <ScenarioChapterSceneComponent
        componentId={componentId}
        name={name}
        content={content}
        icon={icon}
        color={color}
        handleEditButtonClick={handleOpenEditDialog}
      />
      {content && (
        <ScenarioChapterSceneComponentEditDialog
          isOpen={isEditDialogOpen}
          componentId={componentId}
          componentName={name}
          content={content}
          chapterId={chapterId}
          setIsOpen={setIsEditDialogOpen}
        />
      )}
    </>
  );
}
