type YMEnabledConfig = {
  id: string;
  enabled: boolean;
};

type YMDisabledConfig = {
  enabled: false;
};

export type YMConfig = YMEnabledConfig | YMDisabledConfig;
