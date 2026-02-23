import { ItemsList } from "@/shared/components/common/items-list";
import { EmptyPlug } from "@/shared/components/ui/empty-plug";
import { ErrorPlug } from "@/shared/components/ui/error-plug";
import {
  TabsUnderline,
  TabsUnderlineList,
  TabsUnderlineTrigger,
} from "@/shared/components/ui/tabs-underline";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";
import { cn } from "@/shared/utils/cn";

import { useScenarioNavigationChapters } from "../hooks/use-scenario-navigation-chapters";

type ScenarioNavigationChaptersProps = {
  size?: "sm" | "base";
  scenarioId: string;
};

export function ScenarioNavigationChapters({
  size = "base",
  scenarioId,
}: ScenarioNavigationChaptersProps) {
  const {
    containerRef,
    isScenarioChaptersLoading,
    isScenarioChaptersError,
    scenarioChaptersList,
    activeScenarioChapter,
    chapterRefCallback,
    handleScenarioValueChange,
  } = useScenarioNavigationChapters({ scenarioId });

  if (isScenarioChaptersLoading) {
    return <ScenarioNavigationChaptersSkeleton size={size} />;
  }

  if (isScenarioChaptersError) {
    return <ScenarioNavigationChaptersError size={size} />;
  }

  if (!scenarioChaptersList?.length) {
    return <ScenarioNavigationChaptersEmptyPlug size={size} />;
  }

  return (
    <TabsUnderline
      value={activeScenarioChapter?.id}
      onValueChange={handleScenarioValueChange}
      className="flex-1 overflow-hidden"
    >
      <TabsUnderlineList
        ref={containerRef}
        className={cn(
          "border-neutral-3 hide-scrollbar overflow-auto border-b",
          {
            "px-4": size === "sm",
            "px-5": size === "base",
          },
        )}
      >
        {scenarioChaptersList.map((chapter, index) => (
          <TabsUnderlineTrigger
            key={chapter.id}
            id={chapter.id}
            size={size}
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

export function ScenarioNavigationChaptersSkeleton({
  size = "base",
}: Pick<ScenarioNavigationChaptersProps, "size">) {
  return (
    <ItemsList
      row
      count={6}
      item={
        <div
          className={cn("rounded-2.5 flex flex-1 items-center justify-center", {
            "h-[52px] px-4": size === "sm",
            "h-[64px] px-5": size === "base",
          })}
        >
          <TextSkeleton
            fontSize={size === "sm" ? 14 : 16}
            lineHeight={size === "sm" ? 20 : 24}
            linesCount={1}
            className="w-24"
          />
        </div>
      }
      className="border-neutral-3 flex overflow-hidden border-b"
    />
  );
}

export function ScenarioNavigationChaptersError({
  size = "base",
}: Pick<ScenarioNavigationChaptersProps, "size">) {
  const title =
    size === "base" ? "Ошибка" : "Произошла ошибка при загрузке разделов";

  const description =
    size === "base" ? "Произошла ошибка при загрузке разделов" : undefined;

  return (
    <ErrorPlug
      direction="row"
      title={title}
      description={description}
      className={cn("border-neutral-3 flex-1 border-b", {
        "h-[52px]": size === "sm",
        "h-[64px]": size === "base",
      })}
    />
  );
}

export function ScenarioNavigationChaptersEmptyPlug({
  size = "base",
}: Pick<ScenarioNavigationChaptersProps, "size">) {
  return (
    <EmptyPlug
      direction="row"
      title="В данном сценарии пока нет разделов"
      className={cn("border-neutral-3 border-b", {
        "h-[52px]": size === "sm",
        "h-[64px]": size === "base",
      })}
    />
  );
}
