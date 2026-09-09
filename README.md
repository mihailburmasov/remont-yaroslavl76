# ПРО Ремонт 76 — сайт компании по ремонту квартир и домов (Ярославль)

Статический сайт на [Astro](https://astro.build) + Tailwind CSS v4. Стек и решения обоснованы
в `DECISIONS.md`, план работ — в `PLAN.md`, список плейсхолдеров для заполнения — в
`CONTENT-TODO.md`.

## Запуск локально

```bash
npm install
npm run dev
```

Сайт откроется на http://localhost:4321

## Сборка

```bash
npm run build
```

Статические файлы соберутся в папку `dist/`. Проверить собранную версию локально:

```bash
npm run preview
```

## Деплой

Сайт размещён в Yandex Object Storage (бакет `pro-remont76-static`, статический хостинг):

- **Временный адрес бакета:** http://pro-remont76-static.website.yandexcloud.net
- **Боевой домен:** `proremont76.ru` — подключается через Yandex Cloud CDN (см. ниже), чтобы
  сайт отдавался по HTTPS.
- **Повторный деплой:** `npm run deploy:yandex` — собирает проект и синхронизирует `dist/` с
  бакетом (требует настроенный профиль AWS CLI `yandex`, см. `~/.aws/config`).

### Подключение домена proremont76.ru через Yandex Cloud CDN + HTTPS

Домен зарегистрирован на reg.ru, но управление DNS-записями делегировано в **Yandex Cloud
DNS** (публичная зона `proremont76-ru-zone`) — reg.ru не поддерживает CNAME/ALIAS на корень
домена, а Yandex Cloud DNS поддерживает тип **ANAME**, который решает именно эту задачу
(корень домена не может напрямую указывать на CDN через обычный CNAME). Тот же подход
использован для sitomika.ru.

1. **Certificate Manager** — заказать управляемый сертификат Let's Encrypt на `proremont76.ru`
   и `www.proremont76.ru`, подтвердить владение доменом через CNAME-записи
   `_acme-challenge.*` (нужны для первичного выпуска и для автопродления каждые ~90 дней).
2. **CDN** — создать ресурс (`yc cdn resource create`): источник — bucket website-эндпоинт
   `pro-remont76-static.website.yandexcloud.net` по HTTP с явным `--host-header`, привязать
   сертификат из шага 1, домены `proremont76.ru` + `www.proremont76.ru`. CDN выдаёт
   провайдерский CNAME вида `<id>.topology.gslb.yccdn.ru`.
3. **Yandex Cloud DNS** — публичная зона на домен, записи:
   - `proremont76.ru.` → **ANAME** → провайдерский CNAME CDN-ресурса
   - `www.proremont76.ru.` → **CNAME** → тот же адрес
   - `_acme-challenge.proremont76.ru.` и `_acme-challenge.www.proremont76.ru.` → CNAME на
     Certificate Manager (из шага 1) — сохранить, иначе через ~90 дней не продлится сертификат
4. **reg.ru** — сменить NS-серверы домена на выданные зоной (`ns1.yandexcloud.net`,
   `ns2.yandexcloud.net»): «Домены» → `proremont76.ru` → «DNS-серверы и управление зоной» →
   «Изменить» → «Свой список DNS-серверов». Распространяется до суток.
5. Проверить, что `https://proremont76.ru` и `https://www.proremont76.ru` открывают сайт с
   валидным сертификатом.
6. Домен уже прописан в коде (`astro.config.mjs`, `src/lib/site.ts`, `public/robots.txt`) —
   после подключения CDN просто `npm run deploy:yandex`, дополнительных правок не требуется.

Проект — набор статических файлов без бэкенда, подходит и для любого другого статического
хостинга (Netlify, Vercel, обычный FTP/SSH-хостинг — залить содержимое `dist/` после
`npm run build`).

Осталось из плейсхолдеров (см. `CONTENT-TODO.md`):

1. Юрреквизиты (`{{LEGAL_NAME}}`, `{{INN}}`), приёмник формы (`{{FORM_ENDPOINT}}` в
   `src/lib/submitLead.ts`), счётчик Метрики (`{{METRIKA_ID}}`).
2. Заменить стоковые фото портфолио и команды в `public/images/portfolio/` и
   `public/images/team/` на настоящие, когда они будут готовы (см. раздел «Фото» в
   `CONTENT-TODO.md`).

## Структура проекта

```
src/
  components/       переиспользуемые компоненты (форма, слайдер до/после, карточки, шапка/подвал)
  layouts/Layout.astro   общий каркас страницы (метатеги, SEO, подключение стилей)
  lib/              данные сайта: контакты, услуги, тарифы, портфолио (src/lib/site.ts и др.)
  pages/            маршруты сайта — файловая структура Astro
  scripts/          ванильный TypeScript для интерактива (слайдер, формы, фильтры, лайтбокс)
  styles/global.css дизайн-система: цвета, типографика, базовые классы
public/
  images/           фото сайта: hero/ (первые экраны), portfolio/ (до/после), team/, logo/
scripts/generate-placeholders.mjs   генератор SVG-заглушек — пригодится, если понадобится
                                     быстро добавить новую карточку портфолио/сотрудника без фото
```

Дизайн-система с образцами цветов, типографики и компонентов — на служебной странице
`/styleguide` (не индексируется поисковиками).

## Проверка перед сдачей

- `npm run build` — сборка без ошибок.
- `npx astro check` — проверка типов Astro/TypeScript.
- Ручная проверка: форма отправляет заявку (или предупреждает в консоли, если
  `{{FORM_ENDPOINT}}` не настроен), слайдер «до/после» работает мышью/тачем/клавиатурой, FAQ
  открывается, мобильное меню открывается и закрывается.
- Lighthouse (Chrome DevTools → Lighthouse, режим Mobile) — приложить скриншот отчёта к сдаче
  проекта.
