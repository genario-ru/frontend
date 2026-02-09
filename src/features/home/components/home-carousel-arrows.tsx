import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

type HomeCarouselArrowsProps = {
  hasPrevious: boolean;
  hasNext: boolean;
  onPreviousClick: () => void;
  onNextClick: () => void;
};

export function HomeCarouselArrows({
  hasPrevious,
  hasNext,
  onPreviousClick,
  onNextClick,
}: HomeCarouselArrowsProps) {
  return (
    <div className="flex items-center gap-2 select-none">
      <Button
        size="sm"
        variant="secondary"
        disabled={!hasPrevious}
        icon={<ArrowLeftIcon />}
        onClick={onPreviousClick}
      />
      <Button
        variant="secondary"
        size="sm"
        disabled={!hasNext}
        icon={<ArrowRightIcon />}
        onClick={onNextClick}
      />
    </div>
  );
}
