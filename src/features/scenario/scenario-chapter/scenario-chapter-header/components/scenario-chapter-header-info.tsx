import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Heading } from "@/shared/components/ui/heading";

type ScenarioChapterHeaderInfoProps = {
  hasPreviousChapter: boolean;
  hasNextChapter: boolean;
  title: string | undefined;
  time: string | undefined;
  description: string | null | undefined;
  handlePreviousChapterClick: () => void;
  handleNextChapterClick: () => void;
};

export function ScenarioChapterHeaderInfo({
  hasPreviousChapter,
  hasNextChapter,
  title,
  time,
  description,
  handlePreviousChapterClick,
  handleNextChapterClick,
}: ScenarioChapterHeaderInfoProps) {
  return (
    <section className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Button
            disabled={!hasPreviousChapter}
            icon={<ArrowLeftIcon />}
            onClick={handlePreviousChapterClick}
          />
          <Button
            disabled={!hasNextChapter}
            icon={<ArrowRightIcon />}
            onClick={handleNextChapterClick}
          />
        </div>
        {title && <Heading variant="h2">{title}</Heading>}
        {time && <Badge>{time}</Badge>}
      </div>
      {description && (
        <p className="text-neutral-7 line-clamp-2 text-sm">{description}</p>
      )}
    </section>
  );
}
