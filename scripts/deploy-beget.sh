#!/usr/bin/env bash
# Заливка собранного сайта (dist/) на хостинг Beget по FTP.
# Перезаписывает файлы на сервере, ничего не удаляет.
#
#   BEGET_FTP_PASS=... npm run deploy:beget     — собрать и залить
#   BEGET_FTP_PASS=... bash scripts/deploy-beget.sh   — залить уже собранный dist/
set -euo pipefail
cd "$(dirname "$0")/.."

HOST=mihainpx.beget.tech
USER_=mihainpx
ROOT=proremont76.ru/public_html
: "${BEGET_FTP_PASS:?Задайте пароль FTP (пароль от панели Beget) в переменной BEGET_FTP_PASS}"

[ -f dist/index.html ] || { echo "Нет dist/ — сначала npm run build" >&2; exit 1; }

# Один процесс curl на все файлы: соединение переиспользуется, заливка идёт быстро.
CFG=$(mktemp)
trap 'rm -f "$CFG"' EXIT
n=0
while IFS= read -r -d '' f; do
  rel=${f#dist/}
  printf 'upload-file = "%s"\nurl = "ftp://%s/%s/%s"\n' "$f" "$HOST" "$ROOT" "$rel" >> "$CFG"
  n=$((n+1))
done < <(find dist -type f -print0)

curl -sS --fail --retry 3 --ftp-create-dirs --user "$USER_:$BEGET_FTP_PASS" --config "$CFG"
echo "Готово: залито файлов на Beget — $n."
