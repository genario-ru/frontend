import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { Button, type ButtonProps } from "@/shared/components/ui/button";

import { useScenarioNavigationChaptersArrows } from "../hooks/use-scenario-navigation-chapters-arrows";

type ScenarioNavigationChaptersArrowsProps = {
  scenarioId: string;
  handleChapterScrollIntoView: (chapterId: string) => void;
};

export function ScenarioNavigationChaptersArrows({
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
    <div className="border-neutral-3 flex h-16 shrink-0 items-center gap-1 border-b border-l px-5">
      <ScenarioNavigationChaptersArrowsButton
        icon={<ArrowLeftIcon />}
        disabled={!previousScenarioChapter}
        onClick={handlePreviousScenarioChapterClick}
      />
      <ScenarioNavigationChaptersArrowsButton
        icon={<ArrowRightIcon />}
        disabled={!nextScenarioChapter}
        onClick={handleNextScenarioChapterClick}
      />
    </div>
  );
}

function ScenarioNavigationChaptersArrowsButton({ ...props }: ButtonProps) {
  return <Button priority="tertiary" {...props} />;
}
