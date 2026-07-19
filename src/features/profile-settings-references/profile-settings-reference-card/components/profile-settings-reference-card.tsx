import {
  ArrowUpRightIcon,
  ImageIcon,
  LinkIcon,
  VideoIcon,
  XIcon,
} from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/shared/components/ui/button";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import { Spinner } from "@/shared/components/ui/spinner";
import { buttonVariants } from "@/shared/constants/button-variants";
import { cn } from "@/shared/utils/cn";

import {
  checkIsProfileSettingsReferenceCardImageMimeType,
  checkIsProfileSettingsReferenceCardVideoMimeType,
} from "../utils/profile-settings-reference-card-helpers";

type ProfileSettingsReferenceCardProps = {
  fileName: string;
  mimeType?: string;
  previewUrl?: string | null;
  externalUrl?: string | null;
  hideActions?: boolean;
  isPending?: boolean;
  isRemoveDisabled?: boolean;
  onRemove?: () => void;
};

export function ProfileSettingsReferenceCard({
  fileName,
  mimeType,
  previewUrl,
  externalUrl,
  hideActions = false,
  isPending = false,
  isRemoveDisabled = false,
  onRemove,
}: ProfileSettingsReferenceCardProps) {
  const isImage = checkIsProfileSettingsReferenceCardImageMimeType(mimeType);
  const isVideo = checkIsProfileSettingsReferenceCardVideoMimeType(mimeType);
  const hasOverlayActions = Boolean(externalUrl || onRemove);
  const shouldShowOverlayActions = !hideActions && hasOverlayActions;

  const actions = useMemo(() => {
    if (!shouldShowOverlayActions) {
      return null;
    }

    return (
      <div className="bg-neutral-2 rounded-bl-4 rounded-tr-4 absolute top-0 right-0 z-1 flex items-center gap-1 p-2">
        {externalUrl && (
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Открыть файл"
            className={buttonVariants({ size: "sm", content: "icon" })}
          >
            <ArrowUpRightIcon />
          </a>
        )}
        {onRemove && (
          <Button
            type="button"
            size="sm"
            content="icon"
            disabled={isRemoveDisabled}
            aria-label="Удалить файл"
            icon={<XIcon />}
            onClick={onRemove}
          />
        )}
      </div>
    );
  }, [externalUrl, isRemoveDisabled, onRemove, shouldShowOverlayActions]);

  const previewContent = useMemo(() => {
    if (!previewUrl) {
      return null;
    }

    if (isVideo) {
      return (
        <video
          src={previewUrl}
          muted
          playsInline
          preload="metadata"
          tabIndex={-1}
          aria-label={fileName}
          className="pointer-events-none h-full w-full object-contain"
        />
      );
    }

    return (
      <img
        src={previewUrl}
        alt={fileName}
        className="h-full w-full object-contain"
      />
    );
  }, [previewUrl, fileName, isVideo]);

  const fileTypeIcon = useMemo(() => {
    if (isVideo) {
      return VideoIcon;
    }

    if (isImage) {
      return ImageIcon;
    }

    return LinkIcon;
  }, [isImage, isVideo]);

  return (
    <div
      className={cn(
        "bg-neutral-2 rounded-4 relative flex min-w-0 flex-col gap-3 overflow-hidden p-2",
        { "opacity-80": isPending },
      )}
    >
      {actions}
      <div className="bg-neutral-3 rounded-3 relative aspect-video overflow-hidden">
        {previewContent}
        {isPending && (
          <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 p-2 backdrop-blur-lg">
            <Spinner className="size-8 stroke-white" />
          </div>
        )}
      </div>
      <div className="flex min-w-0 items-center gap-1.5 px-1 pb-1">
        <LucideIcon size="sm" icon={fileTypeIcon} />
        <span className="text-neutral-8 block min-w-0 truncate text-sm font-medium">
          {fileName}
        </span>
      </div>
    </div>
  );
}
