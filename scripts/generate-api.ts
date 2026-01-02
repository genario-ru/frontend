import "dotenv/config";

import { createClient, type UserConfig } from "@hey-api/openapi-ts";
import { readdirSync } from "fs";
import { basename, extname, join } from "path";
import { kebabCase } from "text-case";

const { input, output } = discoverApiSchemas();

createClient({
  input,
  output,
  plugins: [
    { name: "zod" },
    { name: "@hey-api/client-fetch" },
    {
      name: "@hey-api/typescript",
      enums: "typescript",
    },
    {
      name: "@hey-api/sdk",
      asClass: false,
      validator: true,
    },
    {
      name: "@tanstack/react-query",
      queryKeys: {
        tags: true,
      },
      infiniteQueryKeys: {
        tags: true,
      },
      queryOptions: true,
      infiniteQueryOptions: true,
      mutationOptions: true,
    },
  ],
});

function discoverApiSchemas(): {
  input: UserConfig["input"];
  output: UserConfig["output"];
} {
  const apiDir = "deps/api";
  const files = readdirSync(apiDir);
  const input = files.map((file) => join(apiDir, file));

  const outputFolders = files.map((file) => {
    const nameWithoutExt = basename(file, extname(file));

    return `src/codegen/api/${nameWithoutExt}`;
  });

  console.log(`🔍 Found schemas: ${files.length}`);
  console.log(`📁 Input files: ${input.join(", ")}`);
  console.log(`📂 Output files: ${outputFolders.join(", ")}`);

  return {
    input,
    output: createOutput(...outputFolders),
  };
}

function createOutput(...destinations: string[]): UserConfig["output"] {
  return destinations.map((destination) => ({
    path: destination,
    fileName: {
      name: (name) => kebabCase(name),
    },
    lint: "eslint",
    format: "prettier",
    indexFile: false,
  }));
}
