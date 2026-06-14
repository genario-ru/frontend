import { useMemo } from "react";

import { useGetMyArchiveItems } from "@/actions/archive/hooks/use-get-my-archive-items";
import { useGetSession } from "@/actions/auth/hooks/use-get-session";
import { useSwiper } from "@/lib/swiper/hooks/use-swiper";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

const MAX_ARCHIVE_ITEMS_COUNT = 6;

export function useHomeArchiveItemsCarousel() {
  const { isMobile, isTablet } = useBreakpoints();
  const { archiveItemsData, isLoadingArchiveItems } = useGetMyArchiveItems();
  const { sessionData } = useGetSession();

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
      return 1.8;
    }

    if (sessionData && !sessionData.user.hideOnboarding) {
      return 1.8;
    }

    return 3.2;
  }, [sessionData, isMobile, isTablet]);

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
