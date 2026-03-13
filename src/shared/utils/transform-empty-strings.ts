type NonArrayStringKeys<T extends object> = {
  [K in keyof T]: T[K] extends Array<unknown>
    ? never
    : Extract<T[K], string> extends never
      ? never
      : K;
}[keyof T];

type NonStringOrArrayKeys<T extends object> = Exclude<
  keyof T,
  NonArrayStringKeys<T>
>;

type RemoveEmptyStringsResult<T extends object> = {
  [K in NonStringOrArrayKeys<T>]: T[K];
} & {
  [K in NonArrayStringKeys<T>]?: T[K];
};

type ToNullEmptyStringsResult<T extends object> = {
  [K in NonStringOrArrayKeys<T>]: T[K];
} & {
  [K in NonArrayStringKeys<T>]: T[K] | null;
};

export type TransformEmptyStringsResult<
  T extends object,
  A extends "remove" | "to-null",
> = A extends "remove"
  ? RemoveEmptyStringsResult<T>
  : ToNullEmptyStringsResult<T>;

export function transformEmptyStrings<
  T extends object,
  A extends "remove" | "to-null",
>(obj: T, action: A): TransformEmptyStringsResult<T, A> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      result[key] = value;
      continue;
    }

    if (value === "") {
      if (action === "to-null") {
        result[key] = null;
      }
      continue;
    }

    result[key] = value;
  }

  return result as TransformEmptyStringsResult<T, A>;
}
