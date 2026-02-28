import { usePrefetchQuery } from "@tanstack/react-query";

import {
  getApiV1PlatformsQueryOptions,
  getApiV1ProfilesMyQueryOptions,
  getApiV1TonesQueryOptions,
  getApiV1VideoDurationsQueryOptions,
  getApiV1VideoTypesQueryOptions,
} from "@/codegen/api/product";

export function usePrefetchScenarioSettingsSubformsData() {
  usePrefetchQuery(getApiV1ProfilesMyQueryOptions());
  usePrefetchQuery(getApiV1PlatformsQueryOptions());
  usePrefetchQuery(getApiV1VideoTypesQueryOptions());
  usePrefetchQuery(getApiV1VideoDurationsQueryOptions());
  usePrefetchQuery(getApiV1TonesQueryOptions());
}
