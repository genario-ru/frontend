import { useGetTemplates } from "@/actions/templates/hooks/use-get-templates";
import { useSwiper } from "@/lib/swiper/hooks/use-swiper";

export function useHomeTemplatesCarousel() {
  const { templatesData, isTemplatesLoading } = useGetTemplates();

  const {
    hasPreviousSlide,
    hasNextSlide,
    onSwiper,
    onSlideChange,
    onPreviousButtonClick,
    onNextButtonClick,
  } = useSwiper();

  return {
    templatesData,
    isTemplatesLoading,
    hasPreviousSlide,
    hasNextSlide,
    onSwiper,
    onSlideChange,
    onPreviousButtonClick,
    onNextButtonClick,
  };
}
