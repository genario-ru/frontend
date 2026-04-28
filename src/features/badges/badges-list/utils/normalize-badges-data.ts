import { isEmpty } from "es-toolkit/compat";

import type { BadgeData, BadgesListInput } from "../types/badges-list";

export function normalizeBadgesData(badgesData: BadgesListInput): BadgeData[] {
  const prepared: BadgeData[] = [];

  badgesData.forEach((value) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        prepared.push(item);
      });
    } else if (value) {
      prepared.push(value);
    }
  });

  return prepared.filter((badge) => !isEmpty(badge));
}
