import { ProfileImage } from "@/shared/components/common/profile-image";
import {
  ButtonLink,
  type ButtonLinkProps,
} from "@/shared/components/ui/button-link";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { TextSkeleton } from "@/shared/components/ui/text-skeleton";
import { cn } from "@/shared/utils/cn";

type UserInfoProps = ButtonLinkProps & {
  id?: string;
  name: string;
  email: string;
};

export function UserInfo({
  id,
  name,
  email,
  className,
  ...props
}: UserInfoProps) {
  return (
    <ButtonLink
      priority="tertiary"
      to="/settings"
      align="start"
      className={cn("flex w-full gap-2 p-3", className)}
      {...props}
    >
      <ProfileImage size="lg" alt={name} uuid={id} />
      <div className="flex flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-neutral-7 text-sm">{email}</p>
      </div>
    </ButtonLink>
  );
}

export function UserInfoSkeleton() {
  return (
    <div className="flex w-full gap-2 p-3">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex flex-col">
        <TextSkeleton
          fontSize={16}
          lineHeight={24}
          linesCount={1}
          className="w-1/2"
        />
        <TextSkeleton
          fontSize={14}
          lineHeight={20}
          linesCount={1}
          className="w-2/3"
        />
      </div>
    </div>
  );
}
