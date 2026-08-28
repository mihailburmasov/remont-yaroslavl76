# Акт передачи — сайт «ПРО Ремонт 76»

Ремонт квартир и домов в Ярославле — корпоративный сайт на Astro и Tailwind CSS, 17 страниц.

- **Исполнитель:** Claude Sonnet 5
- **Заказчик:** Дмитрий, Ярославль
- **Стек:** Astro (static) + Tailwind CSS v4 + TypeScript, без CMS
- **Дата:** 2026-08-28
- **Статус:** задеплоено

## Где смотреть

| Что | Ссылка |
|---|---|
| Живой сайт | https://mihailburmasov.github.io/remont-yaroslavl76/ |
| Репозиторий | https://github.com/mihailburmasov/remont-yaroslavl76 |
| Автодеплой | GitHub Actions пересобирает и публикует сайт при каждом `push` в `master` |
| Локальный запуск | `npm install && npm run dev` → http://localhost:4321 |

## Сделано

- [x] 17 страниц: главная, услуги + 5 подстраниц, цены, портфолио + 3 карточки проекта, о компании, контакты, политика конфиденциальности, 404
- [x] Дизайн-система (жёлто-чёрная палитра) и её витрина на `/styleguide`
- [x] Слайдер «до/после» — работает мышью, тачем и клавиатурой
- [x] Форма заявки и мини-форма с антиспам-защитой (honeypot + проверка времени заполнения)
- [x] Фильтры и лайтбокс в портфолио
- [x] SEO: JSON-LD (LocalBusiness, FAQPage, BreadcrumbList, ImageObject), sitemap.xml, robots.txt, уникальные метатеги на каждой странице
- [x] Автодеплой на GitHub Pages через GitHub Actions

## К исполнению

- [ ] Заполнить плейсхолдеры контента (телефон, цены, реквизиты, отзывы, команда) — полный список в [`CONTENT-TODO.md`](./CONTENT-TODO.md)
- [ ] Заменить SVG-заглушки на реальные фото — автопарсинг из группы ВК не удался (см. [`DECISIONS.md`](./DECISIONS.md))
- [ ] Подключить приёмник заявок — `{{FORM_ENDPOINT}}` в `src/lib/submitLead.ts`
- [ ] Подключить счётчик Яндекс.Метрики — `{{METRIKA_ID}}` в `src/lib/site.ts`
- [ ] Заменить домен-плейсхолдер `pro-remont76.ru` на реальный после покупки хостинга (3 места, см. `README.md`)
- [ ] Отозвать GitHub-токен, выпущенный для настройки автодеплоя (Settings → Developer settings → Personal access tokens)

## Документы в репозитории

| Файл | Что внутри |
|---|---|
| [`README.md`](./README.md) | Установка, сборка, деплой, структура проекта |
| [`CONTENT-TODO.md`](./CONTENT-TODO.md) | Полный список плейсхолдеров и что в них подставить |
| [`DECISIONS.md`](./DECISIONS.md) | Почему такой стек и что с фото из ВК |
| [`PLAN.md`](./PLAN.md) | Ход работы по этапам, текущий статус |

## Стек

Astro (static) · Tailwind CSS v4 · TypeScript · @astrojs/sitemap · GitHub Actions · GitHub Pages · без CMS
