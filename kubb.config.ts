import { defineConfig, type UserConfig } from "@kubb/core";
import { pluginClient } from "@kubb/plugin-client";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginReactQuery } from "@kubb/plugin-react-query";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginZod } from "@kubb/plugin-zod";
import { kebabCase } from "text-case";

const API_DIR = "deps/api";
const API_OUTPUT_DIR = "src/codegen/api";

type CreateConfigParams = {
  input: string;
  output: string;
  prefixUrl?: string;
  infiniteQuries?: boolean;
};

export default defineConfig(() => {
  return [
    createConfig({
      input: `${API_DIR}/auth.json`,
      output: `${API_OUTPUT_DIR}/auth`,
      prefixUrl: "/api/auth",
      infiniteQuries: false,
    }),
    createConfig({
      input: `${API_DIR}/product.json`,
      output: `${API_OUTPUT_DIR}/product`,
    }),
  ];
});

function removeUsePrefix(name: string): string {
  return name.replace(/^use-/, "");
}

function kebabCaseTransformer(
  name: string,
  type?: "file" | "function" | "type" | "const",
): string {
  if (type === "file") {
    return removeUsePrefix(kebabCase(name));
  }

  return name;
}

function createConfig({
  input,
  output,
  prefixUrl,
  infiniteQuries = true,
}: CreateConfigParams): UserConfig {
  const clientConfig: Parameters<typeof pluginClient>[0] = {
    baseURL: prefixUrl,
    parser: "zod",
    pathParamsType: "object",
    paramsType: "object",
    importPath: "@/lib/api/client",
    transformers: {
      name: kebabCaseTransformer,
    },
  };

  const infiniteConfig = {
    queryParam: "page",
    previousParam: "meta.previousPage",
    nextParam: "meta.nextPage",
    initialPageParam: 1,
  };

  return {
    input: {
      path: input,
    },
    output: {
      path: output,
      lint: "eslint",
      format: "prettier",
      clean: true,
    },
    plugins: [
      pluginOas({
        discriminator: "inherit",
        // ← ЭТО ОТКЛЮЧАЕТ ВСЕ JSON-схемы полностью
        // (в старых версиях было output: false, сейчас — generators: [])
        generators: [],
      }),
      pluginTs({
        output: {
          path: "models",
        },
        transformers: {
          name: kebabCaseTransformer,
        },
      }),
      pluginZod({
        importPath: "@/lib/zod/index.ts",
        output: {
          path: "zod",
        },
        transformers: {
          name: kebabCaseTransformer,
        },
      }),
      pluginClient(clientConfig),
      pluginReactQuery({
        output: {
          path: "tanstack",
        },
        parser: "zod",
        pathParamsType: "object",
        paramsType: "object",
        client: clientConfig,
        suspense: false,
        infinite: infiniteQuries ? infiniteConfig : undefined,
        transformers: {
          name: kebabCaseTransformer,
        },
      }),
    ],
  };
}
