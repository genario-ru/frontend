import type { BadgeData, BadgesListInput } from "../types/badges-list";
import { normalizeBadgesData } from "./normalize-badges-data";

type PrepareBadgesListDisplayResult = {
  visibleBadges: BadgeData[];
  overflowCount: number;
};

export function prepareBadgesListDisplay(
  badgesData: BadgesListInput,
  clamp?: number,
): PrepareBadgesListDisplayResult {
  const allBadges = normalizeBadgesData(badgesData);
  const limit = clamp !== undefined ? clamp : allBadges.length;
  const visibleBadges = allBadges.slice(0, limit);
  const overflowCount = Math.max(0, allBadges.length - visibleBadges.length);

  return { visibleBadges, overflowCount };
}
