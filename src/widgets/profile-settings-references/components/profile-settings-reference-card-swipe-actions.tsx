import { ArrowUpRightIcon, XIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { buttonVariants } from "@/shared/constants/button-variants";
import { cn } from "@/shared/utils/cn";

type ProfileSettingsReferenceCardSwipeActionsProps = {
  externalUrl?: string | null;
  isRemoveDisabled?: boolean;
  onRemove?: () => void;
};

const swipeActionClassName =
  "h-full min-h-0 min-w-18 w-full max-w-none flex-1 shrink self-stretch justify-center";

export function ProfileSettingsReferenceCardSwipeActions({
  externalUrl,
  isRemoveDisabled = false,
  onRemove,
}: ProfileSettingsReferenceCardSwipeActionsProps) {
  return (
    <div className="flex h-full min-h-0 w-full min-w-min flex-1 items-stretch gap-2">
      {externalUrl && (
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({
              size: "sm",
              direction: "column",
              content: "mixed",
            }),
            swipeActionClassName,
          )}
        >
          <ArrowUpRightIcon />
          Открыть
        </a>
      )}
      {onRemove && (
        <Button
          type="button"
          variant="negative"
          size="sm"
          direction="column"
          iconPosition="left"
          icon={<XIcon />}
          className={swipeActionClassName}
          disabled={isRemoveDisabled}
          onClick={onRemove}
        >
          Удалить
        </Button>
      )}
    </div>
  );
}
