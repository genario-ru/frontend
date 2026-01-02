import { Link, StarIcon } from "lucide-react";

import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";

import { ProfileImage } from "./profile-image";

type ProfileInfoProps = {
  userId: string;
  profileId: string;
  profileType: string;
  image?: string | null;
  name: string;
  rating?: number;
  reviewsAmount?: number;
};

export const ProfileInfoSkeleton = () => (
  <div className="flex flex-row items-center gap-3">
    <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
    <div>
      <TextSkeleton
        fontSize={16}
        lineHeight={24}
        linesCount={1}
        className="w-32"
      />
      <div className="flex items-center gap-2">
        <StarIcon className="size-4 fill-yellow-500 stroke-yellow-500" />
        <TextSkeleton
          fontSize={14}
          lineHeight={20}
          linesCount={1}
          className="w-24"
        />
      </div>
    </div>
  </div>
);

export const ProfileInfo = ({
  userId,
  profileId,
  profileType,
  image,
  name,
  reviewsAmount = 24,
}: ProfileInfoProps) => {
  const profileHref =
    profileType === "client"
      ? `/app/clients/${profileId}`
      : `/app/contractors/${profileId}`;

  return (
    <Link to="/" className="flex shrink-0 flex-row items-center gap-3">
      <ProfileImage src={image} alt={name} uuid={userId} size="lg" />
      <div>
        <p className="font-semibole">{name}</p>
        <div className="flex items-center gap-2">
          <StarIcon className="size-4 fill-yellow-500 stroke-yellow-500" />
          <p className="text-neutral-11 text-sm">
            5.0 ({reviewsAmount} отзыва)
          </p>
        </div>
      </div>
    </Link>
  );
};
