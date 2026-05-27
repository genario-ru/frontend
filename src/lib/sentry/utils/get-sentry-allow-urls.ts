import { envs } from "@/shared/constants/envs";

export function getSentryAllowUrls(): string[] | undefined {
  if (!envs.VITE_BASE_URL) {
    return undefined;
  }

  try {
    const { origin } = new URL(envs.VITE_BASE_URL);

    return [origin];
  } catch {
    return undefined;
  }
}
