import { useGetApiV1ProfilesMy } from "@/codegen/api/product";

export function useGetMyProfiles() {
  const {
    data: myProfilesData,
    isLoading: isMyProfilesLoading,
    isError: isMyProfilesError,
  } = useGetApiV1ProfilesMy();

  return {
    myProfilesData,
    isMyProfilesLoading,
    isMyProfilesError,
  };
}
