#!/usr/bin/env bash
# Non-blocking Claude Code post-edit hints for generated files.

INPUT="$(cat)"

FILE="$(
  printf '%s' "$INPUT" | python3 -c '
import json
import sys

try:
    data = json.load(sys.stdin)
    print(data.get("tool_input", {}).get("file_path", "") or "")
except Exception:
    print("")
'
)"

if [[ "$FILE" == *"/src/routes/"* ]] && [[ "$FILE" != *"route-tree.gen"* ]]; then
  echo "[hook] Route file modified: $(basename "$FILE") -> run: pnpm router:generate"
fi

if [[ "$FILE" == *"/locales/"* ]] && [[ "$FILE" == *".json" ]]; then
  echo "[hook] Locale file modified: $(basename "$FILE") -> run: pnpm i18n:resources"
fi

exit 0
