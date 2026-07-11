import {
  ArrowUpRightIcon,
  FileTextIcon,
  ImageIcon,
  PaperclipIcon,
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

  const placeholderIcon = useMemo(() => {
    if (isVideo) {
      return <VideoIcon className="size-12" />;
    }

    if (isImage) {
      return <ImageIcon className="size-12" />;
    }

    return <FileTextIcon className="size-12" />;
  }, [isImage, isVideo]);

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
    if (previewUrl && isVideo) {
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

    if (previewUrl) {
      return (
        <img
          src={previewUrl}
          alt={fileName}
          className="h-full w-full object-contain"
        />
      );
    }

    return (
      <div className="text-neutral-6 flex h-full w-full items-center justify-center">
        {placeholderIcon}
      </div>
    );
  }, [previewUrl, fileName, isVideo, placeholderIcon]);

  const fileTypeIcon = useMemo(() => {
    if (isVideo) {
      return VideoIcon;
    }

    if (isImage) {
      return ImageIcon;
    }

    return PaperclipIcon;
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
          <div className="bg-neutral-8/20 absolute inset-0 flex items-center justify-center">
            <Spinner className="size-8" />
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
