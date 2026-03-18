---
name: update-existing-widget
description: Applies focused updates to an existing widget with minimal side effects, preserving FSD boundaries and local hooks/components structure. Use when user asks to change behavior or UI in current widgets.
---

# Update Existing Widget

## Goal

Внести точечные изменения в существующий widget без лишних рефакторингов.

## Steps

1. Найди входную точку widget в `src/widgets/<domain>/**`.
2. Определи, где должна жить логика:
   - UI-only -> component file in widget
   - reusable local logic -> widget hook (`hooks/use-*.ts`)
   - business orchestration -> `src/actions/<domain>`
3. Сделай минимальный diff:
   - не переноси код между слоями без необходимости
   - не трогай unrelated файлы
4. Проверь зависимости на codegen:
   - использовать API hooks/типы из `@/codegen/api/*`
   - не редактировать generated файлы вручную
5. Выполни проверки:
   - `pnpm lint:fix`
   - `pnpm lint:typescript`

## Output checklist

- Поведение widget соответствует задаче.
- Архитектурные границы не нарушены.
- Нет изменений в `src/codegen/**` вручную.
