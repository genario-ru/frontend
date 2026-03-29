import "swiper/swiper.css";

import { BookImageIcon, LightbulbIcon } from "lucide-react";
import { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { ArchiveItem } from "@/features/archive/archive-item/components/archive-item";
import { ArchiveItemSkeleton } from "@/features/archive/archive-item/components/archive-item-skeleton";
import { HomeCarouselArrows } from "@/features/home/components/home-carousel-arrows";
import { ButtonLink } from "@/shared/components/ui/button-link";
import { Island } from "@/shared/components/ui/island";
import { Plug } from "@/shared/components/ui/plug";
import { ArchiveItemBadges } from "@/widgets/archive/archive-items/components/archive-item-badges";

import { useHomeArchiveItemsCarousel } from "../hooks/use-home-archive-items-carousel";
import { HomeArchiveItemsSeeAll } from "./home-archive-items-see-all";

export function HomeArchiveItemsCarousel() {
  const {
    archiveItemsData,
    showSeeAllButton,
    isLoadingArchiveItems,
    hasPreviousSlide,
    hasNextSlide,
    onSwiper,
    onSlideChange,
    onPreviousButtonClick,
    onNextButtonClick,
  } = useHomeArchiveItemsCarousel();

  const isEmptyArchiveItems = useMemo(() => {
    return !archiveItemsData?.length;
  }, [archiveItemsData]);

  const slides = useMemo(() => {
    if (isLoadingArchiveItems) {
      // TODO: Поисследовать странное отображение скелетонов, когда выносим этот код в отдельный компонент
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

  const body = useMemo(() => {
    if (isEmptyArchiveItems && !isLoadingArchiveItems) {
      return <HomeArchiveItemsCarouselEmptyPlug />;
    }

    return (
      <Swiper
        onSwiper={onSwiper}
        onSlideChange={onSlideChange}
        spaceBetween={8}
        slidesPerView={3.2}
        style={{ overflow: "visible" }}
        className="w-full"
        wrapperClass="grid min-h-[176px] w-full auto-cols-fr auto-rows-fr"
      >
        {slides}
        {showSeeAllButton && (
          <SwiperSlide style={{ height: "auto" }} className="w-full">
            <HomeArchiveItemsSeeAll />
          </SwiperSlide>
        )}
      </Swiper>
    );
  }, [
    showSeeAllButton,
    isLoadingArchiveItems,
    isEmptyArchiveItems,
    slides,
    onSwiper,
    onSlideChange,
  ]);

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
      {body}
    </Island>
  );
}

export function HomeArchiveItemsCarouselEmptyPlug() {
  return (
    <Plug
      variant="neutral"
      title="Тут пока пусто"
      description="Создайте свой первый список идей или сценарий"
      actions={
        <div className="mt-3 flex items-center gap-2">
          <ButtonLink to="/ideas-lists/settings" icon={<LightbulbIcon />}>
            Новые идеи
          </ButtonLink>
          <ButtonLink to="/scenarios/settings" icon={<BookImageIcon />}>
            Новый сценарий
          </ButtonLink>
        </div>
      }
      className="min-h-[176px]"
    />
  );
}
