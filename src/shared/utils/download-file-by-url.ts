import { envs } from "../constants/envs";

export type DownloadFileByUrlParams = {
  url: string;
};

export function downloadFileByUrl({ url }: DownloadFileByUrlParams) {
  const anchor = document.createElement("a");

  anchor.href = `${envs.VITE_BASE_API_URL}${url}`;
  anchor.style.display = "none";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
}
