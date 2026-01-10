import { envs } from "../constants/envs";

const BASE_URL = envs.VITE_BASE_URL;

export function composeFullUrl(path: string) {
  return `${BASE_URL}${path}`;
}
