import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import type { ComponentProps, ReactNode } from "react";

import { ProfileImage } from "@/shared/components/common/profile-image";
import { cn } from "@/shared/utils/cn";

import { getArchiveCardLinkOptions } from "../utils/get-archive-card-link-options";

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
  return (
    <div
      className={cn("group bg-neutral-2 relative rounded-2xl", className)}
      {...props}
    >
      <div className="pointer-events-none absolute top-2 right-2 flex gap-2 opacity-0 group-hover:pointer-events-auto group-hover:opacity-100">
        {actions}
      </div>
      <Link
        {...getArchiveCardLinkOptions({ id, entity })}
        className="flex h-full w-full flex-col justify-between gap-4 p-4"
      >
        <header className="flex w-full flex-col gap-1">
          <p className="text-neutral-7 text-xs font-medium">
            {format(createdAt, "dd.MM.yyyy")}
          </p>
          <p className="text-lg font-semibold">{title || "Без названия"}</p>
          {description && (
            <p className="text-neutral-7 line-clamp-2 text-sm">{description}</p>
          )}
        </header>
        <footer className="flex w-full justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">{badges}</div>
          {profileName && profileId && (
            <ProfileImage size="sm" alt={profileName} uuid={profileId} />
          )}
        </footer>
      </Link>
    </div>
  );
};
