import { Button } from "@/shared/components/ui/button";
import { Plug } from "@/shared/components/ui/plug";

import { ScenarioMetadataCardSkeleton } from "../../scenario-metadata-card/components/scenario-metadata-card";

const FADE_MASK =
  "linear-gradient(to bottom, rgb(0 0 0 / 1) 0%, rgb(0 0 0 / 0) 100%)";

const PREVIEW_HEIGHT_PX = 96;

type ScenarioMetadataPlaceholderProps = {
  title: string;
  description: string;
  actionLabel: string;
  isActionPending: boolean;
  hasFadeCards?: boolean;
  variant?: "neutral" | "negative";
  onAction: () => void;
};

export function ScenarioMetadataPlaceholder({
  title,
  description,
  actionLabel,
  isActionPending,
  hasFadeCards = true,
  variant = "neutral",
  onAction,
}: ScenarioMetadataPlaceholderProps) {
  return (
    <div className="my-auto flex w-full flex-col items-center">
      {hasFadeCards && (
        <div
          aria-hidden
          className="-mb-4 grid w-full max-w-2xl gap-3 overflow-hidden md:grid-cols-2"
          style={{
            height: `${PREVIEW_HEIGHT_PX.toString()}px`,
            maskImage: FADE_MASK,
            WebkitMaskImage: FADE_MASK,
          }}
        >
          <ScenarioMetadataCardSkeleton />
          <ScenarioMetadataCardSkeleton className="hidden md:flex" />
        </div>
      )}
      <Plug
        variant={variant}
        title={title}
        description={description}
        actions={
          <Button
            size="lg"
            state={isActionPending ? "loading" : "default"}
            className="mt-3"
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        }
      />
    </div>
  );
}
