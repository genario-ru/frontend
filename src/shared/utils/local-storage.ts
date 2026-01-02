import { parseJson } from "./parse-json";

export function getFromLocalStorage(name: string) {
  if (typeof localStorage !== "undefined") {
    const item = localStorage.getItem(name);

    return item ? parseJson(item) : null;
  }

  return null;
}

export function setToLocalStorage(name: string, data: any) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(name, JSON.stringify(data));
  }
}

export function removeFromLocalStorage(name: string) {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(name);
  }
}
