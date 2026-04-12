#!/usr/bin/env bash
# Post-edit hook: notifies Claude when auto-regeneration is needed.
# Receives tool use JSON on stdin; exits 0 always (non-blocking).

INPUT=$(cat)

FILE=$(python3 -c "
import sys, json
try:
    d = json.loads('''$INPUT''' if False else sys.stdin.read() if False else '')
except:
    d = {}
" 2>/dev/null || echo "")

# Parse file_path from JSON using python3 reading actual stdin
FILE=$(echo "$INPUT" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    f = d.get('tool_input', {}).get('file_path', '') or ''
    print(f)
except Exception:
    print('')
" 2>/dev/null)

if [[ "$FILE" == *"/src/routes/"* ]] && [[ "$FILE" != *"route-tree.gen"* ]]; then
  echo "[hook] Route file modified: $(basename "$FILE") → run: pnpm router:generate"
fi

if [[ "$FILE" == *"/locales/"* ]] && [[ "$FILE" == *".json" ]]; then
  echo "[hook] Locale file modified: $(basename "$FILE") → run: pnpm i18n:resources"
fi

exit 0
