import { useGetMyProfiles } from "@/actions/profiles/hooks/use-get-my-profiles";

export function useMyProfilesList() {
  const { data: profilesData, isLoading: isLoadingProfiles } =
    useGetMyProfiles();

  return {
    profilesData,
    isLoadingProfiles,
  };
}
