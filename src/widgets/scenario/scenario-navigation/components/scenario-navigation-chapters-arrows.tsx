import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { useScenarioChapters } from "@/actions/scenario/hooks/use-scenario-chapters";
import { Button, type ButtonProps } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/cn";

type ScenarioNavigationChaptersArrowsProps = {
  size?: "sm" | "base";
  scenarioId: string;
};

export function ScenarioNavigationChaptersArrows({
  size = "base",
  scenarioId,
}: ScenarioNavigationChaptersArrowsProps) {
  const {
    previousScenarioChapter,
    nextScenarioChapter,
    handlePreviousScenarioChapterClick,
    handleNextScenarioChapterClick,
  } = useScenarioChapters({ scenarioId });

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
