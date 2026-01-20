import {
  RadioCardsGroup,
  RadioCardsGroupItem,
} from "@/shared/components/ui/radio-cards-group";

import { ScenarioChapterHeaderScenesListItem } from "./scenario-chapter-header-scenes-list-item";

type ScenarioChapterHeaderScenesListItemData = {
  id: string;
  name: string;
  time: string;
};

type ScenarioChapterHeaderScenesListProps = {
  scenes: ScenarioChapterHeaderScenesListItemData[] | undefined;
  activeSceneId: string | undefined;
  handleSceneClick: (sceneId: string) => void;
};

export function ScenarioChapterHeaderScenesList({
  scenes,
  activeSceneId,
  handleSceneClick,
}: ScenarioChapterHeaderScenesListProps) {
  if (!scenes?.length) {
    return null;
  }

  return (
    <RadioCardsGroup value={activeSceneId} onValueChange={handleSceneClick}>
      {scenes.map((scene) => (
        <RadioCardsGroupItem size="sm" key={scene.id} value={scene.id}>
          <ScenarioChapterHeaderScenesListItem
            name={scene.name}
            time={scene.time}
          />
        </RadioCardsGroupItem>
      ))}
    </RadioCardsGroup>
  );
}
