---
name: add-route-with-entrypoint
description: Adds a new TanStack file route with proper entrypoint composition while keeping route files minimal. Use when creating a new page route or extending navigation structure.
---

# Add Route With Entrypoint

## Goal

Добавить новый маршрут без нарушения правила `Route-only` в `src/routes/**`.

## Steps

1. Создай/обнови entrypoint в `src/entrypoints/**` для основной логики страницы.
2. В `src/routes/**` оставь только объявление `Route` через `createFileRoute`.
3. Подключи entrypoint/component в route-объявлении.
4. Если нужны доменные блоки, вынеси их в `widgets/features/actions`, а не в route-файл.
5. Сгенерируй route tree:
   - `pnpm router:generate`
6. Выполни проверки:
   - `pnpm lint:fix`
   - `pnpm lint:typescript`

## Constraints

- Не редактировать `src/codegen/router/route-tree.gen.ts` вручную.
- Не помещать крупную бизнес-логику в `src/routes/**`.
