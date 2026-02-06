import "swiper/swiper.css";

import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { ArchiveItem } from "@/features/archive/archive-item/components/archive-item";
import { ArchiveItemSkeleton } from "@/features/archive/archive-item/components/archive-item-skeleton";
import { HomeCarouselArrows } from "@/features/home/components/home-carousel-arrows";
import { Island } from "@/shared/components/ui/island";
import { ArchiveItemBadges } from "@/widgets/archive/archive-items/components/archive-item-badges";

import { useHomeArchiveItemsCarousel } from "../hooks/use-home-archive-items-carousel";

export function HomeArchiveItemsCarousel() {
  const {
    archiveItemsData,
    isLoadingArchiveItems,
    hasPreviousSlide,
    hasNextSlide,
    onSwiper,
    onSlideChange,
    onPreviousButtonClick,
    onNextButtonClick,
  } = useHomeArchiveItemsCarousel();

  const slides = useMemo(() => {
    if (isLoadingArchiveItems) {
      return (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <SwiperSlide key={`archive-items-skeleton-${index}`}>
              <ArchiveItemSkeleton />
            </SwiperSlide>
          ))}
        </>
      );
    }

    if (!archiveItemsData?.length) {
      return null;
    }

    return archiveItemsData.map((item) => (
      <SwiperSlide key={item.data.id} style={{ height: "auto" }}>
        <ArchiveItem
          id={item.data.id}
          entity={item.entity}
          createdAt={item.data.createdAt}
          title={item.data.name}
          profileName={item.data.profile?.name}
          profileId={item.data.profile?.id}
          badges={<ArchiveItemBadges archiveItem={item} />}
          className="h-full"
        />
      </SwiperSlide>
    ));
  }, [archiveItemsData, isLoadingArchiveItems]);

  return (
    <Island
      title="Последнее"
      actions={
        <HomeCarouselArrows
          hasPrevious={hasPreviousSlide}
          hasNext={hasNextSlide}
          onPreviousClick={onPreviousButtonClick}
          onNextClick={onNextButtonClick}
        />
      }
      className="gap-3 overflow-hidden"
    >
      <Swiper
        onSwiper={onSwiper}
        onSlideChange={onSlideChange}
        spaceBetween={8}
        slidesPerView={3.2}
        style={{ overflow: "visible" }}
        className="w-full"
        wrapperClass="grid w-full auto-cols-fr auto-rows-fr"
      >
        {slides}
      </Swiper>
    </Island>
  );
}
