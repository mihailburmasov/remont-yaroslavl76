# Акт передачи — сайт «ПроРемонт»

Ремонт квартир и домов в Ярославле — корпоративный сайт на Astro и Tailwind CSS, 17 страниц.

- **Исполнитель:** Claude Sonnet 5
- **Заказчик:** Дмитрий, Ярославль
- **Стек:** Astro (static) + Tailwind CSS v4 + TypeScript, без CMS
- **Дата:** 2026-09-02
- **Статус:** задеплоено, содержание в основном заполнено реальными данными клиента

## Где смотреть

| Что | Ссылка |
|---|---|
| Живой сайт (боевой хостинг, временный адрес до подключения домена) | http://pro-remont76-static.website.yandexcloud.net |
| Боевой домен | proremont76.ru — прописан в коде, HTTPS через Yandex Cloud CDN подключается по инструкции в `README.md` |
| Превью на GitHub Pages | https://mihailburmasov.github.io/remont-yaroslavl76/ |
| Репозиторий | https://github.com/mihailburmasov/remont-yaroslavl76 |
| Автодеплой на GitHub Pages | GitHub Actions пересобирает и публикует превью при каждом `push` в `master` |
| Деплой на Yandex Cloud | вручную командой `npm run deploy:yandex` (см. `README.md`) |
| Локальный запуск | `npm install && npm run dev` → http://localhost:4321 |

## Сделано

- [x] 17 страниц: главная, услуги + 5 подстраниц, цены, портфолио + 3 карточки проекта, о компании, контакты, политика конфиденциальности, 404
- [x] Дизайн-система (жёлто-чёрная палитра) и её витрина на `/styleguide`
- [x] Слайдер «до/после» — работает мышью, тачем и клавиатурой
- [x] Форма заявки и мини-форма с антиспам-защитой (honeypot + проверка времени заполнения)
- [x] Фильтры и лайтбокс в портфолио
- [x] SEO: JSON-LD (LocalBusiness, FAQPage, BreadcrumbList, ImageObject), sitemap.xml, robots.txt, уникальные метатеги на каждой странице
- [x] Автодеплой на GitHub Pages через GitHub Actions
- [x] Реальные данные клиента: три уровня ремонта (бюджетный от 7 500 ₽/м², косметический от
      12 000 ₽/м², дизайнерский от 17 000 ₽/м², материалы не входят), гарантия 2 года, 70+
      сданных объектов, единое название «ПроРемонт» везде
- [x] Форма заявки отправляется на почту клиента через FormSubmit.co (без бэкенда) —
      **нужно один раз подтвердить письмо** при первой реальной заявке (см. «К исполнению»)
- [x] Команда сокращена до руководителя Дмитрия — реальное фото и биография
- [x] 6 отзывов на главной, укладка плитки и обои добавлены в состав работ на странице «Цены»
- [x] Реквизиты (ИНН/ОГРНИП) убраны — юрлицо клиент сознательно не раскрывает; подвал сайта
      вместо реквизитов содержит ссылку «Разработано в sitomika.ru»
- [x] WhatsApp, Telegram и публичный e-mail убраны со всего сайта; вместо них — мессенджер MAX
      (ссылка на профиль). Почта осталась только служебным адресом доставки заявок в
      `src/lib/submitLead.ts`, нигде на сайте не показывается

## К исполнению

- [ ] **Подтвердить письмо FormSubmit.co** — при первой реальной заявке с сайта на почту
      Dima.yar.1992@mail.ru придёт письмо-подтверждение, без этого шага заявки не будут доходить
- [ ] Подключить счётчик Яндекс.Метрики — `{{METRIKA_ID}}` в `src/lib/site.ts`
- [ ] Подключить домен `proremont76.ru` через Yandex Cloud CDN + HTTPS-сертификат — **в процессе**,
      см. «Статус подключения домена» ниже
- [ ] Заменить стоковые фото портфолио (`/до/после`) на фото настоящих объектов клиента
- [ ] Проверить/уточнить Telegram-ссылку — собрана автоматически из номера телефона, не подтверждена
- [ ] Отозвать GitHub-токен, выпущенный для настройки автодеплоя (Settings → Developer settings → Personal access tokens)

## Статус подключения домена (2026-09-09)

Домен `proremont76.ru` куплен на reg.ru (регистратор). Финальная схема: DNS-зона делегирована
в Yandex Cloud DNS (reg.ru не поддерживает CNAME/ALIAS на корень домена — Yandex Cloud DNS
поддерживает тип ANAME, которым решается именно эта задача). Тот же паттерн, что и у
sitomika.ru.

Готово:

- [x] Сертификат Let's Encrypt `proremont76-ru` в Certificate Manager, статус «Issued»,
      домены `proremont76.ru` + `www.proremont76.ru` (id `fpq13tv9qjjfa6dngdah`)
- [x] CDN-ресурс `bc8r7xvx7umghpdu2j4c` (`yc cdn resource create`) — источник
      `pro-remont76-static.website.yandexcloud.net` по HTTP, привязан сертификат выше,
      редирект HTTP→HTTPS включён. Провайдерский CNAME: `4a0bf2c9e1d604d9.topology.gslb.yccdn.ru.`
- [x] Публичная DNS-зона `proremont76-ru-zone` в Yandex Cloud DNS (id `dnsdmegdnkmmutp8alkn`),
      NS-серверы `ns1.yandexcloud.net` / `ns2.yandexcloud.net`, записи:
      - `proremont76.ru.` → ANAME → CNAME CDN-ресурса выше
      - `www.proremont76.ru.` → CNAME → CNAME CDN-ресурса выше
      - `_acme-challenge.proremont76.ru.` и `_acme-challenge.www.proremont76.ru.` → CNAME на
        Certificate Manager (нужны для автопродления сертификата каждые ~90 дней)
- [x] На reg.ru NS-серверы домена переключены на `ns1.yandexcloud.net` / `ns2.yandexcloud.net`
      («Домены» → `proremont76.ru` → «DNS-серверы и управление зоной» → «Изменить» → «Свой
      список DNS-серверов»)

Осталось:

- [ ] Дождаться распространения смены NS (до суток) — на 2026-09-09 ещё отдавались старые
      `ns1.reg.ru`/`ns2.reg.ru`
- [ ] Проверить, что `https://proremont76.ru` и `https://www.proremont76.ru` открывают сайт с
      валидным сертификатом

## Документы в репозитории

| Файл | Что внутри |
|---|---|
| [`README.md`](./README.md) | Установка, сборка, деплой, структура проекта |
| [`CONTENT-TODO.md`](./CONTENT-TODO.md) | Полный список плейсхолдеров и что в них подставить |
| [`DECISIONS.md`](./DECISIONS.md) | Почему такой стек и что с фото из ВК |
| [`PLAN.md`](./PLAN.md) | Ход работы по этапам, текущий статус |

## Стек

Astro (static) · Tailwind CSS v4 · TypeScript · @astrojs/sitemap · GitHub Actions · GitHub Pages · без CMS
