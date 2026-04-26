import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { format } from "date-fns";
import { type MouseEventHandler, type ReactNode, useCallback } from "react";

import { ProfileImage } from "@/shared/components/common/profile-image";
import { DOT } from "@/shared/constants/unicode";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { checkIgnoreParentLink } from "@/shared/utils/check-ignore-parent-link";
import { checkTouchScreen } from "@/shared/utils/check-touch-screen";
import { cn } from "@/shared/utils/cn";

import { getArchiveItemLinkOptions } from "../utils/get-archive-item-link-options";

type ArchiveItemProps = Omit<LinkComponentProps, "title"> & {
  id: string;
  entity: "ideasList" | "scenario";
  createdAt: string;
  title?: string | null;
  description?: string | null;
  profileName?: string | null;
  profileId?: string | null;
  actions?: ReactNode;
  badges: ReactNode;
};

export const ArchiveItem = ({
  id,
  entity,
  createdAt,
  title,
  description,
  profileName,
  profileId,
  actions,
  badges,
  className,
  ...props
}: ArchiveItemProps) => {
  const { isMobile } = useBreakpoints();
  const isTouchScreen = checkTouchScreen();
  const hideActions = isMobile && isTouchScreen;

  const handleClick: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (event) => {
      const shouldIgnoreParentLink = checkIgnoreParentLink(event);

      if (!hideActions && shouldIgnoreParentLink) {
        event.preventDefault();
      }
    },
    [hideActions],
  );

  return (
    <Link
      {...getArchiveItemLinkOptions({ id, entity })}
      onClick={handleClick}
      className={cn(
        "bg-neutral-2 rounded-4 flex flex-col justify-between gap-4 p-4",
        className,
      )}
      {...props}
    >
      <header className="flex w-full flex-col gap-1">
        <div className="flex w-full justify-between gap-2">
          <div className="flex flex-col gap-1">
            <p className="text-neutral-7 text-xs font-medium">
              {format(createdAt, "dd.MM.yyyy")}
              <span className="px-1">{DOT}</span>
              {entity === "ideasList" ? "Идеи" : "Сценарий"}
            </p>
            <p className="line-clamp-3 text-lg font-semibold">
              {title || "Без названия"}
            </p>
          </div>
          {!hideActions && actions}
        </div>
        {description && (
          <p className="text-neutral-7 line-clamp-3 text-sm">{description}</p>
        )}
      </header>
      <footer className="flex w-full items-end justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">{badges}</div>
        {profileName && profileId && (
          <ProfileImage size="sm" alt={profileName} uuid={profileId} />
        )}
      </footer>
    </Link>
  );
};
