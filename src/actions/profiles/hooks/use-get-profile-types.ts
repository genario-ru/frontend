import { useGetApiV1ProfilesTypes } from "@/codegen/api/product";

export function useGetProfileTypes() {
  const {
    data: profileTypesData,
    isLoading: isProfileTypesLoading,
    isError: isProfileTypesError,
  } = useGetApiV1ProfilesTypes();

  return {
    profileTypesData,
    isProfileTypesLoading,
    isProfileTypesError,
  };
}
