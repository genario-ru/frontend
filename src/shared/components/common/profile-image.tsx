import { cva, type VariantProps } from "class-variance-authority";

import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { cn } from "@/shared/utils/cn";
import { getProfileTailwindColorFromUuid } from "@/shared/utils/get-profile-tailwind-color-from-uuid";

const profileImageVariants = cva("", {
  variants: {
    size: {
      sm: "size-7 text-sm",
      base: "size-8",
      lg: "size-10 text-lg",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

type ProfileImagePropsBasic = {
  src?: string | null;
  alt?: string | null;
  uuid?: string | null;
  className?: string;
};

type ProfileImageProps = ProfileImagePropsBasic &
  VariantProps<typeof profileImageVariants>;

export const ProfileImage = ({
  src: _src,
  size,
  alt,
  uuid,
  className,
  ...props
}: ProfileImageProps) => {
  return (
    <Avatar
      className={cn(profileImageVariants({ size }), className)}
      {...props}
    >
      {/* <AvatarImage /> */}
      <AvatarFallback className={getProfileTailwindColorFromUuid(uuid)}>
        {(alt ?? "Профиль")[0]}
      </AvatarFallback>
    </Avatar>
  );
};
