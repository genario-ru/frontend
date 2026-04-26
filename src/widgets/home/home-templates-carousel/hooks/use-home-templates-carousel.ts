import { useMemo } from "react";

import { useGetTemplates } from "@/actions/templates/hooks/use-get-templates";
import { useSwiper } from "@/lib/swiper/hooks/use-swiper";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { checkTouchScreen } from "@/shared/utils/check-touch-screen";

export function useHomeTemplatesCarousel() {
  const { isMobile, isTablet } = useBreakpoints();
  const { templatesData, isTemplatesLoading } = useGetTemplates();
  const isTouchScreen = checkTouchScreen();

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

    return 4.2;
  }, [isMobile, isTablet]);

  return {
    templatesData,
    slidesPerView,
    isTouchScreen,
    isTemplatesLoading,
    hasPreviousSlide,
    hasNextSlide,
    onSwiper,
    onSlideChange,
    onPreviousButtonClick,
    onNextButtonClick,
  };
}
