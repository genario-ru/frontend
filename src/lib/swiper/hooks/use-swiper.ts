import { useCallback, useEffect, useState } from "react";
import type { Swiper } from "swiper/types";

export function useSwiper() {
  const [swiper, setSwiper] = useState<Swiper | null>(null);
  const [hasPreviousSlide, setHasPreviousSlide] = useState(false);
  const [hasNextSlide, setHasNextSlide] = useState(false);

  const onSwiper = useCallback((swiper: Swiper) => {
    setSwiper(swiper);
  }, []);

  const onPreviousButtonClick = useCallback(() => {
    if (!swiper) {
      return;
    }

    swiper.slidePrev();
  }, [swiper]);

  const onNextButtonClick = useCallback(() => {
    if (!swiper) {
      return;
    }

    swiper.slideNext();
  }, [swiper]);

  const onSlideChange = useCallback((swiper: Swiper) => {
    if (!swiper) {
      return;
    }

    setHasPreviousSlide(!swiper.isBeginning);
    setHasNextSlide(!swiper.isEnd);
  }, []);

  useEffect(() => {
    if (!swiper) {
      return;
    }

    setHasPreviousSlide(!swiper.isBeginning);
    setHasNextSlide(!swiper.isEnd);
  }, [swiper]);

  return {
    hasPreviousSlide,
    hasNextSlide,
    onSwiper,
    onSlideChange,
    onPreviousButtonClick,
    onNextButtonClick,
  };
}
