import type { CreateClientConfig } from "@/codegen/api/auth/client";

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  credentials: "include",
});
