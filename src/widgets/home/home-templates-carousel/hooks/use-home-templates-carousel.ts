import { useGetTemplates } from "@/actions/templates/hooks/use-get-templates";

export function useHomeTemplatesCarousel() {
  const { templatesData, isTemplatesLoading } = useGetTemplates();

  return {
    templatesData,
    isTemplatesLoading,
  };
}
