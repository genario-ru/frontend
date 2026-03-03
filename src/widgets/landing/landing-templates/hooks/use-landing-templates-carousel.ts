import { useGetTemplates } from "@/actions/templates/hooks/use-get-templates";

export function useLandingTemplatesCarousel() {
  const { templatesData, isTemplatesLoading } = useGetTemplates();

  return {
    templatesData,
    isTemplatesLoading,
  };
}
