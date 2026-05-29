import type { YMFunction } from "@/lib/yandex-metrika";

declare global {
  interface Window {
    ym?: YMFunction;
  }
}
