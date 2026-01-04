import { useGetTemplates } from "@/actions/templates/hooks/use-get-templates";

export function useHomeTemplatesCarousel() {
  const { data: templatesData, isLoading: isTemplatesLoading } =
    useGetTemplates();

  return {
    templatesData,
    isTemplatesLoading,
  };
}
