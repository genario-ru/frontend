import Resources from "./i18next-resources";

const resources = {
  translation,
} as const;

declare module "i18next" {
  interface CustomTypeOptions {
    resources: Resources;
  }
}
