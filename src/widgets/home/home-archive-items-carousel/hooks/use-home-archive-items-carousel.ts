import { useGetMyArchiveItems } from "@/actions/archive/hooks/use-get-my-archive-items";
import { useSwiper } from "@/lib/swiper/hooks/use-swiper";

export function useHomeArchiveItemsCarousel() {
  const { archiveItemsData, isLoadingArchiveItems } = useGetMyArchiveItems();

  const {
    hasPreviousSlide,
    hasNextSlide,
    onSwiper,
    onSlideChange,
    onPreviousButtonClick,
    onNextButtonClick,
  } = useSwiper();

  return {
    archiveItemsData,
    isLoadingArchiveItems,
    hasPreviousSlide,
    hasNextSlide,
    onSwiper,
    onSlideChange,
    onPreviousButtonClick,
    onNextButtonClick,
  };
}
