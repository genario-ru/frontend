#!/usr/bin/env tsx
/* eslint-disable security/detect-non-literal-fs-filename */

import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

// Список схем для загрузки
const SCHEMAS = [
  {
    url: "https://api.genario.ru/api/open-api",
    filename: "product.json",
  },
  {
    url: "https://api.genario.ru/api/auth/open-api/generate-schema",
    filename: "auth.json",
  },
];

// Директория для сохранения схем
const OUTPUT_DIR = "deps/api";

// Загрузка схемы
async function downloadSchema(url: string): Promise<string> {
  console.log(`📥 Загружаю схему с ${url}...`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return await response.text();
}

// Сохранение схемы
function saveSchema(content: string, filename: string): void {
  const outputDir = join(process.cwd(), OUTPUT_DIR);

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
    console.log(`📁 Создана директория: ${outputDir}`);
  }

  // Форматируем JSON с отступами
  const formattedContent = JSON.stringify(JSON.parse(content), null, 2);

  const outputPath = join(outputDir, filename);
  writeFileSync(outputPath, formattedContent, "utf-8");
  console.log(`✅ Схема сохранена: ${outputPath}`);
}

// Главная функция
async function main(): Promise<void> {
  console.log(`🚀 Загрузка OpenAPI схем...\n`);

  for (const schema of SCHEMAS) {
    try {
      const content = await downloadSchema(schema.url);
      saveSchema(content, schema.filename);
    } catch (error) {
      console.error(`❌ Ошибка при загрузке ${schema.url}:`, error);
      process.exit(1);
    }
  }

  console.log(`\n🎉 Все схемы успешно загружены!`);
}

// Запуск скрипта
main().catch((error) => {
  console.error(`❌ Критическая ошибка:`, error);
  process.exit(1);
});
