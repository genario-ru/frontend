import { useMemo } from "react";

import { useGetMyArchiveItems } from "@/actions/archive/hooks/use-get-my-archive-items";
import { useSwiper } from "@/lib/swiper/hooks/use-swiper";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

const MAX_ARCHIVE_ITEMS_COUNT = 6;

export function useHomeArchiveItemsCarousel() {
  const { isMobile, isTablet } = useBreakpoints();
  const { archiveItemsData, isLoadingArchiveItems } = useGetMyArchiveItems();

  const slicedArchiveItemsData = useMemo(() => {
    return archiveItemsData?.slice(0, MAX_ARCHIVE_ITEMS_COUNT);
  }, [archiveItemsData]);

  const {
    hasPreviousSlide,
    hasNextSlide,
    onSwiper,
    onSlideChange,
    onPreviousButtonClick,
    onNextButtonClick,
  } = useSwiper();

  const slidesPerView = useMemo(() => {
    if (isMobile) {
      return 1.2;
    }
    if (isTablet) {
      return 2.2;
    }

    return 3.2;
  }, [isMobile, isTablet]);

  return {
    archiveItemsData: slicedArchiveItemsData,
    slidesPerView,
    showSeeAllButton: archiveItemsData.length > MAX_ARCHIVE_ITEMS_COUNT,
    isLoadingArchiveItems,
    hasPreviousSlide,
    hasNextSlide,
    onSwiper,
    onSlideChange,
    onPreviousButtonClick,
    onNextButtonClick,
  };
}
