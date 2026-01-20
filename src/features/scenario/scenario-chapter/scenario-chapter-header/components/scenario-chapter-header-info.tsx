import { animated, config, useSpring } from "@react-spring/web";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useMemo, useRef } from "react";

import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Heading } from "@/shared/components/ui/heading";

type ScenarioChapterHeaderInfoProps = {
  isContainerScrolled: boolean;
  hasPreviousChapter: boolean;
  hasNextChapter: boolean;
  title: string | undefined;
  time: string | undefined;
  description: string | null | undefined;
  handlePreviousChapterClick: () => void;
  handleNextChapterClick: () => void;
};

const AnimatedParagraph = animated("p");

export function ScenarioChapterHeaderInfo({
  isContainerScrolled,
  hasPreviousChapter,
  hasNextChapter,
  title,
  time,
  description,
  handlePreviousChapterClick,
  handleNextChapterClick,
}: ScenarioChapterHeaderInfoProps) {
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);

  const descriptionHeight = useMemo(() => {
    return descriptionRef.current?.clientHeight ?? "unset";
  }, [descriptionRef]);

  const descriptionAnimationStyle = useSpring({
    height: isContainerScrolled ? 0 : descriptionHeight,
    opacity: isContainerScrolled ? 0 : 1,
    paddingTop: isContainerScrolled ? 0 : 8,
    config: config.default,
    overflow: "hidden",
  });

  return (
    <section className="flex w-full flex-col">
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
        <AnimatedParagraph
          ref={descriptionRef}
          style={descriptionAnimationStyle}
          className="text-neutral-7 text-sm"
        >
          {description}
        </AnimatedParagraph>
      )}
    </section>
  );
}
