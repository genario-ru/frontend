import { useGetMyProfiles } from "@/actions/profiles/hooks/use-get-my-profiles";

export function useMyProfilesList() {
  const { myProfilesData, isMyProfilesLoading } = useGetMyProfiles();

  return {
    myProfilesData,
    isMyProfilesLoading,
  };
}
