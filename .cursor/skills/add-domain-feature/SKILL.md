---
name: add-domain-feature
description: Implements a new domain feature in this frontend using the local FSD structure (actions/features/widgets/entrypoints) and project workflows. Use when adding or expanding business functionality in a domain module.
---

# Add Domain Feature

## Goal

Добавить или расширить доменную функциональность без нарушения FSD-границ.

## Steps

1. Определи домен и слой изменений:
   - orchestration -> `src/actions/<domain>`
   - presentational UI -> `src/features/<domain>`
   - composed block -> `src/widgets/<domain>`
   - page composition -> `src/entrypoints`
2. Проверь, нет ли готовых API-хуков в `@/codegen/api/auth` или `@/codegen/api/product`.
3. Реализуй изменения минимально и локально для домена.
4. Убедись, что `shared` и `lib` не получают доменно-специфичную логику.
5. Выполни проверки:
   - `pnpm lint:fix`
   - `pnpm lint:typescript`

## Constraints

- Не редактировать `src/codegen/**` вручную.
- Если требуются новые API-типы/хуки, сначала запустить генерацию.
