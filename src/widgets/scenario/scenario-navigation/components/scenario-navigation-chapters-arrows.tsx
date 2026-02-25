import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { Button, type ButtonProps } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/cn";

import { useScenarioNavigationChaptersArrows } from "../hooks/use-scenario-navigation-chapters-arrows";

type ScenarioNavigationChaptersArrowsProps = {
  size?: "sm" | "base";
  scenarioId: string;
  handleChapterScrollIntoView: (chapterId: string) => void;
};

export function ScenarioNavigationChaptersArrows({
  size = "base",
  scenarioId,
  handleChapterScrollIntoView,
}: ScenarioNavigationChaptersArrowsProps) {
  const {
    previousScenarioChapter,
    nextScenarioChapter,
    handlePreviousScenarioChapterClick,
    handleNextScenarioChapterClick,
  } = useScenarioNavigationChaptersArrows({
    scenarioId,
    handleChapterScrollIntoView,
  });

  return (
    <div
      className={cn(
        "border-neutral-3 flex shrink-0 items-center gap-1 border-b border-l",
        {
          "h-[52px] px-4": size === "sm",
          "h-[64px] px-5": size === "base",
        },
      )}
    >
      <ScenarioNavigationChaptersArrowsButton
        size={size}
        icon={<ArrowLeftIcon />}
        disabled={!previousScenarioChapter}
        onClick={handlePreviousScenarioChapterClick}
      />
      <ScenarioNavigationChaptersArrowsButton
        size={size}
        icon={<ArrowRightIcon />}
        disabled={!nextScenarioChapter}
        onClick={handleNextScenarioChapterClick}
      />
    </div>
  );
}

function ScenarioNavigationChaptersArrowsButton({
  size = "base",
  ...props
}: ButtonProps) {
  return <Button size={size} priority="tertiary" {...props} />;
}
