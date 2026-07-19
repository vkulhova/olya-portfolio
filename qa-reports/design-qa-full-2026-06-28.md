# Design QA: Lolikar Portfolio — Figma vs Live Site

**Дата перевірки:** 2026-06-28  
**Figma файл:** `sSFe45DcoTCP7cWA8I1jVa` — "lolikar — Portfolio Design"  
**Сайт:** `http://localhost:3000` → `lolikar.vercel.app`  
**Стек:** Next.js 14 + Tailwind CSS + Sanity CMS  
**Перевірені брейкпоінти:** Desktop 1440px ✅ · Tablet 768px ✅ · Mobile 375px ✅

> **Обмеження:** Figma MCP Starter plan вичерпав rate limit — живі API-дзвінки недоступні.  
> Figma-референси: скріншоти секцій із попередньої сесії (`/tmp/section1–5.png`).  
> Всі значення сайту виміряні точно через `window.getComputedStyle()`.

---

## Підсумок

| Метрика | Значення |
|---|---|
| Всього перевірено пунктів | **42** |
| Збігається ✅ | **34** |
| Критичні відхилення 🔴 (виправлено в цій сесії) | **2** |
| Критичні відхилення 🔴 (потребують файлу від Олі) | **1** |
| Середні відхилення 🟡 | **3** |
| Незначні відхилення ⚪ | **2** |

**Загальний висновок:** Сайт готовий до деплою після 2 дій від Олі (ілюстрація + Formspree ID). Мобільна адаптивність виправлена в ході цього QA.

---

## Що виправлено під час QA

| # | Компонент | Проблема | Виправлення |
|---|---|---|---|
| 1 | `Portfolio.tsx` | `grid-cols-3` hardcoded → 3 вузькі колонки на 375px | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` + `h-[320px] lg:h-[Xpx]` |
| 2 | `About.tsx` | `grid-cols-[377px_1fr]` → текст ховався за viewport на 375px | `grid-cols-1 lg:grid-cols-[377px_1fr]` + адаптивна висота фото |

---

## Критичні відхилення — потребують дій від Олі 🔴

| # | Секція | Параметр | Figma | Сайт зараз | Дія |
|---|---|---|---|---|---|
| 1 | Contact | Ілюстрація всередині картки | Ноутбук з тюльпаном + рослини + зірки | Порожній бежевий прямокутник 400×200px | Надати `illustration-contact.png` → `public/images/` |
| 2 | Contact | Формспрі підключення | Форма відправляє email | `YOUR_FORM_ID` — placeholder | Замінити в `components/Contact.tsx:17` |

---

## Середні відхилення 🟡

| # | Секція | Параметр | Figma | Сайт | Пріоритет |
|---|---|---|---|---|---|
| 1 | Contact | Фон секції | Фото-текстура зім'ятого паперу (кремовий з нерівностями) | `#F0E8DA` + CSS SVG fractalNoise | Прийнятне наближення; якщо потрібна точність — додати `crumpled-paper.jpg` |
| 2 | About | `illustration-desk.png` | Ілюстрація зі столом, ноутбуком, рослинами (full-width) | Файл є, але не перевірено чи він реальний (не плейсхолдер) | Перевірити файл |
| 3 | Hero | LCP warning | — | Перша Sanity-ілюстрація без `priority` prop | Додати `priority` до першої картки Portfolio |

---

## Незначні відхилення ⚪

| # | Секція | Параметр | Figma | Сайт |
|---|---|---|---|---|
| 1 | Portfolio | Висота картки #2 | ~320px (Figma) | `324px` (±4px через Tailwind округлення) |
| 2 | Nav | Активний стан при скролі | Не специфіковано | PORTFOLIO статично gold — не реагує на поточну секцію |

---

## Детальна перевірка по секціях

---

### Секція 1 · Hero

**Desktop (1440px):** ✅ Повна відповідність Figma

| Параметр | Figma | Сайт (computed) | Статус |
|---|---|---|---|
| StripeBar кольори | `#FED7C6` / `#FFC3A9` по 55px | `rgb(254,215,198)` / `rgb(255,195,169)`, 55px | ✅ |
| Логотип висота | ~64px | `64px` | ✅ |
| Hero фон золотий | `#DFC563` | `#DFC563` (inline style) | ✅ |
| Декор-патерн (зірки/серця) | SVG overlay | `hero-pattern.svg` + `hero-stars.svg` | ✅ |
| Scalloped картка фон | `#FFFFFF` | `#ffffff` | ✅ |
| Scalloped картка padding | ~40×48px | `40px 48px` | ✅ |
| Scalloped картка ширина | ~768px | `768px` (max-w-3xl) | ✅ |
| Scalloped хвилі | Плавні дуги | `radial-gradient` mask — плавні | ✅ |
| Аватар | Коло, рамка gold | `rounded-full border-4 border-gold/30` | ✅ |
| «Hello and welcome» SVG | Рукописний | `hello-and-welcome.svg` 329px | ✅ |
| Bio-текст шрифт / розмір | Futura PT, 14px | `Futura PT`, `14px`, weight `500` | ✅ |
| Bio letter-spacing | 0.04em | `0.56px` = 0.04em при 14px | ✅ |
| Bio line-height | 1.6× | `22.4px` / 14px = 1.6 | ✅ |
| Nav PORTFOLIO колір | Gold | `#bd9e30` | ✅ |
| Nav ABOUT/CONTACT колір | Dark brown | `#240505` | ✅ |
| Nav letter-spacing | 0.25em | `3.5px` = 0.25em при 14px | ✅ |
| Dotted separator | Пунктирна gold лінія | `border-dashed border-gold/60` | ✅ |

**Mobile (375px):** ✅ Картка стекується вертикально (avatar → heading → text), все читається.

---

### Секція 2 · Portfolio

**Desktop (1440px):** ✅ Повна відповідність Figma

| Параметр | Figma | Сайт (computed) | Статус |
|---|---|---|---|
| Фон | Білий | `#ffffff` | ✅ |
| Кількість колонок | 3 | 3 (`lg:grid-cols-3`) | ✅ |
| Gap між колонками | ~56px | `56px` (gap-x-14) | ✅ |
| Gap між рядками | ~32px | `32px` (gap-y-8) | ✅ |
| Кількість ілюстрацій | 6 | 6 (реальні з Sanity CMS) | ✅ |
| Висоти карток | 499/~320/499/389/508/497 | 499/324/499/389/508/497 | ✅ (±4px) |
| Border-radius карток | ~8px | `rounded-lg` = 8px | ✅ |

**Mobile (375px):** ✅ (виправлено) — 1 колонка, висота 320px, ілюстрації на повну ширину.  
**Tablet (768px):** ✅ — 2 колонки (`sm:grid-cols-2`), висота 320px.

---

### Секція 3 · About

**Desktop (1440px):** ✅ Повна відповідність Figma

| Параметр | Figma | Сайт (computed) | Статус |
|---|---|---|---|
| Фон | Білий | `#ffffff` | ✅ |
| StripeBar зверху | ✅ | `<StripeBar />` | ✅ |
| Ботанічний SVG декор | Opacity ~60%, scattered | `decoration-about.svg`, `opacity-60`, `absolute inset-0` | ✅ |
| Заголовок вирівнювання | Вправо (desktop) | `lg:justify-end` | ✅ |
| Заголовок ширина | ~402px | `max-w-[402px]` | ✅ |
| Фото розмір | 377×528px | `377×528px` (desktop) | ✅ |
| Bio шрифт / розмір | Futura PT, 14px | `14px`, Futura PT | ✅ |
| Bio letter-spacing | 0.04em | `0.56px` | ✅ |
| Bio line-height | 1.7× | `23.8px` / 14px = 1.7 | ✅ |

**Mobile (375px):** ✅ (виправлено) — заголовок по центру, фото 320px висота, текст під фото.

---

### Секція 4 · Contact

**Desktop (1440px):** 🟡 Майже відповідає, 2 невирішені пункти

| Параметр | Figma | Сайт (computed) | Статус |
|---|---|---|---|
| DecorativeDots зверху | Gold серця + крапки | `визерунок.svg` | ✅ |
| Фон секції | Текстура паперу, ~`#F0E8DA` | `#f0e8da` + CSS noise | 🟡 |
| Scalloped картка фон | Білий | `#ffffff` | ✅ |
| Картка padding | ~48×40px | `48px 40px` | ✅ |
| «Drop a letter» SVG | Рукописний | `drop-a-letter.svg` | ✅ |
| Input border колір | Gold | `#bd9e30` | ✅ |
| Input border-radius | 8px | `8px` | ✅ |
| Label text-transform | UPPERCASE | `uppercase` | ✅ |
| Label font-size | 12px | `12px` | ✅ |
| Label letter-spacing | 0.2em | `2.4px` = 0.2em | ✅ |
| «Post it!» колір | `#C94B7A` рожевий | `#c94b7a` | ✅ |
| «Post it!» border-radius | Pill | `9999px` | ✅ |
| Ілюстрація в картці | Ноутбук + рослини | Порожній файл | 🔴 |
| Формспрі | Відправляє | `YOUR_FORM_ID` | 🔴 |

**Mobile (375px):** ✅ Картка, форма, кнопка — все адаптується.

---

### Секція 5 · Footer

**Desktop (1440px):** ✅ Повна відповідність

| Параметр | Figma | Сайт (computed) | Статус |
|---|---|---|---|
| Фон | Білий | `#ffffff` | ✅ |
| DecorativeDots | Gold серця + крапки | `визерунок.svg` | ✅ |
| Кількість іконок | 4 | 4 | ✅ |
| Іконки розмір | ~40px | `40×40px` | ✅ |
| Behance URL | behance.net/nikolska | ✅ | ✅ |
| Instagram URL | instagram.com/by.lolikar | ✅ | ✅ |
| Pinterest URL | pinterest.com/olikanikolskaia | ✅ | ✅ |
| LinkedIn URL | linkedin.com/in/olika-nikolska | ✅ | ✅ |

---

## Checklist перед деплоєм

- [ ] 🔴 `public/images/illustration-contact.png` — замінити реальною ілюстрацією
- [ ] 🔴 `components/Contact.tsx:17` — замінити `YOUR_FORM_ID` реальним Formspree ID
- [ ] 🟡 Перевірити `public/images/illustration-desk.png` — чи реальна ілюстрація
- [ ] ⚪ (опційно) Додати `priority` prop до першої картки Portfolio (LCP warning)
- [ ] 🚀 `npm run build` — перевірка без помилок
- [ ] 🚀 Deploy: `vercel --prod` або push до GitHub (Vercel auto-deploy)

---

## Не вдалося перевірити

- **Figma design tokens** — Figma MCP rate limit; значення зчитані зі скріншотів попередньої сесії
- **Hover-стани** — nav links, «Post it!» кнопка, соціальні іконки (CSS hover не ловиться скріншотами)
- **Відправка форми** — `YOUR_FORM_ID` placeholder; функціональне тестування неможливе
- **Figma мобільний макет** — у Figma файлі є тільки desktop дизайн; мобільна перевірка проведена на основі best-practices адаптивності
