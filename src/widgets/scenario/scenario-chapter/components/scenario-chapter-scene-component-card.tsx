import { ScenarioChapterSceneComponent } from "@/features/scenario/scenario-chapter/scenario-chapter-scene/components/scenario-chapter-scene-component";

import { useScenarioChapterSceneComponentCard } from "../hooks/use-scenario-chapter-scene-component-card";
import { useScenarioChapterSceneComponentEditDialog } from "../hooks/use-scenario-chapter-scene-component-edit-dialog";
import { ScenarioChapterSceneComponentEditDialog } from "./scenario-chapter-scene-component-edit-dialog";
import { ScenarioChapterSceneComponentEditDialogDrawer } from "./scenario-chapter-scene-component-edit-drawer";

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
  const {
    isMobile,
    isEditDialogOpen,
    setIsEditDialogOpen,
    handleOpenEditDialog,
  } = useScenarioChapterSceneComponentCard();

  const { form, isUpdateScenarioSceneComponentPending, onFormSubmit } =
    useScenarioChapterSceneComponentEditDialog({
      componentId,
      componentName: name,
      content: content ?? "",
      chapterId,
      setIsOpen: setIsEditDialogOpen,
    });

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
        <>
          {isMobile ? (
            <ScenarioChapterSceneComponentEditDialogDrawer
              isOpen={isEditDialogOpen}
              componentName={name}
              setIsOpen={setIsEditDialogOpen}
              form={form}
              isUpdateScenarioSceneComponentPending={
                isUpdateScenarioSceneComponentPending
              }
              onFormSubmit={onFormSubmit}
            />
          ) : (
            <ScenarioChapterSceneComponentEditDialog
              isOpen={isEditDialogOpen}
              componentName={name}
              setIsOpen={setIsEditDialogOpen}
              form={form}
              isUpdateScenarioSceneComponentPending={
                isUpdateScenarioSceneComponentPending
              }
              onFormSubmit={onFormSubmit}
            />
          )}
        </>
      )}
    </>
  );
}
