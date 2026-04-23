import { ItemsList } from "@/shared/components/common/items-list";
import { Plug } from "@/shared/components/ui/plug";
import {
  TabsUnderline,
  TabsUnderlineList,
  TabsUnderlineTrigger,
} from "@/shared/components/ui/tabs-underline";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";

import { useScenarioNavigationChapters } from "../hooks/use-scenario-navigation-chapters";

type ScenarioNavigationChaptersProps = {
  scenarioId: string;
  chapterRefCallback: (el: Element | null, chapterId: string) => void;
  handleChapterScrollIntoView: (chapterId: string) => void;
};

export function ScenarioNavigationChapters({
  scenarioId,
  chapterRefCallback,
  handleChapterScrollIntoView,
}: ScenarioNavigationChaptersProps) {
  const {
    containerRef,
    isScenarioChaptersLoading,
    isScenarioChaptersError,
    scenarioChaptersList,
    activeScenarioChapter,
    handleScenarioValueChange,
  } = useScenarioNavigationChapters({
    scenarioId,
    handleChapterScrollIntoView,
  });

  if (isScenarioChaptersLoading) {
    return <ScenarioNavigationChaptersSkeleton />;
  }

  if (isScenarioChaptersError) {
    return <ScenarioNavigationChaptersError />;
  }

  if (!scenarioChaptersList?.length) {
    return <ScenarioNavigationChaptersEmptyPlug />;
  }

  return (
    <TabsUnderline
      value={activeScenarioChapter?.id}
      onValueChange={handleScenarioValueChange}
      className="flex-1 overflow-hidden"
    >
      <TabsUnderlineList
        ref={containerRef}
        className="border-neutral-3 hide-scrollbar flex-1 overflow-auto border-b px-4"
      >
        {scenarioChaptersList.map((chapter, index) => (
          <TabsUnderlineTrigger
            key={chapter.id}
            id={chapter.id}
            value={chapter.id}
            ref={(el) => chapterRefCallback(el, chapter.id)}
          >
            {index + 1}. {chapter.name}
          </TabsUnderlineTrigger>
        ))}
      </TabsUnderlineList>
    </TabsUnderline>
  );
}

export function ScenarioNavigationChaptersSkeleton() {
  return (
    <ItemsList
      row
      count={6}
      item={
        <div className="rounded-2.5 flex h-16 flex-1 items-center justify-center px-4">
          <TextSkeleton
            fontSize={16}
            lineHeight={24}
            linesCount={1}
            className="w-48"
          />
        </div>
      }
      className="border-neutral-3 flex flex-1 overflow-hidden border-b"
    />
  );
}

export function ScenarioNavigationChaptersError() {
  return (
    <Plug
      variant="negative"
      direction="row"
      title="Ошибка"
      description="Произошла ошибка при загрузке разделов"
      className="border-neutral-3 h-16 flex-1 border-b"
    />
  );
}

export function ScenarioNavigationChaptersEmptyPlug() {
  return (
    <Plug
      direction="row"
      title="В данном сценарии пока нет разделов"
      className="border-neutral-3 h-16 flex-1 border-b"
    />
  );
}
