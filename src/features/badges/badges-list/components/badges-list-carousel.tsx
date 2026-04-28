import "swiper/swiper.css";

import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Badge, type BadgeProps } from "@/shared/components/ui/badge";
import { LucideIcon } from "@/shared/components/ui/lucide-icon";
import type { PropsWithClassName } from "@/shared/types/props-with-classname";
import { cn } from "@/shared/utils/cn";

import type { BadgesListInput } from "../types/badges-list";
import { normalizeBadgesData } from "../utils/normalize-badges-data";

type BadgesListCarouselProps = PropsWithClassName<{
  badgesData: BadgesListInput;
  badgeProps?: BadgeProps;
}>;

export function BadgesListCarousel({
  badgesData,
  badgeProps,
  className,
}: BadgesListCarouselProps) {
  const badges = useMemo(() => normalizeBadgesData(badgesData), [badgesData]);

  return (
    <Swiper
      spaceBetween={4}
      slidesPerView="auto"
      style={{ overflow: "visible" }}
      className={cn("w-full min-w-0", className)}
    >
      {badges.map((badge) => (
        <SwiperSlide
          key={`badges-list-carousel-${badge.name}`}
          style={{ width: "auto" }}
        >
          <Badge
            color={badge.color ? "custom" : "neutral"}
            customColor={badge.color}
            icon={badge.icon && <LucideIcon icon={badge.icon} />}
            {...badgeProps}
          >
            {badge.name}
          </Badge>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
