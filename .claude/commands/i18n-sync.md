# i18n Sync

Audit translation files for missing keys, inconsistencies between locales, and regenerate TypeScript resources.

## Arguments

`$ARGUMENTS` — optional scope (e.g. "scenario domain" or "check all"). Defaults to full audit.

## Locale files

```
public/locales/
├── en/translation.json   ← primary locale
└── ru/translation.json   ← must mirror en structure exactly
```

## Step 1 — Audit for missing keys

Compare both locale files:

1. Read `public/locales/en/translation.json`
2. Read `public/locales/ru/translation.json`
3. Find keys present in `en` but missing in `ru` (and vice versa)
4. Report all discrepancies before making any changes

## Step 2 — Fix missing translations

For each missing key:

- If missing in `ru`: add the key with a Russian translation (or `"TODO: translate"` placeholder if uncertain)
- If missing in `en`: add the key with an English translation
- Maintain the same nesting structure in both files

## Step 3 — Check component usage

Search for hardcoded user-facing strings in components that should use `t()`:

```bash
# Look for obvious hardcoded Russian text in TSX files
grep -r "[А-Яа-яёЁ]" src/ --include="*.tsx" -l
```

## Step 4 — Regenerate resources

```bash
pnpm i18n:resources
```

Regenerates `src/globals/i18next-resources.d.ts` — provides TypeScript type safety for all `t("key")` calls.

## Step 5 — Verify

```bash
pnpm lint:typescript
```

## Rules

- Never edit `src/globals/i18next-resources.d.ts` manually (generated file)
- Key structure (nesting) must be identical between `en` and `ru`
- Pluralization keys follow the pattern: `key_one`, `key_few`, `key_many`, `key_other`
