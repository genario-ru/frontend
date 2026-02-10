import type { ReactNode } from "react";

import { ProfileImage } from "@/shared/components/common/profile-image";
import { Badge } from "@/shared/components/ui/badge";
import { Island } from "@/shared/components/ui/island";
import { cn } from "@/shared/utils/cn";
import { getProfileTailwindColorFromUuid } from "@/shared/utils/get-profile-tailwind-color-from-uuid";

export type ProfileCardProps = {
  id: string;
  name: string;
  description: string | null;
  typeName: string;
  tones: string[];
  platforms: string[];
  actions: ReactNode;
};

export const ProfileCard = ({
  id,
  name,
  description,
  typeName,
  tones,
  platforms,
  actions,
}: ProfileCardProps) => {
  return (
    <Island className="gap-0 p-0">
      <header className="relative w-full p-2">
        <div
          className={cn(
            getProfileTailwindColorFromUuid(id),
            "rounded-3.5 h-16 w-full",
          )}
        />
        <ProfileImage
          size="lg"
          uuid={id}
          className="ring-neutral-1 absolute -bottom-2 left-5 ring-6"
        />
      </header>
      <div className="flex w-full flex-col gap-2 px-4 pb-4">
        <div className="flex w-full justify-between gap-2">
          <div className="mt-auto flex items-center gap-2 pt-3">
            <h2 className="text-xl font-semibold">{name}</h2>
            <Badge size="sm">{typeName}</Badge>
          </div>
          {actions}
        </div>
        {description && (
          <p className="text-new-neutral-6 line-clamp-4">{description}</p>
        )}
        <div className="flex w-full flex-wrap gap-1">
          {tones.map((tone) => (
            <Badge key={tone} size="sm">
              {tone}
            </Badge>
          ))}
        </div>
        <div className="flex w-full flex-wrap gap-1">
          {platforms.map((platform) => (
            <Badge key={platform} variant="secondary" size="sm">
              {platform}
            </Badge>
          ))}
        </div>
      </div>
    </Island>
  );
};
