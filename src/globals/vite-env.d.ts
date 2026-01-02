/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ViteTypeOptions {
  // Ограничиваем использование неизвестных env переменных
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  // Недоступны на клиенте
  readonly PORT: string;
  readonly SW_DEV: string;

  // Доступны на клиенте
  readonly VITE_BASE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
