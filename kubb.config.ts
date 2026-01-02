import { defineConfig, type UserConfig } from "@kubb/core";
import { pluginClient } from "@kubb/plugin-client";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginReactQuery } from "@kubb/plugin-react-query";
import { pluginTs } from "@kubb/plugin-ts";
import { readdirSync } from "fs";
import { basename, extname, join } from "path";
import { kebabCase } from "text-case";

const API_DIR = "deps/api";
const API_OUTPUT_DIR = "src/codegen/api";

export default defineConfig(() => {
  const apiSchemas = discoverApiSchemas();

  return apiSchemas.map(({ input, output }) => createConfig(input, output));
});

const kebabCaseTransformer = (
  name: string,
  type?: "file" | "function" | "type" | "const",
) => {
  if (type === "file") {
    return kebabCase(name);
  }

  return name;
};

function createConfig(input: string, output: string): UserConfig {
  const clientConfig: Parameters<typeof pluginClient>[0] = {
    pathParamsType: "object",
    paramsType: "object",
    importPath: "@/lib/api/utils/client.ts",
    transformers: {
      name: kebabCaseTransformer,
    },
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
      pluginOas(),
      pluginTs({
        output: {
          path: "models",
        },
        transformers: {
          name: kebabCaseTransformer,
        },
      }),
      pluginClient(clientConfig),
      pluginReactQuery({
        pathParamsType: "object",
        paramsType: "object",
        client: clientConfig,
        infinite: {
          queryParam: "page",
          initialPageParam: 1,
        },
        transformers: {
          name: kebabCaseTransformer,
        },
      }),
    ],
  };
}

function discoverApiSchemas(): {
  input: string;
  output: string;
}[] {
  const files = readdirSync(API_DIR);
  const input = files.map((file) => join(API_DIR, file));

  const outputFolders = files.map((file) => {
    const nameWithoutExt = basename(file, extname(file));

    return `${API_OUTPUT_DIR}/${nameWithoutExt}`;
  });

  console.log(`🔍 Found schemas: ${files.length}`);
  console.log(`📁 Input files: ${input.join(", ")}`);
  console.log(`📂 Output files: ${outputFolders.join(", ")}`);

  return outputFolders.map((output, index) => ({
    input: input[index],
    output: output,
  }));
}
