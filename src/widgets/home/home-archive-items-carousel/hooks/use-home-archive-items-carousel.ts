import { useMemo } from "react";

import { useGetMyArchiveItems } from "@/actions/archive/hooks/use-get-my-archive-items";
import { useSwiper } from "@/lib/swiper/hooks/use-swiper";

const MAX_ARCHIVE_ITEMS_COUNT = 6;

export function useHomeArchiveItemsCarousel() {
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

  return {
    archiveItemsData: slicedArchiveItemsData,
    isLoadingArchiveItems,
    hasPreviousSlide,
    hasNextSlide,
    onSwiper,
    onSlideChange,
    onPreviousButtonClick,
    onNextButtonClick,
  };
}
