import { useGetApiV1Templates } from "@/codegen/api/product";

export function useGetTemplates() {
  const {
    data: templatesData,
    isLoading: isTemplatesLoading,
    isError: isTemplatesError,
  } = useGetApiV1Templates();

  return {
    templatesData,
    isTemplatesLoading,
    isTemplatesError,
  };
}
