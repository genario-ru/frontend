import { isNil } from "es-toolkit";

export type SearchParamsValue = string | number | boolean | null | undefined;

export type SearchParams = Record<
  string,
  SearchParamsValue | Array<SearchParamsValue>
>;

export function prepareSearchParams(params?: SearchParams) {
  const urlSearchParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          const stringValue = String(item);

          if (!isNil(item) && stringValue.length > 0) {
            urlSearchParams.append(key, stringValue);
          }
        });
      } else {
        const stringValue = String(value);

        if (!isNil(value) && stringValue.length > 0) {
          urlSearchParams.set(key, stringValue.toString());
        }
      }
    });
  }

  return urlSearchParams;
}
