import { useNetwork } from "@siberiacancode/reactuse";

export function useInOffline() {
  const { online } = useNetwork();

  return !online;
}
