export type BadgeData = {
  name: string;
  icon?: string | null;
  color?: string;
};

export type BadgesListInput = Array<BadgeData | BadgeData[] | null | undefined>;
