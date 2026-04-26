import type { MouseEvent } from "react";

export function checkIgnoreParentLink(event: MouseEvent<HTMLAnchorElement>) {
  const target = event.target as HTMLElement;

  const closestDataIgnoreNestedLink = target.closest(
    "[data-ignore-parent-link]",
  );

  return Boolean(closestDataIgnoreNestedLink);
}
