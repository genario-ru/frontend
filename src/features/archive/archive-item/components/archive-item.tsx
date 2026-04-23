import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import type { ComponentProps, ReactNode } from "react";

import { ProfileImage } from "@/shared/components/common/profile-image";
import { DOT } from "@/shared/constants/unicode";
import { checkTouchScreen } from "@/shared/utils/check-touch-screen";
import { cn } from "@/shared/utils/cn";

import { getArchiveItemLinkOptions } from "../utils/get-archive-item-link-options";

type ArchiveItemProps = Omit<ComponentProps<"div">, "title"> & {
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
  const isTouchScreen = checkTouchScreen();

  return (
    <div
      className={cn("group bg-neutral-2 relative rounded-2xl", className)}
      {...props}
    >
      <div
        className={cn("absolute top-2.5 right-2.5", {
          "pointer-events-none opacity-0 duration-200 group-hover:pointer-events-auto group-hover:opacity-100 focus-within:pointer-events-auto focus-within:opacity-100":
            !isTouchScreen,
        })}
      >
        {actions}
      </div>
      <Link
        {...getArchiveItemLinkOptions({ id, entity })}
        className="flex h-full w-full flex-col justify-between gap-4 p-4"
      >
        <header className="flex w-full flex-col gap-1">
          <p className="text-neutral-7 text-xs font-medium">
            {format(createdAt, "dd.MM.yyyy")}
            <span className="px-1">{DOT}</span>
            {entity === "ideasList" ? "Идеи" : "Сценарий"}
          </p>
          <p className="text-lg font-semibold">{title || "Без названия"}</p>
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
    </div>
  );
};
