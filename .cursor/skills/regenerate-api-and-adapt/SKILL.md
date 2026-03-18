---
name: regenerate-api-and-adapt
description: Regenerates API clients/types from OpenAPI sources and adapts handwritten code safely outside generated folders. Use when backend schema changed or API hooks/types are outdated.
---

# Regenerate API And Adapt

## Goal

Обновить API codegen и аккуратно адаптировать пользовательский код.

## Steps

1. Обнови схемы:
   - `pnpm api:download` (если нужно подтянуть свежие OpenAPI файлы)
2. Сгенерируй API:
   - `pnpm api:generate`
   - если задача явно просит hey-api, используй `pnpm api:generate:hey-api`
3. Проверь изменения в `src/codegen/api/**` как read-only результат генератора.
4. Адаптируй только hand-written код вне `src/codegen/**`:
   - импорты типов/хуков
   - сигнатуры вызовов
   - обработку новых полей/ошибок
5. Прогони качество:
   - `pnpm lint:fix`
   - `pnpm lint:typescript`

## Constraints

- Никогда не править `src/codegen/**` вручную.
- При несовпадениях меняй источник генерации (схемы/конфиг/скрипты), а не generated output.
